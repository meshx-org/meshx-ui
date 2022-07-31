/* eslint-disable import/no-extraneous-dependencies */

import React, { useState } from 'react'

import { Story, Meta } from '@storybook/react'

import { Pressable, View, Text, Animated } from 'react-native'
import { TreeView } from '../components/tree-view/TreeView'
import { ItemId, RenderItemParams, TreeItem, TreeViewProps } from '../components/tree-view/TreeView.types'
import { iterateTree, mutateTree } from '../components/tree-view/utils'

// 👇 This default export determines where your story goes in the story list
const meta: Meta = {
    title: 'Containers/TreeView',
    component: TreeView,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
}

function getChevron(item: TreeItem<any>, onExpand: (itemId: ItemId) => void, onCollapse: (itemId: ItemId) => void) {
    const value = new Animated.Value(item.isExpanded ? 1 : 0)

    return (
        <Pressable
            style={{ justifyContent: 'center' }}
            onPress={() => (item.isExpanded ? onCollapse(item.id) : onExpand(item.id))}
        >
            <Animated.View
                style={{
                    width: 12,
                    height: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [
                        {
                            rotate: value.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '90deg']
                            })
                        }
                    ]
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 5 10" fill="none">
                    <path
                        d="M0.148438 8.85547C0.0507812 8.75781 0.00195312 8.63867 0.00195312 8.49805C0.00195312 8.35742 0.0507812 8.24023 0.148438 8.14648L3.29492 5L0.148438 1.85352C0.0507812 1.75586 0.00195312 1.63867 0.00195312 1.50195C0.00195312 1.36133 0.0507812 1.24219 0.148438 1.14453C0.246094 1.04687 0.363281 0.998047 0.5 0.998047C0.640625 0.998047 0.757812 1.04687 0.851562 1.14453L4.35547 4.64844C4.45312 4.74609 4.50195 4.86328 4.50195 5C4.50195 5.13672 4.45312 5.25391 4.35547 5.35156L0.851562 8.85547C0.753906 8.95312 0.636719 9.00195 0.5 9.00195C0.371094 9.00195 0.253906 8.95312 0.148438 8.85547Z"
                        fill="black"
                        fill-opacity="0.8956"
                    />
                </svg>
            </Animated.View>
        </Pressable>
    )
}

const renderItem = ({ item, onExpand, onCollapse }: RenderItemParams<any>) => {
    const { title, glyph } = item.data

    return (
        <View style={{ flexDirection: 'row', height: 20 }}>
            {item.hasChildren && getChevron(item, onExpand, onCollapse)}
            <Text ellipsizeMode="tail" numberOfLines={1} style={{ marginLeft: 4 }}>
                {glyph} {title}
            </Text>
        </View>
    )
}

// 👇 We create a “template” of how props map to rendering
const Template: Story<TreeViewProps<any>> = (props) => {
    const [tree, setTree] = useState(props.tree)

    const onExpand = (itemId: ItemId) => {
        setTree((oldTree) => mutateTree(oldTree, itemId, { isExpanded: true }))
    }

    const onCollapse = (itemId: ItemId) => {
        setTree((oldTree) => mutateTree(oldTree, itemId, { isExpanded: false }))
    }

    const onInvoke = (itemId: ItemId) => {
        setTree((oldTree) => {
            let newTree = iterateTree(oldTree, { isSelected: false })
            newTree = mutateTree(newTree, itemId, { isSelected: true })
            return newTree
        })
    }

    return (
        <TreeView {...props} tree={tree} onExpand={onExpand} onCollapse={onCollapse} onInvoke={onInvoke}>
            {(item) => renderItem(item)}
        </TreeView>
    )
}

export const Default = Template.bind({})

Default.decorators = [
    (S) => (
        <div style={{ width: '300px' }}>
            <S />
        </div>
    )
]

Default.args = {
    tree: {
        rootId: 0,
        items: {
            0: { id: 0, children: [1, 2], data: { title: 'Perfect', glyph: '💯' }, hasChildren: true },
            1: { id: 1, children: [3, 4], data: { title: 'Lovely', glyph: '😍' }, hasChildren: true },
            2: { id: 2, children: [5, 6], data: { title: 'Funny', glyph: '😁' }, hasChildren: true, isSelected: true },
            3: { id: 3, children: [], data: { title: 'Design', glyph: '🎨' }, hasChildren: false },
            4: { id: 4, children: [], data: { title: 'Fire', glyph: '🔥' }, hasChildren: false },
            5: { id: 5, children: [], data: { title: 'Ideas', glyph: '💡' }, hasChildren: false },
            6: { id: 6, children: [], data: { title: 'Party', glyph: '🎉' }, hasChildren: false }
        }
    }
}

export default meta
