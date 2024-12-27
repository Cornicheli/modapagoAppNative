import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { spacingStyle } from '@/themes/spacingStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { InputModalfilter } from '../input/InputModalfilter';
import { Divider } from '../Divider';
import AntDesign from '@expo/vector-icons/AntDesign';
import { PropsModalFilter } from '@/interface';

export const ModalFilter = ({
    keyModal,
    onChange,
    visible,
    onSelectFilter,
}: PropsModalFilter) => {
    const handleFilterSelect = (id: string) => {
        onSelectFilter(id);
        onChange();
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            key={keyModal}>
            <View style={styles.modalContent}>
                <View style={styles.boxWithShadow}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={onChange}>
                            <Ionicons name="close" size={34} color="black" />
                        </TouchableOpacity>
                    </View>

                    <InputModalfilter
                        title={'Todas'}
                        selectFilter={'Todas'}
                        onChange={() => handleFilterSelect('Todas')}
                    />

                    <AntDesign
                        name="caretdown"
                        size={24}
                        color="black"
                        style={{
                            position: 'absolute',
                            right: 15,
                            top: 20,
                        }}
                    />

                    <Divider />

                    <View>
                        <InputModalfilter
                            title={'Transferencias'}
                            onChange={() =>
                                handleFilterSelect('Transferencias')
                            }
                            selectFilter={'Transferencias'}
                        />
                        <AntDesign
                            name="caretdown"
                            size={24}
                            color="black"
                            style={{
                                position: 'absolute',
                                right: 15,
                                top: 20,
                            }}
                        />
                    </View>

                    <TouchableOpacity style={styles.content}>
                        <View>
                            <InputModalfilter
                                title={'Pagos de servicios'}
                                onChange={() =>
                                    handleFilterSelect('Pagos de servicios')
                                }
                                selectFilter={'Pagos de servicios'}
                            />

                            <InputModalfilter
                                title={'Pagos de Rapipago'}
                                onChange={() =>
                                    handleFilterSelect('Pagos de Rapipago')
                                }
                                selectFilter={'Pagos de Rapipago'}
                            />

                            <Divider />

                            <InputModalfilter
                                title={'Pagos de Pagofacil'}
                                onChange={() =>
                                    handleFilterSelect('Pagos de Pagofacil')
                                }
                                selectFilter={'Pagos de Pagofacil'}
                            />
                        </View>
                    </TouchableOpacity>

                    <AntDesign
                        name="caretdown"
                        size={24}
                        color="black"
                        style={{
                            position: 'absolute',
                            right: 15,
                            top: 20,
                        }}
                    />

                    <View>
                        <InputModalfilter
                            title={'Cupones'}
                            onChange={() =>
                                handleFilterSelect('Transferencias')
                            }
                            selectFilter={'Transferencias'}
                        />

                        <AntDesign
                            name="caretdown"
                            size={24}
                            color="black"
                            style={{
                                position: 'absolute',
                                right: 15,
                                top: 20,
                            }}
                        />
                    </View>

                    <Divider />

                    <TouchableOpacity style={styles.content}>
                        <View>
                            <InputModalfilter
                                title={'Cupones de Modatex'}
                                selectFilter={'Cupones de Modatex'}
                                onChange={() =>
                                    handleFilterSelect('Cupones de Modatex')
                                }
                            />
                            <Divider />

                            <InputModalfilter
                                title={'Cupones de Modatex'}
                                selectFilter={'Cupones de Modatex'}
                                onChange={() =>
                                    handleFilterSelect('Cupones directos')
                                }
                            />
                            <Divider />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        height: 'auto',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxWithShadow: {
        backgroundColor: 'white',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        elevation: 5,
        height: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        width: '100%',
        padding: spacingStyle.medium,
    },
    headerContainer: {
        borderRadius: 10,
        flexDirection: 'row',
        height: 50,
        paddingVertical: spacingStyle.small,
        width: '100%',
        marginBottom: spacingStyle.small,
    },

    contentBody: {
        paddingVertical: spacingStyle.small,
    },

    content: {
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 'auto',
        borderWidth: 2,
        borderColor: 'grey',
        paddingVertical: spacingStyle.medium,
        margin: spacingStyle.medium,
        borderRadius: 16,
        minHeight: 'auto',
    },

    contentFilter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacingStyle.medium,
    },
});
