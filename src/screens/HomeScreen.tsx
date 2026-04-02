import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export function HomeScreen() {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>🏠 Главная</Text>
            <Text style={styles.subtitle}>Здесь будет дашборд привычек</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background,
        alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 28, fontWeight: '700', color: '#fff', marginBottom: spacing.sm },
    subtitle: { fontSize: 15, color: '#94A3B8' },
});