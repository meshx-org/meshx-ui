import { ReactNode } from 'react'
import { ControlState } from '@meshx-org/mxui-core'

export interface TreeViewNodeProps<T> {
    item: TreeItem<T>
    path: Path
    onExpand: (itemId: ItemId, path: Path) => void
    onCollapse: (itemId: ItemId, path: Path) => void
    onInvoke: (itemId: ItemId) => void
    renderTreeItem: (item: RenderItemParams<T>) => ReactNode
    offsetPerLevel: number
}

export enum TreeViewSelectionMode {
    None = 'none',
    Single = 'single'
}

export interface TreeViewProps<T> {
    children: (item: RenderItemParams<T>) => ReactNode

    /** The tree data structure. */
    tree: TreeData<T>

    canDragItems?: boolean
    canReorderItems?: boolean
    
    rowGap?: number

    /** Function that will be called when a parent item needs to be expanded. */
    onExpand: (itemId: ItemId, path: Path) => void

    /** Function that will be called when a parent item needs to be collapsed. */
    onCollapse: (itemId: ItemId, path: Path) => void

    /** Function that will be called when an item is invoked. */
    onInvoke: (itemId: ItemId) => void

    /**
     * An enumeration value that specifies the selection behavior for a TreeView.
     * @defaults TreeViewSelectionMode.Single
     */
    selectionMode?: TreeViewSelectionMode

    /**
     * Number of pixel is used to scaffold the tree by the consumer.
     * @default 10
     */
    offsetPerLevel?: number
}

export type ItemId = string | number

export interface TreeData<T> {
    rootId: ItemId
    items: Record<ItemId, TreeItem<T>>
}

export type TreeItemData = unknown

export interface TreeItem<T> {
    id: ItemId
    children: ItemId[]
    hasChildren?: boolean
    isSelected?: boolean
    isExpanded?: boolean
    isChildrenLoading?: boolean
    data?: T
}

export type FlattenedTree<T> = FlattenedItem<T>[]

export type Path = number[]

export interface FlattenedItem<T> {
    item: TreeItem<T>
    path: Path
}

export interface TreeSourcePosition {
    parentId: ItemId
    index: number
}

export interface TreeDestinationPosition {
    parentId: ItemId
    index?: number
}

export interface RenderItemParams<T> {
    item: TreeItem<T>
    depth: number
    onExpand: (itemId: ItemId) => void
    onCollapse: (itemId: ItemId) => void
    state: ControlState
    // provided: TreeDraggableProvided
    // snapshot: DraggableStateSnapshot
}
