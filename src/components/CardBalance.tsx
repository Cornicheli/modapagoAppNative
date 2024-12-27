import { PropsCardBalance } from '@/interface';
import { spacingStyle } from '@/themes/spacingStyle';
import { Text, View, StyleSheet } from 'react-native';

export const CardBalance = ({
    title,
    titleValue,
    subTitleValue,
    colorTitleValue,
}: PropsCardBalance) => {
    return (
        <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <View>
                <Text style={[styles.titleValue, { color: colorTitleValue }]}>
                    {titleValue}
                </Text>
                <Text
                    style={[
                        styles.titleCashFloat,
                        ,
                        { color: colorTitleValue },
                    ]}>
                    {subTitleValue}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        marginHorizontal: spacingStyle.medium,
        marginVertical: spacingStyle.medium,
        paddingHorizontal: spacingStyle.medium,
        paddingVertical: spacingStyle.medium,
    },
    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: spacingStyle.small,
    },
    titleValue: {
        fontSize: 24,
        paddingLeft: spacingStyle.medium,
        position: 'relative',
    },
    titleCashFloat: {
        position: 'absolute',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 19,
        bottom: 15,
        left: 185,
    },
});
