import { Platform } from 'react-native';
import { HabitDraft } from './storage';

// На Android-эмуляторе localhost = сам эмулятор, поэтому используем 10.0.2.2
const BASE = Platform.select({
    android: 'http://10.0.2.2:4000/api',
    default: 'http://localhost:4000/api',
});

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE}${path}`, options);
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? 'Ошибка сервера');
    }
    return res.json();
}

export const api = {
    // Привычки
    getHabits: () => request<any[]>('/habits'),
    addHabit:  (data: HabitDraft) => request('/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }),
    // Авторизация
    login: (email: string, password: string) =>
        request<{ id: string; name: string; email: string }>('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }),
    register: (name: string, email: string, password: string) =>
        request<{ id: string; name: string; email: string }>('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        }),
};