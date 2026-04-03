import { Platform } from 'react-native';

// Проверяем доступность модуля — в Expo Go SDK 53 он ограничен
let Notifications: any = null;

async function getNotifications() {
    if (Notifications) return Notifications;
    try {
        Notifications = await import('expo-notifications');
        return Notifications;
    } catch {
        return null;
    }
}

export async function configureNotifications() {
    const N = await getNotifications();
    if (!N) return; // тихо пропускаем если недоступно

    try {
        if (Platform.OS === 'android') {
            await N.setNotificationChannelAsync('habit-reminders', {
                name: 'Напоминания о привычках',
                importance: N.AndroidImportance.DEFAULT,
            });
        }
        N.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowBanner: true,
                shouldShowList:   true,
                shouldPlaySound:  false,
                shouldSetBadge:   false,
            }),
        });
    } catch {
        // в Expo Go просто игнорируем
    }
}

export async function scheduleHabitReminder(habitTitle: string) {
    const N = await getNotifications();
    if (!N) {
        // В Expo Go показываем Alert вместо уведомления
        const { Alert } = await import('react-native');
        Alert.alert(
            '🔔 Напоминание',
            `Уведомления недоступны в Expo Go.\nПривычка "${habitTitle}" добавлена!`
        );
        return;
    }

    try {
        const perm = await N.requestPermissionsAsync();
        if (!perm.granted) return;

        await N.scheduleNotificationAsync({
            content: {
                title: 'HabitFlow 🌱',
                body:  `Не забудь выполнить: "${habitTitle}"`,
            },
            trigger: {
                seconds: 5,
                type: N.SchedulableTriggerInputTypes.TIME_INTERVAL,
            },
        });
    } catch {
        // тихо игнорируем любую ошибку Expo Go
    }
}