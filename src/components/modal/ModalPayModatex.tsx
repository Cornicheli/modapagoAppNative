import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { spacingStyle } from '@/themes/spacingStyle';
import { Colors } from '@/themes/colors';
import { Divider } from '../Divider';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import { getBalance } from '@/db/balance';
import { CustomClose } from '../buttons/CustomClose';

interface PropsModalPayModatex {
    closeModal: () => void;
    visible: boolean;
}

export const ModalPayModatex = ({
    closeModal,
    visible,
}: PropsModalPayModatex) => {
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
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            style={{
                justifyContent: 'center',
                alignContent: 'center',
            }}>
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <View style={styles.contentContainer}>
                    <View style={styles.header}>
                        <CustomClose handleClose={closeModal} />
                        <Text style={styles.headerTitle}>Revisa los datos</Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.availableBalanceSection}>
                            <Text style={styles.sectionTitle}>
                                Dinero disponible
                            </Text>
                            <Text style={styles.balanceAmount}>
                                $ {balance}
                            </Text>
                        </View>
                        <Divider />

                        <View style={styles.destinationAccountSection}>
                            <Text style={styles.sectionTitle}>
                                Cuenta a destino
                            </Text>
                            <View style={styles.accountInfo}>
                                <Image
                                    style={styles.accountImage}
                                    source={require('@/styles/modapagoapp.jpg')}
                                />
                                <View style={styles.accountDetails}>
                                    <Text style={styles.accountTitle}>
                                        Transferir directo a Modatex
                                    </Text>
                                    <Text style={styles.accountSubtitle}>
                                        A cuenta Modatex
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <Divider />

                        <View style={styles.inputSection}>
                            <Text style={styles.sectionTitle}>
                                Ingresa el monto a transferir
                            </Text>
                            <TextInput
                                placeholder="$ 0"
                                style={styles.inputField}
                            />
                        </View>
                        <Divider />

                        <View style={styles.inputSection}>
                            <Text style={styles.sectionTitle}>
                                Ingresa un comentario
                            </Text>
                            <TextInput
                                placeholder="Opcional"
                                style={styles.inputField}
                            />
                        </View>
                        <Divider />
                    </View>

                    <Pressable
                        style={styles.transferButton}
                        onPress={closeModal}>
                        <Text style={styles.buttonText}>Transferir</Text>
                        <AntDesign name="arrowright" size={22} color="white" />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'relative',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height: '100%',
        justifyContent: 'center',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center', // Add this to center horizontally
        backgroundColor: 'white',
        borderRadius: 24,
        minHeight: 500,
        padding: spacingStyle.medium,
        position: 'absolute',
        top: '50%',
        left: '50%', // Add this
        transform: [{ translateX: -185 }, { translateY: -250 }], // Adjust based on half the width and height
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        width: 370,
    },
    header: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    closeButton: {
        height: 35,
        width: 35,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        marginTop: spacingStyle.large,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
    availableBalanceSection: {
        height: 75,
        justifyContent: 'center',
    },
    balanceAmount: {
        color: '#2DD36F',
        fontSize: 22,
        fontWeight: '700',
    },
    destinationAccountSection: {
        height: 125,
        justifyContent: 'space-around',
    },
    accountInfo: {
        flexDirection: 'row',
        height: 75,
        alignItems: 'center',
    },
    accountImage: {
        borderRadius: 100,
        height: 45,
        marginRight: spacingStyle.medium,
        width: 45,
    },
    accountDetails: {
        flexDirection: 'column',
        height: 60,
        justifyContent: 'space-around',
    },
    accountTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    accountSubtitle: {
        fontSize: 18,
    },
    inputSection: {
        // height: 75,
        justifyContent: 'space-around',
        marginVertical: spacingStyle.medium,
    },
    inputField: {
        fontSize: 18,
    },
    buttonContainer: {
        alignItems: 'center',
        height: 100,
        justifyContent: 'center',
        width: '100%',
    },
    transferButton: {
        alignItems: 'center',
        backgroundColor: Colors.colorModapagoBase,
        borderRadius: 12,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        width: '85%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginRight: spacingStyle.small,
    },
});
