import * as React from 'react'
import type { SVGProps } from 'react'
const SvgShieldLock = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10.25 20.25c-4.122-2.721-6.501-6.976-6.501-11.916V5.6c0-.524.305-1 .78-1.218a17.9 17.9 0 0 1 14.94 0c.477.218.782.694.782 1.218v3.733"
        />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.25 15.747h-4.5m4.5 0a1 1 0 0 1 1 1v3.502a1 1 0 0 1-1 1.001h-4.5a1 1 0 0 1-1-1v-3.502a1 1 0 0 1 1-1m4.5 0v-1.752a2.25 2.25 0 1 0-4.5 0v1.751"
        />
    </svg>
)
export default SvgShieldLock
