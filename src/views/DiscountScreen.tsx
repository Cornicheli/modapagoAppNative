import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { getDiscount } from '@/db/discounts';
import { Coupon, ModalDetailDiscount } from '@/components';
import React from 'react';

export const DiscountScreen = () => {
    const [coupons, setCoupons] = useState<any>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [couponDetail, setCouponDetail] = useState<any>(null);

    useEffect(() => {
        const fecthDiscount = async () => {
            try {
                const response = await getDiscount();
                const { brands } = response;
                setCoupons(Object.values(brands));
            } catch (error) {
                console.log(error);
            }
        };
        fecthDiscount();
    }, []);

    const handleOpenModal = (id: number) => {
        const findCoupon = coupons.find(
            (couponDetail: any, index: any) => couponDetail.local.id === id,
        );
        setCouponDetail(findCoupon);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {coupons && coupons.length > 0 ? (
                <FlatList
                    data={coupons}
                    renderItem={({
                        item: coupon,
                        index,
                    }: {
                        item: any;
                        index: number;
                    }) => (
                        <Coupon
                            key={index}
                            title={
                                coupon?.local?.name || 'Nombre no disponible'
                            }
                            titleDiscount={`%${coupon?.discount?.percentage || 'Descuento no disponible'}`}
                            titleDirrection={
                                coupon?.local?.address ||
                                'Dirección no disponible'
                            }
                            onChange={() => handleOpenModal(coupon.local.id)}
                        />
                    )}
                    keyExtractor={(coupon, index) => index.toString()}
                    numColumns={2}
                />
            ) : (
                <>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            marginTop: 26,
                            marginBottom: 13,
                        }}>
                        Cargando
                    </Text>
                    <ActivityIndicator color="#50c8ff" />
                </>
            )}

            <ModalDetailDiscount
                nameLocal={couponDetail?.local?.name || ''}
                addressLocal={couponDetail?.local?.address || ''}
                percentajeLocal={couponDetail?.discount?.percentage || ''}
                topeLocal={couponDetail?.discount?.max_price || ''}
                visible={isModalVisible}
                keyModal={couponDetail?.local?.id || ''}
                closeModal={handleModalClose}
            />
        </View>
    );
};
