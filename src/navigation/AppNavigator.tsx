import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { HabitsScreen } from '../screens/HabitsScreen';
import { HabitDetailsScreen } from '../screens/HabitDetailsScreen';
import { AddHabitScreen } from '../screens/AddHabitScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme';

// Типы маршрутов
type RootTabsParamList = {
    Home: undefined;
    HabitsTab: undefined;
    Add: undefined;
    Profile: undefined;
};

type HabitStackParamList = {
    HabitList: undefined;
    HabitDetails: { habitId: string };
};

const Tab = createBottomTabNavigator<RootTabsParamList>();
const HabitStack = createStackNavigator<HabitStackParamList>();

// Вложенный стек для раздела "Привычки"
function HabitStackNavigator() {
    return (
        <HabitStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: colors.surface },
                headerTintColor: colors.text,
                headerTitleStyle: { fontWeight: '700' },
            }}
        >
            <HabitStack.Screen
                name="HabitList"
                component={HabitsScreen}
                options={{ headerShown: false }}
            />
            <HabitStack.Screen
                name="HabitDetails"
                component={HabitDetailsScreen}
                options={{ title: 'Детали привычки' }}
            />
        </HabitStack.Navigator>
    );
}

// Главный навигатор с вкладками
export function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: colors.surface,
                        borderTopColor: colors.border,
                        height: 72,
                        paddingBottom: 12,
                        paddingTop: 10,
                    },
                    tabBarActiveTintColor: colors.accent,
                    tabBarInactiveTintColor: colors.muted,
                    tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
                    tabBarIcon: () => null,
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }} />
                <Tab.Screen name="HabitsTab" component={HabitStackNavigator} options={{ title: 'Привычки' }} />
                <Tab.Screen name="Add" component={AddHabitScreen} options={{ title: '+ Добавить' }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}