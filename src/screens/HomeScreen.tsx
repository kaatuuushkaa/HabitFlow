import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { SectionCard }  from '../components/SectionCard';
import { useAppStore } from '../store/useAppStore';

export function HomeScreen() {
    const currentUser      = useAppStore((s) => s.currentUser);
    const favoriteHabitIds = useAppStore((s) => s.favoriteHabitIds);

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>HabitFlow</Text>
                <Text style={styles.subtitle}>Отслеживание привычек и целей</Text>

                <SectionCard title="Мой аккаунт">
                    <Text style={styles.row}>👤 Пользователь:{' '}
                        <Text style={styles.val}>{currentUser?.name ?? 'Гость'}</Text>
                    </Text>
                    <Text style={styles.row}>📧 Email:{' '}
                        <Text style={styles.val}>{currentUser?.email ?? '—'}</Text>
                    </Text>
                </SectionCard>

                <SectionCard title="Статистика">
                    <Text style={styles.row}>⭐ Избранных привычек:{' '}
                        <Text style={styles.val}>{favoriteHabitIds.length}</Text>
                    </Text>
                    <Text style={styles.row}>📋 Всего привычек:{' '}
                        <Text style={styles.val}>8</Text>
                    </Text>
                </SectionCard>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:   { flex: 1, backgroundColor: colors.background },
    content:  { padding: spacing.lg, paddingTop: 60 },
    title:    { fontSize: 32, fontWeight: '800', color: '#fff', marginBottom: 4 },
    subtitle: { fontSize: 15, color: colors.muted, marginBottom: spacing.xl },
    row:      { fontSize: 15, color: colors.muted, marginBottom: spacing.sm },
    val:      { color: colors.text, fontWeight: '600' },
});