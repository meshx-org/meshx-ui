import * as React from 'react'
import type { SVGProps } from 'react'
const SvgLock = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.75 12.75a3 3 0 0 1 3-3h10.5a3 3 0 0 1 3 3v5.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3zM12 16.25v-1.5M16.25 9.75V7a4.25 4.25 0 0 0-8.5 0v2.75"
        />
    </svg>
)
export default SvgLock
