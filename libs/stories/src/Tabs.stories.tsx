import React from 'react'
import { Story, Meta } from '@storybook/react'
import { TabView, TabPanels, TabList, Item, TabViewProps } from '@meshx/mxui-navigation'
import { Button } from '@meshx/mxui-button'

const argTypes = {}

export default {
    title: 'Navigation/TabView',
    component: TabView,
    argTypes: argTypes
} as Meta

const TabsTemplate: Story<TabViewProps> = (args) => {
    return (
        <TabView aria-label="History of Ancient Rome">
            <TabList px={6}>
                <Item key="FoR">Home</Item>
                <Item key="MaR">Analytics</Item>
                <Item key="Emp">Settings</Item>
            </TabList>
            <TabPanels p={4}>
                <Item key="FoR">Arma virumque cano, Troiae qui primus ab oris.</Item>
                <Item key="MaR">Senatus Populusque Romanus. </Item>
                <Item key="Emp">
                    <Button>Hello</Button>
                </Item>
            </TabPanels>
        </TabView>
    )
}

export const Default = TabsTemplate.bind({})
Default.args = {}

const ControlledTabsTemplate: Story<TabViewProps> = (args) => {
    return (
        <TabView aria-label="History of Ancient Rome">
            <TabList px={6}>
                <Item key="FoR">Home</Item>
                <Item key="MaR">Analytics</Item>
                <Item key="Emp">Settings</Item>
            </TabList>
            <TabPanels p={4}>{(props) => <Item key="FoR">{props.selectedIndex}</Item>}</TabPanels>
        </TabView>
    )
}

export const Controlled = ControlledTabsTemplate.bind({})
Controlled.args = {}
