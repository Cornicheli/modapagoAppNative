import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { Divider } from '@/components/Divider';
import { spacingStyle } from '@/themes/spacingStyle';
import { Colors } from '@/themes/colors';
import { logoBroken } from '@/styles';
import { ModalDetailPayProps } from '@/interface';

export const ValidationPay = ({
    brandName,
    brandCuit,
    totalPay,
    commentPay,
    onChange,
}: ModalDetailPayProps) => {
    return (
        <View style={styles.section}>
            <View style={styles.body}>
                <View style={styles.sectionBlock}>
                    <Text style={styles.title}>Información del local</Text>
                    <Divider />
                    <View style={styles.localInfo}>
                        <Image source={logoBroken} style={styles.localImage} />
                        <View>
                            <Text style={styles.subTitle}>{brandName}</Text>
                            <Text style={styles.subTitleCuit}>
                                CUIT: {brandCuit}
                            </Text>
                        </View>
                    </View>
                </View>
                <Divider />

                <View style={styles.sectionBlock}>
                    <Text style={styles.title}>Información final del pago</Text>
                    <Text style={styles.subTitle}>Importe: ${totalPay}</Text>
                    <Text style={styles.subTitle}>
                        Comentario: {commentPay}
                    </Text>
                    <Divider />
                </View>
            </View>

            <TouchableOpacity style={styles.footerButton} onPress={onChange}>
                <Text style={styles.parrafoFooter}>CONFIRMAR</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        padding: spacingStyle.medium,
    },
    body: {
        marginVertical: spacingStyle.medium,
        flex: 1,
    },
    sectionBlock: {
        marginBottom: spacingStyle.medium,
        height: 175,
        justifyContent: 'space-around',
    },
    localInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacingStyle.small,
        minHeight: 100,
        paddingHorizontal: spacingStyle.medium,
    },
    localImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginRight: spacingStyle.medium,
    },
    footerButton: {
        backgroundColor: Colors.colorModapagoBase,
        borderRadius: 12,
        paddingVertical: spacingStyle.small,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        marginVertical: spacingStyle.small,
    },
    subTitle: {
        fontSize: 22,
        marginBottom: spacingStyle.small,
        fontWeight: '400',
    },
    subTitleCuit: {
        fontSize: 18,
        marginBottom: spacingStyle.small,
        color: '#666666',
        fontWeight: '400',
    },
    parrafoFooter: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    },
});
