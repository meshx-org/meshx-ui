import { HTMLAttributes, ReactNode } from 'react'

import { ListLayout } from '@react-stately/layout'
import { ListState } from 'react-stately'
import { AriaListBoxOptions } from 'react-aria'
import { StyleProps } from './ListBox.types'

export interface ListBoxBaseProps<T> extends AriaListBoxOptions<T>, StyleProps {
    layout: ListLayout<T>
    state: ListState<T>
    // TODO - autoFocus?: boolean | FocusStrategy
    shouldFocusWrap?: boolean
    shouldSelectOnPressUp?: boolean
    focusOnPointerEnter?: boolean
    domProps?: HTMLAttributes<HTMLElement>
    disallowEmptySelection?: boolean
    shouldUseVirtualFocus?: boolean
    transitionDuration?: number
    isLoading?: boolean
    onLoadMore?: () => void
    renderEmptyState?: () => ReactNode
    onScroll?: () => void
}
//&DOMProps &
//AriaLabelingProps &
