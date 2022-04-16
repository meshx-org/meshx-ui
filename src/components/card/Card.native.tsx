import React, { FC } from 'react'
import { View } from 'react-native'
import { ICardProps } from './Card.types'

const Card: FC<ICardProps> = ({ children, type = 'solid' }) => (
  <View
    style={{
      minHeight: 20,
      borderRadius: 4,
      padding: 8,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.06)',
      backgroundColor: 'white',
      shadowColor: 'rgb(42, 42, 42)',
      shadowOpacity: 0.08,
      shadowRadius: 4
    }}
  >
    {children}
  </View>
)

export { Card }
