import { useAppStore } from '../store/useAppStore';
import { lightColors, darkColors } from './index';

// Хук возвращает актуальную палитру в зависимости от режима темы
export function useAppTheme() {
    const mode = useAppStore((s) => s.themeMode);
    return mode === 'dark' ? darkColors : lightColors;
}