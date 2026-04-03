import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useAppStore }           from '../store/useAppStore';
import { useAppTheme }           from '../theme/useAppTheme';
import { SectionCard }           from '../components/SectionCard';
import { pickAvatarFromLibrary } from '../services/device';
import { spacing, radii }        from '../theme';

export function ProfileScreen() {
    const currentUser      = useAppStore((s) => s.currentUser);
    const favoriteHabitIds = useAppStore((s) => s.favoriteHabitIds);
    const logout           = useAppStore((s) => s.logout);
    const avatarUri        = useAppStore((s) => s.avatarUri);
    const setAvatarUri     = useAppStore((s) => s.setAvatarUri);
    const toggleTheme      = useAppStore((s) => s.toggleTheme);
    const themeMode        = useAppStore((s) => s.themeMode);
    const colors           = useAppTheme();

    const handlePickAvatar = async () => {
        try {
            const uri = await pickAvatarFromLibrary();
            if (uri) setAvatarUri(uri);
        } catch (e) {
            Alert.alert('Ошибка', e instanceof Error ? e.message : 'Не удалось открыть галерею.');
        }
    };

    const handleLogout = () => {
        Alert.alert('Выйти?', 'Ты выйдешь из аккаунта.', [
            { text: 'Отмена', style: 'cancel' },
            { text: 'Выйти', style: 'destructive', onPress: logout },
        ]);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.heading, { color: colors.text }]}>Профиль</Text>

                {/* Аватар — нажать чтобы выбрать фото */}
                <TouchableOpacity onPress={handlePickAvatar} style={styles.avatarWrapper}>
                    {avatarUri ? (
                        <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
                    ) : (
                        <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
                            <Text style={styles.avatarText}>
                                {currentUser?.name[0].toUpperCase() ?? '?'}
                            </Text>
                        </View>
                    )}
                    <Text style={[styles.avatarHint, { color: colors.muted }]}>Выбрать фото</Text>
                </TouchableOpacity>

                <SectionCard title="Данные аккаунта">
                    <Text style={[styles.row, { color: colors.muted }]}>
                        👤 Имя: <Text style={{ color: colors.text, fontWeight: '600' }}>{currentUser?.name}</Text>
                    </Text>
                    <Text style={[styles.row, { color: colors.muted }]}>
                        📧 Email: <Text style={{ color: colors.text, fontWeight: '600' }}>{currentUser?.email}</Text>
                    </Text>
                </SectionCard>

                <SectionCard title="Статистика">
                    <Text style={[styles.row, { color: colors.muted }]}>
                        ⭐ Избранных: <Text style={{ color: colors.text, fontWeight: '600' }}>{favoriteHabitIds.length} привычек</Text>
                    </Text>
                </SectionCard>

                {/* Переключатель темы (ПР11) */}
                <TouchableOpacity
                    style={[styles.themeBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
                    onPress={toggleTheme}
                >
                    <Text style={{ color: colors.text, fontSize: 15, fontWeight: '600' }}>
                        {themeMode === 'dark' ? '☀️  Светлая тема' : '🌙  Тёмная тема'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.logoutBtn, { borderColor: '#EF4444' }]}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Выйти из аккаунта</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content:       { padding: spacing.lg, paddingTop: 60, alignItems: 'center' },
    heading:       { fontSize: 24, fontWeight: '700', alignSelf: 'flex-start', marginBottom: spacing.lg },
    avatarWrapper: { alignItems: 'center', marginBottom: spacing.lg },
    avatar:        { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
    avatarImg:     { width: 80, height: 80, borderRadius: 40 },
    avatarText:    { fontSize: 32, fontWeight: '800', color: '#fff' },
    avatarHint:    { fontSize: 12, marginTop: 6 },
    row:           { fontSize: 15, marginBottom: spacing.sm, alignSelf: 'stretch' },
    themeBtn:      { width: '100%', borderWidth: 1, borderRadius: radii.md,
        padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
    logoutBtn:     { marginTop: spacing.md, backgroundColor: '#1A1A2E', borderWidth: 1,
        borderRadius: radii.md, padding: spacing.md, alignItems: 'center', width: '100%' },
    logoutText:    { color: '#EF4444', fontSize: 15, fontWeight: '700' },
});