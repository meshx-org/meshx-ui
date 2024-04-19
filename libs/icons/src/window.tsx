import * as React from 'react'
import type { SVGProps } from 'react'
const SvgWindow = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.75 6.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v10.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3zM2.75 10.25h18.5M9 6.75v.5M6 6.75v.5"
        />
    </svg>
)
export default SvgWindow
