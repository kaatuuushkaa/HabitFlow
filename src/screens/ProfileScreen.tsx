import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, spacing } from '../theme';
import { SectionCard }  from '../components/SectionCard';
import { useAppStore } from '../store/useAppStore';

export function ProfileScreen() {
    const currentUser      = useAppStore((s) => s.currentUser);
    const favoriteHabitIds = useAppStore((s) => s.favoriteHabitIds);
    const logout           = useAppStore((s) => s.logout);

    const handleLogout = () => {
        Alert.alert('Выйти?', 'Ты выйдешь из аккаунта.', [
            { text: 'Отмена', style: 'cancel' },
            { text: 'Выйти', style: 'destructive', onPress: logout },
        ]);
    };

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>Профиль</Text>

                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{currentUser?.name[0].toUpperCase()}</Text>
                </View>

                <SectionCard title="Данные аккаунта">
                    <Text style={styles.row}>👤 Имя:{' '}
                        <Text style={styles.val}>{currentUser?.name}</Text>
                    </Text>
                    <Text style={styles.row}>📧 Email:{' '}
                        <Text style={styles.val}>{currentUser?.email}</Text>
                    </Text>
                </SectionCard>

                <SectionCard title="Статистика">
                    <Text style={styles.row}>⭐ Избранных:{' '}
                        <Text style={styles.val}>{favoriteHabitIds.length} привычек</Text>
                    </Text>
                </SectionCard>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Выйти из аккаунта</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:     { flex: 1, backgroundColor: colors.background },
    content:    { padding: spacing.lg, paddingTop: 60, alignItems: 'center' },
    heading:    { fontSize: 24, fontWeight: '700', color: '#fff',
        alignSelf: 'flex-start', marginBottom: spacing.lg },
    avatar:     { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.accent,
        alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
    avatarText: { fontSize: 32, fontWeight: '800', color: '#fff' },
    row:        { fontSize: 15, color: colors.muted, marginBottom: spacing.sm, alignSelf: 'stretch' },
    val:        { color: colors.text, fontWeight: '600' },
    logoutBtn:  { marginTop: spacing.xl, backgroundColor: '#1A1A2E', borderWidth: 1,
        borderColor: '#EF4444', borderRadius: 12, padding: spacing.md,
        alignItems: 'center', width: '100%' },
    logoutText: { color: '#EF4444', fontSize: 15, fontWeight: '700' },
});