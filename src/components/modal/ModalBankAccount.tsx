import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Pressable,
    StyleSheet,
    ScrollView,
    TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Divider } from '../Divider';
import { getBankAccounts } from '@/db/balance';
import { Input } from './Input';
import { spacingStyle } from '@/themes/spacingStyle';
import { CustomClose } from '../buttons/CustomClose';

interface ModalBankAccountProps {
    openModal: boolean;
    closeModal: () => void;
    onSelectAccount: (value: string) => void;
}

export const ModalBankAccount = ({
    openModal,
    closeModal,
    onSelectAccount,
}: ModalBankAccountProps) => {
    const [bankAccount, setBankAccount] = useState([]);
    const [onChangeValue, setOnChangeValue] = useState('');
    const [inputValue, setInputValue] = useState<any>([]);
    const [textValue, setTextValue] = useState('');

    useEffect(() => {
        const fecthBankAccount = async () => {
            try {
                const response = await getBankAccounts();
                const { items } = response?.data;
                setBankAccount(items);
                setInputValue(items);
            } catch (error) {
                console.log(error);
            }
        };
        fecthBankAccount();
    }, []);

    useEffect(() => {
        const handleSearchBank = () => {
            const result = bankAccount.filter(
                (item: any) =>
                    item.bank
                        .toLowerCase()
                        .includes(onChangeValue.toLowerCase()) ||
                    item.owner_name
                        .toLowerCase()
                        .includes(onChangeValue.toLowerCase()),
            );
            setInputValue(result);
        };
        handleSearchBank();
    }, [onChangeValue, bankAccount]);

    const handleSelectedTitle = (title: string) => {
        setTextValue(title);
        onSelectAccount(title);
        closeModal();
    };

    return (
        <Modal visible={openModal} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={{ flexDirection: 'row' }}>
                        <CustomClose handleClose={closeModal} />
                        <Text style={styles.title}>Listado</Text>
                    </View>
                    <Divider />
                    <TextInput
                        style={styles.search}
                        placeholder="Buscar por CBU/BANCO"
                        onChangeText={setOnChangeValue}
                        value={onChangeValue}></TextInput>
                    <Text>{textValue}</Text>
                    {inputValue.length === 0 ? (
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 18,
                                textAlign: 'center',
                                marginTop: 20,
                                fontWeight: '600',
                            }}>
                            Dont result
                        </Text>
                    ) : (
                        inputValue.map((item: any) => (
                            <React.Fragment key={item.id}>
                                <Input
                                    ownerName={item.owner_name}
                                    bank={item.bank}
                                    cbu={item.cbu}
                                    onChange={() =>
                                        handleSelectedTitle(item.owner_name)
                                    }
                                />
                                <Divider />
                            </React.Fragment>
                        ))
                    )}
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        zIndex: 999,
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 100,
        padding: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
        paddingHorizontal: 10,
    },
    search: {
        borderBottomWidth: 1,
        borderRadius: 6,
        fontSize: 16,
        padding: 10,
        marginBottom: spacingStyle.small,
    },
    closeText: {
        fontWeight: 'bold',
        color: 'black',
    },
    scrollContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '85%',
        padding: 20,
        maxHeight: '100%',
        marginTop: '20%',
    },
});
