import React from 'react'
import { SelectProps } from './Select.types'
import { ControlFill, ControlStroke } from '@meshx-org/mxui-primitives'
import { useControlState, useTheme } from '@meshx-org/mxui-core'
import styled from 'styled-components'
import { color } from 'styled-system'

const Icon = () => {
    const theme = useTheme()
    const colorMap: Record<string, string> = {
        light: 'rgba(0,0,0,0.6)',
        dark: 'rgba(255,255,255,0.5)'
    }

    return (
        <StyledIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M14.9911 8.58117L12.7447 6.08166C12.3471 5.63921 11.6532 5.63911 11.2554 6.08143L9.0076 8.581"
                    stroke={colorMap[theme]}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M14.9911 15.418L12.7447 17.9175C12.3471 18.3599 11.6532 18.36 11.2554 17.9177L9.0076 15.4181"
                    stroke={colorMap[theme]}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </StyledIcon>
    )
}

const StyledSelect = styled.div`
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    display: flex;
    align-items: flex-start;
    cursor: pointer;

    &[data-state='disabled'] {
        pointer-events: none;
    }

    &[data-state='pressed'] .buttonContent {
        opacity: 0.5;
    }
`

const StyledIcon = styled.div`
    // transform: scale(0.75);
    display: flex;
    padding: 0px 2px;
    align-items: center;
    justify-content: right;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
`

const SelectContent = styled.select`
    ${color}

    background: none;
    height: 32px;
    min-width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    column-gap: 8px;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
`

export function Select(props: SelectProps) {
    const { children, apparance = 'default', disabled = false, as, ...otherProps } = props
    const { state, handlers } = useControlState<HTMLSelectElement>(disabled)
    const theme = useTheme()

    return (
        <StyledSelect as={as} {...otherProps} data-theme={theme} data-state={state} {...handlers}>
            <ControlStroke borderRadius={5.5} state={state}>
                <ControlFill borderRadius={5} state={state}>
                    <SelectContent color={disabled ? 'text.disabled' : 'text.primary'}>
                        <option>test</option>
                        <option>test2</option>
                        <option>test3</option>
                    </SelectContent>
                    <Icon />
                </ControlFill>
            </ControlStroke>
        </StyledSelect>
    )
}
