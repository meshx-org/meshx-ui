import React, { useRef, useEffect, useState, useCallback, ChangeEventHandler, HTMLProps } from 'react'
import ReactSlider from 'react-slider'

import { useControlState, useTheme } from '@meshx/mxui-core'
import { CircleControlStroke } from '@meshx/mxui-primitives'
import { SliderProps } from './Slider.types'
import styled, { CSSProperties } from 'styled-components'

const StyledSliderWrapper = styled.label``

const StyledReactSlider = styled(ReactSlider)`
    position: relative;
    min-width: 120px;
    height: 22px;
`

const StyledProgress = styled.div`
    position: absolute;
    pointer-events: none;
    background: #0096ff;
    height: 4px;
    top: 9px;
    bottom: 9px;
    border-radius: 12px;
`

const StyledRail = styled.div`
    position: absolute;
    pointer-events: none;
    height: 4px;
    top: 9px;
    bottom: 9px;
    border-radius: 12px;
    background: var(--theme-stroke-control);
`

const StyledTick = styled.span`
    position: absolute;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 1px;
        height: 4px;
        background: var(--theme-stroke-control);
    }

    &::after {
        top: 17px;
    }

    &::before {
        top: 1px;
    }
`

const StyledThumb = styled.div`
    position: absolute;
    height: 22px;
    width: 22px;
    cursor: pointer;

    ${StyledSliderWrapper}[data-state='disabled'] & {
        cursor: not-allowed;
    }

    span {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        transition: all 0.1s ease;
        background: rgba(0, 150, 255, 1);
    }

    &:hover span {
        height: 14px;
        width: 14px;
    }

    &:active span {
        height: 10px;
        width: 10px;
        background: rgba(0, 150, 255, 0.8);
    }
`

const StyledThumbInner = styled.div`
    margin: 1px;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    ${StyledSliderWrapper}[data-theme='light'] & {
        background: white;
    }

    ${StyledSliderWrapper}[data-theme='dark'] & {
        background: rgba(69, 69, 69, 1);
    }

    ${StyledSliderWrapper}[data-theme='light'][data-state='disabled'] & span {
        height: 10px !important;
        width: 10px !important;
        background: rgba(0, 0, 0, 0.32) !important;
    }

    ${StyledSliderWrapper}[data-theme='dark'][data-state='disabled'] & span {
        height: 10px !important;
        width: 10px !important;
        background: rgba(255, 255, 255, 0.16) !important;
    }
`

const getPercent = (value: number, min: number, max: number) => (max === min ? 0 : ((value - min) / (max - min)) * 100)

export function Slider(props: SliderProps) {
    const { disabled = false, min = 0, max = 100, defaultValue = 0, value, onChange, width = 200 } = props
    const theme = useTheme()
    const { state, handlers } = useControlState<HTMLInputElement>(disabled)
    const [valueInternal, setValueInternal] = useState<number>(defaultValue)

    useEffect(() => {
        if (value) setValueInternal(value)
        return () => {}
    }, [value])

    const handleChange = useCallback<(value: number | readonly number[], index: number) => void>(
        (v) => {
            setValueInternal(v as number)
            if (onChange) {
                onChange(v as number)
            }
        },
        [onChange]
    )

    const renderThumb = (thumbProps: HTMLProps<HTMLSpanElement>) => (
        <StyledThumb {...handlers} {...(thumbProps as any)}>
            <CircleControlStroke borderRadius={4} state={state}>
                <StyledThumbInner>
                    <span />
                </StyledThumbInner>
            </CircleControlStroke>
        </StyledThumb>
    )

    const renderTrack = ({ style, ...trackProps }: HTMLProps<HTMLDivElement>, trackState: any): JSX.Element => {
        const { left, right } = style as CSSProperties

        return trackState.index === 0 ? (
            <StyledProgress {...(trackProps as any)} style={{ left: Number(left) + 1, right: Number(right) + 1 }} />
        ) : (
            <StyledRail {...(trackProps as any)} style={{ left: Number(left) + 1, right: Number(right) + 1 }} />
        )
    }

    const renderMark = ({ style, ...markProps }: HTMLProps<HTMLDivElement>) => {
        const { left, ...rest } = style as CSSProperties
        return <StyledTick {...(markProps as any)} style={{ left: Math.round(Number(left) + 10), ...rest }} />
    }

    return (
        <StyledSliderWrapper id="test" data-theme={theme} data-state={state} style={{ width }}>
            <StyledReactSlider
                disabled={disabled}
                step={25}
                marks={25}
                min={min}
                max={max}
                onChange={handleChange}
                value={valueInternal}
                onBeforeChange={() => {}}
                renderMark={renderMark}
                renderTrack={renderTrack}
                renderThumb={renderThumb}
            />
        </StyledSliderWrapper>
    )
}
