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
}));