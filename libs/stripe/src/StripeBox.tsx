import React, { useState } from 'react'
import { CardElement, CardElementProps } from '@stripe/react-stripe-js'
import { StripeBoxProps } from './StripeBox.types'
import styled from 'styled-components'
import { TextControlFillX, TextControlStrokeX } from '@meshx/mxui-primitives'
import { ControlState, DEFAULT_DARK, DEFAULT_LIGHT, useTheme, useThemeValues, rgba, fontStack } from '@meshx/mxui-core'

const StyledWrapper = styled.div`
    position: relative;

    display: flex;
    height: 32px;
    padding: 0px 12px;
    min-width: 280px;
    width: 100%;

    align-items: center;
    position: relative;
`

const StyledCardElement = styled(CardElement)`
    width: 100%;

    position: relative;
    z-index: 3;
`

export function StripeBox({ style, ...props }: StripeBoxProps) {
    const theme = useTheme()
    const values = useThemeValues()
    const [focused, setFocused] = useState(false)

    const colors = theme === 'dark' ? DEFAULT_DARK : DEFAULT_LIGHT

    const options: CardElementProps['options'] = {
        hidePostalCode: true,
        style: {
            base: {
                iconColor: rgba(colors.text.primary),
                fontSize: values.fontSizes[1] + 'px',
                lineHeight: '20px',
                fontFamily: fontStack(values.fonts.default),
                color: rgba(colors.text.primary),
                '::placeholder': {
                    color: rgba(colors.text.disabled)
                }
            },
            complete: {
                iconColor: rgba(colors.accent.default)
            },
            empty: {
                color: rgba(colors.text.disabled)
            },
            invalid: {
                color: 'rgba(238, 0, 0, .7)'
            }
        }
    }

    return (
        <StyledWrapper className="wrapper">
            <StyledCardElement
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                options={options}
                {...props}
            />
            <TextControlStrokeX borderRadius={5.5} data-state={ControlState.Rest} focused={focused} />
            <TextControlFillX
                data-state={ControlState.Rest}
                data-theme={theme}
                data-focused={focused}
                borderRadius={5}
                state={ControlState.Rest}
            />
        </StyledWrapper>
    )
}
