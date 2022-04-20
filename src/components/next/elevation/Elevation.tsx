import React from 'react'
import { ElevationProps } from './Elevation.types'

function Elevation({ children }: ElevationProps) {
    return (
        <>
            <svg
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                fill="transparent"
                tabIndex={-1}
            >
                <rect
                    width={'calc(100% - 1px)'}
                    height={'calc(100% - 1px)'}
                    x="0.5px"
                    y="0.5px"
                    stroke={`url(#elevation)`}
                    rx="4px"
                />
                <defs>
                    <linearGradient id="elevation" gradientTransform="rotate(90)">
                        <stop offset="0.9" stopOpacity="0.08" />
                        <stop offset="1" stopOpacity="0.2" />
                    </linearGradient>
                </defs>
            </svg>
            {children}
        </>
    )
}

export default Elevation
