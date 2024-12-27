import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CardHome, CardServices, InputService } from '@/components';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { spacingStyle } from '@/themes/spacingStyle';
import { getTrendingCompanies } from '@/db/pagofacil';

export const SummaryView = () => {
    const [dataFetch, setDataFetch] = useState([]);

    useEffect(() => {
        const fetchPagofacil = async () => {
            try {
                const response = await getTrendingCompanies();
                console.log('Fetched data:', response);
                setDataFetch(response?.data);
            } catch (error: any) {
                console.error(
                    'Error fetching companies:',
                    error.message || error,
                );
            }
        };
        fetchPagofacil();
    }, []);
    console.log(dataFetch);

    return (
        <ScrollView
            style={{
                backgroundColor: '#e6e5e5',
            }}>
            <View style={styles.contentButton}>
                <CardHome
                    logoIcon={
                        <FontAwesome6 name="barcode" size={45} color="white" />
                    }
                    title={'Escanear factura'}
                />
                <CardHome
                    logoIcon={<Feather name="search" size={45} color="white" />}
                    title={'Buscar servicios'}
                />
                <CardHome
                    logoIcon={
                        <Feather name="clipboard" size={45} color="white" />
                    }
                    title={'Ultimos movimientos'}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Servicios destacados</Text>
                <CardServices
                    title={'METROGAS'}
                    icon={
                        'https://seeklogo.com/images/P/pago-facil-2019-logo-8BE6DD28D6-seeklogo.com.png'
                    }
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Municipio</Text>
                <InputService
                    title={'Mun. de La Matanza'}
                    icon={
                        'https://seeklogo.com/images/P/pago-facil-2019-logo-8BE6DD28D6-seeklogo.com.png'
                    }
                />
                <InputService
                    title={'Mun. de La Matanza'}
                    icon={
                        'https://seeklogo.com/images/P/pago-facil-2019-logo-8BE6DD28D6-seeklogo.com.png'
                    }
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentButton: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacingStyle.medium,
    },
    content: {
        backgroundColor: 'white',
        height: 'auto',
        marginVertical: spacingStyle.large,
        padding: spacingStyle.extraLarge,
    },
    title: {
        fontSize: spacingStyle.large,
        fontWeight: 'bold',
    },
});
