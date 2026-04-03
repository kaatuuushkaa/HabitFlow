import React from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    Alert, TouchableOpacity, useWindowDimensions,
} from 'react-native';
import { useNavigation }       from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useAppTheme }         from '../theme/useAppTheme';
import { useAppStore }         from '../store/useAppStore';
import { FormField }           from '../components/FormField';
import { PrimaryButton }       from '../components/PrimaryButton';
import { api }                 from '../services/api';
import { spacing, radii }      from '../theme';

type FormValues = { email: string; password: string };

export function LoginScreen() {
    const colors         = useAppTheme();
    const { width }      = useWindowDimensions();
    const isTablet       = width >= 768;
    const navigation     = useNavigation<any>();
    const setCurrentUser = useAppStore((s) => s.setCurrentUser);

    const { control, handleSubmit, formState: { errors } } =
        useForm<FormValues>({ defaultValues: { email: '', password: '' } });

    const onSubmit = async (data: FormValues) => {
        try {
            const user = await api.login(data.email, data.password);
            setCurrentUser(user);
        } catch (e) {
            Alert.alert('Ошибка', e instanceof Error ? e.message : 'Не удалось войти.');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView
                contentContainerStyle={[styles.content, isTablet && styles.contentWide]}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={[styles.heading, { color: colors.text }]}>Вход</Text>
                <Text style={[styles.sub, { color: colors.muted }]}>
                    Войди в свой аккаунт HabitFlow
                </Text>

                <Controller control={control} name="email"
                            rules={{ required: 'Укажите email',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Некорректный email' } }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <FormField label="Email" value={value} onChangeText={onChange} onBlur={onBlur}
                                           placeholder="test@test.com" keyboardType="email-address"
                                           autoCapitalize="none" error={errors.email?.message} />
                            )} />

                <Controller control={control} name="password"
                            rules={{ required: 'Введите пароль',
                                minLength: { value: 6, message: 'Минимум 6 символов' } }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <FormField label="Пароль" value={value} onChangeText={onChange} onBlur={onBlur}
                                           placeholder="••••••" secureTextEntry error={errors.password?.message} />
                            )} />

                <PrimaryButton label="Войти" onPress={handleSubmit(onSubmit)} />

                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={styles.link}
                >
                    <Text style={{ color: colors.accent, fontSize: 14 }}>
                        Нет аккаунта? Зарегистрироваться
                    </Text>
                </TouchableOpacity>

                <View style={[styles.hint, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.hintText, { color: colors.muted }]}>
                        Тестовый аккаунт: test@test.com / 123456
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content:     { padding: spacing.lg, paddingTop: 60 },
    contentWide: { paddingHorizontal: 48, maxWidth: 720, alignSelf: 'center', width: '100%' },
    heading:     { fontSize: 28, fontWeight: '800', marginBottom: 4 },
    sub:         { fontSize: 15, marginBottom: spacing.xl },
    link:        { alignItems: 'center', marginTop: spacing.lg },
    hint:        { marginTop: spacing.xl, padding: spacing.md,
        borderRadius: radii.sm, borderWidth: 1 },
    hintText:    { fontSize: 12, textAlign: 'center' },
});