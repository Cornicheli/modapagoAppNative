import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { spacingStyle } from '@/themes/spacingStyle';
import Ionicons from '@expo/vector-icons/Ionicons';

export const CustomClose = ({ handleClose }: { handleClose: () => void }) => {
    return (
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={32} color="black" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        marginRight: spacingStyle.medium,
    },
});
