import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { spacingStyle } from '@/themes/spacingStyle';
import { PropsCardMoney } from '@/interface';

export const CardRequestMoney = ({
    title,
    titleNumber,
    titleNumberColor,
}: PropsCardMoney) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={[styles.titleNumber, { color: titleNumberColor }]}>
                $ {titleNumber}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
    },
    title: {
        fontSize: 22,
    },
    titleNumber: {
        fontSize: 22,
        fontWeight: '500',
    },
});
