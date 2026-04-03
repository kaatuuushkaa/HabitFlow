import { create } from 'zustand';

export type UserProfile = {
    id: string;
    name: string;
    email: string;
};

type AppState = {
    currentUser:      UserProfile | null;
    favoriteHabitIds: string[];
    setCurrentUser: (user: UserProfile | null) => void;
    logout:         () => void;
    toggleFavorite: (habitId: string) => void;
    avatarUri: string | null;
    setAvatarUri: (uri: string | null) => void;
    themeMode:   'light' | 'dark';
    toggleTheme: () => void;
};

export const useAppStore = create<AppState>((set) => ({
    currentUser:      null,
    favoriteHabitIds: [],

    setCurrentUser: (user) => set({ currentUser: user }),

    logout: () => set({ currentUser: null, favoriteHabitIds: [] }),

    toggleFavorite: (habitId) =>
        set((state) => ({
            favoriteHabitIds: state.favoriteHabitIds.includes(habitId)
                ? state.favoriteHabitIds.filter((id) => id !== habitId)
                : [...state.favoriteHabitIds, habitId],
        })),
    avatarUri: null,
    setAvatarUri: (uri) => set({ avatarUri: uri }),
    themeMode:   'dark',  // по умолчанию тёмная (уже привычная)
    toggleTheme: () => set((s) => ({
        themeMode: s.themeMode === 'dark' ? 'light' : 'dark',
    })),
}));