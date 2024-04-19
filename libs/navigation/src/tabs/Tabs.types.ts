import { CollectionBase, SingleSelection, StyleProps } from '@meshx/mxui-core'
import { ReactNode } from 'react'
import { Key, Orientation } from 'react-aria'

type AriaTabListBase = {
    /**
     * Whether tabs are activated automatically on focus or manually.
     * @default 'automatic'
     */
    keyboardActivation?: 'automatic' | 'manual'
    
    /**
     * The orientation of the tabs.
     * @default 'horizontal'
     */
    orientation?: Orientation
}

export interface TabsProps<T> extends AriaTabListBase, SingleSelection, StyleProps {
    /** The children of the `<Tabs>` element. Should include `<TabList>` and `<TabPanels>` elements. */
    children: ReactNode
    
    /** The item objects for each tab, for dynamic collections. */
    items?: Iterable<T>
    
    /** The keys of the tabs that are disabled. These tabs cannot be selected, focused, or otherwise interacted with. */
    disabledKeys?: Iterable<Key>
    
    /** Whether the Tabs are disabled. */
    isDisabled?: boolean
    
    /** Whether the tabs are displayed in a quiet style. */
    isQuiet?: boolean
    
    /** Whether the tabs are displayed in an emphasized style. */
    isEmphasized?: boolean
    
    /** The amount of space between the tabs. */
    density?: 'compact' | 'regular'
}

export interface TabListProps<T> extends CollectionBase<T>, Omit<SingleSelection, 'disallowEmptySelection'> {
    /**
     * Whether the TabList is disabled.
     * Shows that a selection exists, but is not available in that circumstance.
     */
    isDisabled?: boolean
}

export type TabPanelsProps<T> = any
