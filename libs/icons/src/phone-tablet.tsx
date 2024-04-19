import * as React from 'react'
import type { SVGProps } from 'react'
const SvgPhoneTablet = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7.75 8.757V6.75a3 3 0 0 1 3-3h6.5a3 3 0 0 1 3 3v9.5a3 3 0 0 1-3 3h-5.27"
        />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.75 10.75a2 2 0 0 1 2-2h4.5a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-4.5a2 2 0 0 1-2-2zM8.25 17.75h-.5"
        />
    </svg>
)
export default SvgPhoneTablet
