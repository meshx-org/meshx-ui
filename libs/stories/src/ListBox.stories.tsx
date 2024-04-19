import type { StoryObj, Meta } from '@storybook/react'
import { ListBox, Item } from '@meshx/mxui-listbox/src'
import { Section, useAsyncList, useListData } from 'react-stately'
import { Selection } from '@meshx/mxui-core'
import React, { useState } from 'react'

const meta = {
    title: 'Collections/ListBox',
    component: ListBox,
    argTypes: {},
    render: (args) => {
        return <ListBox {...args} />
    }
} satisfies Meta<typeof ListBox>

export default meta

type Story = StoryObj<typeof ListBox>

export const Default: Story = {
    args: {
        // 'aria-label': 'Links',
        children: [
            <Item href="https://adobe.com/" target="_blank">
                Adobe
            </Item>,
            <Item href="https://apple.com/" target="_blank">
                Apple
            </Item>,
            <Item href="https://google.com/" target="_blank">
                Google
            </Item>,
            <Item href="https://microsoft.com/" target="_blank">
                Microsoft
            </Item>
        ]
    }
}

export const Sections: Story = {
    args: {
        children: [
            <Section title="Animals">
                <Item key="Aardvark">Aardvark</Item>
                <Item key="Kangaroo">Kangaroo</Item>
                <Item key="Snake">Snake</Item>
            </Section>,
            <Section title="People">
                <Item key="Danni">Danni</Item>
                <Item key="Devon">Devon</Item>
                <Item key="Ross">Ross</Item>
            </Section>
        ]
    }
}

export const UsingHook: Story = {
    render(args) {
        const list = useListData({
            initialItems: [{ name: 'Aardvark' }, { name: 'Kangaroo' }, { name: 'Snake' }],
            initialSelectedKeys: ['Kangaroo'],
            getKey: (item) => item.name
        })

        return (
            <ListBox<any>
                items={list.items}
                selectedKeys={list.selectedKeys}
                onSelectionChange={list.setSelectedKeys}
                {...args}
            >
                {(item) => <Item key={item.name}>{item.name}</Item>}
            </ListBox>
        )
    },
    args: {}
}

type Pokemon = {
    name: string
}

export const AsyncLoading: Story = {
    render(args) {
        let list = useAsyncList<Pokemon>({
            async load({ signal, cursor }) {
                // If no cursor is available, then we're loading the first page.
                // Otherwise, the cursor is the next URL to load, as returned from the previous page.
                let res = await fetch(cursor || 'https://pokeapi.co/api/v2/pokemon', {
                    signal
                })
                let json = await res.json()
                return {
                    items: json.results,
                    cursor: json.next
                }
            }
        })

        return (
            <div className="max-h-48 flex">
                <ListBox
                    aria-label="Pick a Pokemon"
                    items={list.items}
                    isLoading={list.isLoading}
                    onLoadMore={list.loadMore}
                    // width="size-2400"
                >
                    {(item) => <Item key={item.name}>{item.name}</Item>}
                </ListBox>
            </div>
        )
    },
    args: {}
}

export const SelectionS: Story = {
    render() {
        const options = [
            { name: 'Koala' },
            { name: 'Kangaroo' },
            { name: 'Platypus' },
            { name: 'Bald Eagle' },
            { name: 'Bison' },
            { name: 'Skunk' }
        ]

        const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(['Bison']))

        return (
            <div className="flex flex-row gap-2">
                <ListBox
                    selectionMode="multiple"
                    aria-label="Pick an animal"
                    items={options}
                    defaultSelectedKeys={['Bison', 'Koala']}
                    // width="size-2400"
                >
                    {(item) => <Item key={item.name}>{item.name}</Item>}
                </ListBox>

                <ListBox
                    selectionMode="multiple"
                    aria-label="Pick an animal"
                    items={options}
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                    // width="size-2400"
                >
                    {(item) => <Item key={item.name}>{item.name}</Item>}
                </ListBox>
            </div>
        )
    }
}
