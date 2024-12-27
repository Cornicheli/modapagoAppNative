import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Divider } from '../Divider';
import { spacingStyle } from '../../themes/spacingStyle';
import { Colors } from '../../themes/colors';
import { ModalDetailProps } from '@/interface';
import { CustomClose } from '../buttons/CustomClose';
import { boxShadow } from '@/themes/boxShadow';

export const ModalDetailTransfer = ({
    imports,
    dates,
    coments,
    keyModal,
    visible,
    nameFrom,
    nameTo,
    onChange,
}: ModalDetailProps) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            key={keyModal}>
            <View style={styles.main}>
                <View style={styles.section}>
                    <View style={styles.headerContainer}>
                        <CustomClose handleClose={onChange} />
                        <Text style={styles.headerTitle}>
                            Detalle de la transferencia
                        </Text>
                    </View>

                    <View
                        style={{
                            ...boxShadow,
                            width: 370,
                            padding: spacingStyle.small,
                            borderRadius: 4,
                        }}>
                        <View style={styles.content}>
                            <Text style={styles.title}>Generado desde :</Text>
                            <View style={styles.boxInput}>
                                <View style={styles.input}>
                                    <Image
                                        style={styles.photo}
                                        source={require('../../styles/logobroken.jpeg')}
                                    />
                                    <Text style={styles.titleInput}>
                                        {nameFrom}
                                    </Text>
                                </View>
                            </View>
                            <Divider />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.title}>
                                Negocio Acreditado :
                            </Text>
                            <View style={styles.boxInput}>
                                <View style={styles.input}>
                                    <Image
                                        style={styles.photo}
                                        source={require('../../styles/logobroken.jpeg')}
                                    />
                                    <Text style={styles.titleInput}>
                                        {nameTo}
                                    </Text>
                                </View>
                            </View>
                            <Divider />
                        </View>
                    </View>

                    <View
                        style={{
                            ...boxShadow,
                            width: 370,
                            padding: spacingStyle.small,
                            borderRadius: 4,
                        }}>
                        <View style={styles.content}>
                            <View style={styles.importDescription}>
                                <Text style={styles.title}>
                                    Fecha de operacion :
                                </Text>
                                <Text style={styles.subTitle}>{dates}</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.importDescription}>
                            <Text style={styles.title}>Comentario :</Text>
                            <Text style={styles.subTitle}>{coments}</Text>
                        </View>
                    </View>

                    <View style={styles.contentImport}>
                        <Text style={styles.title}>Importe: </Text>
                        <Text
                            style={styles.subTitle}>
                            ${imports}
                        </Text>
                    </View>
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
        opacity: 0.9,
        backgroundColor: '#343434',
    },
    section: {
        ...boxShadow,
        backgroundColor: 'white',
        height: '70%',
        width: '85%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 4,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingLeft: spacingStyle.medium,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    content: {
        marginVertical: 10,
    },
    title: {
        fontWeight: '600',
        fontSize: 22,
    },
    subTitle: {
        fontSize: 18,
        paddingLeft: spacingStyle.medium,
    },
    boxInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: spacingStyle.medium,
        marginVertical: spacingStyle.small,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleInput: {
        marginLeft: 10,
        fontSize: 18,
    },
    photo: {
        width: 45,
        height: 45,
        borderRadius: 100,
    },
    importDescription: {
        marginVertical: spacingStyle.small,
        width: 370,
        borderRadius: 4,
    },
    contentImport: {
        ...boxShadow,
        width: 370,
        height: 75,
        // flexDirection: 'column',
        // alignItems: 'center',
        paddingLeft: spacingStyle.small
    },
});
