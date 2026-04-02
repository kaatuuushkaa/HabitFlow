import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../theme';

type Props = {
    label: string;
    onPress: () => void;
};

export function PrimaryButton({ label, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.accent,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: radii.lg,
        alignItems: 'center',
        marginTop: spacing.lg,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});