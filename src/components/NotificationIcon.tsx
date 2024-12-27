import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '@/routes/StackNavigator';
import { spacingStyle } from '@/themes/spacingStyle';
import { StackNavigationProp } from '@react-navigation/stack';

// type screenNavigationProp = NavigationProp<StackParamList>;

export const NotificationIcon = () => {
    const { navigate } = useNavigation<StackNavigationProp<StackParamList>>();
    const handlePress = () => {
        navigate('NotificationView');
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={{ marginRight: spacingStyle.small }}>
            <Ionicons name="notifications" size={24} color={'white'} />
        </TouchableOpacity>
    );
};
