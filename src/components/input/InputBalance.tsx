import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from '../Divider';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { spacingStyle } from '@/themes/spacingStyle';
import { PropsInputBalance } from '@/interface';

export const InputBalance = ({
    icon,
    titleTransfer,
    titleDate,
    titleCheck,
    titleTotal,
    onChange,
}: PropsInputBalance) => {
    return (
        <>
            <TouchableOpacity style={styles.content} onPress={onChange}>
                <Image source={icon} style={styles.photo} />
                <View style={styles.boxOne}>
                    <Text style={styles.title}>{titleTransfer}</Text>
                    <Text style={styles.titleKey}>{titleCheck}</Text>
                </View>
                <View style={styles.boxTwo}>
                    <Text style={styles.titleValue}>{titleTotal}</Text>
                    <Text style={styles.titleDate}>{titleDate}</Text>
                </View>
                <FontAwesome
                    style={styles.contentArrow}
                    name="angle-right"
                    size={25}
                    color="grey"
                />
            </TouchableOpacity>
            <Divider />
        </>
    );
};

const styles = StyleSheet.create({
    content: {
        position: 'relative',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 100,
        justifyContent: 'space-around',
        paddingRight: spacingStyle.medium,
        paddingVertical: spacingStyle.medium,
    },
    photo: {
        width: 75,
        height: 75,
        borderRadius: 100,
    },
    boxOne: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    boxTwo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        color: 'black',
        fontSize: 17,
    },
    titleKey: {
        color: 'grey',
        fontSize: 15,
    },
    titleValue: {
        color: '#2dd36f',
        fontSize: 21,
        fontWeight: 'bold',
    },
    titleDate: {
        fontSize: 12,
        color: 'grey',
    },
    contentArrow: {
        position: 'absolute',
        right: 6,
        top: '50%',
    },
});
