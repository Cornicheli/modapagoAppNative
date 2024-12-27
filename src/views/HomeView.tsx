import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Alert,
    BackHandler,
} from 'react-native';
import {
    CardHome,
    CardOptionPay,
    Coupon,
    ModalDetailDiscount,
} from '@/components';
import {
    useFocusEffect,
    useNavigation,
    useNavigationState,
} from '@react-navigation/native';
import { Colors } from '@/themes/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StackParamList } from '@/routes/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { getBalance } from '@/db/balance';
import { spacingStyle } from '@/themes/spacingStyle';
import { Skeleton } from 'moti/skeleton';
import { CardQr } from '../components/CardQr';
import { getDiscount } from '@/db/discounts';
import { proceedToTransaction } from '@/db/transference';

export const HomeView = () => {
    const [balance, setBalance] = useState<string | null>('');
    const [discount, setDiscount] = useState<any>();
    const [openCamera, setOpenCamera] = useState(false);
    const [couponDetail, setCouponDetail] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [toTransaction, setToTransaction] = useState<any>([]);
    const { navigate } = useNavigation<StackNavigationProp<StackParamList>>();

    const routeName = useNavigationState((state:any) => {
        const currentRoute = state.routes[state.index];
        if (currentRoute.state) {
            return currentRoute.state && currentRoute.state.routes[currentRoute.state.index]?.name;
        }
        return currentRoute.name;
    });

    const name = useNavigationState(states => states.routes);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const data = await getBalance();
                const { in_account } = data;
                setBalance(in_account);
            } catch (error) {
                console.log(error);
                setBalance('Error fetching balancee');
            }
        };
        fetchBalance();
    }, []);

    useEffect(() => {
        const fecthDiscount = async () => {
            try {
                const response = await getDiscount();
                const { brands } = response;
                const limitedCoupons = Object.values(brands);
                setCouponDetail(limitedCoupons);
                setDiscount(limitedCoupons);
            } catch (error) {
                console.log(error);
            }
        };
        fecthDiscount();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                if (routeName === 'Home') {
                    Alert.alert(
                        'Cerrar aplicación',
                        '¿Estás seguro de que deseas salir?',
                        [
                            { text: 'Cancelar', style: 'cancel' },
                            {
                                text: 'Salir',
                                onPress: () => BackHandler.exitApp(),
                            },
                        ],
                        { cancelable: true },
                    );
                    return true;
                } else {
                    return false;
                }
            };
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );
            return () => backHandler.remove();
        }, [routeName]),
    );

    useEffect(() => {
        const fetchToTransaction = async () => {
            try {
                const response = await proceedToTransaction();
                const { brand } = response;
                setToTransaction(Object.values([brand]));
            } catch (error) {
                console.log(error);
            }
        };
        fetchToTransaction();
    }, []);

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <ScrollView style={{ backgroundColor: '#e6e5e5' }}>
            <TouchableOpacity
                style={styles.headerContainer}
                onPress={() => navigate('BalanceView')}>
                <Text style={styles.title} numberOfLines={2}>
                    Mi dinero en ModaPago
                </Text>
                <FontAwesome
                    style={styles.contentArrow}
                    name="angle-right"
                    size={35}
                    color="grey"
                />
                {balance ? (
                    <View style={styles.contentCash}>
                        <Text style={styles.titleCash}>$ {balance?.[0]}</Text>
                        <Text style={styles.titleCashFloat}>
                            {balance?.[1]}
                        </Text>
                    </View>
                ) : (
                    <Text  style={{
                        textAlign: 'center',
                        fontSize: 24,
                    }}>Cargando...</Text>
                    // <Skeleton colorMode={'light'} width={250} height={50} />
                )}
            </TouchableOpacity>

            <View style={styles.contentBox}>
                <Text style={styles.subTitle}>Hola Modatex admin</Text>
                <View style={styles.contentButton}>
                    <CardHome
                        logoIcon={
                            <FontAwesome
                                name="qrcode"
                                size={40}
                                color="white"
                            />
                        }
                        title={'Cobrar con Qr'}
                        onChange={() => navigate('QrCharge')}
                    />
                    <CardHome
                        logoIcon={
                            <FontAwesome name="bank" size={35} color="white" />
                        }
                        title={'Retirar dinero'}
                        onChange={() => navigate('RequestMoneyScreen')}
                    />
                    <CardHome
                        logoIcon={
                            <FontAwesome6
                                name="money-bill-transfer"
                                size={35}
                                color="white"
                            />
                        }
                        title={'Transferir dinero'}
                        onChange={() => navigate('TransferView')}
                    />
                </View>
            </View>
            <View style={styles.contentBox}>
                <Text style={styles.subTitle}>
                    Podes pagar con estas opciones:
                </Text>
                <View style={{ flex: 1 }}>
                    <View style={styles.contentButton1}>
                        <CardOptionPay
                            title="Codigo QR"
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
                        />
                        <CardOptionPay
                            title="Correo Electronico"
                            logoIcon={
                                <MaterialCommunityIcons
                                    name="email-open"
                                    size={60}
                                    color="#eb445a"
                                />
                            }
                            onChange={() => {
                                navigate('EmailPayView');
                                console.log('onPress Cobrar con Email');
                            }}
                        />
                    </View>
                </View>
            </View>
            <Modal visible={openCamera}>
                <CardQr onChange={() => setOpenCamera(false)} />
            </Modal>
            <View style={styles.contentBox}>
                <Text style={styles.subTitle}>
                    Pagá con QR en tus locales favoritos:
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    {discount &&
                        discount.slice(0, 2).map(
                            (
                                coupon: {
                                    local: { name: string; address: string };
                                    discount: { percentage: string };
                                },
                                index: string | number | undefined,
                            ) => (
                                <Coupon
                                    key={index}
                                    title={
                                        coupon?.local?.name ||
                                        'Nombre no disponible'
                                    }
                                    titleDiscount={`%${coupon?.discount?.percentage || 'Descuento no disponible'}`}
                                    titleDirrection={
                                        coupon?.local?.address ||
                                        'Dirección no disponible'
                                    }
                                    onChange={() => {
                                        setIsModalVisible(true);
                                    }}
                                />
                            ),
                        )}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    {discount &&
                        discount.slice(0, 2).map(
                            (
                                coupon: {
                                    local: { name: string; address: string };
                                    discount: { percentage: string };
                                },
                                index: string | number | undefined,
                            ) => (
                                <Coupon
                                    key={index}
                                    title={
                                        coupon?.local?.name ||
                                        'Nombre no disponible'
                                    }
                                    titleDiscount={`%${coupon?.discount?.percentage || 'Descuento no disponible'}`}
                                    titleDirrection={
                                        coupon?.local?.address ||
                                        'Dirección no disponible'
                                    }
                                    onChange={() => {
                                        setIsModalVisible(true);
                                    }}
                                />
                            ),
                        )}
                </View>
                <TouchableOpacity
                    style={styles.contentButtonDiscount}
                    onPress={() => navigate('DiscountScreen')}>
                    <Text style={styles.titleButtonDiscount}>
                        Ver mas descuentos
                    </Text>
                    <FontAwesome name="angle-right" size={30} color="#50c8ff" />
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
            <ModalDetailDiscount
                nameLocal={(couponDetail && couponDetail[0]?.local?.name) || ''}
                addressLocal={
                    (couponDetail && couponDetail[0]?.local?.address) || ''
                }
                percentajeLocal={
                    (couponDetail && couponDetail[0]?.discount?.percentage) ||
                    ''
                }
                topeLocal={
                    (couponDetail && couponDetail[0]?.discount?.max_price) || ''
                }
                visible={isModalVisible}
                keyModal={(couponDetail && couponDetail[0]?.local?.id) || ''}
                closeModal={handleModalClose}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.colorModapagoBase,
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 235,
    },
    title: {
        color: Colors.colorModapagoContrast,
        fontSize: 34,
        fontWeight: 'bold',
        marginTop: spacingStyle.medium,
        position: 'relative',
        textAlign: 'center',
        width: '50%',
    },
    contentArrow: {
        position: 'absolute',
        right: 30,
        top: '50%',
    },
    contentCash: {
        width: '100%',
        alignItems: 'center',
    },
    titleCash: {
        color: Colors.colorModapagoContrast,
        position: 'relative',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 34,
        marginBottom: spacingStyle.medium,
    },
    titleCashFloat: {
        position: 'absolute',
        color: Colors.colorModapagoContrast,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        top: -10,
        right: 100,
    },
    contentBox: {
        height: 'auto',
        marginVertical: spacingStyle.large,
        backgroundColor: 'white',
    },
    subTitle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 28,
    },
    contentButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contentButton1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    contentButtonDiscount: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: spacingStyle.medium,
    },
    titleButtonDiscount: {
        color: '#50c8ff',
        fontSize: 24,
    },
});
