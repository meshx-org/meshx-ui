import React from 'react'
import { CardElement, CardElementProps } from '@stripe/react-stripe-js'
import { StripeBoxProps } from './StripeBox.types'
import styled from 'styled-components'
import { ControlFillX, ControlStrokeX } from '@meshx-org/mxui-primitives'
import {
    ControlState,
    DEFAULT_DARK,
    DEFAULT_LIGHT,
    useTheme,
    useThemeColors,
    useThemeValues
} from '@meshx-org/mxui-core'

const StyledWrapper = styled.div`
    position: relative;

    display: flex;
    height: 32px;
    padding: 0px 12px;
    min-width: 280px;

    align-items: center;
    position: relative;
    width: fit-content;
`

const StyledCardElement = styled(CardElement)`
    width: 100%;

    position: relative;
    z-index: 3;
`

export function StripeBox({ style, ...props }: StripeBoxProps) {
    const theme = useTheme()
    const values = useThemeValues()

    const colors = theme === 'dark' ? DEFAULT_DARK : DEFAULT_LIGHT

    const options: CardElementProps['options'] = {
        hidePostalCode: true,
        style: {
            base: {
                iconColor: colors.text.primary,
                fontSize: values.fontSizes[1] + 'px',
                lineHeight: '20px',
                fontFamily: values.fonts.default,
                color: colors.text.primary,
                '::placeholder': {
                    color: colors.text.disabled
                }
            },
            complete: {
                iconColor: colors.accent.default
            },
            empty: {
                color: colors.text.disabled
            },
            invalid: {
                color: 'rgba(238, 0, 0, .7)'
            }
        }
    }

    return (
        <StyledWrapper className="wrapper">
            <ControlStrokeX borderRadius={5.5} state={ControlState.Rest} focused={false} />
            <ControlFillX borderRadius={5} state={ControlState.Rest} />
            <StyledCardElement options={options} {...props} />
        </StyledWrapper>
    )
}
