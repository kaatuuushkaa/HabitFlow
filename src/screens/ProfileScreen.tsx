import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export function ProfileScreen() {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>👤 Профиль</Text>
            <Text style={styles.subtitle}>Иванов Иван Иванович</Text>
            <Text style={styles.muted}>Привычек активно: 5</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background,
        alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 28, fontWeight: '700', color: '#fff', marginBottom: spacing.sm },
    subtitle: { fontSize: 16, color: '#fff', marginBottom: 4 },
    muted: { fontSize: 14, color: '#94A3B8' },
});