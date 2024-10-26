import React from 'react'
import { ProgressCircleProps } from './ProgressCircle.types'
import { DOMRef } from '@meshx/mxui-core'

function ProgressCircle(props: ProgressCircleProps, ref: DOMRef<HTMLDivElement>) {
    const { isIndeterminate = false, value = 0, minValue = 0, maxValue = 100 } = props

    let dashoffset = 95
    if (!isIndeterminate) {
        let percentage = ((value - minValue) / (maxValue - minValue)) * 100
        dashoffset = 125.60000000000001 * (1 - percentage / 100)
    }

    return (
        <svg
            width="60"
            height="60"
            viewBox="-7.5 -7.5 75 75"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'rotate(-90deg)' }}
        >
            <circle
                r="20"
                cx="30"
                cy="30"
                fill="transparent"
                stroke="var(--theme-stroke-divider)"
                stroke-width="4"
                stroke-dasharray="125.60000000000001px"
                stroke-dashoffset="0"
            ></circle>

            <circle
                r="20"
                cx="30"
                cy="30"
                stroke="var(--theme-accent-default)"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dashoffset={dashoffset}
                fill="transparent"
                stroke-dasharray={125.60000000000001}
            >
                {isIndeterminate && (
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="0 30 30"
                        to="360 30 30"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                )}
            </circle>
        </svg>
    )
}

/**
 * ProgressCircles show the progression of a system operation such as downloading, uploading, or processing, in a visual way.
 * They can represent determinate or indeterminate progress.
 */
const _ProgressCircle = React.forwardRef(ProgressCircle)
export { _ProgressCircle as ProgressCircle }
