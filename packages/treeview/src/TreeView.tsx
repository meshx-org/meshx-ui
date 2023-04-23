import React, { useMemo } from 'react'
import { ControlState, useThemeColors } from '@meshx-org/mxui-core'
import { SubtleFillX } from '@meshx-org/mxui-primitives'
import { FlattenedItem, TreeViewNodeProps, TreeViewProps } from './TreeView.types'
import { flattenTree } from './utils'
import { CSSProperties } from 'styled-components'

const rnToControlState = (pressableState: any): ControlState => {
    if (pressableState.pressed) return ControlState.Pressed
    if (pressableState.hovered) return ControlState.Hovered

    return ControlState.Rest
}

function TreeViewNode<T = unknown>(props: TreeViewNodeProps<T>) {
    const { item, renderTreeItem, path, onCollapse, onExpand, onInvoke, offsetPerLevel } = props

    const colors = useThemeColors()

    const handlePress = () => {
        onInvoke(item.id)
        if (item.isExpanded) {
            onCollapse(item.id, path)
        } else {
            onExpand(item.id, path)
        }
    }

    const state = item.isSelected ? ControlState.Hovered : ControlState.Rest

    return (
        <button
            role="menuitem"
            onClick={handlePress}
            style={{
                display: 'flex',
                width: '100%',
                height: 32,
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                background: 'none',
                cursor: 'pointer'
            }}
        >
            <>
                <div
                    style={{
                        overflow: 'hidden',
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        justifyContent: 'center',
                        marginRight: 4,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5
                    }}
                >
                    <div
                        style={{
                            width: 3,
                            height: '50%',
                            borderRadius: 8,
                            backgroundColor: item.isSelected ? colors.fill.accent : 'transparent'
                        }}
                    />
                </div>

                <SubtleFillX borderRadius={5} data-state={state} />

                <div
                    style={{
                        padding: '0 4px',
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 1,
                        color: colors.text.primary,
                        paddingLeft: (path.length - 1) * offsetPerLevel
                    }}
                >
                    {renderTreeItem({
                        item,
                        state,
                        depth: path.length - 1,
                        onExpand: (itemId) => onExpand(itemId, path),
                        onCollapse: (itemId) => onCollapse(itemId, path)
                    })}
                </div>
            </>
        </button>
    )
}

export interface ListRenderItemInfo<T> {
    item: T
    index: number
}

export type ListRenderItem<T> = (info: ListRenderItemInfo<T>) => React.ReactElement | null

interface VirtualizedListProps<T> {
    data: T[]
    contentContainerStyle?: CSSProperties

    renderItem: ListRenderItem<T>
    getItemCount: (data: T[]) => number
    getItem: (data: T[], index: number) => T
    keyExtractor: (item: T, index: number) => string
}

function VirtualizedList<T>({
    getItemCount,
    renderItem,
    keyExtractor,
    getItem,
    data,
    contentContainerStyle
}: VirtualizedListProps<T>) {
    const itemCount = getItemCount(data)

    return (
        <div role="menu" style={contentContainerStyle}>
            {Array.from({ length: itemCount }).map((_, index) =>
                renderItem({
                    item: data[index],
                    index
                })
            )}
        </div>
    )
}

export function TreeView<T = unknown>(props: TreeViewProps<T>) {
    const flattenedTree = useMemo(() => flattenTree(props.tree), [props.tree])

    const renderTreeItem: ListRenderItem<FlattenedItem<T>> = ({ item }) => (
        <TreeViewNode
            key={item.item.id}
            item={item.item}
            path={item.path}
            onExpand={props.onExpand}
            onCollapse={props.onCollapse}
            onInvoke={props.onInvoke}
            renderTreeItem={props.children}
            offsetPerLevel={props.offsetPerLevel ?? 24}
        />
    )

    // TODO: virtualize

    return (
        <VirtualizedList
            // showsVerticalScrollIndicator={false}
            // contentInset={{ right: 0, top: 8, left: 8, bottom: 8 }}
            contentContainerStyle={{ width: '100%' }}
            getItemCount={(data) => data.length}
            getItem={(data, i) => data[i]}
            // getItemLayout={(data, index) => ({ length: 28, offset: 28 * index, index })}
            keyExtractor={(item) => item.item.id.toString()}
            renderItem={renderTreeItem}
            data={flattenedTree}
        />
    )
}

// <TreeView.ItemTemplate>singleDataTemplate</TreeView.ItemTemplate>
