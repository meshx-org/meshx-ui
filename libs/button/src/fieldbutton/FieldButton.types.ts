import { ButtonProps } from '../types'

export type FieldButtonProps = {
    isQuiet?: boolean
    isActive?: boolean
    validationState?: 'valid' | 'invalid'
    isInvalid?: boolean
    focusRingClass?: string
} & ButtonProps
// & DOMProps &
//StyleProps
