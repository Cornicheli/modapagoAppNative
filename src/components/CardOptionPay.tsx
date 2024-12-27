import { PropsCardPay } from '@/interface';
import { spacingStyle } from '@/themes/spacingStyle';
import { textFontStyle } from '@/themes/textFontStyle';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const CardOptionPay = ({
    logoIcon,
    title,
    icon,
    onChange,
}: PropsCardPay) => {
    return (
        <TouchableOpacity style={styles.content} onPress={onChange}>
            <View style={styles.buttonIcon}>
                {icon ? (
                    <Image
                        source={icon}
                        style={styles.icon}
                    />
                ) : (
                    logoIcon
                )}
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'space-around',
        margin: 5,
        marginVertical: spacingStyle.medium,
        width: 130,
    },
    icon: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginBottom: spacingStyle.small,
    },
    buttonIcon: {
        alignItems: 'center',
        display: 'flex',
        height: 160,
        justifyContent: 'space-around',
        paddingHorizontal: spacingStyle.small,
        paddingVertical: spacingStyle.large,
        width: 160,
    },
    title: {
        fontSize: textFontStyle.subTitle,
        // marginVertical: spacingStyle.medium,
        textAlign: 'center',
    },
});
