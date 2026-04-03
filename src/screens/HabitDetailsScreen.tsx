import React from 'react';
import {
    View, Text, ScrollView, StyleSheet, useWindowDimensions,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppTheme }         from '../theme/useAppTheme';
import { SectionCard }         from '../components/SectionCard';
import { habitsList }          from '../constants/habits';
import { spacing, radii }      from '../theme';

type Route = RouteProp<{ HabitDetails: { habitId: string } }, 'HabitDetails'>;

export function HabitDetailsScreen() {
    const colors    = useAppTheme();
    const { width } = useWindowDimensions();
    const isTablet  = width >= 768;
    const { habitId } = useRoute<Route>().params;
    const habit = habitsList.find((h) => h.id === habitId);

    if (!habit) return (
        <View style={{ flex: 1, backgroundColor: colors.background,
            alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.muted }}>Привычка не найдена</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    isTablet && styles.contentWide,
                ]}
            >
                {/* Заголовок с цветной полоской */}
                <View style={[styles.header, { borderLeftColor: habit.color }]}>
                    <Text style={[styles.title, { color: colors.text }]}>{habit.title}</Text>
                    <Text style={[styles.category, { color: colors.muted }]}>{habit.category}</Text>
                </View>

                <SectionCard title="Детали привычки">
                    <Text style={[styles.row, { color: colors.muted }]}>
                        📅 Частота:{' '}
                        <Text style={{ color: colors.text, fontWeight: '600' }}>{habit.frequency}</Text>
                    </Text>
                    <Text style={[styles.row, { color: colors.muted }]}>
                        🔥 Серия:{' '}
                        <Text style={{ color: colors.text, fontWeight: '600' }}>{habit.streak} дней</Text>
                    </Text>
                    <Text style={[styles.row, { color: colors.muted }]}>
                        ✅ Статус:{' '}
                        <Text style={{
                            color: habit.isActive ? '#22C55E' : colors.muted,
                            fontWeight: '600',
                        }}>
                            {habit.isActive ? 'Активна' : 'На паузе'}
                        </Text>
                    </Text>
                </SectionCard>

                <SectionCard title="Описание">
                    <Text style={[styles.desc, { color: colors.muted }]}>{habit.description}</Text>
                </SectionCard>

                <SectionCard title="Прогресс">
                    <Text style={[styles.desc, { color: colors.muted }]}>
                        Ты выполняешь эту привычку уже {habit.streak} дней подряд.
                        {habit.streak >= 21
                            ? ' Отличный результат — привычка сформирована!'
                            : ' Продолжай в том же духе!'}
                    </Text>
                    <View style={[styles.bar, { backgroundColor: colors.border }]}>
                        <View style={[
                            styles.barFill,
                            {
                                width: `${Math.min((habit.streak / 21) * 100, 100)}%` as any,
                                backgroundColor: habit.color,
                            },
                        ]} />
                    </View>
                    <Text style={[styles.barLabel, { color: colors.muted }]}>
                        {Math.min(habit.streak, 21)}/21 дней до закрепления
                    </Text>
                </SectionCard>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content:     { padding: spacing.lg, paddingTop: 30 },
    contentWide: { padding: 48, maxWidth: 720, alignSelf: 'center', width: '100%' },
    header:      { borderLeftWidth: 4, paddingLeft: spacing.md, marginBottom: spacing.lg },
    title:       { fontSize: 26, fontWeight: '800', marginBottom: 4 },
    category:    { fontSize: 14 },
    row:         { fontSize: 15, marginBottom: spacing.sm },
    desc:        { fontSize: 15, lineHeight: 22 },
    bar:         { height: 8, borderRadius: 4, marginTop: spacing.md, overflow: 'hidden' },
    barFill:     { height: '100%', borderRadius: 4 },
    barLabel:    { fontSize: 12, marginTop: 6, textAlign: 'right' },
});