import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import {
    Button,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CardQrProps } from '@/interface';
import { Overlay } from './Overley';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@/routes/StackNavigator';
import { proceedToTransaction } from '@/db/transference';
import { ValidationPay } from '@/views';
import { CustomClose } from './buttons/CustomClose';

export const CardQr = ({ onChange }: CardQrProps) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [toTransaction, setToTransaction] = useState<any>([]);
    const [dataQr, setDataQr] = useState<string>('');

    const { navigate } = useNavigation<StackNavigationProp<StackParamList>>();

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

    console.log('Result data = ', JSON.stringify(dataQr, null, 2));

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const renderCameraView = () => (
        <>
            <TouchableOpacity style={styles.buttonContainer} onPress={onChange}>
                <Ionicons
                    style={styles.button}
                    name="close"
                    size={34}
                    color="black"
                />
            </TouchableOpacity>
            {/* <CustomClose handleClose={onChange} /> */}
            <CameraView
                facing="back"
                style={styles.camera}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
                onBarcodeScanned={({ data }) => {
                    setTimeout(() => {
                        setDataQr(data);
                    }, 100);
                }}>
                <Overlay />
            </CameraView>
        </>
    );

    const handleTransactionCompletion = () => {
        navigate('Root'), setDataQr('');
    };

    const renderValidationView = () =>
        toTransaction.map((transaction: any) => (
            <ValidationPay
                key={transaction.cuit}
                brandName={transaction.group_name}
                brandCuit={transaction.cuit}
                keyModal="1"
                commentPay="Pago con QR"
                totalPay={dataQr}
                onChange={handleTransactionCompletion}
            />
        ));

    return (
        <View style={styles.fullScreen}>
            {dataQr === '' ? renderCameraView() : renderValidationView()}
        </View>
    );
};

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    fullScreen: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 999,
        justifyContent: 'center',
    },
    container: {
        height: 1000,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        flexDirection: 'column',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 999,
    },
    button: {
        height: 30,
        width: 30,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    layerTop: {
        flex: 2,
        backgroundColor: opacity,
    },
    layerCenter: {
        borderRadius: 18,
        flex: 1,
        flexDirection: 'row',
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity,
    },
    focused: {
        flex: 10,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'transparent',
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity,
    },
    layerBottom: {
        flex: 2,
        backgroundColor: opacity,
    },
});
