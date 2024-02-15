import React, { SVGProps } from 'react'
import { BadgeProps, BadgeVariant } from './Badge.types'
import styled from 'styled-components'

const BadgeStyled = styled.div``

const BadgeInner = styled.span`
    width: fit-content;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    [data-theme='dark'] & {
        color: rgb(0, 0, 0);
    }

    [data-theme='light'] & {
        color: rgb(255, 255, 255);
    }

    // ---

    [data-theme='dark'] &[data-variant='info'] {
        border: 1px solid #8a8a8a;
        background: #8a8a8a;
    }

    [data-theme='dark'] &[data-variant='default'] {
        border: solid 1px #60cdff;
        background: #60cdff;
    }

    [data-theme='dark'] &[data-variant='help'] {
        border: 1px solid #8a8a8a;
        background: #8a8a8a;
    }

    [data-theme='dark'] &[data-variant='help.subtle'],
    [data-theme='dark'] &[data-variant='info.subtle'] {
        border: 1px solid var(--theme-subtle-default);
        background: var(--theme-subtle-default);
        color: white;
    }

    [data-theme='dark'] &[data-variant='warning'] {
        border: 1px solid #fde047;
        background: #fde047;
    }

    [data-theme='dark'] &[data-variant='danger'] {
        border: 1px solid #fca5a5;
        background: #fca5a5;
    }

    [data-theme='dark'] &[data-variant='success'] {
        border: 1px solid #86efac;
        background: #86efac;
    }

    // ----

    [data-theme='light'] &[data-variant='info'] {
        border: 1px solid #8a8a8a;
        background: #8a8a8a;
    }

    [data-theme='light'] &[data-variant='help'] {
        border: 1px solid #8a8a8a;
        background: #8a8a8a;
    }

    [data-theme='light'] &[data-variant='help.subtle'],
    [data-theme='light'] &[data-variant='info.subtle'] {
        border: 1px solid var(--theme-subtle-default);
        background: var(--theme-subtle-default);
        color: black;
    }

    [data-theme='light'] &[data-variant='default'] {
        border: solid 1px #005fb7;
        background: #005fb7;
    }

    [data-theme='light'] &[data-variant='warning'] {
        border: 1px solid #d97706;
        background: #d97706;
    }

    [data-theme='light'] &[data-variant='danger'] {
        border: 1px solid #dc2626;
        background: #dc2626;
    }

    [data-theme='light'] &[data-variant='success'] {
        border: 1px solid #16a34a;
        background: #16a34a;
    }
`

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
        <BadgeStyled>
            <BadgeInner data-variant={variant}>{children ?? <Icon />}</BadgeInner>
        </BadgeStyled>
    )
}

Badge.displayName = `Badge`
