import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Divider } from '../Divider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { spacingStyle } from '@/themes/spacingStyle';
import { Colors } from '@/themes/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ModalDiscountDetailProps } from '@/interface';
import { CustomClose } from '../buttons/CustomClose';
import { boxShadow } from '@/themes/boxShadow';

export const ModalDetailDiscount = ({
    nameLocal,
    addressLocal,
    percentajeLocal,
    topeLocal,
    visible,
    keyModal,
    closeModal,
}: ModalDiscountDetailProps) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            key={keyModal}
            animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <CustomClose handleClose={closeModal} />
                        <Text style={styles.modalTitle}>
                            Detalles del descuento
                        </Text>
                    </View>

                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionTitle}>Datos del local</Text>
                        <Divider />

                        <View style={styles.rowContainer}>
                            <Text style={styles.labelText}>Nombre:</Text>
                            <Text style={styles.valueText}>{nameLocal}</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <Text style={styles.labelText}>Dirección:</Text>
                            <Text style={styles.valueText}>{addressLocal}</Text>
                        </View>
                    </View>

                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionTitle}>
                            Datos del descuento
                        </Text>
                        <Divider />
                        <View style={styles.rowContainer}>
                            <Text style={styles.labelText}>Porcentaje:</Text>
                            <Text style={styles.valueText}>
                                {percentajeLocal}%
                            </Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <Text style={styles.labelText}>
                                Tope reintegro:
                            </Text>
                            <Text style={styles.valueText}>${topeLocal}</Text>
                        </View>
                    </View>

                    <View style={styles.modalFooter}>
                        <Text style={styles.footerText}>
                            <AntDesign
                                name="infocirlce"
                                size={20}
                                color="white"
                            />{' '}
                            Para usar este descuento tienes que escanear el QR
                            del local y se te aplicará en el momento que tengas
                            que confirmar la operación.
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.9)',
    },
    modalContent: {
        backgroundColor: 'white',
        minHeight: '60%',
        borderRadius: 4,
        paddingHorizontal: spacingStyle.medium,
        justifyContent: 'space-around',
    },
    modalHeader: {
        width: 370,
        padding: spacingStyle.small,
        alignItems: 'center',
        height: 60,
        flexDirection: 'row',
        ...boxShadow,
    },
    closeButton: {
        marginRight: spacingStyle.medium,
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    sectionContent: {
        ...boxShadow,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: spacingStyle.medium,
        borderRadius: 4,
        width: 370,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: spacingStyle.small,
        color: '#545454',
    },
    rowContainer: {
        flexDirection: 'row',
        margin: spacingStyle.small,
    },
    labelText: {
        color: '#666666',
        fontSize: 18,
    },
    valueText: {
        fontSize: 18,
        marginLeft: spacingStyle.small,
    },
    modalFooter: {
        ...boxShadow,
        width: 370,
        borderRadius: 4,
        backgroundColor: Colors.colorModapagoBase,
        padding: spacingStyle.small,
    },
    footerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 26,
    },
});
