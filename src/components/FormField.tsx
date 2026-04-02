import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, spacing, radii } from '../theme';

type Props = TextInputProps & {
    label: string;
    error?: string;
};

export function FormField({ label, error, multiline, ...rest }: Props) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    multiline ? styles.inputMultiline : null,
                    error ? styles.inputError : null,
                ]}
                placeholderTextColor={colors.muted}
                multiline={multiline === true}
                {...rest}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper:        { marginBottom: spacing.md },
    label:          { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 6 },
    input: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.sm,
        padding: spacing.md,
        color: colors.text,
        fontSize: 15,
    },
    inputMultiline: { minHeight: 80, textAlignVertical: 'top' },
    inputError:     { borderColor: '#EF4444' },
    error:          { fontSize: 12, color: '#EF4444', marginTop: 4 },
});