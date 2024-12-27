import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { spacingStyle } from '@/themes/spacingStyle';
import { PropsInputModalFilter } from '@/interface';

export const InputModalfilter = ({
    title,
    onChange,
    selectFilter,
}: PropsInputModalFilter) => {
    return (
        <TouchableOpacity
            onPress={onChange}
            style={styles.content}
            key={selectFilter}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    content: {
        height: 65,
        width: '100%',
        marginHorizontal: spacingStyle.small,
    },
    title: {
        fontSize: 22,
        color: 'black',
        padding: spacingStyle.small,
    },
});
