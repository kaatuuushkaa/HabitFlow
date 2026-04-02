import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { colors, spacing } from '../theme';
import { FormField }     from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { api }           from '../services/api';
import { useAppStore }   from '../store/useAppStore';

type FormValues = { email: string; password: string };

export function LoginScreen() {
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
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <Text style={styles.heading}>Вход</Text>
                <Text style={styles.sub}>Войди в свой аккаунт HabitFlow</Text>

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

                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.link}>
                    <Text style={styles.linkText}>Нет аккаунта? Зарегистрироваться</Text>
                </TouchableOpacity>

                <View style={styles.hint}>
                    <Text style={styles.hintText}>Тестовый аккаунт: test@test.com / 123456</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:   { flex: 1, backgroundColor: colors.background },
    content:  { padding: spacing.lg, paddingTop: 60 },
    heading:  { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 4 },
    sub:      { fontSize: 15, color: colors.muted, marginBottom: spacing.xl },
    link:     { alignItems: 'center', marginTop: spacing.lg },
    linkText: { color: colors.accent, fontSize: 14 },
    hint:     { marginTop: spacing.xl, padding: spacing.md, backgroundColor: colors.surface,
        borderRadius: 8, borderWidth: 1, borderColor: colors.border },
    hintText: { color: colors.muted, fontSize: 12, textAlign: 'center' },
});