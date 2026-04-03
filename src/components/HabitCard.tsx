import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme }  from '../theme/useAppTheme';
import { useAppStore }  from '../store/useAppStore';
import { spacing, radii } from '../theme';
import { Habit }        from '../constants/habits';

type Props = { habit: Habit; onPress: () => void };

export function HabitCard({ habit, onPress }: Props) {
    const colors           = useAppTheme();
    const favoriteHabitIds = useAppStore((s) => s.favoriteHabitIds);
    const toggleFavorite   = useAppStore((s) => s.toggleFavorite);
    const isFavorite       = favoriteHabitIds.includes(habit.id);

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {/* Цветная полоска слева */}
            <View style={[styles.stripe, { backgroundColor: habit.color }]} />

            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={[styles.title, { color: colors.text }]}>{habit.title}</Text>
                    <TouchableOpacity onPress={() => toggleFavorite(habit.id)} style={{ marginLeft: 8 }}>
                        <Text style={{ fontSize: 18 }}>{isFavorite ? '⭐' : '☆'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.streak}>🔥 {habit.streak}</Text>
                </View>
                <Text style={[styles.category, { color: colors.muted }]}>
                    {habit.category} · {habit.frequency}
                </Text>
                <Text style={[styles.description, { color: colors.muted }]} numberOfLines={2}>
                    {habit.description}
                </Text>
                <Text style={[
                    styles.status,
                    { color: habit.isActive ? '#22C55E' : colors.muted },
                ]}>
                    {habit.isActive ? '● Активна' : '○ Пауза'}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card:        { borderRadius: radii.md, marginBottom: spacing.md,
        borderWidth: 1, flexDirection: 'row', overflow: 'hidden' },
    stripe:      { width: 5 },
    content:     { flex: 1, padding: spacing.md },
    row:         { flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 4 },
    title:       { fontSize: 16, fontWeight: '700', flex: 1 },
    streak:      { fontSize: 15, color: '#F59E0B', fontWeight: '600' },
    category:    { fontSize: 12, marginBottom: spacing.sm },
    description: { fontSize: 13, lineHeight: 18 },
    status:      { fontSize: 12, fontWeight: '600', marginTop: spacing.sm },
});