// Тип одной привычки
export type Habit = {
    id: string;
    title: string;
    description: string;
    category: string;
    frequency: string;
    streak: number;
    isActive: boolean;
    color: string;
};

// Тестовые данные — 8 привычек
export const habitsList: Habit[] = [
    {
        id: '1',
        title: 'Утренняя зарядка',
        description: 'Лёгкая разминка 15 минут сразу после подъёма. Запускает метаболизм и даёт энергию на день.',
        category: 'Здоровье',
        frequency: 'Ежедневно',
        streak: 12,
        isActive: true,
        color: '#22C55E',
    },
    {
        id: '2',
        title: 'Чтение книг',
        description: 'Читать минимум 20 страниц в день. Развивает мышление и расширяет словарный запас.',
        category: 'Обучение',
        frequency: 'Ежедневно',
        streak: 7,
        isActive: true,
        color: '#6366F1',
    },
    {
        id: '3',
        title: 'Медитация',
        description: 'Медитация 10 минут перед сном. Снижает стресс и улучшает качество сна.',
        category: 'Здоровье',
        frequency: 'Ежедневно',
        streak: 5,
        isActive: true,
        color: '#8B5CF6',
    },
    {
        id: '4',
        title: 'Иностранный язык',
        description: 'Заниматься английским 30 минут в день через приложение или учебник.',
        category: 'Обучение',
        frequency: 'Ежедневно',
        streak: 21,
        isActive: true,
        color: '#F59E0B',
    },
    {
        id: '5',
        title: 'Стакан воды утром',
        description: 'Выпивать стакан воды сразу после пробуждения. Запускает работу организма.',
        category: 'Здоровье',
        frequency: 'Ежедневно',
        streak: 30,
        isActive: true,
        color: '#06B6D4',
    },
    {
        id: '6',
        title: 'Планирование дня',
        description: 'Записывать 3 главные задачи на день каждое утро. Повышает продуктивность.',
        category: 'Продуктивность',
        frequency: 'По будням',
        streak: 9,
        isActive: true,
        color: '#EC4899',
    },
    {
        id: '7',
        title: 'Прогулка на улице',
        description: 'Прогулка не менее 30 минут на свежем воздухе. Улучшает настроение и здоровье.',
        category: 'Здоровье',
        frequency: 'Ежедневно',
        streak: 3,
        isActive: false,
        color: '#84CC16',
    },
    {
        id: '8',
        title: 'Дневник благодарности',
        description: 'Записывать 3 вещи, за которые благодарен сегодня. Формирует позитивное мышление.',
        category: 'Саморазвитие',
        frequency: 'Ежедневно',
        streak: 14,
        isActive: true,
        color: '#F97316',
    },
];