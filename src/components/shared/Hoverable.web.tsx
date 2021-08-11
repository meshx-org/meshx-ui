import React, { FC, useState } from 'react';
import { View as RNView, ViewProps, HostComponent } from 'react-native';

interface IHoverProps { onMouseEnter?: () => void, onMouseLeave?: () => void }

let View = RNView as HostComponent<ViewProps | IHoverProps>

interface IProps {
    children: (hovered: boolean) => void
}

const Hoverable: FC<IProps> = ({ children }) => {
    const [isHovered, setHovered] = useState(false)

    const child =
        typeof children === 'function' ? children(isHovered) : children;

    return (
        <View
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            {child as any}
        </View>
    );
}

export default Hoverable