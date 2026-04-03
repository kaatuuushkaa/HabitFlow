import React, { useState, useEffect } from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    Alert, TouchableOpacity, useWindowDimensions,
} from 'react-native';
import { useForm, Controller }   from 'react-hook-form';
import { useAppTheme }           from '../theme/useAppTheme';
import { useAppStore }           from '../store/useAppStore';
import { FormField }             from '../components/FormField';
import { PrimaryButton }         from '../components/PrimaryButton';
import { spacing, radii }        from '../theme';
import {
    saveHabitDraft, loadHabitDraft,
    clearHabitDraft, HabitDraft,
} from '../services/storage';
import { getCurrentLocationLabel } from '../services/device';
import { scheduleHabitReminder }   from '../services/notifications';

const emptyDraft: HabitDraft = { title: '', description: '', email: '', phone: '' };
const phonePattern = /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

export function AddHabitScreen() {
    const colors        = useAppTheme();
    const { width }     = useWindowDimensions();
    const isTablet      = width >= 768;
    const currentUser   = useAppStore((s) => s.currentUser);

    const {
        control, handleSubmit, reset, getValues, setValue,
        formState: { errors },
    } = useForm<HabitDraft>({ defaultValues: emptyDraft });

    const [draftStatus, setDraftStatus] = useState('');

    // Автозаполнение email из профиля
    useEffect(() => {
        if (currentUser) setValue('email', currentUser.email);
    }, [currentUser, setValue]);

    const handleSaveDraft = async () => {
        await saveHabitDraft(getValues());
        setDraftStatus('✓ Черновик сохранён на устройстве.');
    };
    const handleRestoreDraft = async () => {
        const draft = await loadHabitDraft();
        if (!draft) { setDraftStatus('Сохранённый черновик не найден.'); return; }
        reset(draft);
        setDraftStatus('✓ Черновик восстановлен в форму.');
    };
    const handleClearDraft = async () => {
        await clearHabitDraft();
        reset(emptyDraft);
        setDraftStatus('Черновик удалён.');
    };

    const handleDetectLocation = async () => {
        try {
            const label = await getCurrentLocationLabel();
            setValue('description', `Местоположение: ${label}`);
            setDraftStatus(`📍 Определено: ${label}`);
        } catch (e) {
            Alert.alert('Ошибка', e instanceof Error ? e.message : 'Не удалось определить местоположение.');
        }
    };

    const onSubmit = async (data: HabitDraft) => {
        try { await scheduleHabitReminder(data.title); } catch (_) {}
        Alert.alert(
            'Привычка добавлена! 🎉',
            `"${data.title}" добавлена. Уведомление придёт через 5 секунд.`,
            [{ text: 'ОК', onPress: () => { reset(emptyDraft); setDraftStatus(''); } }]
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView
                contentContainerStyle={[styles.content, isTablet && styles.contentWide]}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={[styles.heading, { color: colors.text }]}>Новая привычка</Text>

                {/* Геолокация */}
                <TouchableOpacity
                    style={[styles.locationBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
                    onPress={handleDetectLocation}
                >
                    <Text style={[styles.locationBtnText, { color: colors.text }]}>
                        📍 Определить местоположение
                    </Text>
                </TouchableOpacity>

                {/* Черновик */}
                <View style={styles.draftRow}>
                    {[
                        { label: '💾 Сохранить',    onPress: handleSaveDraft    },
                        { label: '📂 Восстановить', onPress: handleRestoreDraft },
                        { label: '🗑 Очистить',     onPress: handleClearDraft   },
                    ].map((btn) => (
                        <TouchableOpacity
                            key={btn.label}
                            style={[styles.draftBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
                            onPress={btn.onPress}
                        >
                            <Text style={[styles.draftBtnText, { color: colors.text }]}>{btn.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {draftStatus ? (
                    <Text style={styles.draftStatus}>{draftStatus}</Text>
                ) : null}

                {/* Поля формы */}
                <Controller control={control} name="title"
                            rules={{ required: 'Введите название' }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <FormField label="Название *" value={value} onChangeText={onChange} onBlur={onBlur}
                                           placeholder="Например: Утренняя зарядка" error={errors.title?.message} />
                            )} />

                <Controller control={control} name="description"
                            rules={{ required: 'Введите описание' }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <FormField label="Описание *" value={value} onChangeText={onChange} onBlur={onBlur}
                                           placeholder="Зачем нужна эта привычка?"
                                           multiline numberOfLines={3} error={errors.description?.message} />
                            )} />

                <Controller control={control} name="email"
                            rules={{ required: 'Укажите email',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Некорректный email' } }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <FormField label="Email *" value={value} onChangeText={onChange} onBlur={onBlur}
                                           placeholder="user@example.com" keyboardType="email-address"
                                           autoCapitalize="none" error={errors.email?.message} />
                            )} />

                <Controller control={control} name="phone"
                            rules={{ required: 'Укажите телефон',
                                pattern: { value: phonePattern, message: 'Формат: +7 (999) 000-00-00' } }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <FormField label="Телефон *" value={value} onChangeText={onChange} onBlur={onBlur}
                                           placeholder="+7 (999) 000-00-00" keyboardType="phone-pad"
                                           error={errors.phone?.message} />
                            )} />

                {/* Тест уведомления */}
                <TouchableOpacity
                    style={[styles.notifyBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
                    onPress={() =>
                        scheduleHabitReminder('Тест напоминания').catch(() =>
                            Alert.alert('Нет разрешения', 'Разреши уведомления в настройках.')
                        )
                    }
                >
                    <Text style={[styles.notifyBtnText, { color: colors.muted }]}>
                        🔔 Тест уведомления (5 сек)
                    </Text>
                </TouchableOpacity>

                <PrimaryButton label="Добавить привычку" onPress={handleSubmit(onSubmit)} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content:         { padding: spacing.lg, paddingTop: 50 },
    contentWide:     { paddingHorizontal: 48, maxWidth: 720, alignSelf: 'center', width: '100%' },
    heading:         { fontSize: 24, fontWeight: '700', marginBottom: spacing.lg },
    locationBtn:     { borderRadius: radii.sm, padding: 12, alignItems: 'center',
        marginBottom: spacing.md, borderWidth: 1 },
    locationBtnText: { fontSize: 13, fontWeight: '600' },
    draftRow:        { flexDirection: 'row', gap: 8, marginBottom: 8 },
    draftBtn:        { flex: 1, borderRadius: radii.sm, padding: 10,
        alignItems: 'center', borderWidth: 1 },
    draftBtnText:    { fontSize: 12, fontWeight: '600' },
    draftStatus:     { fontSize: 13, color: '#22C55E', marginBottom: spacing.md, textAlign: 'center' },
    notifyBtn:       { borderRadius: radii.sm, padding: 12, alignItems: 'center',
        marginBottom: spacing.sm, borderWidth: 1 },
    notifyBtnText:   { fontSize: 13 },
});