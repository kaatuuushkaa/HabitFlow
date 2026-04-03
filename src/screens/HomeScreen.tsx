import React from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { useAppTheme }  from '../theme/useAppTheme';
import { useAppStore }  from '../store/useAppStore';
import { SectionCard }  from '../components/SectionCard';
import { spacing }      from '../theme';

export function HomeScreen() {
    const colors           = useAppTheme();
    const { width }        = useWindowDimensions();
    const isTablet         = width >= 768;
    const currentUser      = useAppStore((s) => s.currentUser);
    const favoriteHabitIds = useAppStore((s) => s.favoriteHabitIds);

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    isTablet && styles.contentWide,
                ]}
            >
                <Text style={[styles.title, { color: colors.text }]}>HabitFlow</Text>
                <Text style={[styles.subtitle, { color: colors.muted }]}>
                    Отслеживание привычек и целей
                </Text>

                <SectionCard title="Мой аккаунт">
                    <Text style={[styles.row, { color: colors.muted }]}>
                        👤 Пользователь:{' '}
                        <Text style={{ color: colors.text, fontWeight: '600' }}>
                            {currentUser?.name ?? 'Гость'}
                        </Text>
                    </Text>
                    <Text style={[styles.row, { color: colors.muted }]}>
                        📧 Email:{' '}
                        <Text style={{ color: colors.text, fontWeight: '600' }}>
                            {currentUser?.email ?? '—'}
                        </Text>
                    </Text>
                </SectionCard>

                <SectionCard title="Статистика">
                    <Text style={[styles.row, { color: colors.muted }]}>
                        ⭐ Избранных привычек:{' '}
                        <Text style={{ color: colors.text, fontWeight: '600' }}>
                            {favoriteHabitIds.length}
                        </Text>
                    </Text>
                    <Text style={[styles.row, { color: colors.muted }]}>
                        📋 Всего привычек:{' '}
                        <Text style={{ color: colors.text, fontWeight: '600' }}>8</Text>
                    </Text>
                </SectionCard>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content:     { padding: spacing.lg, paddingTop: 60 },
    contentWide: { padding: 48, maxWidth: 720, alignSelf: 'center' },
    title:       { fontSize: 32, fontWeight: '800', marginBottom: 4 },
    subtitle:    { fontSize: 15, marginBottom: spacing.xl },
    row:         { fontSize: 15, marginBottom: spacing.sm },
});