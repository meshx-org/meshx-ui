import * as React from 'react'
import type { SVGProps } from 'react'
const SvgSurround = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5.443 5.475A9.22 9.22 0 0 0 2.75 12a9.22 9.22 0 0 0 2.693 6.523M18.557 5.475A9.22 9.22 0 0 1 21.25 12a9.22 9.22 0 0 1-2.693 6.523M7.582 7.579A6.23 6.23 0 0 0 5.75 12c0 1.727.7 3.289 1.832 4.42m8.836-8.841A6.23 6.23 0 0 1 18.25 12c0 1.727-.7 3.289-1.832 4.42M15.25 12a3.25 3.25 0 1 1-6.5 0 3.25 3.25 0 0 1 6.5 0"
        />
    </svg>
)
export default SvgSurround
