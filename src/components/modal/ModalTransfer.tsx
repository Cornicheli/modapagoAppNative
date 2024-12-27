import React, { useEffect, useState } from 'react';
import {
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Divider } from '../Divider';
import { CustomButton } from '../buttons/CustomButton';
import { getBalance } from '@/db/balance';
import { spacingStyle } from '@/themes/spacingStyle';
import { CustomClose } from '../buttons/CustomClose';

export const ModalTransfer = ({
    isClose,
    isVisible,
    photoBrand,
    titleBrand,
}: {
    isClose: () => void;
    isVisible: boolean;
    photoBrand: any;
    titleBrand: string;
}) => {
    const [balance, setBalance] = useState('');

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const data = await getBalance();
                const { in_account } = data;
                setBalance(in_account);
            } catch (error) {
                console.error(error);
                setBalance('Error al obtener balance');
            }
        };
        fetchBalance();
    }, []);

    return (
        <Modal animationType="slide" transparent visible={isVisible}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.button}>
                        <CustomClose handleClose={isClose} />
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Dinero disponible
                        </Text>
                        <Text style={styles.headerBalance}>$ {balance}</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Hacia:</Text>
                            <View style={styles.inputGroupBrand}>
                                <Image
                                    style={{
                                        width: 65,
                                        height: 65,
                                        borderRadius: 100,
                                        marginRight: 15,
                                    }}
                                    source={photoBrand}
                                />
                                <Text>{titleBrand}</Text>
                            </View>
                            <Divider />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>
                                Cantidad a transferir:
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Monto a transferir (ARS)"
                            />
                            <Divider />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Comentario:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Escriba un comentario aquí"
                            />
                            <Divider />
                        </View>
                    </View>

                    <CustomButton
                        title="TRANSFERIR"
                        onPress={() => console.log('Transferencia iniciada')}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        minHeight: 450,
        borderRadius: 4,
        padding: 20,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        alignSelf: 'flex-start',
        paddingHorizontal: 0.5,
    },
    header: {
        alignItems: 'center',
        width: '100%',
        marginVertical: spacingStyle.small,
        padding: spacingStyle.medium,
        backgroundColor: '#FFF',
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    headerBalance: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#67B367',
    },
    form: {
        justifyContent: 'space-around',
        width: '100%',
        minHeight: 400,
        marginVertical: spacingStyle.large,
        padding: spacingStyle.medium,
        backgroundColor: '#FFF',
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputGroupBrand: {
        alignItems: 'center',
        marginBottom: 15,
        flexDirection: 'row',
        width: '50%',
    },
    inputLabel: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        height: 50,
        paddingLeft: 20,
        paddingTop: 20,
    },
});
