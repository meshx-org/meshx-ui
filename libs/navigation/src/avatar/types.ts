import { MarginProps } from 'styled-system'

export interface AvatarProps extends MarginProps {
    size?: number
    alt?: string
    src: string
    name: string
}
