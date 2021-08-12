import React, { FC, useState } from 'react';

interface IProps {
    children: (hovered: boolean) => void
}

const Hoverable: FC<IProps> = ({ children }) => {
    const [isHovered, setHovered] = useState(false)

    const child =
        typeof children === 'function' ? children(isHovered) : children;

    return React.cloneElement(React.Children.only(child as any), {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false)
    });
}

export default Hoverable