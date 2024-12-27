import { DividerProps } from '@/interface';
import { View } from 'react-native';

export const Divider = ({
    width = 1.5,
    orientation = 'horizontal',
    color = '#DFE4EA',
    dividerStyle,
}: DividerProps) => {
    const dividerStyles = [
        { width: orientation === 'horizontal' ? '100%' : width },
        { height: orientation === 'vertical' ? '100%' : width },
        { backgroundColor: color },
        dividerStyle,
    ];
    return <View style={dividerStyles} />;
};
