import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/themes/colors';
import { PropsCardHome } from '@/interface';

export const CardHome = ({
    logoIcon: logoIcon,
    onChange,
    title,
}: PropsCardHome) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonIcon} onPress={onChange}>
                <View style={styles.icon}>{logoIcon}</View>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 125,
        height: 200,
    },
    buttonIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        alignItems: 'center',
        backgroundColor: Colors.colorModapagoBase,
        borderRadius: 100,
        height: 100,
        width: 100,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
    },
});
