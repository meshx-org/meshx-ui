import { AsyncLoadable, CollectionBase } from '@meshx/mxui-core'
import { CSSProperties, ReactNode } from 'react'
import { FocusEvents } from 'react-aria'
import { Key, SelectionBehavior, SelectionMode, Selection } from 'react-stately'

export type FocusStrategy = 'first' | 'last'

export type MultipleSelection = {
    /** The type of selection that is allowed in the collection. */
    selectionMode?: SelectionMode
    /** Whether the collection allows empty selection. */
    disallowEmptySelection?: boolean
    /** The currently selected keys in the collection (controlled). */
    selectedKeys?: 'all' | Iterable<Key>
    /** The initial selected keys in the collection (uncontrolled). */
    defaultSelectedKeys?: 'all' | Iterable<Key>
    /** Handler that is called when the selection changes. */
    onSelectionChange?: (keys: Selection) => any
    /** The currently disabled keys in the collection (controlled). */
    disabledKeys?: Iterable<Key>
}

export interface ListBoxPropsBase<T> extends CollectionBase<T>, MultipleSelection, FocusEvents {
    /** Whether to auto focus the listbox or an option. */
    autoFocus?: boolean | FocusStrategy

    /** Whether focus should wrap around when the end/start is reached. */
    shouldFocusWrap?: boolean
}

export type StyleProps = {
    UNSAFE_style: CSSProperties
    width?: string | number
}

export interface ListBoxProps<T> extends ListBoxPropsBase<T>, AsyncLoadable, StyleProps {
    /** An optional visual label for the listbox. */
    label?: ReactNode

    /** How multiple selection should behave in the collection. */
    selectionBehavior?: SelectionBehavior

    /**
     * Handler that is called when a user performs an action on an item. The exact user event depends on
     * the collection's `selectionBehavior` prop and the interaction modality.
     */
    onAction?: (key: Key) => void
}
