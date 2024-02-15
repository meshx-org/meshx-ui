import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCheckmarkSmall = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m7.75 12.75 2.203 2.203a1 1 0 0 0 1.493-.09L16.25 8.75"
        />
    </svg>
)
export default SvgCheckmarkSmall
