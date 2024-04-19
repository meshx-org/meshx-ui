import * as React from 'react'
import type { SVGProps } from 'react'
const SvgSmartphone = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5.75 5.75a3 3 0 0 1 3-3h6.5a3 3 0 0 1 3 3v12.5a3 3 0 0 1-3 3h-6.5a3 3 0 0 1-3-3zM13.25 5.25h-2.5"
        />
    </svg>
)
export default SvgSmartphone
