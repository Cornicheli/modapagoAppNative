import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Divider } from '../Divider';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { spacingStyle } from '@/themes/spacingStyle';
import { Colors } from '@/themes/colors';

export const InputEmail = ({
    title,
    email,
    isOpenModal,
    id,
}: {
    title: string;
    email: string;
    isOpenModal: () => void;
    id: string;
}) => {
    return (
        <>
            <Pressable style={styles.container} onPress={isOpenModal} id={id}>
                <View>
                    <Text style={styles.emailText}>E-mail: {email}</Text>
                    <Text style={styles.nameText}>Nombre: {title}</Text>
                </View>
                <FontAwesome5
                    name="arrow-circle-right"
                    size={30}
                    color={Colors.colorModapagoBase}
                />
            </Pressable>
            <Divider />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 90,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: spacingStyle.medium,
    },
    emailText: {
        color: '#666666',
        fontSize: 16,
        paddingVertical: spacingStyle.small,
    },
    nameText: {
        color: '#666666',
        fontSize: 16,
    },
});
