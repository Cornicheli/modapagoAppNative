import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import { spacingStyle } from '@/themes/spacingStyle';
import logobroken from '@/styles/logobroken.jpeg'
import { Colors } from '@/themes/colors';
import QRCode from 'react-native-qrcode-svg';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Divider } from '@/components';


export const QrCharge = () => {

    const [number, setNumber] = useState<number>();
    const [tempNumber, setTempNumber] = useState<number>();
    console.log(number)

    const sendData = () => {
        if (number !== 0) {
            setNumber(tempNumber)
        } else (
            Alert.alert('QR no generado. Ingrese un monto a cobrar')
        )
    }

    return (
        <ScrollView>

            <SafeAreaView style={styles.main}>
                <View style={styles.contentOne}>
                    <Image
                        source={logobroken}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            marginRight: 20,
                        }}
                    />
                    <Text style={styles.titleStore}>Modatex</Text>
                </View>
                <View style={styles.contentTwo}>

                    {
                        tempNumber ? (
                            <Text>
                                El QR tiene un valor de ${tempNumber}
                            </Text>
                        ) : (
                            <Text style={styles.titleQr}>
                                Para su comodidad puede generar el codigo QR para recibir su dinero de manera mas rapida.
                            </Text>
                        )
                    }
                    <Divider />
                    <QRCode
                        logoBackgroundColor='transparent'
                        value={number || '0'}
                        size={175}
                    />
                </View>
                <View style={styles.contentThree}>
                    <View style={{ paddingHorizontal: spacingStyle.extraLarge, justifyContent: 'center' }}>
                        <TextInput style={styles.input}
                            keyboardType="numeric"
                            placeholder='Ingrese el monto a cobrar'
                            onChangeText={setTempNumber}
                            value={tempNumber}
                        />
                        <Divider />
                    </View>
                </View>

                <Pressable style={styles.button} onPress={sendData} >
                    <Text style={styles.titleButton}>
                        GENERAR CODIGO QR
                    </Text>
                </Pressable>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        backgroundColor: '#e6e5e5',
        flex: 1,
        flexDirection: 'column',
        marginVertical: spacingStyle.small,
        paddingHorizontal: spacingStyle.large,
    },
    contentOne: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 75,
        marginVertical: spacingStyle.medium,
        paddingHorizontal: spacingStyle.medium,
        width: '100%',
    },
    photo: {
        borderRadius: 100,
        height: 50,
        marginRight: spacingStyle.medium,
        width: 50,
    },
    titleStore: {
        color: 'black',
        fontSize: 18,
    },
    contentTwo: {
        alignItems: 'center',
        backgroundColor: 'white',
        display: 'flex',
        height: 350,
        justifyContent: 'space-around',
        paddingHorizontal: spacingStyle.medium,
        width: '100%',
    },
    titleQr: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentThree: {
        backgroundColor: 'white',
        justifyContent: 'center',
        marginVertical: spacingStyle.small,
        paddingVertical: spacingStyle.medium,
        width: '100%',
    },
    input: {
        marginVertical: spacingStyle.small,
        width: '100%',
    },
    button: {
        backgroundColor: Colors.colorModatexBase,
        height: 40,
        justifyContent: 'center',
        width: '100%',
    },
    titleButton: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});
