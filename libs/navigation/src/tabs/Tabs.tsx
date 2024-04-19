/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    Node,
    useLayoutEffect,
    useStyleProps,
    StyleProps,
    DOMRef,
    DOMRefValue,
    CollectionStateBase
} from '@meshx/mxui-core'
import { FocusRing, Orientation, AriaTabPanelProps, Key, mergeProps, useId } from 'react-aria'
import { Item, Dropdown, DropdownProps } from '@meshx/mxui-dropdown'
import { useResizeObserver, unwrapDOMRef, useDOMRef } from '@react-spectrum/utils'

import { ListCollection } from '@react-stately/list'
import { CollectionBuilder } from '@react-stately/collections'

import React, {
    MutableRefObject,
    ReactElement,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'

import { useLocale, useHover } from 'react-aria'
import { Text } from '@meshx/mxui-text'
import { useCollection, TabListState, useTabListState, Collection } from 'react-stately'
import { useTab, useTabList, useTabPanel } from 'react-aria'
import styled, { CSSProperties } from 'styled-components'
import { TabListProps, TabPanelsProps, TabsProps } from './Tabs.types'

type TabsContext<T> = {
    tabProps: TabsProps<T>
    tabState: {
        tabListState: TabListState<T>
        setTabListState: (state: TabListState<T>) => void
        selectedTab: HTMLElement | null
        collapsed: boolean
    }
    refs: {
        wrapperRef: MutableRefObject<HTMLDivElement | null>
        tablistRef: MutableRefObject<HTMLDivElement | null>
    }
    tabPanelProps: TabPanelProps
    tabLineState: Array<DOMRect>
}

const TabContext = React.createContext<TabsContext<any> | null>(null)

function useTabContext() {
    const context = useContext(TabContext)

    if (!context) {
        throw new Error('This must be under a Tab context')
    }

    return context
}

function Tabs<T extends object>(props: TabsProps<T>, ref: DOMRef<HTMLDivElement>) {
    // props = useProviderProps(props)
    const { orientation = 'horizontal' as Orientation, density = 'regular', children, ...otherProps } = props

    const domRef = useDOMRef(ref)
    const tablistRef = useRef<HTMLDivElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const { direction } = useLocale()
    const { styleProps } = useStyleProps(otherProps)
    const [collapsed, setCollapsed] = useState(false)
    const [selectedTab, setSelectedTab] = useState<HTMLElement | null>(null)
    const [tabListState, setTabListState] = useState<TabListState<T>>()
    const [tabPositions, setTabPositions] = useState<DOMRect[]>([])
    const prevTabPositions = useRef(tabPositions)

    useEffect(() => {
        if (tablistRef.current) {
            const key = CSS.escape(tabListState?.selectedKey?.toString() ?? '')

            const selectedTab: HTMLElement | null = tablistRef.current.querySelector(`[data-key="${key}"]`)

            if (selectedTab != null) {
                setSelectedTab(selectedTab)
            }
        }
        // collapse is in the dep array so selectedTab can be updated for TabLine positioning
    }, [children, tabListState?.selectedKey, collapsed, tablistRef])

    const checkShouldCollapse = useCallback(() => {
        if (wrapperRef.current && orientation !== 'vertical') {
            const tabsComponent = wrapperRef.current
            const tabs = tablistRef.current?.querySelectorAll('[role="tab"]')
            const tabDimensions = (tabs ? Array.from(tabs) : []).map((tab) => tab.getBoundingClientRect())

            const end = direction === 'rtl' ? 'left' : 'right'
            const farEdgeTabList = tabsComponent.getBoundingClientRect()[end]
            const farEdgeLastTab = tabDimensions[tabDimensions.length - 1][end]
            const shouldCollapse =
                direction === 'rtl' ? farEdgeLastTab < farEdgeTabList : farEdgeTabList < farEdgeLastTab
            setCollapsed(shouldCollapse)

            if (
                tabDimensions.length !== prevTabPositions.current.length ||
                tabDimensions.some(
                    (box, index) =>
                        box?.left !== prevTabPositions.current[index]?.left ||
                        box?.right !== prevTabPositions.current[index]?.right
                )
            ) {
                setTabPositions(tabDimensions)
                prevTabPositions.current = tabDimensions
            }
        }
    }, [tablistRef, wrapperRef, direction, orientation, setCollapsed, prevTabPositions, setTabPositions])

    useEffect(() => {
        checkShouldCollapse()
    }, [children, checkShouldCollapse])

    useResizeObserver({ ref: wrapperRef, onResize: checkShouldCollapse })

    const tabPanelProps: TabPanelProps = {
        'aria-labelledby': undefined
    }

    // When the tabs are collapsed, the tabPanel should be labelled by the Picker button element.
    const collapsibleTabListId = useId()
    if (collapsed && orientation !== 'vertical') {
        tabPanelProps['aria-labelledby'] = collapsibleTabListId
    }

    return (
        <TabContext.Provider
            value={{
                tabProps: { ...props, orientation, density },
                tabState: {
                    tabListState: tabListState!,
                    setTabListState,
                    selectedTab,
                    collapsed
                },
                refs: {
                    tablistRef,
                    wrapperRef
                },
                tabPanelProps,
                tabLineState: tabPositions
            }}
        >
            <div
                // {...filterDOMProps(otherProps)}
                {...styleProps}
                ref={domRef}
                data-tabs
                //className={classNames(
                //    styles,
                //    'spectrum-TabsPanel',
                //    `spectrum-TabsPanel--${orientation}`,
                //    styleProps.className
                //)}
            >
                {props.children}
            </div>
        </TabContext.Provider>
    )
}

type TabProps<T> = {
    item: Node<T>
    state: TabListState<T>
    isDisabled?: boolean
    orientation?: Orientation
}

const StyledTabItem = styled.div`
    --spectrum-tabs-item-height: 32px;

    /* Contain the focus ring */
    position: relative;

    box-sizing: border-box;

    /* Float above the tab line */
    z-index: 1;

    text-decoration: none;
    white-space: nowrap;

    // transition: color var(--spectrum-global-animation-duration-100) ease-out;
    cursor: default;
    outline: none;

    &[href] {
        cursor: pointer;
    }

    &[data-disabled] {
        cursor: default;
    }

    padding: 2px 10px;
    border-radius: 5px;
    gap: 4px;
    display: flex;
    align-items: center;

    background: transparent;
    color: var(--theme-text-primary);

    &[aria-selected='true'] {
        background: var(--theme-accent-default);
        color: white;
    }

    *[data-theme='dark'] &[aria-selected='true'] {
        color: black;
    }

    &[data-hovered] {
        // background: var(--theme-background-subtle-default);
    }
`

/** @private */
function Tab<T>(props: TabProps<T>) {
    const { item, state } = props
    const { key, rendered } = item

    const ref = useRef<any>()
    const { tabProps, isSelected, isDisabled, isPressed } = useTab({ key }, state, ref)

    const { hoverProps, isHovered } = useHover({
        isDisabled,
        ...props
    })

    const as: React.ElementType = item.props.href ? 'a' : 'div'

    return (
        <FocusRing>
            <StyledTabItem
                {...mergeProps(tabProps, hoverProps)}
                as={as}
                ref={ref}
                data-selected={isSelected || undefined}
                data-disabled={isDisabled}
                data-hovered={isHovered || undefined}
                data-pressed={isPressed || undefined}
                //className={classNames(styles, 'spectrum-Tabs-item', {
                //    'is-selected': isSelected,
                //    'is-disabled': isDisabled,
                //    'is-hovered': isHovered
                //})}
            >
                {/*<SlotProvider
                    slots={{
                        icon: {
                            size: 'S',
                            UNSAFE_className: classNames(styles, 'spectrum-Icon')
                        },
                        text: {
                            UNSAFE_className: classNames(styles, 'spectrum-Tabs-itemLabel')
                        }
                    }}
                >
                    {typeof rendered === 'string' ? <Text>{rendered}</Text> : rendered}
                </SlotProvider>*/}

                {typeof rendered === 'string' ? <Text>{rendered}</Text> : rendered}
            </StyledTabItem>
        </FocusRing>
    )
}

const StyledTabList = styled.div`
    display: flex;
    gap: 6px;

    flex-direction: row;

    /* Contain the selection indicator */
    position: relative;
    z-index: 0;

    margin: 0;
    padding: 0;

    /* Friends should align to the top of the tabs */
    vertical-align: top;

    outline: none;
    user-select: none;

    // spectrum-TabsPanel-tabs
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0%;

    border-bottom: 1px solid var(--theme-stroke-surface);

    padding: 8px 0;
`

interface CollectionOptions<T, C extends Collection<Node<T>>> extends Omit<CollectionStateBase<T, C>, 'children'> {
    children: ReactElement | ReactElement[] | ((item: T) => ReactElement)
}

export function useSpacerKeys<T extends object, C extends Collection<Node<T>> = Collection<Node<T>>>(
    props: CollectionOptions<T, C>
): Key[] {
    const builder = useMemo(() => new CollectionBuilder<T>(), [])
    const { children, items, collection } = props

    const result = useMemo(() => {
        const nodes = [...builder.build({ children, items }, {})]
        return nodes.filter((node) => node.type === 'space').map((node) => node.key)
    }, [builder, children, items, collection])

    return result
}

/**
 * A TabList is used within Tabs to group tabs that a user can switch between.
 * The keys of the items within the <TabList> must match up with a corresponding item inside the <TabPanels>.
 */
export function TabList<T extends object>(props: TabListProps<T>) {
    const { refs, tabState, tabProps, tabPanelProps } = useTabContext()
    const { isQuiet, density, isEmphasized, orientation } = tabProps
    const { selectedTab, collapsed, setTabListState } = tabState
    const { tablistRef, wrapperRef } = refs

    // Spacers are non selectable invisible items so we disable them here
    const spacerKeys = useSpacerKeys<T>({ ...tabProps, children: props.children })

    // Pass original Tab props but override children to create the collection.
    const state = useTabListState({
        ...tabProps,
        children: props.children,
        disabledKeys: tabProps.disabledKeys ? [...tabProps.disabledKeys, ...spacerKeys] : spacerKeys
    })

    const { styleProps } = useStyleProps(props as any)
    const { tabListProps } = useTabList({ ...tabProps, ...props }, state, tablistRef)

    useEffect(() => {
        // Passing back to root as useTabPanel needs the TabListState
        setTabListState(state)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.disabledKeys, state.selectedItem, state.selectedKey, props.children])

    const collapseStyle: CSSProperties =
        collapsed && orientation !== 'vertical'
            ? { maxWidth: 'calc(100% + 1px)', overflow: 'hidden', visibility: 'hidden', position: 'absolute' }
            : { maxWidth: 'calc(100% + 1px)' }

    const stylePropsFinal = orientation === 'vertical' ? styleProps : { style: collapseStyle }

    if (collapsed && orientation !== 'vertical') {
        tabListProps['aria-hidden'] = true
    }

    const tabListclassName = '' //TODO:  classNames(styles, 'spectrum-TabsPanel-tabs')

    const tabContent = (
        <StyledTabList
            {...stylePropsFinal}
            {...tabListProps}
            ref={tablistRef}
            className={tabListclassName}
            //className={classNames(
            //    styles,
            //    'spectrum-Tabs',
            //    `spectrum-Tabs--${orientation}`,
            //    tabListclassName,
            //    {
            //        'spectrum-Tabs--quiet': isQuiet,
            //        'spectrum-Tabs--emphasized': isEmphasized,
            //        ['spectrum-Tabs--compact']: density === 'compact'
            //    },
            //    orientation === 'vertical' && styleProps.className
            //)}
        >
            {[...state.collection].map((item) =>
                item.type === 'item' ? (
                    <Tab key={item.key} item={item} state={state} orientation={orientation} />
                ) : (
                    <div style={{ flex: '1' }} />
                )
            )}
        </StyledTabList>
    )

    if (orientation === 'vertical') {
        return tabContent
    } else {
        return (
            <div
                {...styleProps}
                ref={wrapperRef}
                //className={classNames(styles, 'spectrum-TabsPanel-collapseWrapper', styleProps.className)}
            >
                <TabDropdown
                    {...props}
                    {...tabProps}
                    visible={collapsed}
                    id={tabPanelProps['aria-labelledby']}
                    state={state}
                    className={tabListclassName}
                />
                {tabContent}
            </div>
        )
    }
}

/**
 * TabPanels is used within Tabs as a container for the content of each tab.
 * The keys of the items within the <TabPanels> must match up with a corresponding item inside the <TabList>.
 */
export function TabPanels<T extends object>(props: TabPanelsProps<T>) {
    const { tabState, tabProps } = useTabContext()
    const { tabListState } = tabState

    const factory = useCallback((nodes: Iterable<Node<T>>) => new ListCollection(nodes), [])
    const collection = useCollection<T>({ items: tabProps.items, ...props }, factory, {
        suppressTextValueWarning: true
    })

    const selectedItem = tabListState ? collection.getItem(tabListState.selectedKey) : null

    return (
        <TabPanel {...props} key={tabListState?.selectedKey}>
            {selectedItem && selectedItem.props.children}
        </TabPanel>
    )
}

interface TabPanelProps extends AriaTabPanelProps, StyleProps {
    children?: ReactNode
}

const StyledTabPanel = styled.div`
    &:focus {
        outline: none;
    }

    &:focus-visible {
        border-color: var(--spectrum-tabs-focus-ring-color);
    }
`

/** @private */
function TabPanel(props: TabPanelProps) {
    const { tabState, tabPanelProps: ctxTabPanelProps } = useTabContext()
    const { tabListState } = tabState
    const ref = useRef<HTMLDivElement | null>(null)
    const { tabPanelProps } = useTabPanel(props, tabListState, ref)
    const { styleProps } = useStyleProps(props)

    if (ctxTabPanelProps['aria-labelledby']) {
        tabPanelProps['aria-labelledby'] = ctxTabPanelProps['aria-labelledby']
    }

    return (
        <FocusRing>
            <StyledTabPanel
                {...styleProps}
                {...tabPanelProps}
                ref={ref}
                // className={classNames(styles, 'spectrum-TabsPanel-tabpanel', styleProps.className)}
            >
                {props.children}
            </StyledTabPanel>
        </FocusRing>
    )
}

type TabDropdownProps<T> = {
    density?: 'compact' | 'regular'
    isEmphasized?: boolean
    state: TabListState<T>
    className?: string
    visible: boolean
} & Omit<DropdownProps<'div', T>, 'children'>

function TabDropdown<T>(props: TabDropdownProps<T>) {
    const {
        isDisabled,
        isEmphasized,
        // isQuiet,
        state,
        'aria-labelledby': ariaLabeledBy,
        'aria-label': ariaLabel,
        density,
        className,
        id,
        visible
    } = props

    const ref = useRef<DOMRefValue<HTMLElement> | null>(null)
    const [pickerNode, setPickerNode] = useState<HTMLElement | null>(null)

    useEffect(() => {
        const node = unwrapDOMRef(ref)
        setPickerNode(node.current)
    }, [ref])

    const items = [...state.collection]
    const pickerProps = {
        'aria-labelledby': ariaLabeledBy,
        'aria-label': ariaLabel
    }

    const style: React.CSSProperties = visible ? {} : { visibility: 'hidden', position: 'absolute' }

    // TODO: Figure out if tabListProps should go onto the div here, v2 doesn't do it
    return (
        <div
            //className={classNames(
            //    styles,
            //    'spectrum-Tabs',
            //    'spectrum-Tabs--horizontal',
            //    'spectrum-Tabs--isCollapsed',
            //    {
            //         'spectrum-Tabs--quiet': isQuiet,
            //        ['spectrum-Tabs--compact']: density === 'compact',
            //        'spectrum-Tabs--emphasized': isEmphasized
            //    },
            //    className
            //)}
            style={style}
            aria-hidden={visible ? undefined : true}
        >
            {/*<SlotProvider
                slots={{
                    icon: {
                        size: 'S',
                        UNSAFE_className: classNames(styles, 'spectrum-Icon')
                    },
                    button: {
                        focusRingClass: classNames(styles, 'focus-ring')
                    }
                }}
            >
                <Dropdown
                    {...pickerProps}
                    id={id}
                    items={items}
                    ref={ref}
                    isQuiet
                    isDisabled={!visible || isDisabled}
                    selectedKey={state.selectedKey}
                    disabledKeys={state.disabledKeys}
                    onSelectionChange={state.setSelectedKey}
                    UNSAFE_className={classNames(styles, 'spectrum-Tabs-picker')}
                >
                    {(item) => <Item {...item.props}>{item.rendered}</Item>}
                </Dropdown>
                {pickerNode && (
                    <TabLine orientation="horizontal" selectedTab={pickerNode} selectedKey={state.selectedKey} />
                )}
            </SlotProvider>*/}

            <Dropdown
                {...pickerProps}
                id={id}
                items={items}
                ref={ref}
                isQuiet
                isDisabled={!visible || isDisabled}
                selectedKey={state.selectedKey}
                disabledKeys={state.disabledKeys}
                onSelectionChange={state.setSelectedKey}
                //UNSAFE_className={classNames(styles, 'spectrum-Tabs-picker')}
            >
                {(item: any) => <Item {...item.props}>{item.rendered}</Item>}
            </Dropdown>
        </div>
    )
}

/**
 * Tabs organize content into multiple sections and allow users to navigate between them. The content under the set of tabs should be related and form a coherent unit.
 */
// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _Tabs = React.forwardRef(Tabs) as <T>(props: TabsProps<T> & { ref?: DOMRef<HTMLDivElement> }) => ReactElement

export { _Tabs as Tabs }

export function Spacer<T>(props: any) {
    // eslint-disable-line @typescript-eslint/no-unused-vars
    return null
}

Spacer.getCollectionNode = function* (): Generator<any> {
    yield {
        type: 'space'
    }
}
