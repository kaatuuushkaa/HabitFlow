import AsyncStorage from '@react-native-async-storage/async-storage';

const HABIT_DRAFT_KEY = 'habitflow.habitDraft';

export type HabitDraft = {
    title: string;
    description: string;
    email: string;
    phone: string;
};

// Сохранить черновик
export async function saveHabitDraft(draft: HabitDraft) {
    await AsyncStorage.setItem(HABIT_DRAFT_KEY, JSON.stringify(draft));
}

// Загрузить черновик (null если нет)
export async function loadHabitDraft(): Promise<HabitDraft | null> {
    const raw = await AsyncStorage.getItem(HABIT_DRAFT_KEY);
    return raw ? (JSON.parse(raw) as HabitDraft) : null;
}

// Очистить черновик
export async function clearHabitDraft() {
    await AsyncStorage.removeItem(HABIT_DRAFT_KEY);
}