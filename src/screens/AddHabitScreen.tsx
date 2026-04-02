import React, { useState } from 'react';
import {
    View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { colors, spacing, radii } from '../theme';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';

// Тип данных формы
type HabitFormValues = {
    title: string;
    description: string;
    email: string;
    phone: string;
};

export function AddHabitScreen() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<HabitFormValues>({
        defaultValues: { title: '', description: '', email: '', phone: '' },
    });

    const phonePattern = /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

    const onSubmit = (data: HabitFormValues) => {
        Alert.alert(
            'Привычка добавлена!',
            `Название: ${data.title}\nEmail: ${data.email}`,
            [{ text: 'ОК', onPress: () => reset() }]
        );
    };

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

                <Text style={styles.heading}>Новая привычка</Text>

                {/* Название */}
                <Controller
                    control={control}
                    name="title"
                    rules={{ required: 'Введите название привычки' }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <FormField
                            label="Название *"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder="Например: Утренняя зарядка"
                            error={errors.title?.message}
                        />
                    )}
                />

                {/* Описание */}
                <Controller
                    control={control}
                    name="description"
                    rules={{ required: 'Введите описание' }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <FormField
                            label="Описание *"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder="Зачем нужна эта привычка?"
                            multiline
                            numberOfLines={3}
                            error={errors.description?.message}
                        />
                    )}
                />

                {/* Email */}
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Укажите email',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Введите корректный email',
                        },
                    }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <FormField
                            label="Email для уведомлений *"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder="user@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={errors.email?.message}
                        />
                    )}
                />

                {/* Телефон */}
                <Controller
                    control={control}
                    name="phone"
                    rules={{
                        required: 'Укажите телефон',
                        pattern: {
                            value: phonePattern,
                            message: 'Формат: +7 (999) 000-00-00',
                        },
                    }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <FormField
                            label="Телефон *"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder="+7 (999) 000-00-00"
                            keyboardType="phone-pad"
                            error={errors.phone?.message}
                        />
                    )}
                />

                <PrimaryButton label="Добавить привычку" onPress={handleSubmit(onSubmit)} />

                <TouchableOpacity onPress={() => reset()} style={styles.resetBtn}>
                    <Text style={styles.resetText}>Очистить форму</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.lg, paddingTop: 50 },
    heading: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: spacing.lg },
    resetBtn: { alignItems: 'center', marginTop: spacing.md },
    resetText: { color: colors.muted, fontSize: 14 },
});


