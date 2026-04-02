import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { colors, spacing } from '../theme';
import { FormField }     from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { api }           from '../services/api';
import { useAppStore }   from '../store/useAppStore';

type FormValues = { name: string; email: string; password: string };

export function RegisterScreen() {
    const navigation     = useNavigation<any>();
    const setCurrentUser = useAppStore((s) => s.setCurrentUser);
    const { control, handleSubmit, formState: { errors } } =
        useForm<FormValues>({ defaultValues: { name: '', email: '', password: '' } });

    const onSubmit = async (data: FormValues) => {
        try {
            const user = await api.register(data.name, data.email, data.password);
            setCurrentUser(user);
        } catch (e) {
            Alert.alert('Ошибка', e instanceof Error ? e.message : 'Не удалось зарегистрироваться.');
        }
    };

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <Text style={styles.heading}>Регистрация</Text>
                <Text style={styles.sub}>Создай аккаунт HabitFlow</Text>

                <Controller control={control} name="name"
                            rules={{ required: 'Введите имя' }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <FormField label="Имя" value={value} onChangeText={onChange} onBlur={onBlur}
                                           placeholder="Иван Иванов" error={errors.name?.message} />
                            )} />

                <Controller control={control} name="email"
                            rules={{ required: 'Укажите email',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Некорректный email' } }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <FormField label="Email" value={value} onChangeText={onChange} onBlur={onBlur}
                                           placeholder="user@example.com" keyboardType="email-address"
                                           autoCapitalize="none" error={errors.email?.message} />
                            )} />

                <Controller control={control} name="password"
                            rules={{ required: 'Введите пароль',
                                minLength: { value: 6, message: 'Минимум 6 символов' } }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <FormField label="Пароль" value={value} onChangeText={onChange} onBlur={onBlur}
                                           placeholder="Минимум 6 символов" secureTextEntry error={errors.password?.message} />
                            )} />

                <PrimaryButton label="Зарегистрироваться" onPress={handleSubmit(onSubmit)} />

                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
                    <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
                </TouchableOpacity>
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
});