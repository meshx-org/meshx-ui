import * as React from 'react'
import type { SVGProps } from 'react'
const SvgSetting = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 4.238c0-.822.666-1.488 1.488-1.488h1.524c.822 0 1.488.666 1.488 1.488v.299c0 1.585 1.716 2.575 3.088 1.783a1.373 1.373 0 0 1 1.875.502l.878 1.52c.379.656.154 1.496-.503 1.875-1.372.792-1.372 2.774 0 3.566.657.379.882 1.218.503 1.875l-.878 1.52a1.373 1.373 0 0 1-1.875.502c-1.372-.792-3.088.198-3.088 1.783v.3c0 .82-.666 1.487-1.488 1.487h-1.524a1.49 1.49 0 0 1-1.488-1.488v-.299c0-1.585-1.716-2.575-3.088-1.783a1.373 1.373 0 0 1-1.875-.502l-.878-1.52a1.373 1.373 0 0 1 .503-1.875c1.372-.792 1.372-2.774 0-3.566a1.373 1.373 0 0 1-.503-1.875l.878-1.52a1.373 1.373 0 0 1 1.875-.502c1.372.792 3.088-.198 3.088-1.783z"
        />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.25 12a3.25 3.25 0 1 1-6.5 0 3.25 3.25 0 0 1 6.5 0"
        />
    </svg>
)
export default SvgSetting
