import React, { useCallback } from 'react'
import { BreadcrumbProps, BreadcrumbsProps } from './types'
import styled from 'styled-components'

function Breadcrumb(props: BreadcrumbProps) {
    return <div>{props.text ?? props.children}</div>
}

const StyledBreadcrumbs = styled.ul`
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    
    line-height: 20px;
    font-size: var(--h5-size,14px);
    color: var(--theme-text-secondary);
`

const Separator = styled.li`
    margin: 0 8px;
`

const BreadcrumbWrapper = styled.li`
    display: flex;
`

export function Breadcrumbs(props: BreadcrumbsProps) {
    const renderBreadcrumb = useCallback((itemProps: BreadcrumbProps, isCurrent: boolean) => {
        /*if (isCurrent && props.currentBreadcrumbRenderer != null) {
        return props.currentBreadcrumbRenderer(props)
    } else if (props.breadcrumbRenderer != null) {
        return props.breadcrumbRenderer(props)
    } else {
        // allow user to override 'current' prop
        return <Breadcrumb current={isCurrent} {...props} />
    }*/

        if (props.breadcrumbRenderer != null) {
            return props.breadcrumbRenderer(itemProps)
        } else {
            // allow user to override 'current' prop
            return <Breadcrumb current={isCurrent} {...itemProps} />
        }
    }, [])

    const items = props.items.map((item, idx) => {
        return (
            <BreadcrumbWrapper>
                {renderBreadcrumb(item, false)}
                {idx !== props.items.length - 1 ? <Separator>/</Separator> : null}
            </BreadcrumbWrapper>
        )
    })

    return <StyledBreadcrumbs>{items}</StyledBreadcrumbs>
}
