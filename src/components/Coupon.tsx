import { PropsCoupon } from '@/interface';
import { spacingStyle } from '@/themes/spacingStyle';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Coupon = ({
    title,
    titleDirrection,
    titleDiscount,
    key,
    onChange,
}: PropsCoupon) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onChange} key={key}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.titleDiscount}>{titleDiscount}</Text>
            <Text style={styles.subTitle}>{titleDirrection}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 175,
        height: 250,
        paddingVertical: spacingStyle.medium,
        paddingHorizontal: spacingStyle.small,
        margin: spacingStyle.medium,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 16,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    titleDiscount: {
        width: 90,
        height: 35,
        borderRadius: 10,
        backgroundColor: '#50c8ff',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 24,
    },
});
