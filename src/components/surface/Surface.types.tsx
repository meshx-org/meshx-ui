import type { SpaceProps } from 'styled-system'
import { surfaceVariants } from 'src/common/constants'

export interface SurfaceProps extends SpaceProps {
    children?: React.ReactNode | React.ReactNode[] | unknown
    variant: keyof typeof surfaceVariants
}
