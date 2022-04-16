import React, { FC, useState } from 'react'

interface IProps {
  children: (hovered: boolean) => void
}

const Hoverable: FC<IProps> = ({ children }) => {
  const [isHovered, setHovered] = useState(false)

  const child = typeof children === 'function' ? children(isHovered) : children

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {child as any}
    </div>
  )
}

export default Hoverable
