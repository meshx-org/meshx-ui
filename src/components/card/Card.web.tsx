import React, { CSSProperties, FC } from 'react'
import { ICardProps } from './Card.types'

const Card: FC<ICardProps> = ({ children, type = 'solid', cursor = 'default' }) => {
  let cursorStyle: CSSProperties['cursor']

  if (cursor === 'grab') {
    cursorStyle = 'grab'
  } else if (cursor === 'grabbing') {
    cursorStyle = 'grabbing'
  }

  return (
    <div className="card" style={{ cursor: cursorStyle }}>
      {children}
    </div>
  )
}

export { Card }

// backdropFilter: 'blur(10px)',
