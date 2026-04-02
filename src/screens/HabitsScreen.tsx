import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, spacing } from '../theme';
import { HabitCard }       from '../components/HabitCard';
import { habitsList, Habit } from '../constants/habits';
import { api }             from '../services/api';

type NavProp = StackNavigationProp<
    { HabitList: undefined; HabitDetails: { habitId: string } },
    'HabitList'
>;

export function HabitsScreen() {
    const navigation = useNavigation<NavProp>();
    const [habits, setHabits]   = useState<Habit[]>(habitsList);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState('');

    useEffect(() => {
        api.getHabits()
            .then((data) => {
                // Обогащаем данные с сервера цветами из локального списка
                const enriched = habitsList.map((h) => {
                    const remote = data.find((d: any) => d.id === h.id);
                    return remote ? { ...h, ...remote } : h;
                });
                setHabits(enriched);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.accent} />
            <Text style={styles.loadingText}>Загрузка с сервера...</Text>
        </View>
    );

    return (
        <View style={styles.screen}>
            {error ? <Text style={styles.error}>⚠️ {error} (показаны локальные данные)</Text> : null}
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListHeaderComponent={<Text style={styles.heading}>Мои привычки</Text>}
                renderItem={({ item }) => (
                    <HabitCard habit={item}
                               onPress={() => navigation.navigate('HabitDetails', { habitId: item.id })} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen:      { flex: 1, backgroundColor: colors.background },
    center:      { flex: 1, backgroundColor: colors.background,
        alignItems: 'center', justifyContent: 'center' },
    list:        { padding: spacing.lg, paddingTop: 50 },
    heading:     { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: spacing.lg },
    loadingText: { color: colors.muted, marginTop: spacing.md },
    error:       { color: '#F59E0B', fontSize: 12, padding: spacing.md, textAlign: 'center' },
});