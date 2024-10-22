import { HTMLAttributes, ReactNode } from 'react'

import { ListState } from '@react-stately/list'
import { StyleProps } from './ListBox.types'
import { AriaListBoxOptions } from '@react-aria/listbox'
import { ListBoxLayout } from './ListBoxLayout'

export interface ListBoxBaseProps<T> extends AriaListBoxOptions<T>, StyleProps {
    layout: ListBoxLayout<T>
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
    showLoadingSpinner?: boolean
    onLoadMore?: () => void
    renderEmptyState?: () => ReactNode
    onScroll?: () => void
}
//&DOMProps &
//AriaLabelingProps &
