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

import React, { CSSProperties, ForwardedRef, HTMLAttributes, ReactElement, ReactNode, RefObject, useMemo } from 'react'
import styled from 'styled-components'

import { Node, useLayoutEffect } from '@meshx/mxui-core'
import { ListLayout } from '@react-stately/layout'
import { ListState } from 'react-stately'
import { AriaListBoxOptions, FocusScope, mergeProps, useListBox } from 'react-aria'
import { ReusableView } from '@react-stately/virtualizer'
import { Virtualizer, VirtualizerItem } from '@react-aria/virtualizer'
import { ListBoxContext } from './ListBoxContext'
import { ListBoxOption } from './ListBoxOption'
import { ListBoxSection } from './ListBoxSection'
import { ListBoxBaseProps } from './ListBoxBase.types'

const StyledVirtualizer = styled(Virtualizer)`
    --spectrum-popover-padding: 6px;

    /*
    Menu border radius + 1 to match XD designs for submenu offset. No calc use so
    getComputedStyle + getPropertyValue actually returns a pixel value rather than the calc string.
  */
    --spectrum-submenu-offset-distance: var(--spectrum-global-dimension-size-65);
    text-align: start;
    display: block;

    box-sizing: border-box;

    padding: var(--spectrum-popover-padding);
    margin: 0;

    list-style-type: none;

    overflow-y: auto;
    user-select: none;

    & .spectrum-Menu-sectionHeading {
        /* Support headings as LI */
        margin-block-start: var(--spectrum-global-dimension-size-75);
        margin-block-end: var(--spectrum-global-dimension-size-40);
    }

    &:focus {
        outline: none;
    }
` as typeof Virtualizer

/** @private */
export function useListBoxLayout<T>(state: ListState<T>, isLoading?: boolean): ListLayout<T> {
    // let { scale } = useProvider()
    // let collator = useCollator({ usage: 'search', sensitivity: 'base' })
    const scale = 'small' as string

    const layout = useMemo(
        () =>
            new ListLayout<T>({
                estimatedRowHeight: scale === 'large' ? 48 : 32,
                estimatedHeadingHeight: scale === 'large' ? 33 : 26,
                padding: scale === 'large' ? 5 : 4, // TODO: get from DNA
                loaderHeight: 40,
                placeholderHeight: scale === 'large' ? 48 : 32,
                collator: new Intl.Collator()
            }),
        [scale]
    )

    layout.collection = state.collection
    layout.disabledKeys = state.disabledKeys

    useLayoutEffect(() => {
        // Sync loading state into the layout.
        if (layout.isLoading !== isLoading) {
            layout.isLoading = isLoading!
            layout.virtualizer?.relayoutNow()
        }
    }, [layout, isLoading])

    return layout
}



function useForwardedRef<T>(ref: React.ForwardedRef<T>) {
    const innerRef = React.useRef<T>(null)

    React.useEffect(() => {
        if (!ref) return
        if (typeof ref === 'function') {
            ref(innerRef.current)
        } else {
            ref.current = innerRef.current
        }
    })

    return innerRef
}

function useStyleProps<T>(props: ListBoxBaseProps<T>): { styleProps: { style: CSSProperties } } {
    return {
        styleProps: {
            style: { width: props.width, ...props.UNSAFE_style }
        }
    }
}

function ListBoxBase<T>(props: ListBoxBaseProps<T>, forwardedRef: ForwardedRef<HTMLDivElement>) {
    const {
        layout,
        state,
        shouldSelectOnPressUp,
        focusOnPointerEnter,
        shouldUseVirtualFocus,
        domProps = {},
        transitionDuration = 0,
        onScroll
    } = props

    const ref = useForwardedRef(forwardedRef)

    const { listBoxProps } = useListBox(
        {
            ...props,
            keyboardDelegate: layout,
            isVirtualized: true
        },
        state,
        ref
    )

    const { styleProps } = useStyleProps(props)
    // let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/listbox')

    // This overrides collection view's renderWrapper to support heirarchy of items in sections.
    // The header is extracted from the children so it can receive ARIA labeling properties.
    type View = ReusableView<Node<T>, ReactNode>

    const renderWrapper = (
        parent: View | null,
        reusableView: View,
        children: View[],
        renderChildren: (views: View[]) => ReactElement[]
    ) => {
        if (reusableView.viewType === 'section') {
            return (
                <ListBoxSection
                    key={reusableView.key}
                    item={reusableView.content}
                    layoutInfo={reusableView.layoutInfo!}
                    virtualizer={reusableView.virtualizer}
                    headerLayoutInfo={children.find((c) => c.viewType === 'header')?.layoutInfo}
                >
                    {renderChildren(children.filter((c) => c.viewType === 'item'))}
                </ListBoxSection>
            )
        }

        return (
            <VirtualizerItem
                key={reusableView.key}
                layoutInfo={reusableView.layoutInfo!}
                virtualizer={reusableView.virtualizer}
                parent={parent?.layoutInfo ?? undefined}
            >
                {reusableView.rendered}
            </VirtualizerItem>
        )
    }

    return (
        <ListBoxContext.Provider value={state}>
            <FocusScope>
                <StyledVirtualizer
                    {...styleProps}
                    {...mergeProps(listBoxProps, domProps)}
                    ref={ref}
                    focusedKey={state.selectionManager.focusedKey}
                    autoFocus={!!props.autoFocus}
                    sizeToFit="height"
                    scrollDirection="vertical"
                    //className={classNames(styles, 'spectrum-Menu', styleProps.className)}
                    layout={layout}
                    collection={state.collection}
                    renderWrapper={renderWrapper}
                    transitionDuration={transitionDuration}
                    isLoading={props.isLoading}
                    onLoadMore={props.onLoadMore}
                    shouldUseVirtualFocus={shouldUseVirtualFocus}
                    onScroll={onScroll}
                >
                    {(type, item: Node<T>) => {
                        if (type === 'item') {
                            return (
                                <ListBoxOption
                                    item={item}
                                    shouldSelectOnPressUp={shouldSelectOnPressUp}
                                    shouldFocusOnHover={focusOnPointerEnter}
                                    shouldUseVirtualFocus={shouldUseVirtualFocus}
                                />
                            )
                        } else if (type === 'loader') {
                            return (
                                <div
                                    role="option"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%'
                                    }}
                                >
                                    loading...
                                </div>
                            )
                        } else if (type === 'placeholder') {
                            let emptyState = props.renderEmptyState ? props.renderEmptyState() : null
                            if (emptyState == null) {
                                return null
                            }

                            return (
                                <div
                                    // aria-selected isn't needed here since this option is not selectable.
                                    // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                                    role="option"
                                >
                                    {emptyState}
                                </div>
                            )
                        }
                    }}
                </StyledVirtualizer>
            </FocusScope>
        </ListBoxContext.Provider>
    )
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _ListBoxBase = React.forwardRef(ListBoxBase) as <T>(
    props: ListBoxBaseProps<T> & { ref?: RefObject<HTMLDivElement> }
) => ReactElement

export { _ListBoxBase as ListBoxBase }
