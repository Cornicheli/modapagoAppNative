import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { Divider } from '../Divider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { spacingStyle } from '@/themes/spacingStyle';
import { Colors } from '@/themes/colors';
import { ModalDetailPayProps } from '@/interface';
import { logoBroken } from '@/styles';

export const ModalDetailPay = ({
    brandName,
    brandCuit,
    totalPay,
    commentPay,
    visible,
    keyModal,
    closeModal,
}: ModalDetailPayProps) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            key={keyModal}
            animationType="slide">
            <View style={styles.main}>
                <View style={styles.section}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Revisa los datos</Text>
                        <TouchableOpacity
                            onPress={closeModal}
                            style={styles.closeButton}>
                            <Ionicons name="close" size={32} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Divider />

                    {/* Body */}
                    <View style={styles.body}>
                        {/* Información del local */}
                        <View style={styles.sectionBlock}>
                            <Text style={styles.title}>
                                Información del local
                            </Text>
                            <Divider />
                            <View style={styles.localInfo}>
                                <Image
                                    source={logoBroken}
                                    style={styles.localImage}
                                />
                                <View>
                                    <Text style={styles.subTitle}>
                                        {brandName}
                                    </Text>
                                    <Text style={styles.subTitle}>
                                        CUIT: {brandCuit}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Información del pago */}
                        <View style={styles.sectionBlock}>
                            <Text style={styles.title}>
                                Información del pago
                            </Text>
                            <Divider />
                            <Text style={styles.subTitle}>
                                Monto: ${totalPay}
                            </Text>
                            <Divider />
                            <Text style={styles.subTitle}>
                                Comentario: {commentPay}
                            </Text>
                            <Divider />
                        </View>
                    </View>

                    {/* Footer */}
                    <TouchableOpacity style={styles.footerButton}>
                        <Text style={styles.parrafoFooter}>CONFIRMAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    section: {
        width: '85%',
        minHeight: '50%',
        backgroundColor: 'white',
        borderRadius: 24,
        padding: spacingStyle.medium,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    closeButton: {
        position: 'absolute',
        right: -15,
        top: 5,
    },
    body: {
        flex: 1,
        // justifyContent: 'center',
        marginVertical: spacingStyle.medium,
    },
    sectionBlock: {
        marginBottom: spacingStyle.medium,
    },
    localInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacingStyle.small,
    },
    localImage: {
        width: 55,
        height: 55,
        borderRadius: 100,
        marginRight: spacingStyle.small,
    },
    footerButton: {
        backgroundColor: Colors.colorModapagoBase,
        borderRadius: 12,
        paddingVertical: spacingStyle.small,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginVertical: spacingStyle.small,
    },
    subTitle: {
        fontSize: 18,
    },
    parrafoFooter: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    },
});
