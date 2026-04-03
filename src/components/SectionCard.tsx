import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';
import { spacing, radii } from '../theme';

type Props = { title: string; children: React.ReactNode };

export function SectionCard({ title, children }: Props) {
    const colors = useAppTheme();
    return (
        <View style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
        ]}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card:  {
        borderRadius: radii.md, padding: spacing.md,
        marginBottom: spacing.md, borderWidth: 1,
    },
    title: { fontSize: 16, fontWeight: '700', marginBottom: spacing.sm },
});