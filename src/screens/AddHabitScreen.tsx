import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { colors, spacing } from '../theme';
import { FormField }     from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { saveHabitDraft, loadHabitDraft, clearHabitDraft, HabitDraft } from '../services/storage';
import { useAppStore }   from '../store/useAppStore';

const emptyDraft: HabitDraft = { title: '', description: '', email: '', phone: '' };
const phonePattern = /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

export function AddHabitScreen() {
    const { control, handleSubmit, reset, getValues, setValue,
        formState: { errors } } = useForm<HabitDraft>({ defaultValues: emptyDraft });
    const [draftStatus, setDraftStatus] = useState('');
    const currentUser = useAppStore((s) => s.currentUser);

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

    const onSubmit = (data: HabitDraft) => {
        Alert.alert('Привычка добавлена!', `Название: ${data.title}`,
            [{ text: 'ОК', onPress: () => { reset(emptyDraft); setDraftStatus(''); } }]);
    };

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <Text style={styles.heading}>Новая привычка</Text>

                {/* Кнопки управления черновиком */}
                <View style={styles.draftRow}>
                    <TouchableOpacity style={styles.draftBtn} onPress={handleSaveDraft}>
                        <Text style={styles.draftBtnText}>💾 Сохранить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.draftBtn} onPress={handleRestoreDraft}>
                        <Text style={styles.draftBtnText}>📂 Восстановить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.draftBtn} onPress={handleClearDraft}>
                        <Text style={styles.draftBtnText}>🗑 Очистить</Text>
                    </TouchableOpacity>
                </View>
                {draftStatus ? <Text style={styles.draftStatus}>{draftStatus}</Text> : null}

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
                                           placeholder="+7 (999) 000-00-00"
                                           keyboardType="phone-pad" error={errors.phone?.message} />
                            )} />

                <PrimaryButton label="Добавить привычку" onPress={handleSubmit(onSubmit)} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:       { flex: 1, backgroundColor: colors.background },
    content:      { padding: spacing.lg, paddingTop: 50 },
    heading:      { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: spacing.lg },
    draftRow:     { flexDirection: 'row', gap: 8, marginBottom: 8 },
    draftBtn:     { flex: 1, backgroundColor: colors.surface, borderRadius: 8,
        padding: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    draftBtnText: { color: colors.text, fontSize: 12, fontWeight: '600' },
    draftStatus:  { fontSize: 13, color: '#22C55E', marginBottom: spacing.md, textAlign: 'center' },
});