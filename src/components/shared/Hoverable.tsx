import React, { FC } from 'react';
import { View } from 'react-native';

interface IProps {
    children: (hovered: boolean) => void
}

/* Mock */
const Hoverable: FC<IProps> = ({ children }) => {
    const child =
        typeof children === 'function' ? children(false) : children;

    return (
        <View>
            {child as any}
        </View>
    );
}

export default Hoverable