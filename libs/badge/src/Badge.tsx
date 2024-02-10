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
        border: 1px solid #8A8A8A;
        background: #8A8A8A;
    }

    [data-theme='dark'] &[data-variant='default'] {
        border: solid 1px #60CDFF;
        background: #60CDFF;
    }

    [data-theme='dark'] &[data-variant='help'] {
        border: 1px solid #8A8A8A;
        background: #8A8A8A;
    }

    [data-theme='dark'] &[data-variant='warning'] {
        border: 1px solid #FCE100;
        background: #FCE100;
    }

    [data-theme='dark'] &[data-variant='danger'] {
        border: 1px solid #FF99A4;
        background: #FF99A4;
    }

    [data-theme='dark'] &[data-variant='success'] {
        border: 1px solid #6CCB5F;
        background: #6CCB5F;
    }

    // ----

    [data-theme='light'] &[data-variant='info'] {
        border: 1px solid #8A8A8A;
        background: #8A8A8A;
    }

    [data-theme='light'] &[data-variant='default'] {
        border: solid 1px #005FB7;
        background: #005FB7;
    }

    [data-theme='light'] &[data-variant='help'] {
        border: 1px solid #8A8A8A;
        background: #8A8A8A;
    }

    [data-theme='light'] &[data-variant='warning'] {
        border: 1px solid #9D5D00;
        background: #9D5D00;
    }

    [data-theme='light'] &[data-variant='danger'] {
        border: 1px solid #C42B1C;
        background: #C42B1C;
    }

    [data-theme='light'] &[data-variant='success'] {
        border: 1px solid #0F7B0F;
        background: #0F7B0F;
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
    help: QuestionIcon,
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
