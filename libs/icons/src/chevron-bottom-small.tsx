import * as React from 'react'
import type { SVGProps } from 'react'
const SvgChevronBottomSmall = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m7.75 9.75 4.25 4.5 4.25-4.5"
        />
    </svg>
)
export default SvgChevronBottomSmall
