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

import React, {
    CSSProperties,
    ForwardedRef,
    ReactElement,
    ReactNode,
    RefObject,
    useCallback,
    useContext,
    useMemo
} from 'react'
import styled from 'styled-components'
import clsx from 'clsx'

import { FocusScope } from '@react-aria/focus'
import { Node } from '@meshx/mxui-core'
import { useListBox } from '@react-aria/listbox'
import { mergeProps } from '@react-aria/utils'
import { ReusableView } from '@react-stately/virtualizer'
import { Virtualizer, VirtualizerItem } from '@react-aria/virtualizer'
import { ListBoxContext } from './ListBoxContext'
import { ListBoxOption } from './ListBoxOption'
import { ListBoxSection } from './ListBoxSection'
import { ListBoxBaseProps } from './ListBoxBase.types'
import { ListBoxLayout } from './ListBoxLayout'

const StyledVirtualizer = styled(Virtualizer as any)`
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
export function useListBoxLayout<T>(): ListBoxLayout<T> {
    const scale = 'small' as string
    const layout = useMemo(
        () =>
            new ListBoxLayout<T>({
                estimatedRowHeight: scale === 'large' ? 48 : 32,
                estimatedHeadingHeight: scale === 'large' ? 33 : 26,
                padding: scale === 'large' ? 5 : 4, // TODO: get from DNA
                placeholderHeight: scale === 'large' ? 48 : 32
            }),
        [scale]
    )

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

/** @private */
function LoadingState() {
    let { state } = useContext(ListBoxContext)!
    //let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/listbox')

    return (
        // aria-selected isn't needed here since this option is not selectable.
        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        <div role="option" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            ...loading
        </div>
    )
}

/** @private */
function EmptyState() {
    let { renderEmptyState } = useContext(ListBoxContext)!
    let emptyState = renderEmptyState ? renderEmptyState() : null
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

/** @private */
function ListBoxBase<T>(props: ListBoxBaseProps<T>, ref: RefObject<HTMLDivElement | null>) {
    let {
        layout,
        state,
        shouldFocusOnHover = false,
        shouldUseVirtualFocus = false,
        domProps = {},
        isLoading,
        showLoadingSpinner = isLoading,
        onScroll,
        renderEmptyState
    } = props
    let { listBoxProps } = useListBox(
        {
            ...props,
            layoutDelegate: layout,
            isVirtualized: true
        },
        state,
        ref
    )
    let { styleProps } = useStyleProps(props)

    // This overrides collection view's renderWrapper to support hierarchy of items in sections.
    // The header is extracted from the children so it can receive ARIA labeling properties.
    type View = ReusableView<Node<T>, ReactElement>
    let renderWrapper = useCallback(
        (parent: View, reusableView: View, children: View[], renderChildren: (views: View[]) => ReactElement[]) => {
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
                    parent={parent?.layoutInfo}
                >
                    {reusableView.rendered}
                </VirtualizerItem>
            )
        },
        []
    )

    let focusedKey = state.selectionManager.focusedKey
    let persistedKeys = useMemo(() => (focusedKey != null ? new Set([focusedKey]) : null), [focusedKey])

    return (
        <ListBoxContext.Provider value={{ state, renderEmptyState, shouldFocusOnHover, shouldUseVirtualFocus }}>
            <FocusScope>
                <StyledVirtualizer
                    {...styleProps}
                    {...mergeProps(listBoxProps, domProps)}
                    contentEditable="false"
                    ref={ref}
                    persistedKeys={persistedKeys}
                    autoFocus={!!props.autoFocus || undefined}
                    scrollDirection="vertical"
                    className={clsx('spectrum-Menu')}
                    layout={layout}
                    layoutOptions={useMemo(
                        () => ({
                            isLoading: showLoadingSpinner
                        }),
                        [showLoadingSpinner]
                    )}
                    collection={state.collection}
                    renderWrapper={renderWrapper}
                    isLoading={isLoading}
                    onLoadMore={props.onLoadMore}
                    onScroll={onScroll}
                >
                    {useCallback((type, item: Node<T>) => {
                        if (type === 'item') {
                            return <ListBoxOption item={item} />
                        } else if (type === 'loader') {
                            return <LoadingState />
                        } else if (type === 'placeholder') {
                            return <EmptyState />
                        }
                    }, [])}
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
