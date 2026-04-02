import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../theme';
import { Habit } from '../constants/habits';
import { useAppStore } from '../store/useAppStore';

type Props = {
    habit: Habit;
    onPress: () => void;
};

export function HabitCard({ habit, onPress }: Props) {
    const favoriteHabitIds = useAppStore((s) => s.favoriteHabitIds);
    const toggleFavorite   = useAppStore((s) => s.toggleFavorite);
    const isFavorite = favoriteHabitIds.includes(habit.id);
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            {/* Цветная полоска слева */}
            <View style={[styles.stripe, { backgroundColor: habit.color }]} />

            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.title}>{habit.title}</Text>
                    <TouchableOpacity onPress={() => toggleFavorite(habit.id)} style={{ marginLeft: 8 }}>
                        <Text style={{ fontSize: 18 }}>{isFavorite ? '⭐' : '☆'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.streak}>🔥 {habit.streak}</Text>
                </View>

                <Text style={styles.category}>{habit.category} · {habit.frequency}</Text>
                <Text style={styles.description} numberOfLines={2}>{habit.description}</Text>

                <View style={styles.badge}>
                    <Text style={[styles.badgeText, { color: habit.isActive ? '#22C55E' : '#94A3B8' }]}>
                        {habit.isActive ? '● Активна' : '○ Пауза'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: radii.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    stripe: {
        width: 5,
    },
    content: {
        flex: 1,
        padding: spacing.md,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        flex: 1,
    },
    streak: {
        fontSize: 15,
        color: '#F59E0B',
        fontWeight: '600',
    },
    category: {
        fontSize: 12,
        color: colors.muted,
        marginBottom: spacing.sm,
    },
    description: {
        fontSize: 13,
        color: colors.muted,
        lineHeight: 18,
    },
    badge: {
        marginTop: spacing.sm,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
});