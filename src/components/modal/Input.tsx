import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

interface InputProps {
    ownerName: string;
    bank: string;
    cbu: string;
    onChange: any;
}

export const Input = ({ ownerName, bank, cbu, onChange }: InputProps) => {
    return (
        <TouchableOpacity style={styles.touchableContainer} onPress={onChange} >
            <Text style={styles.ownerNameText}>
                {ownerName}
            </Text>

            <View style={styles.rowContainer}>
                <Text style={styles.labelText}>
                    Banco:
                </Text>
                <Text style={styles.valueText}>
                    {' '}{bank}
                </Text>
            </View>

            <View style={styles.rowContainer}>
                <Text style={styles.labelText}>
                    CBU :
                </Text>
                <Text style={styles.valueText}>
                    {' '}{cbu}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchableContainer: {
        paddingHorizontal: 12,
        marginVertical: 12,
    },
    ownerNameText: {
        fontSize: 16,
        fontWeight: '600',
    },
    rowContainer: {
        flexDirection: 'row',
        display: 'flex',
        marginVertical: 2,
    },
    labelText: {
        fontWeight: '500',
        color: '#666666',
    },
    valueText: {
        // Este estilo actualmente está vacío, pero lo dejo por si planeas agregar algo más adelante
    },
});
