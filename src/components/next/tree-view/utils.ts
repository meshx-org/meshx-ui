/* eslint-disable @typescript-eslint/no-use-before-define */

import { FlattenedItem, ItemId, Path, TreeData, TreeItem, TreeItemData } from './TreeView.types'

interface TreeItemMutation {
    id?: ItemId
    children?: ItemId[]
    hasChildren?: boolean
    isExpanded?: boolean
    isSelected?: boolean
    isChildrenLoading?: boolean
    data?: TreeItemData
}

/** Constructs a new FlattenedItem */
const createFlattenedItem = (item: TreeItem, currentPath: Path): FlattenedItem => ({
    item,
    path: currentPath
})

/** Flatten the children of the given subtree */
const flattenChildren = (tree: TreeData, item: TreeItem, currentPath: Path) =>
    item.isExpanded ? flattenTree({ rootId: item.id, items: tree.items }, currentPath) : []

/**
 * Transforms tree structure into flat list of items for rendering purposes.
 * We recursively go through all the elements and its children first on each level
 */
export const flattenTree = (tree: TreeData, path: Path = []): FlattenedItem[] =>
    tree.items[tree.rootId]
        ? tree.items[tree.rootId].children.reduce<FlattenedItem[]>((accum, itemId, index) => {
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

export function iterateTree(tree: TreeData, mutation: TreeItemMutation) {
    return {
        rootId: tree.rootId,
        items: Object.fromEntries(Object.entries(tree.items).map((item) => [item[0], { ...item[1], ...mutation }]))
    }
}

/** Changes the tree data structure with minimal reference changes. */
export const mutateTree = (tree: TreeData, itemId: ItemId, mutation: TreeItemMutation): TreeData => {
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
