import * as React from 'react'
import type { SVGProps } from 'react'
const SvgUser = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
        <path stroke="currentColor" strokeWidth={1.5} d="M21.25 12a9.25 9.25 0 1 1-18.5 0 9.25 9.25 0 0 1 18.5 0Z" />
        <path
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.25 10a3.25 3.25 0 1 1-6.5 0 3.25 3.25 0 0 1 6.5 0Z"
        />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5.354 18.429C7.1 16.497 9.466 15.75 12 15.75c2.536 0 4.903.748 6.652 2.68"
        />
    </svg>
)
export default SvgUser
