import React, { SVGProps } from 'react'
import { BadgeProps, BadgeVariant } from './Badge.types'
import styles from './Badge.module.scss'

const QuestionIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.75 5a2.25 2.25 0 0 1 4.5 0c0 .895-.523 1.646-1.28 1.996-.502.232-.97.659-.97 1.211v.047M7 10.75v.5"
        />
    </svg>
)

const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 6.75v4.5m0-8.5v.5"
        />
    </svg>
)

const AttentionIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 2v10M10.5 3.5l-7 7M12 7H2M10.5 10.5l-7-7"
        />
    </svg>
)

const WarningIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 7.25v-4.5m0 8.5v-.5"
        />
    </svg>
)

const SuccessIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m2.75 7.75 2.631 2.631a.5.5 0 0 0 .722-.015L11.5 4.5"
        />
    </svg>
)

const DangerIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10.25 3.75 5.77 8.23M3.75 3.75l4.304 4.304m2.196 2.196L7.966 7.966M3.75 10.25l2.284-2.284"
        />
    </svg>
)

const iconVariants: Record<BadgeVariant, any> = {
    info: InfoIcon,
    'info.subtle': InfoIcon,
    help: QuestionIcon,
    'help.subtle': InfoIcon,
    default: AttentionIcon,
    warning: WarningIcon,
    success: SuccessIcon,
    danger: DangerIcon
}

export function Badge(props: BadgeProps) {
    const { children, variant = 'default' } = props

    const Icon = iconVariants[variant]

    return (
        <div>
            <span className={styles.BadgeInner} data-variant={variant}>
                {children ?? <Icon />}
            </span>
        </div>
    )
}

Badge.displayName = `Badge`
