import * as React from 'react'
import type { SVGProps } from 'react'
const SvgSettingLineHorizontal = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.75 5h18.5M2.75 19h18.5m-18.5-7h18.5M7.75 7.25v-4.5m8.5 11.5v-4.5M12 21.25v-4.5"
        />
    </svg>
)
export default SvgSettingLineHorizontal
