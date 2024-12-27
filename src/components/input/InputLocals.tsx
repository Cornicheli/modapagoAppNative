import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/themes/colors';
import { spacingStyle } from '@/themes/spacingStyle';
import { PropsInputLocal } from '@/interface';

export const InputLocals = ({
    title,
    titleInput,
    logoIcon,
    icon,
    onChange,
}: PropsInputLocal) => {
    return (
        <View style={styles.contentOne}>
            <View style={styles.contentTwo}>
                {icon ? (
                    <Image
                        source={icon}
                        style={{
                            width: 55,
                            height: 55,
                            borderRadius: 100,
                            marginRight: 25,
                        }}
                    />
                ) : (
                    logoIcon
                )}
                <Text style={styles.titleStore}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onChange}>
                <Text style={styles.titleButton}>{titleInput}</Text>
                <AntDesign name="arrowright" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    contentOne: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 100,
        justifyContent: 'space-between',
        marginVertical: spacingStyle.small,
        paddingHorizontal: spacingStyle.large,
    },
    contentTwo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    photo: {
        borderRadius: 100,
        width: 50,
        height: 50,
        marginRight: spacingStyle.medium,
    },
    button: {
        alignItems: 'center',
        backgroundColor: Colors.colorModapagoBase,
        borderRadius: 8,
        flexDirection: 'row',
        fontSize: 18,
        height: 45,
        justifyContent: 'space-around',
        paddingHorizontal: spacingStyle.small,
        width: 155,
    },
    titleButton: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    titleStore: {
        fontSize: 18,
        color: 'grey',
    },
});
