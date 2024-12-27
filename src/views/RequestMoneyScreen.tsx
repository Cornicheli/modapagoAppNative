import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import { CardRequestMoney, Divider } from '@/components';
import { InputRequestMoney } from '@/components/input/InputRequestMoney';
import { Colors } from '@/themes/colors';
import { spacingStyle } from '@/themes/spacingStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ModalRequestMoney } from '@/components/modal';
import { ModalBankAccount } from '@/components/modal/ModalBankAccount';
import { getBalance } from '@/db/balance';


export const RequestMoneyScreen = () => {
    const [showModal, setShowModal] = useState(false)
    const [showModalBankAccount, setShowModalBankAccount] = useState<boolean>(false)
    const [selectedBankAccount, setSelectedBankAccount] = useState<string>('');
    const [inAccount, setInAccount] = useState('');
    const [inAvailable, setInAvailable] = useState('');

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const data = await getBalance();
                const { in_account, available } = data;
                setInAccount(in_account);
                setInAvailable(available);
            } catch (error) {
                console.log(error);
                setInAvailable('Error fetching balancee');
                setInAccount('Error fetching balancee');
            }
        };
        fetchBalance();
    }, []);
    return (
        <>
            <ScrollView
                style={{
                    backgroundColor: '#fffff',
                    padding: spacingStyle.medium,
                    position: 'relative'
                }}>
                <ModalRequestMoney isVisible={showModal} onClose={() => setShowModal(false)} />
                <ModalBankAccount openModal={showModalBankAccount} closeModal={() => setShowModalBankAccount(false)}
                    onSelectAccount={(value: string) => setSelectedBankAccount(value)}
                />

                <View style={styles.contentDinner}>
                    <CardRequestMoney
                        title={'En cuenta'}
                        titleNumber={inAccount}
                        titleNumberColor="#272F4D"
                    />
                    <Divider />
                    <CardRequestMoney
                        title={'Disponible'}
                        titleNumber={inAvailable}
                        titleNumberColor="#67B367"
                    />
                    <Divider />
                    <CardRequestMoney
                        title={'A liberar'}
                        titleNumber="0.00"
                        titleNumberColor="#C56363"
                    />
                </View>
                <View style={styles.content}>

                    <View style={styles.contentTwo}>
                        <View style={{ height: 'auto', padding: spacingStyle.small }}>
                            <Text style={{ fontSize: 22 }}>
                                Ingrese el monto a extraer
                            </Text>
                            <TextInput placeholder='Seleccióne un destino' style={{ color: '#666666', fontSize: 24, fontWeight: 500 }} value='0' />
                            <Divider />
                        </View>

                        <TouchableOpacity style={{ height: 75, padding: spacingStyle.small }} onPress={() => setShowModalBankAccount(true)}>
                            <Text style={{ fontSize: 22 }}>
                                Cuenta a destino
                            </Text>
                            <TextInput placeholder='Seleccióne un destino' style={{ color: '#666666', fontSize: 16, fontWeight: 500 }} value={selectedBankAccount || 'Selecciona una cuenta'} onPress={() => setShowModalBankAccount(true)} editable={false} />
                        </TouchableOpacity>

                        <Divider />
                    </View>

                    <View style={styles.contentThree}>
                        <InputRequestMoney
                            title={'Comision por extracion :'}
                            titleNumber={'100'}
                        />
                        <Divider />
                        <TouchableOpacity
                            onPress={() => {
                                console.log('onPresss');
                            }}>
                            <InputRequestMoney
                                title={'Impuestos credito/debito :'}
                                // icon={
                                //     <Ionicons
                                //         name="information-circle-outline"
                                //         size={18}
                                //         color="black"
                                //     />
                                // }
                                titleNumber={'0%'}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contentPayToyal}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>
                            Subtotal
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>
                            $25.000
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.titleNumber}>CONTINUAR</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: 'violet',
        minHeight: '65%',
    },
    modalContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        width: '100%',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
    },
    contentDinner: {
        backgroundColor: 'white',
        justifyContent: 'center',
        marginVertical: spacingStyle.small,
        paddingHorizontal: spacingStyle.large,
        borderRadius: 4,
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // Sombra para Android
        elevation: 5,
    },
    content: {
        height: 400,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        marginVertical: spacingStyle.large,
        paddingVertical: spacingStyle.medium,
    },
    contentTitle: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: spacingStyle.large,
    },
    contentTwo: {
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        elevation: 5,
        paddingHorizontal: spacingStyle.large,
        borderRadius: 4,
        backgroundColor: 'white',
        minHeight: 200,
    },
    contentThree: {
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        elevation: 5,
        paddingHorizontal: spacingStyle.large,
        paddingVertical: spacingStyle.medium,
        marginTop: spacingStyle.extraLarge,
        borderRadius: 4,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        paddingHorizontal: spacingStyle.large,
    },
    subTitle: {
        alignItems: 'center',
        fontSize: 22,
        padding: spacingStyle.small,
    },
    button: {
        alignItems: 'center',
        backgroundColor: Colors.colorModatexBase,
        height: 60,
        borderRadius: 8,
        justifyContent: 'center',
        marginHorizontal: spacingStyle.large,
        marginBottom: spacingStyle.extraLarge,
    },
    titleNumber: {
        color: 'white',
        fontSize: 22,
    },
    contentPayToyal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        elevation: 5,
        padding: spacingStyle.large,
        marginTop: spacingStyle.extraLarge,
        borderRadius: 4,
        backgroundColor: 'white',
    },
});
