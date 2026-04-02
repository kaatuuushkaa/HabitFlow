import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, spacing } from '../theme';
import { HabitCard } from '../components/HabitCard';
import { habitsList } from '../constants/habits';

type HabitStackParamList = {
    HabitList: undefined;
    HabitDetails: { habitId: string };
};

type NavProp = StackNavigationProp<HabitStackParamList, 'HabitList'>;

export function HabitsScreen() {
    const navigation = useNavigation<NavProp>();

    return (
        <View style={styles.screen}>
            <FlatList
                data={habitsList}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    <Text style={styles.heading}>Мои привычки</Text>
                }
                renderItem={({ item }) => (
                    <HabitCard
                        habit={item}
                        onPress={() =>
                            navigation.navigate('HabitDetails', { habitId: item.id })
                        }
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    list: { padding: spacing.lg, paddingTop: 50 },
    heading: {
        fontSize: 24, fontWeight: '700', color: '#fff',
        marginBottom: spacing.lg,
    },
});