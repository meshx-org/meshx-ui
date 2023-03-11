import React, { useMemo } from 'react'
import { ListRenderItem, View, VirtualizedList, StyleSheet, Pressable } from 'react-native'
import { ControlState, ColorScheme, useThemeColors } from '@meshx-org/mxui-core'
import { SubtleFillX } from '@meshx-org/mxui-primitives'
import { FlattenedItem, TreeViewNodeProps, TreeViewProps } from './TreeView.types'
import { flattenTree } from './utils'

const styles = (colors: ColorScheme) =>
    StyleSheet.create({
        treeViewNode: {
            display: 'flex',
            height: 32,
            flexDirection: 'row'
        },
        treeViewItem: {
            paddingVertical: 4,
            // justifyContent: 'center',
            flex: 1,
            color: colors.text.primary
        },
        selectorWrapper: {
            overflow: 'hidden',
            flexShrink: 0,
            justifyContent: 'center',
            marginRight: 4,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5
        },
        selector: {
            // TODO: animate transform: [{ translateY: 10 }],
            width: 3,
            height: 16,
            borderRadius: 8
        }
    })

function useThemedStyles<T>(styleWrapper: (colors: ColorScheme) => T) {
    const colors = useThemeColors()
    return styleWrapper(colors)
}

function TreeViewNode<T = unknown>(props: TreeViewNodeProps<T>) {
    const { item, renderTreeItem, path, onCollapse, onExpand, onInvoke, offsetPerLevel } = props

    const colors = useThemeColors()
    const style = useThemedStyles(styles)

    const handlePress = () => {
        onInvoke(item.id)
        if (item.isExpanded) {
            onCollapse(item.id, path)
        } else {
            onExpand(item.id, path)
        }
    }

    const rnToControlState = (pressableState: any): ControlState => {
        if (pressableState.pressed) return ControlState.Pressed
        if (pressableState.hovered) return ControlState.Hovered

        return ControlState.Rest
    }

    return (
        <Pressable accessibilityRole="menuitem" onPress={handlePress} style={(state) => [style.treeViewNode]}>
            {(pressableState) => {
                const state = rnToControlState(pressableState)
                return (
                    <>
                        <View style={style.selectorWrapper}>
                            <View
                                style={[
                                    style.selector,
                                    {
                                        backgroundColor: item.isSelected ? colors.fill.accent : 'transparent'
                                    }
                                ]}
                            />
                        </View>

                        <SubtleFillX borderRadius={5} data-state={item.isSelected ? ControlState.Hovered : state} />

                        <View style={[style.treeViewItem, { paddingLeft: (path.length - 1) * offsetPerLevel }]}>
                            {renderTreeItem({
                                item,
                                state,
                                depth: path.length - 1,
                                onExpand: (itemId) => onExpand(itemId, path),
                                onCollapse: (itemId) => onCollapse(itemId, path)
                            })}
                        </View>
                    </>
                )
            }}
        </Pressable>
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

    return (
        <VirtualizedList
            accessibilityRole="menu"
            // showsVerticalScrollIndicator={false}
            // contentInset={{ right: 0, top: 8, left: 8, bottom: 8 }}
            contentContainerStyle={{}}
            windowSize={11}
            maxToRenderPerBatch={5}
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
