import React, { ChangeEventHandler, useCallback, useState, useEffect } from 'react'
import { useTheme, useControlState } from '@meshx-org/mxui-core'
import type { SwitchProps } from './Switch.types'
import styled, { ThemeProvider } from 'styled-components'

const StyledSwitchWrapper = styled.label`
    height: 32px;
    align-items: center;
    column-gap: 10px;
    display: flex;

    -webkit-user-select: none;
    user-select: none;

    font-size: 14px;
    line-height: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;

    &[data-theme='light'] {
        color: black;
    }

    &[data-theme='dark'] {
        color: white;
    }
`

const StyledSwitchStroke = styled.div`
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: 12px;
    transition: 0.2s ease;

    border: 1px solid ${(props) => (props.theme.name === 'dark' ? 'rgba(255, 255, 255, 0.54)' : 'rgba(0, 0, 0, 0.45)')};
`

const StyledThumb = styled.div`
    position: absolute;
    border-radius: 6px;
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    transition: 0.2s ease;

    background: ${({ theme }) => (theme.name === 'dark' ? 'rgba(255, 255, 255, 0.79)' : 'rgba(0, 0, 0, 0.61)')};

    ${StyledSwitchWrapper} input:disabled ~ & {
        transform: scale(1) !important;
        width: 12px !important;
    }

    ${StyledSwitchWrapper} input:checked ~ & {
        left: 24px;
    }

    ${StyledSwitchWrapper}:active input:checked ~ & {
        left: 21px;
    }

    ${StyledSwitchWrapper}[data-theme='light'] input:checked ~ & {
        background-color: white;
    }

    ${StyledSwitchWrapper}[data-theme='dark'] input:checked ~ & {
        background-color: black;
    }
`

const StyledSlider = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    transition: 0.2s ease;
    box-shadow: 0 0 0 1px transparent;

    ${StyledSwitchWrapper}[data-theme='light'] & {
        background: rgba(0, 0, 0, 0.06);
    }

    ${StyledSwitchWrapper}[data-theme='light'][data-state='rest'] & {
        background: rgba(0, 0, 0, 0.02);
    }

    ${StyledSwitchWrapper}[data-theme='dark'] & {
        background: rgba(255, 255, 255, 0.04);
    }

    ${StyledSwitchWrapper}[data-theme='dark'][data-state='rest'] & {
        background: rgba(0, 0, 0, 0.1);
    }
`

const StyledSwitch = styled.div`
    display: flex;
    position: relative;
    width: 40px;
    height: 20px;
    cursor: pointer;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    input:checked ~ ${StyledSlider} {
        background-color: rgb(33, 150, 243) !important;
        box-shadow: 0 0 0 1px rgb(33, 150, 243);
    }

    input:checked ~ ${StyledSwitchStroke} {
        border: 1px solid rgba(0, 0, 0, 0.06);
    }

    &:active ${StyledThumb} {
        width: 15px;
    }

    &:hover ${StyledThumb} {
        transform: scale(1.125);
    }
`

export function Switch(props: SwitchProps) {
    const { defaultValue, value, onChange, disabled } = props

    const theme = useTheme()
    const { handlers, state } = useControlState<HTMLLabelElement>(disabled)
    const [checkedInternal, setCheckedInternal] = useState(defaultValue)

    useEffect(() => {
        setCheckedInternal(value)
    }, [value])

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            setCheckedInternal(event.target.checked)
            if (onChange) {
                onChange(event.target.checked)
            }
        },
        [onChange]
    )

    return (
        <ThemeProvider theme={{ name: theme, state }}>
            <StyledSwitchWrapper data-theme={theme} data-state={state} {...handlers}>
                <StyledSwitch>
                    <input
                        autoFocus
                        disabled={disabled}
                        checked={checkedInternal}
                        onChange={handleChange}
                        title="Switch"
                        type="checkbox"
                    />
                    <StyledSlider />
                    <StyledSwitchStroke />
                    <StyledThumb />
                </StyledSwitch>
                {checkedInternal ? 'On' : 'Off'}
            </StyledSwitchWrapper>
        </ThemeProvider>
    )
}
