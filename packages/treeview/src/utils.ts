/* eslint-disable @typescript-eslint/no-use-before-define */

import { FlattenedItem, ItemId, Path, TreeData, TreeItem } from './TreeView.types'

interface TreeItemMutation<T> {
    id?: ItemId
    children?: ItemId[]
    hasChildren?: boolean
    isExpanded?: boolean
    isSelected?: boolean
    isChildrenLoading?: boolean
    data?: T
}

/** Constructs a new FlattenedItem */
function createFlattenedItem<T = unknown>(item: TreeItem<T>, currentPath: Path): FlattenedItem<T> {
    return {
        item,
        path: currentPath
    }
}

/** Flatten the children of the given subtree */
function flattenChildren<T = unknown>(tree: TreeData<T>, item: TreeItem<T>, currentPath: Path) {
    return item.isExpanded ? flattenTree({ rootId: item.id, items: tree.items }, currentPath) : []
}

/**
 * Transforms tree structure into flat list of items for rendering purposes.
 * We recursively go through all the elements and its children first on each level
 */
export function flattenTree<T = unknown>(tree: TreeData<T>, path: Path = []): FlattenedItem<T>[] {
    return tree.items[tree.rootId]
        ? tree.items[tree.rootId].children.reduce<FlattenedItem<T>[]>((accum, itemId, index) => {
              // iterating through all the children on the given level
              const item = tree.items[itemId]
              const currentPath = [...path, index]
              // we create a flattened item for the current item
              const currentItem = createFlattenedItem(item, currentPath)
              // we flatten its children
              const children = flattenChildren(tree, item, currentPath)
              // append to the accumulator
              return [...accum, currentItem, ...children]
          }, [])
        : []
}

export function iterateTree<T = unknown>(tree: TreeData<T>, mutation: TreeItemMutation<T>) {
    return {
        rootId: tree.rootId,
        items: Object.fromEntries(Object.entries(tree.items).map((item) => [item[0], { ...item[1], ...mutation }]))
    }
}

/** Changes the tree data structure with minimal reference changes. */
export function mutateTree<T = unknown>(tree: TreeData<T>, itemId: ItemId, mutation: TreeItemMutation<T>): TreeData<T> {
    const itemToChange = tree.items[itemId]

    if (!itemToChange) {
        return tree
    }

    return {
        rootId: tree.rootId,
        items: {
            ...tree.items,
            [itemId]: {
                ...itemToChange,
                ...mutation
            }
        }
    }
}
