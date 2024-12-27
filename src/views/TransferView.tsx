import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal } from 'react-native';
import { CardOptionPay, Divider, InputLocals } from '@/components';
import { Colors } from '@/themes/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { spacingStyle } from '@/themes/spacingStyle';
import { getMostTransfered } from '@/db/balance';
import { ModalPayModatex } from '@/components/modal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@/routes/StackNavigator';
import { CardQr } from '@/components/CardQr';

export const TransferView = () => {
    const [dataFetch, setDataFetch] = useState<any[]>([]);
    const [visibleModalId, setVisibleModalId] = useState<boolean | null>(false);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [openCamera, setOpenCamera] = useState(false);
    const { navigate } = useNavigation<StackNavigationProp<StackParamList>>();

    useEffect(() => {
        const fetchMostTransfered = async () => {
            try {
                const response = await getMostTransfered();
                console.log('view', response?.data);
                setDataFetch(response?.data.brands || []);
            } catch (error) {
                console.log('error');
            }
        };
        fetchMostTransfered();
    }, []);

    return (
        <>
            <ScrollView
                style={{
                    backgroundColor: '#e6e5e5',
                }}>
                <View style={styles.contentOne}>
                    <Text style={styles.subTitle}>
                        ¿ Cómo quiéres enviar el dinero ?
                    </Text>
                </View>
                <View style={styles.contentTwo}>
                    <CardOptionPay
                        logoIcon={
                            <FontAwesome
                                name="qrcode"
                                size={60}
                                color="black"
                            />
                        }
                        onChange={() => {
                            setOpenCamera(true);
                            console.log('onPress Cobrar con Qr');
                        }}
                        title={'Codigo QR'}
                    />
                    <CardOptionPay
                        logoIcon={
                            <MaterialCommunityIcons
                                name="email-open"
                                size={60}
                                color="#eb445a"
                            />
                        }
                        onChange={() => navigate('EmailPayView')}
                        title={'Correo electronico'}
                    />
                    <CardOptionPay
                        onChange={() => console.log(setVisibleModal(true))}
                        icon={require('@/styles/modapagoapp.jpg')}
                        title={'Transferir a Modatex'}
                        logoIcon={undefined}
                    />
                </View>
                <View style={styles.contentThree}>
                    <Text style={styles.title}>Locales concurridos</Text>
                    <Divider />

                    {dataFetch?.length > 0 ? (
                        dataFetch?.map(
                            (balance: { group_name: string; id: string }) => (
                                <InputLocals
                                    key={balance.id}
                                    icon={require('@/styles/logobroken.jpeg')}
                                    title={balance.group_name}
                                    titleInput={'TRANSFERIR'}
                                    onChange={() => setVisibleModalId(true)}
                                />
                            ),
                        )
                    ) : (
                        <Text style={{ textAlign: 'center', fontSize: 22 }}>
                            Cargando datos...
                        </Text>
                    )}

                    <Divider />
                </View>
            </ScrollView>
            <ModalPayModatex
                closeModal={() => setVisibleModal(false)}
                visible={visibleModal}
            />
            <Modal visible={openCamera}>
                <CardQr onChange={() => setOpenCamera(false)} />
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    contentOne: {
        backgroundColor: 'white',
        marginVertical: spacingStyle.small,
        height: 60,
        justifyContent: 'center',
    },
    contentTwo: {
        backgroundColor: 'white',
        flexDirection: 'row',
        marginVertical: spacingStyle.small,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    contentThree: {
        backgroundColor: 'white',
        marginVertical: spacingStyle.small,
        paddingVertical: spacingStyle.small,
    },
    button: {
        alignItems: 'center',
        backgroundColor: Colors.colorModapagoBase,
        borderRadius: 8,
        flexDirection: 'row',
        fontSize: 18,
        height: 35,
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        width: 145,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: spacingStyle.large,
        paddingVertical: spacingStyle.medium,
    },
    subTitle: {
        fontSize: 22,
        padding: spacingStyle.small,
        textAlign: 'center',
    },
    titleButton: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    titleStore: {
        fontSize: 18,
        color: 'grey',
    },
});
