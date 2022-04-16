import type { FC } from 'react'
import type { PressableProps, TextProps } from 'react-native'

export type ButtonAppearance = 'primary' | 'secondary'

export interface IButtonProps extends PressableProps {
  apparance: ButtonAppearance
  children: React.ReactNode
}

export type PressableState = Readonly<{
  pressed: boolean
  hovered?: boolean
  focused?: boolean
}>

export type ButtonComponent = { Text: FC<TextProps> } & FC<IButtonProps>
