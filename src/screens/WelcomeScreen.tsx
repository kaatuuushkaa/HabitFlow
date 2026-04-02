import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing, appConfig } from '../theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionCard } from '../components/SectionCard';

export function WelcomeScreen() {
    const handlePress = () => {
        Alert.alert('HabitFlow', 'Базовый экран приложения готов к использованию.');
    };

    return (
        <View style={styles.screen}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.content}>

                {/* Заголовок */}
                <View style={styles.hero}>
                    <Text style={styles.title}>{appConfig.appName}</Text>
                    <Text style={styles.tagline}>{appConfig.tagline}</Text>
                    <Text style={styles.description}>{appConfig.description}</Text>
                    <PrimaryButton label={appConfig.ctaLabel} onPress={handlePress} />
                </View>

                {/* Информация о функционале */}
                <SectionCard title="Что умеет приложение">
                    <Text style={styles.feature}>✓  Добавлять привычки с описанием</Text>
                    <Text style={styles.feature}>✓  Отслеживать серию выполнения</Text>
                    <Text style={styles.feature}>✓  Просматривать детали каждой привычки</Text>
                    <Text style={styles.feature}>✓  Настраивать профиль пользователя</Text>
                </SectionCard>

                {/* Информация об архитектуре */}
                <SectionCard title="Архитектура проекта">
                    <Text style={styles.feature}>📁  src/screens — экраны</Text>
                    <Text style={styles.feature}>📁  src/components — компоненты</Text>
                    <Text style={styles.feature}>📁  src/theme — стили и цвета</Text>
                    <Text style={styles.feature}>📁  src/navigation — навигация</Text>
                </SectionCard>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: spacing.lg,
        paddingTop: 60,
    },
    hero: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    title: {
        fontSize: 38,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 1,
    },
    tagline: {
        fontSize: 16,
        color: '#818CF8',
        marginTop: spacing.sm,
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    description: {
        fontSize: 15,
        color: '#94A3B8',
        textAlign: 'center',
        lineHeight: 22,
    },
    feature: {
        fontSize: 14,
        color: '#94A3B8',
        marginBottom: 6,
    },
});