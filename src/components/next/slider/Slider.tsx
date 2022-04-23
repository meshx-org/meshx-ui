import React, { useRef, useEffect, useState, useCallback, ChangeEventHandler } from 'react'

import ReactSlider from 'react-slider'
import styles from './Slider.module.css'
import { useControlState } from '../../../hooks/useControlState'
import { useTheme } from '../../../provider/ThemeProvider'
import { SliderProps } from './Slider.types'
import { CircleControlElevation } from '../elevation/Elevation'

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

    return (
        <label id="test" data-theme={theme} data-state={state} className={styles.slider} style={{ width }}>
            <ReactSlider
                ariaLabelledby="test"
                className={styles.slider}
                disabled={disabled}
                step={25}
                marks={25}
                min={min}
                max={max}
                onChange={handleChange}
                value={valueInternal}
                thumbClassName={styles.thumb}
                markClassName={styles.tick}
                trackClassName={styles.rail}
                onBeforeChange={() => {}}
                renderMark={({ style, ...markProps }) => {
                    const { left, ...rest } = style as { left: number }
                    return <div style={{ left: Math.round(left + 10), ...rest }} {...markProps} />
                }}
                renderTrack={({ style, ...trackProps }, trackState) => {
                    const { left, right } = style as { left: number; right: number }

                    return (
                        <div
                            {...trackProps}
                            className={trackState.index === 0 ? styles.progress : styles.rail}
                            style={{ left: left + 1, right: right + 1 }}
                        />
                    )
                }}
                renderThumb={(thumbProps) => (
                    <div className={styles.thumb} {...handlers} {...thumbProps}>
                        <CircleControlElevation state={state}>
                            <div className={styles.thumbInner}>
                                <span />
                            </div>
                        </CircleControlElevation>
                    </div>
                )}
            />
        </label>
    )
}

export function SliderX(props: SliderProps) {
    const { disabled = false, min = 0, max = 100, defaultValue = 0, value, onChange, width = 200 } = props
    const ref = useRef<HTMLInputElement | null>(null)

    const theme = useTheme()
    const { state, handlers } = useControlState<HTMLInputElement>(disabled)
    const [valueInternal, setValueInternal] = useState<number>(defaultValue)

    useEffect(() => {
        if (value) setValueInternal(value)
        return () => {}
    }, [value])

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            setValueInternal(Number(event.target.value))
            if (onChange) {
                onChange(Number(event.target.value))
            }
        },
        [onChange]
    )

    const calcThumbPosition = () => {
        const leftMin = min + 1
        const leftMax = max - 1

        const percent = getPercent(valueInternal, leftMin, leftMax)

        return (percent / 100) * (width - 20)
    }

    const calcTrackWidth = () => {
        const percent = getPercent(valueInternal, min, max)

        return (percent / 100) * (width - 22)
    }

    return (
        <label data-theme={theme} data-state={state} className={styles.slider} style={{ width }}>
            <div className={styles.rail} />
            <div className={styles.progress} style={{ width: calcTrackWidth() + 10 }} />
            <div className={styles.thumb} style={{ left: calcThumbPosition() }}>
                <CircleControlElevation state={state}>
                    <div className={styles.thumbInner}>
                        <span />
                    </div>
                </CircleControlElevation>
            </div>
            <input
                {...handlers}
                ref={ref}
                type="range"
                min={min}
                max={max}
                disabled={disabled}
                step={max / width}
                value={valueInternal}
                onChange={handleChange}
            />
        </label>
    )
}
