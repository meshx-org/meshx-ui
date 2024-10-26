import { ThemeValue, Theme, ResponsiveValue } from 'styled-system'

export interface DividerProps<ThemeType extends Theme = Required<Theme>, TVal = string | number | symbol> {
    dividerColor?: ResponsiveValue<TVal, ThemeType> | undefined
    className?: string
}
