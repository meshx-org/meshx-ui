import React, { Children } from 'react'
import { Tab } from '@headlessui/react'
import { ControlState } from '@meshx-org/mxui-core'
import { LinkButton } from '@meshx-org/mxui-button'
import { Text } from '@meshx-org/mxui-text'
import { TabViewProps, TabPanelsProps, ItemProps, TabListProps } from './types'
import styled from 'styled-components'
import { padding, color, ColorProps, PaddingProps } from 'styled-system'

const StyledTab = styled.div`
    cursor: pointer;
    outline: none;
`

function Item(props: ItemProps) {
    return props.children
}

const Selector = styled.div`
    height: 3px;
    width: 32px;
    border-radius: 8px;
    background-color: rgba(3, 150, 255, 1);
`

const SelectorWrapper = styled.div`
    bottom: 1px;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
`

/** @private */
function TabInternal(props: any) {
    return (
        <Tab as={StyledTab}>
            {({ selected }) => (
                <LinkButton state={selected ? ControlState.Hovered : undefined}>
                    <Text
                        variant="body"
                        selectable={false}
                        color={false ? 'text.disabled' : 'text.primary'}
                        children={props.children}
                    />
                    <SelectorWrapper>{selected ? <Selector /> : null}</SelectorWrapper>
                </LinkButton>
            )}
        </Tab>
    )
}

const StyledTabList = styled(Tab.List)<TabListProps>`
    display: flex;
    column-gap: ${(props) => props.theme.space[4]}px;

    border-bottom: 1px solid ${(props) => props.theme.colors.stroke.surface};

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

const StyledTabPanels = styled(Tab.Panels)<PaddingProps & ColorProps>`
    flex: 1;

    ${color}
    ${padding}
`

function TabPanels(props: TabPanelsProps) {
    const { children, ...otherProps } = props
    const { bg = 'backgrounds.layer.default', backgroundColor } = otherProps

    if (typeof children === 'function') {
        return <StyledTabPanels {...otherProps}>{children}</StyledTabPanels>
    } else {
        const arrayChildren = Children.toArray(children)

        return (
            <StyledTabPanels {...otherProps}>
                {Children.map(arrayChildren, (child) => (
                    <Tab.Panel>
                        <Text>{child}</Text>
                    </Tab.Panel>
                ))}
            </StyledTabPanels>
        )
    }
}

const StyledTabView = styled(Tab.List)`
    display: flex;
    flex-direction: column;
    height: 100%;
`

function TabView(props: TabViewProps) {
    const { children, ...otherProps } = props

    return (
        <Tab.Group {...otherProps}>
            <StyledTabView>{children}</StyledTabView>
        </Tab.Group>
    )
}

export { TabView, TabList, Item, TabPanels }
