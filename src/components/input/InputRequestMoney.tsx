import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { spacingStyle } from '@/themes/spacingStyle';
import { PropsInput } from '@/interface';

export const InputRequestMoney = ({ title, icon }: PropsInput) => {
    return (
        <View style={styles.contentInput}>
            <View style={styles.contentText}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.icon}>{icon}</Text>
            </View>
            <Text style={styles.title}>0%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        marginVertical: spacingStyle.large,
        backgroundColor: 'white',
    },
    contentInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacingStyle.large,
        marginVertical: spacingStyle.medium,
    },
    contentText: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: spacingStyle.small,
    },
    title: {
        fontSize: 18,
    },
});
