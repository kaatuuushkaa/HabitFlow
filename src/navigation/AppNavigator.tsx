import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator }    from '@react-navigation/stack';
import { HomeScreen }         from '../screens/HomeScreen';
import { HabitsScreen }       from '../screens/HabitsScreen';
import { HabitDetailsScreen } from '../screens/HabitDetailsScreen';
import { AddHabitScreen }     from '../screens/AddHabitScreen';
import { ProfileScreen }      from '../screens/ProfileScreen';
import { LoginScreen }        from '../screens/LoginScreen';
import { RegisterScreen }     from '../screens/RegisterScreen';
import { colors }      from '../theme';
import { useAppStore } from '../store/useAppStore';

const Tab          = createBottomTabNavigator();
const HabitStack   = createStackNavigator();
const ProfileStack = createStackNavigator();

const stackOpts = {
    headerStyle: { backgroundColor: colors.surface },
    headerTintColor: colors.text,
    headerTitleStyle: { fontWeight: '700' as const },
};

function HabitStackNavigator() {
    return (
        <HabitStack.Navigator screenOptions={stackOpts}>
            <HabitStack.Screen name="HabitList"    component={HabitsScreen}
                               options={{ headerShown: false }} />
            <HabitStack.Screen name="HabitDetails" component={HabitDetailsScreen}
                               options={{ title: 'Детали привычки' }} />
        </HabitStack.Navigator>
    );
}

// Умная навигация: показывает Профиль или Вход/Регистрацию
function ProfileStackNavigator() {
    const currentUser = useAppStore((s) => s.currentUser);
    return (
        <ProfileStack.Navigator screenOptions={stackOpts}>
            {currentUser ? (
                <ProfileStack.Screen name="ProfileOverview" component={ProfileScreen}
                                     options={{ title: 'Профиль' }} />
            ) : (
                <>
                    <ProfileStack.Screen name="Login"    component={LoginScreen}
                                         options={{ title: 'Вход' }} />
                    <ProfileStack.Screen name="Register" component={RegisterScreen}
                                         options={{ title: 'Регистрация' }} />
                </>
            )}
        </ProfileStack.Navigator>
    );
}

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border,
                    height: 72, paddingBottom: 12, paddingTop: 10 },
                tabBarActiveTintColor: colors.accent,
                tabBarInactiveTintColor: colors.muted,
                tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
                tabBarIcon: () => null,
            }}>
                <Tab.Screen name="Home"       component={HomeScreen}           options={{ title: 'Главная'    }} />
                <Tab.Screen name="HabitsTab"  component={HabitStackNavigator}  options={{ title: 'Привычки'   }} />
                <Tab.Screen name="Add"        component={AddHabitScreen}       options={{ title: '+ Добавить' }} />
                <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} options={{ title: 'Профиль'   }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}