import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabList, TabPanels, Item, Spacer } from '@meshx/mxui'
import React from 'react'

const meta = {
    title: 'Navigation/Tabs',
    component: Tabs,
    render(args) {
        return (
            <Tabs aria-label="History of Ancient Rome" {...args}>
                <TabList>
                    <Item key="FoR">Founding of Rome</Item>
                    <Item key="MaR">Monarchy and Republic</Item>
                    <Item key="Emp">Empire</Item>
                </TabList>
                <TabPanels>
                    <Item key="FoR">Arma virumque cano, Troiae qui primus ab oris.</Item>
                    <Item key="MaR">Senatus Populusque Romanus.</Item>
                    <Item key="Emp">Alea jacta est.</Item>
                </TabPanels>
            </Tabs>
        )
    }
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
    args: {}
}

export const DynamicItems: Story = {
    args: {},
    render(args) {
        const [tabs, setTabs] = useState([
            { id: 1, title: 'Tab 2', content: 'Tab body 2' },
            { id: 2, title: 'spacer', content: '' },
            { id: 3, title: 'Tab 3', content: 'Tab body 3' },
            { id: 4, title: 'Tab 4', content: 'Tab body 4' }
        ])

        type Tab = (typeof tabs)[0]
        const [tabId, setTabId] = useState<any>(1)
        
        const items = [
            { id: "item1", content: "1" },
            { id: "item2", content: "2" },
            { id: "item3", content: "3" }
        ]

        return (
            <>
                <p>Current tab id: {tabId}</p>
                <Tabs aria-label="History of Ancient Rome" items={items} onSelectionChange={k => setTabId(k)}>
                    <TabList>
                        <Item key="item1">John Doe</Item>
                        <Item key="item2">Jane Doe</Item>
                        <Spacer key="spacer" />
                        <Item key="item3">Joe Bloggs</Item>
                    </TabList>

                    <TabPanels>
                        {(item: any) => <Item key={item.id}>{item.content}</Item>}
                    </TabPanels>
                </Tabs>
            </>
        )
    }
}
