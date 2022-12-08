import React from 'react'
import { Tab } from '@headlessui/react'
import { SubtleFill } from '@meshx-org/mxui-primitives'
import { ControlState } from '@meshx-org/mxui-core'
import { Text } from '@meshx-org/mxui-text'
import { TabsProps, TabPanelsProps, ItemProps, TabListProps } from './types'
import styled from 'styled-components'

const StyledTab = styled(Tab)`
    background: none;
    outline: 0;
    cursor: pointer;
`

const StyledTabContent = styled.div`
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    position: relative;
`

const StyledTabList = styled(Tab.List)`
    display: flex;
    column-gap: ${(props) => props.theme.space[4]}px;
    padding: ${(props) => props.theme.space[3]}px 0px;
    border-bottom: 1px solid ${(props) => props.theme.colors.stroke.surface};
`

function Item(props: ItemProps) {
    return null
}

const Selector = styled.div`
    height: 3px;
    width: 20px;
    border-radius: 8px;
    background-color: rgba(3, 150, 255, 1);
`

const SelectorWrapper = styled.div`
    bottom: 0;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
`

/** @private */
function TabInternal(props: any) {
    return (
        <StyledTab>
            {({ selected }: any) => (
                <SubtleFill state={selected ? ControlState.Hovered : ControlState.Rest}>
                    <StyledTabContent>
                        <Text
                            variant="body"
                            selectable={false}
                            color={false ? 'text.disabled' : 'text.primary'}
                            children={props.children}
                        />
                        <SelectorWrapper>{selected ? <Selector /> : null}</SelectorWrapper>
                    </StyledTabContent>
                </SubtleFill>
            )}
        </StyledTab>
    )
}

function TabList(props: TabListProps) {
    return (
        <StyledTabList>
            <TabInternal children="Home" />
            <TabInternal children="New Tab" />
            <TabInternal children="Tab 3" />
        </StyledTabList>
    )
}

const StyledTabPanels = styled(Tab.Panels)`
    flex: 1;
    background-color: var(--theme-background-layer-default);
`

function TabPanels(props: TabPanelsProps) {
    return (
        <StyledTabPanels>
            <Tab.Panel>
                <Text variant="body">Content 1</Text>
            </Tab.Panel>
            <Tab.Panel>
                <Text>Content 2</Text>
            </Tab.Panel>
            <Tab.Panel>
                <Text>Content 3</Text>
            </Tab.Panel>
        </StyledTabPanels>
    )
}

const StyledTabs = styled(Tab.List)`
    display: flex;
    flex-direction: column;
`

function Tabs(props: TabsProps) {
    return (
        <Tab.Group>
            <StyledTabs>{props.children}</StyledTabs>
        </Tab.Group>
    )
}

export { Tabs, TabList, Item, TabPanels }
