import { MarginProps } from 'styled-system'

export interface BreadcrumbsProps extends MarginProps {
    /** All breadcrumbs to display. Breadcrumbs that do not fit in the container will be rendered in an overflow menu instead. */
    items: readonly BreadcrumbProps[]

    /**
     * Callback invoked to render visible breadcrumbs. 
     * Best practice is to render a <Breadcrumb> element. 
     * If currentBreadcrumbRenderer is also supplied, 
     * that callback will be used for the current breadcrumb instead.
     */
    breadcrumbRenderer?: (props: BreadcrumbProps) => JSX.Element
}

export interface BreadcrumbProps extends MarginProps {
    children?: React.ReactNode

    /** Whether this breadcrumb is the current breadcrumb. */
    current?: boolean

    /** Link URL. */
    href?: string

    /** Name of a Blueprint UI icon (or an icon element) to render before the text. */
    icon?: JSX.Element
    
    /** Pass through value to icon's title attribute. Should be used for breadcrumbs without text or children defined. */
    iconTitle?: string

    /** Action text. Can be any single React renderable. */
    text?: React.ReactNode

    /** Whether this action is non-interactive. */
    disabled?: boolean
}
