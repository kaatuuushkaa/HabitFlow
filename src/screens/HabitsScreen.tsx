import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, StyleSheet,
    ActivityIndicator, useWindowDimensions,
} from 'react-native';
import { useNavigation }       from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppTheme }         from '../theme/useAppTheme';
import { HabitCard }           from '../components/HabitCard';
import { habitsList, Habit }   from '../constants/habits';
import { api }                 from '../services/api';
import { spacing }             from '../theme';

type NavProp = StackNavigationProp<
    { HabitList: undefined; HabitDetails: { habitId: string } },
    'HabitList'
>;

export function HabitsScreen() {
    const colors           = useAppTheme();
    const { width }        = useWindowDimensions();
    const isTablet         = width >= 768;
    const navigation       = useNavigation<NavProp>();
    const [habits, setHabits]   = useState<Habit[]>(habitsList);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState('');

    useEffect(() => {
        api.getHabits()
            .then((data) => {
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
        <View style={[styles.center, { backgroundColor: colors.background }]}>
            <ActivityIndicator size="large" color={colors.accent} />
            <Text style={[styles.loadingText, { color: colors.muted }]}>
                Загрузка с сервера...
            </Text>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            {error ? (
                <Text style={styles.error}>⚠️ {error} (показаны локальные данные)</Text>
            ) : null}
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[
                    styles.list,
                    isTablet && styles.listWide,
                ]}
                ListHeaderComponent={
                    <Text style={[styles.heading, { color: colors.text }]}>
                        Мои привычки
                    </Text>
                }
                renderItem={({ item }) => (
                    <HabitCard
                        habit={item}
                        onPress={() => navigation.navigate('HabitDetails', { habitId: item.id })}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    center:      { flex: 1, alignItems: 'center', justifyContent: 'center' },
    list:        { padding: spacing.lg, paddingTop: 50 },
    listWide:    { paddingHorizontal: 48, maxWidth: 720, alignSelf: 'center', width: '100%' },
    heading:     { fontSize: 24, fontWeight: '700', marginBottom: spacing.lg },
    loadingText: { marginTop: spacing.md },
    error:       { color: '#F59E0B', fontSize: 12, padding: spacing.md, textAlign: 'center' },
});