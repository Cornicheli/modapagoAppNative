import React, { Key, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { InputBalance, ModalDetailTransfer, ModalFilter } from '@/components';
import { spacingStyle } from '@/themes/spacingStyle';
import { getHistoryMovements } from '@/db/movements';
import DropDownPicker from 'react-native-dropdown-picker';

export const HistoryView = () => {
    const [movements, setMovements] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [selectedPurchase, setSelectedPurchase] = useState<any>([]);
    const [findPurchaseOpen, setFindPurchaseOpen] = useState<any>([]);
    const [items, setItems] = useState([
        { label: 'Transferencias', value: 'TRANSFERENCIA' },
        {
            label: 'Pagos de servicios (externo)',
            value: 'PAGO EXTERNO',
            parent: 'TRANSFERENCIA',
        },
        {
            label: 'Pagos de Pagofacil',
            value: 'pagofacil_ticket',
            parent: 'TRANSFERENCIA',
        },
        {
            label: 'Pagos de Rapipago',
            value: 'comprobante_rapipago',
            parent: 'TRANSFERENCIA',
        },
        { label: 'Cupones', value: 'cupons' },
        {
            label: 'Cupones directos',
            value: 'App\\Models\\Brand',
            parent: 'cupons',
        },
        {
            label: 'Cupones de Modatex',
            value: 'modatex',
            parent: 'cupons',
        },
    ]);

    const [filters, setFilters] = useState({
        paymentMethod: '',
        paymentStatus: '',
        paymentCouponAll: '',
        paymentCouponModatex: '',
        paymentCouponDirect: '',
        paymentPagoFacil: '',
        paymentRapipago: '',
    });

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

    const handleFilterChange = (selectedValue: string | null) => {
        switch (selectedValue) {
            case 'TRANSFERENCIA':
                setFilters(prev => ({
                    ...prev,
                    paymentMethod: 'TRANSFERENCIA',
                    paymentStatus: '',
                    paymentCouponModatex: '',
                    paymentCouponDirect: '',
                    paymentPagoFacil: '',
                    paymentRapipago: '',
                }));
                break;
            case 'PAGO EXTERNO':
                setFilters(prev => ({
                    ...prev,
                    paymentStatus: 'PAGO EXTERNO',
                    paymentMethod: '',
                    paymentCouponAll: '',
                    paymentCouponModatex: '',
                    paymentCouponDirect: '',
                    paymentPagoFacil: '',
                    paymentRapipago: '',
                }));
                break;
            case 'pagofacil_ticket':
                setFilters(prev => ({
                    ...prev,
                    paymentPagoFacil: 'pagofacil_ticket',
                    paymentStatus: '',
                    paymentMethod: '',
                    paymentCouponAll: '',
                    paymentCouponModatex: '',
                    paymentCouponDirect: '',
                    paymentRapipago: '',
                }));
                break;
            case 'comprobante_rapipago':
                setFilters(prev => ({
                    ...prev,
                    paymentRapipago: 'comprobante_rapipago',
                    paymentStatus: '',
                    paymentMethod: '',
                    paymentCouponModatex: '',
                    paymentCouponAll: '',
                    paymentCouponDirect: '',
                    paymentPagoFacil: '',
                }));
                break;
            case 'cuponsAll':
                setFilters(prev => ({
                    ...prev,
                    paymentCouponAll: 'cuponsAll',
                    paymentCouponModatex: '',
                    paymentMethod: '',
                    paymentStatus: '',
                    paymentCouponDirect: '',
                    paymentPagoFacil: '',
                    paymentRapipago: '',
                }));
                break;
            case 'modatex':
                setFilters(prev => ({
                    ...prev,
                    paymentCouponModatex: 'modatex',
                    paymentMethod: '',
                    paymentStatus: '',
                    paymentCouponAll: '',
                    paymentCouponDirect: '',
                    paymentPagoFacil: '',
                    paymentRapipago: '',
                }));
                break;
            case 'App\\Models\\Brand':
                setFilters(prev => ({
                    ...prev,
                    paymentCouponDirect: 'App\\Models\\Brand',
                    paymentMethod: '',
                    paymentStatus: '',
                    paymentCouponAll: '',
                    paymentCouponModatex: '',
                    paymentPagoFacil: '',
                    paymentRapipago: '',
                }));
                break;
            default:
                setFilters({
                    paymentMethod: '',
                    paymentStatus: '',
                    paymentCouponAll: '',
                    paymentCouponModatex: '',
                    paymentCouponDirect: '',
                    paymentPagoFacil: '',
                    paymentRapipago: '',
                });
        }
    };

    const filteredMovements = movements.filter((movement: any) => {
        return (
            (filters.paymentMethod === '' ||
                movement.payment_method === filters.paymentMethod) &&
            (filters.paymentStatus === '' ||
                movement.payment_status === filters.paymentStatus) &&
            (filters.paymentCouponModatex === '' ||
                movement.coupon_type === filters.paymentCouponModatex) &&
            (filters.paymentCouponDirect === '' ||
                movement.transf_from_type === filters.paymentCouponDirect) &&
            (filters.paymentPagoFacil === '' ||
                (movement.pagofacil_ticket &&
                    movement.pagofacil_ticket.status === 'PAGO_FINALIZADO')) &&
            (filters.paymentRapipago === '' ||
                movement.comprobante_rapipago === filters.paymentRapipago)
        );
    });

    const handleOpenModal = (id: number) => {
        const findPurchaseInput = movements.find(
            (purchaseDetail: any) => purchaseDetail.id === id,
        );
        setFindPurchaseOpen([findPurchaseInput]);
    };

    const handleCloseModal = () => {
        setFindPurchaseOpen('');
    };

    return (
        <SafeAreaView>
            <Text style={styles.title}>Filtrar</Text>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 16,
                    position: 'relative',
                    zIndex: 50,
                    marginBottom: spacingStyle.medium,
                }}>
                <DropDownPicker
                    onChangeValue={handleFilterChange}
                    setValue={setValue}
                    value={value}
                    maxHeight={650}
                    open={open}
                    items={items}
                    setOpen={setOpen}
                    setItems={setItems}
                    dropDownDirection={'BOTTOM'}
                    zIndex={1000}
                    theme="LIGHT"
                    multiple={false}
                    placeholder="Selecciona un filtro"
                    textStyle={{ fontSize: 16 }}
                    labelStyle={{ fontWeight: 'bold' }}
                    style={{ borderColor: 'grey' }}
                />
            </View>

            <TouchableOpacity onPress={handleCloseModal}>
                {Array.isArray(findPurchaseOpen) &&
                    findPurchaseOpen.length > 0 && (
                        <ModalDetailTransfer
                            imports={
                                findPurchaseOpen[0]?.amount || 'no hay detalles'
                            }
                            dates={
                                findPurchaseOpen[0]?.transf_from?.updated_at ||
                                'no hay detalles'
                            }
                            coments={
                                findPurchaseOpen[0]?.description ||
                                'no hay detalles'
                            }
                            keyModal={
                                findPurchaseOpen[0]?.transf_from?.group_name ||
                                'no hay detalles'
                            }
                            nameFrom={
                                findPurchaseOpen[0]?.transf_from?.group_name ||
                                'no hay detalles'
                            }
                            nameTo={
                                findPurchaseOpen[0]?.transf_to?.group_name ||
                                'no hay detalles'
                            }
                            onChange={handleCloseModal}
                        />
                    )}
            </TouchableOpacity>

            {filteredMovements.length > 0 ? (
                <FlatList
                    style={styles.contentTwo}
                    data={filteredMovements}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <InputBalance
                            key={item.id}
                            onChange={() => handleOpenModal(item.id)}
                            icon={require('@/styles/iconTranferApp.png')}
                            titleTransfer={'Transferencias'}
                            titleDate={item.updated_at}
                            titleCheck={`MP #${item.id}`}
                            titleTotal={item.amount}
                        />
                    )}
                />
            ) : (
                <Text style={{ textAlign: 'center', fontSize: 22 }}>
                    No hay movimientos para mostrar...
                </Text>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: spacingStyle.large,
        paddingVertical: spacingStyle.medium,
    },
    contentTwo: {
        paddingHorizontal: spacingStyle.medium,
    },

    content: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 'auto',
        borderWidth: 2,
        borderColor: 'grey',
        paddingVertical: spacingStyle.medium,
        margin: spacingStyle.medium,
        borderRadius: 16,
    },

    contentFilter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacingStyle.medium,
    },
    titleFilter: {
        marginHorizontal: spacingStyle.medium,
        fontSize: 20,
    },
});
