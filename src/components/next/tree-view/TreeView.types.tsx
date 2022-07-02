import { ReactNode } from 'react'

export interface TreeViewNodeProps {
    item: TreeItem
    path: Path
    onExpand: (itemId: ItemId, path: Path) => void
    onCollapse: (itemId: ItemId, path: Path) => void
    onInvoke: (itemId: ItemId) => void
    renderTreeItem: (item: RenderItemParams) => ReactNode
    offsetPerLevel: number
}

export enum TreeViewSelectionMode {
    None = 'none',
    Single = 'single'
}

export interface TreeViewProps {
    children: (item: RenderItemParams) => ReactNode

    /** The tree data structure. */
    tree: TreeData

    canDragItems?: boolean
    canReorderItems?: boolean

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

export interface TreeData {
    rootId: ItemId
    items: Record<ItemId, TreeItem>
}

export type TreeItemData = unknown

export interface TreeItem {
    id: ItemId
    children: ItemId[]
    hasChildren?: boolean
    isSelected?: boolean
    isExpanded?: boolean
    isChildrenLoading?: boolean
    data?: TreeItemData
}

export type FlattenedTree = FlattenedItem[]

export type Path = number[]

export interface FlattenedItem {
    item: TreeItem
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

export interface RenderItemParams {
    item: TreeItem
    depth: number
    onExpand: (itemId: ItemId) => void
    onCollapse: (itemId: ItemId) => void
    // provided: TreeDraggableProvided
    // snapshot: DraggableStateSnapshot
}
