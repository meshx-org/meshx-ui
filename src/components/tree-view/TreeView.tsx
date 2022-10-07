import React, { useMemo } from 'react'
import { ListRenderItem, View, VirtualizedList, StyleSheet, Pressable } from 'react-native'
import { ControlState } from 'src/common'
import { useThemeValues, ThemeValues } from '../../context/ThemeProvider'
import { FlattenedItem, TreeViewNodeProps, TreeViewProps } from './TreeView.types'
import { flattenTree } from './utils'

const styles = (theme: ThemeValues) =>
    StyleSheet.create({
        container: {},
        treeViewNode: {
            borderRadius: 5,
            marginBottom: 4,
            flexDirection: 'row'
        },
        treeViewItem: {
            paddingVertical: 6,
            flex: 1,
            color: theme.textColor.primary
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
            height: '50%',
            borderRadius: 8
        }
    })

function useThemedStyles<T>(styleWrapper: (values: ThemeValues) => T) {
    const theme = useThemeValues()
    return styleWrapper(theme)
}

function TreeViewNode<T = unknown>(props: TreeViewNodeProps<T>) {
    const { item, renderTreeItem, path, onCollapse, onExpand, onInvoke } = props

    const themeValues = useThemeValues()
    const style = useThemedStyles(styles)

    const handlePress = () => {
        onInvoke(item.id)
        if (item.isExpanded) {
            onCollapse(item.id, path)
        } else {
            onExpand(item.id, path)
        }
    }

    const getBackgroundColor = (state: any) => {
        if (state.pressed) return themeValues.fillColor.subtle
        if (item.isSelected || state.hovered) return themeValues.fillColor.secondary

        return 'transparent'
    }

    return (
        <Pressable
            accessibilityRole="menuitem"
            onLongPress={() => {}}
            onPress={handlePress}
            style={(state) => [
                style.treeViewNode,
                {
                    backgroundColor: getBackgroundColor(state)
                }
            ]}
        >
            {(state) => (
                <>
                    <View style={style.selectorWrapper}>
                        <View
                            style={[
                                style.selector,
                                { backgroundColor: item.isSelected ? themeValues.fillColor.accent : 'transparent' }
                            ]}
                        />
                    </View>

                    <View style={[style.treeViewItem, { paddingLeft: (path.length - 1) * 20 }]}>
                        {renderTreeItem({
                            item,
                            state: state.pressed ? ControlState.Pressed : ControlState.Rest,
                            depth: path.length - 1,
                            onExpand: (itemId) => onExpand(itemId, path),
                            onCollapse: (itemId) => onCollapse(itemId, path)
                        })}
                    </View>
                </>
            )}
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
            offsetPerLevel={props.offsetPerLevel ?? 28}
        />
    )

    return (
        <VirtualizedList
            accessibilityRole="menu"
            // showsVerticalScrollIndicator={false}
            // contentInset={{ right: 0, top: 8, left: 8, bottom: 8 }}
            style={{ marginBottom: -4 }}
            contentContainerStyle={{}}
            windowSize={11}
            maxToRenderPerBatch={5}
            getItemCount={(data) => data.length}
            getItem={(data, i) => data[i]}
            getItemLayout={(data, index) => ({ length: 28, offset: 28 * index, index })}
            keyExtractor={(item) => item.item.id.toString()}
            renderItem={renderTreeItem}
            data={flattenedTree}
        />
    )
}

// <TreeView.ItemTemplate>singleDataTemplate</TreeView.ItemTemplate>
