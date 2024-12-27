import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { spacingStyle } from '@/themes/spacingStyle';
import { PropsCard } from '@/interface';

export const CardServices = ({ icon, title }: PropsCard) => {
    return (
        <TouchableOpacity style={styles.contentService}>
            <Image
                style={styles.serviceIcon}
                source={{
                    uri: icon,
                }}
            />
            <Text style={styles.titleService}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contentService: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f5f8',
        borderRadius: 8,
        height: 160,
        width: 160,
        margin: 10,
        //android
        elevation: 5,
        //ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    serviceIcon: {
        width: 60,
        height: 60,
        borderRadius: 100,
        marginBottom: spacingStyle.small,
    },
    titleService: {
        fontSize: 24,
        marginTop: spacingStyle.small,
    },
});
