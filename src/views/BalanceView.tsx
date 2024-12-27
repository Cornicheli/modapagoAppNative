import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CardBalance, InputBalance, ModalDetailTransfer } from '@/components';
import { getHistoryMovements } from '@/db/movements';
import { getBalance } from '@/db/balance';
import { spacingStyle } from '@/themes/spacingStyle';
import { useEffect, useState } from 'react';
import { Skeleton } from 'moti/skeleton';

export const BalanceView = () => {
    const [inAccount, setInAccount] = useState('');
    const [inAvailable, setInAvailable] = useState('');
    const [movements, setMovements] = useState<any>([]);
    const [selectedCoupon, setSelectedCoupon] = useState<any>([]);
    const [movementsDetails, setMovementsDetails] = useState([]);

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

    useEffect(() => {
        const fetchMovents = async () => {
            try {
                const data = await getHistoryMovements();
                const couponsArray = Object.keys(data.coupons).map(
                    key => data.coupons[key],
                );
                setMovements(couponsArray);
            } catch (error) {
                console.log('error move in View : ', error);
            }
        };
        fetchMovents();
    }, []);

    useEffect(() => {
        const fetchMoventsDetails = async () => {
            try {
                const data = await getHistoryMovements();
                const couponsArray = data.coupons.map((coupon: any) => {
                    const { transf_from, transf_to } = coupon;
                    return {
                        ...coupon,
                        transf_from,
                        transf_to,
                    };
                });
                setMovementsDetails(couponsArray);
            } catch (error) {
                console.log('error move in View : ', error);
            }
        };
        fetchMoventsDetails();
    }, []);

    const handleOpenModal = (id: string) => {
        const coupon = movements.find((coupon: any) => coupon.id === id);
        setSelectedCoupon([coupon]);
    };

    const handleCloseModal = () => {
        setSelectedCoupon('');
    };

    return (
        <ScrollView>
            <View style={styles.contentFirst}>
                <CardBalance
                    title={'En Cuenta'}
                    colorTitleValue="#262f4d"
                    titleValue={
                        inAvailable ? (
                            inAvailable
                        ) : (
                            <Text>Cargando...</Text>
                            // <Skeleton
                            //     radius={4}
                            //     colorMode={'light'}
                            //     width={150}
                            //     height={30}
                            // />
                        )
                    }
                    subTitleValue={inAccount[1]}
                />
                <CardBalance
                    title={'Disponible'}
                    colorTitleValue="#2dd36f"
                    titleValue={
                        inAccount ? (
                            inAccount
                        ) : (
                            <Text>Cargando...</Text>
                            // <Skeleton
                            //     colorMode={'light'}
                            //     width={150}
                            //     height={30}
                            // />
                        )
                    }
                    subTitleValue={inAccount[1]}
                />
                <CardBalance
                    title={'A liberar'}
                    colorTitleValue="#ffc409"
                    titleValue={'0'}
                />

                <View style={styles.contentButton}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonTitle}>
                            IR A MODA PAGO (WEB)
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentTwo}>
                <Text style={styles.title}> Activida reciente</Text>
                {movements.length > 0 ? (
                    movements
                        .slice(0, 5)
                        .map(
                            (movement: {
                                id: string;
                                amount: string;
                                updated_at: string;
                            }) => (
                                <InputBalance
                                    key={movement.id}
                                    onChange={() =>
                                        handleOpenModal(movement.id)
                                    }
                                    icon={require('@/styles/iconTranferApp.png')}
                                    titleTransfer={'Transferencias'}
                                    titleDate={movement.updated_at}
                                    titleCheck={`MP #${movement.id}`}
                                    titleTotal={movement.amount}
                                />
                            ),
                        )
                ) : (
                    <Text style={{ textAlign: 'center', fontSize: 22 }}>
                        Cargando movimientos...
                    </Text>
                )}
            </View>
            <TouchableOpacity onPress={handleCloseModal}>
                {Array.isArray(selectedCoupon) && selectedCoupon.length > 0 && (
                    <ModalDetailTransfer
                        imports={selectedCoupon[0].amount}
                        dates={selectedCoupon[0].transf_from.updated_at}
                        coments={selectedCoupon[0].description}
                        keyModal={''}
                        nameFrom={selectedCoupon[0].transf_from.group_name}
                        nameTo={selectedCoupon[0].transf_to.group_name}
                        onChange={handleCloseModal}
                    />
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentFirst: {
        paddingVertical: spacingStyle.large,
    },
    contentTwo: {
        paddingHorizontal: spacingStyle.medium,
    },
    contentButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: spacingStyle.small,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#212944',
        borderRadius: 28,
        height: 40,
        justifyContent: 'center',
        padding: spacingStyle.small,
        width: 260,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
        marginVertical: spacingStyle.small,
    },
});
