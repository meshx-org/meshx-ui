import * as React from 'react'
import type { SVGProps } from 'react'
const SvgTablet = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.75 5.75a3 3 0 0 1 3-3h8.5a3 3 0 0 1 3 3v12.5a3 3 0 0 1-3 3h-8.5a3 3 0 0 1-3-3zM12.25 18.25h-.5"
        />
    </svg>
)
export default SvgTablet
