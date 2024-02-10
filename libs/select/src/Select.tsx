import React from 'react'
import { SelectProps } from './Select.types'
import { ControlFill, ControlFillX, ControlStroke, ControlStrokeX } from '@meshx-org/mxui-primitives'
import { useControlState, useTheme } from '@meshx-org/mxui-core'
import styled from 'styled-components'

const Icon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M14.9911 8.58117L12.7447 6.08166C12.3471 5.63921 11.6532 5.63911 11.2554 6.08143L9.0076 8.581"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M14.9911 15.418L12.7447 17.9175C12.3471 18.3599 11.6532 18.36 11.2554 17.9177L9.0076 15.4181"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

const defaultIcon = <Icon />

const StyledSelect = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    border: none;
    background: transparent;

    width: fit-content;
    height: 32px;

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

    pointer-events: none;
`

const SelectContent = styled.div`
    position: relative;
    z-index: 3;

    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 6px;

    span {
        opacity: 0.7;
        pointer-events: none;
        position: absolute;
        width: 24px;
        height: 24px;
    }

    span.left {
        left: 4px;
    }

    span.right {
        right: 4px;
    }
`

const SelectInput = styled.select`
    padding: 0 12px;
    background: none;
    border: none;

    height: 32px;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
`

export function Select(props: SelectProps) {
    const {
        children,
        icon,
        iconRight = defaultIcon,
        apparance = 'default',
        disabled = false,
        as,
        ...otherProps
    } = props
    const { state, handlers } = useControlState<HTMLSelectElement>(disabled)
    const theme = useTheme()

    return (
        <StyledSelect className="focusable" as={as} {...otherProps} data-theme={theme} data-state={state} {...handlers}>
            <SelectContent>
                {icon && <span className="left">{icon}</span>}
                <SelectInput
                    style={{ paddingLeft: icon ? 28 : undefined, paddingRight: iconRight ? 28 : undefined }}
                    color={disabled ? 'text.disabled' : 'text.primary'}
                >
                    <option>System</option>
                    <option>Dark</option>
                    <option>Light</option>
                </SelectInput>
                {iconRight && <span className="right">{iconRight}</span>}
            </SelectContent>

            <ControlStrokeX borderRadius={5.5} state={state} />
            <ControlFillX data-state={state} variant={'default'} borderRadius={6} />
        </StyledSelect>
    )
}
