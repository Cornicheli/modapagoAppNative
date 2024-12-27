import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { spacingStyle } from '@/themes/spacingStyle';
import { CustomClose } from '../buttons/CustomClose';

interface PropsModalRequestMoney {
    isVisible: boolean;
    onClose: () => void;
}

export const ModalRequestMoney = ({
    isVisible,
    onClose,
}: PropsModalRequestMoney) => {
    return (
        <Modal
            style={styles.modalCentered}
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}>
            <View
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.headerContainer}>
                        <CustomClose handleClose={onClose} />
                        <Text style={styles.titleText}>Importante</Text>
                    </View>

                    <View style={styles.modalContent}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Ionicons
                                name="information-circle"
                                size={175}
                                color="gray"
                            />
                            <Text style={styles.subtitleText}>
                                Tenés 2 extracciones sin cargo por mes
                            </Text>
                            <Text style={styles.subtitleText}>
                                Luego se te cobrará $30 por extracción.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalCentered: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        width: '95%',
        borderRadius: 16,
    },
    modalContent: {
        alignItems: 'center',
        height: 450,
        justifyContent: 'space-around',
        paddingVertical: spacingStyle.medium,
    },
    headerContainer: {
        alignItems: 'center',
        elevation: 5,
        flexDirection: 'row',
        height: 60,
        padding: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        width: '100%',
    },
    headerTitleContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: spacingStyle.large,
    },
    titleText: {
        color: 'gray',
        fontSize: 24,
        paddingHorizontal: spacingStyle.medium,
    },
    subtitleText: {
        color: 'gray',
        fontSize: 20,
        textAlign: 'center',
    },
    actionButton: {
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 16,
        height: 50,
        justifyContent: 'center',
        width: '85%',
        marginBottom: spacingStyle.extraLarge,
    },
    actionButtonText: {
        color: 'white',
        fontSize: 18,
    },
    buttonContainer: {
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
    },
});
