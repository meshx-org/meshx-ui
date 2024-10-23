/* eslint-disable import/no-extraneous-dependencies */

import React, { useState } from 'react'

import { Story, Meta } from '@storybook/react'

import { Pressable, View, Animated } from 'react-native'
import { Text } from '@meshx/mxui'
import { TreeView, ItemId, RenderItemParams, TreeItem, TreeViewProps, iterateTree, mutateTree } from '@meshx/mxui'

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
                    width: 24,
                    height: 24,
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9.74997 7.75082L14.25 12L9.74997 16.2493"
                        stroke="rgba(0,0,0,0.5)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </Animated.View>
        </Pressable>
    )
}

const renderItem = ({ item, onExpand, onCollapse }: RenderItemParams<any>) => {
    const { title, glyph } = item.data

    return (
        <a href="/docs">
            <View style={{ flexDirection: 'row' }}>
                {item.hasChildren && getChevron(item, onExpand, onCollapse)}
                <Text>
                    {glyph} {title}
                </Text>
            </View>{' '}
        </a>
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
        console.log('onInvoke', itemId)
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
            0: {
                id: 0,
                children: [1, 2],
                data: { title: 'Root', glyph: '💯' },
                hasChildren: true
            },
            1: { id: 1, children: [3, 4], data: { title: 'Lovely', glyph: '😍' }, hasChildren: true },
            2: { id: 2, children: [5, 6], data: { title: 'Funny', glyph: '😁' }, hasChildren: true, isSelected: true },
            3: {
                id: 3,
                children: [],
                data: { title: 'Perfect todo adssad asd dsad s asd dfasd s', glyph: '🎨' },
                hasChildren: false
            },
            4: { id: 4, children: [], data: { title: 'Fire', glyph: '🔥' }, hasChildren: false },
            5: { id: 5, children: [], data: { title: 'Ideas', glyph: '💡' }, hasChildren: false },
            6: { id: 6, children: [], data: { title: 'Party', glyph: '🎉' }, hasChildren: false }
        }
    }
}

export default meta
