import React, { Children } from 'react'
import { Tab } from '@headlessui/react'
import { SubtleFill } from '@meshx-org/mxui-primitives'
import { ControlState } from '@meshx-org/mxui-core'
import { Text } from '@meshx-org/mxui-text'
import { TabViewProps, TabPanelsProps, ItemProps, TabListProps } from './types'
import styled from 'styled-components'
import { padding, PaddingProps } from 'styled-system'

const StyledTab = styled.div`
    cursor: pointer;
    outline: none;
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

function Item(props: ItemProps) {
    return <>{props.children}</>
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
        <Tab as={StyledTab}>
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
        </Tab>
    )
}

const StyledTabList = styled(Tab.List)<TabListProps>`
    display: flex;
    column-gap: ${(props) => props.theme.space[4]}px;

    border-bottom: 1px solid ${(props) => props.theme.colors.stroke.surface};
    // padding: ${(props) => props.theme.space[3]}px 0px;

    ${padding}
`

function TabList(props: TabListProps) {
    const { children, py = 4, ...otherProps } = props

    const arrayChildren = Children.toArray(children)

    const tabs = Children.map(arrayChildren, (child, index) => {
        return <TabInternal>{child}</TabInternal>
    })

    return (
        <StyledTabList py={py} {...otherProps}>
            {tabs}
        </StyledTabList>
    )
}

const StyledTabPanels = styled(Tab.Panels)`
    flex: 1;
    background-color: var(--theme-background-layer-default);

    ${padding}
`

function TabPanels(props: TabPanelsProps) {
    const { children, ...otherProps } = props

    if (typeof children === 'function') {
        return <StyledTabPanels {...otherProps}>{children}</StyledTabPanels>
    }

    const arrayChildren = Children.toArray(children)

    const panels = Children.map(arrayChildren, (child, index) => {
        return (
            <Tab.Panel>
                <Text>{child}</Text>
            </Tab.Panel>
        )
    })

    return <StyledTabPanels {...otherProps}>{panels}</StyledTabPanels>
}

const StyledTabs = styled(Tab.List)`
    display: flex;
    flex-direction: column;
`

function TabView(props: TabViewProps) {
    const { children, ...otherProps } = props

    return (
        <Tab.Group {...otherProps}>
            <StyledTabs>{children}</StyledTabs>
        </Tab.Group>
    )
}

export { TabView, TabList, Item, TabPanels }
