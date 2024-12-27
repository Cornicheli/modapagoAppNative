import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Divider } from '../Divider';
import { spacingStyle } from '@/themes/spacingStyle';
import { PropsInputService } from '@/interface';

export const InputService = ({ icon, title }: PropsInputService) => {
    return (
        <>
            <TouchableOpacity style={stlyes.content}>
                <Image
                    style={stlyes.serviceIcon}
                    source={{
                        uri: icon,
                    }}
                />
                <Text style={stlyes.title}>{title}</Text>
            </TouchableOpacity>
            <Divider />
        </>
    );
};

const stlyes = StyleSheet.create({
    content: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: spacingStyle.small,
    },
    serviceIcon: {
        width: 45,
        height: 45,
        borderRadius: 100,
        marginRight: spacingStyle.medium,
    },
    title: { fontSize: 18 },
});
