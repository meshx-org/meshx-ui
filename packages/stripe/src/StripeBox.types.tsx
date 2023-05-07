import { CardElementProps } from '@stripe/react-stripe-js'
import { CSSProperties } from 'react'

export interface StripeBoxProps extends CardElementProps {
    style?: CSSProperties
}
