import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Tabs, TabPanels, TabList, Item, TabsProps } from '@meshx-org/mxui-navigation/src'

const argTypes = {}

export default {
    title: 'Navigation/Tabs',
    component: Tabs,
    argTypes: argTypes
} as Meta

const TabsTemplate: Story<TabsProps> = (args) => {
    return (
        <Tabs aria-label="History of Ancient Rome">
            <TabList>
                <Item key="FoR">Founding of Rome</Item>
                <Item key="MaR">Monarchy and Republic</Item>
                <Item key="Emp">Empire</Item>
            </TabList>
            <TabPanels>
                <Item key="FoR">Arma virumque cano, Troiae qui primus ab oris.</Item>
                <Item key="MaR">Senatus Populusque Romanus. </Item>
                <Item key="Emp">Alea jacta est.</Item>
            </TabPanels>
        </Tabs>
    )
}

export const Default = TabsTemplate.bind({})
Default.args = {}
