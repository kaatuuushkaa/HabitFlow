// Все цвета, отступы и размеры шрифтов приложения
export const colors = {
    background: '#0F172A',   // тёмно-синий фон
    surface: '#1E293B',      // поверхность карточек
    accent: '#6366F1',       // фиолетовый акцент
    accentLight: '#818CF8',  // светлее для hover
    text: '#F8FAFC',         // основной текст
    muted: '#94A3B8',        // приглушённый текст
    success: '#22C55E',      // зелёный (выполнено)
    border: '#334155',       // граница
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

export const radii = {
    sm: 8,
    md: 12,
    lg: 20,
};

export const typography = {
    title: { fontSize: 28, fontWeight: '700' as const, color: colors.text },
    subtitle: { fontSize: 18, fontWeight: '600' as const, color: colors.text },
    body: { fontSize: 15, color: colors.muted },
    caption: { fontSize: 13, color: colors.muted },
};

// Конфигурация приложения
export const appConfig = {
    appName: 'HabitFlow',
    tagline: 'Отслеживание привычек и целей',
    description:
        'Приложение помогает формировать полезные привычки, ставить цели, ' +
        'отслеживать прогресс и получать мотивацию каждый день.',
    ctaLabel: 'Начать →',
};

export const lightColors = {
    background: '#F8FAFC',
    surface:    '#FFFFFF',
    accent:     '#6366F1',
    accentLight:'#818CF8',
    text:       '#0F172A',
    muted:      '#64748B',
    success:    '#22C55E',
    border:     '#E2E8F0',
};

export const darkColors = {
    background: '#0F172A',
    surface:    '#1E293B',
    accent:     '#6366F1',
    accentLight:'#818CF8',
    text:       '#F8FAFC',
    muted:      '#94A3B8',
    success:    '#22C55E',
    border:     '#334155',
};

export type ThemeColors = typeof darkColors;