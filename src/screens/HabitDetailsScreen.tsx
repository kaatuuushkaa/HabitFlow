import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { colors, spacing, radii } from '../theme';
import { SectionCard } from '../components/SectionCard';
import { habitsList } from '../constants/habits';

// Тип параметров маршрута
type HabitDetailsRouteProp = RouteProp<
    { HabitDetails: { habitId: string } },
    'HabitDetails'
>;

export function HabitDetailsScreen() {
    const route = useRoute<HabitDetailsRouteProp>();
    const { habitId } = route.params;

    // Находим привычку по ID
    const habit = habitsList.find((h) => h.id === habitId);

    if (!habit) {
        return (
            <View style={styles.screen}>
                <Text style={{ color: '#fff' }}>Привычка не найдена</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Заголовок с цветом */}
                <View style={[styles.header, { borderLeftColor: habit.color }]}>
                    <Text style={styles.title}>{habit.title}</Text>
                    <Text style={styles.category}>{habit.category}</Text>
                </View>

                {/* Основная информация */}
                <SectionCard title="Детали привычки">
                    <Text style={styles.row}>📅 Частота: <Text style={styles.value}>{habit.frequency}</Text></Text>
                    <Text style={styles.row}>🔥 Серия: <Text style={styles.value}>{habit.streak} дней</Text></Text>
                    <Text style={styles.row}>
                        ✅ Статус:{' '}
                        <Text style={[styles.value, { color: habit.isActive ? '#22C55E' : '#94A3B8' }]}>
                            {habit.isActive ? 'Активна' : 'На паузе'}
                        </Text>
                    </Text>
                </SectionCard>

                {/* Описание */}
                <SectionCard title="Описание">
                    <Text style={styles.description}>{habit.description}</Text>
                </SectionCard>

                {/* Мотивация */}
                <SectionCard title="Прогресс">
                    <Text style={styles.description}>
                        Ты выполняешь эту привычку уже {habit.streak} дней подряд.
                        {habit.streak >= 21
                            ? ' Отличный результат — привычка сформирована!'
                            : ' Продолжай в том же духе!'}
                    </Text>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${Math.min((habit.streak / 21) * 100, 100)}%`, backgroundColor: habit.color },
                            ]}
                        />
                    </View>
                    <Text style={styles.progressLabel}>{Math.min(habit.streak, 21)}/21 дней до закрепления</Text>
                </SectionCard>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.lg, paddingTop: 30 },
    header: {
        borderLeftWidth: 4,
        paddingLeft: spacing.md,
        marginBottom: spacing.lg,
    },
    title: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 4 },
    category: { fontSize: 14, color: colors.muted },
    row: { fontSize: 15, color: colors.muted, marginBottom: spacing.sm },
    value: { color: colors.text, fontWeight: '600' },
    description: { fontSize: 15, color: colors.muted, lineHeight: 22 },
    progressBar: {
        height: 8,
        backgroundColor: colors.border,
        borderRadius: 4,
        marginTop: spacing.md,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressLabel: {
        fontSize: 12,
        color: colors.muted,
        marginTop: 6,
        textAlign: 'right',
    },
});