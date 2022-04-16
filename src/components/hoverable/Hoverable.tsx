import React, { FC } from 'react'

interface IProps {
  children: (hovered: boolean) => void
}

const Hoverable: FC<IProps> = ({ children }) => {
  const child = typeof children === 'function' ? children(false) : children
  return React.cloneElement(React.Children.only(child as any), {})
}

export default Hoverable
