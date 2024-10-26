import React, { useCallback, useRef, useState } from 'react'
import { DropdownProps } from './Dropdown.types'
import { useLayoutEffect } from '@meshx/mxui-core'
import { Text } from '@meshx/mxui-text'
import { Popover } from '@meshx/mxui-overlays'

import { useDOMRef, useResizeObserver, useUnwrapDOMRef } from '@react-spectrum/utils'
import { useSelectState } from 'react-stately'
import { PressResponder } from '@react-aria/interactions'
import { HiddenSelect, mergeProps, useHover, useId, useSelect } from 'react-aria'

import { ChevronBottomSmall } from '@meshx/mxui-icons'
import { ListBoxBase, useListBoxLayout } from '@meshx/mxui-listbox'
import { FieldButton } from '@meshx/mxui-button'
import styles from './Dropdown.module.scss'

type DOMRefValue<T> = any
type FocusableRefValue<T> = any
type DOMRef<T> = any

function Dropdown<T extends object, C extends React.ElementType = 'div'>(props: DropdownProps<C, T>, ref: DOMRef<C>) {
    const {
        autoComplete,
        isDisabled,
        as: Component = 'div',
        direction = 'bottom',
        align = 'start',
        shouldFlip = true,
        placeholder = 'Select an option…', //stringFormatter.format('placeholder'),
        isQuiet,
        //label,
        //labelPosition = 'top' as LabelPosition,
        menuWidth,
        name,
        autoFocus
    } = props

    const state = useSelectState<T>(props)
    const domRef = useDOMRef(ref)

    const popoverRef = useRef<DOMRefValue<HTMLDivElement>>()
    const triggerRef = useRef<FocusableRefValue<HTMLElement>>()
    const unwrappedTriggerRef = useUnwrapDOMRef(triggerRef)
    const listboxRef = useRef<HTMLDivElement>(null)

    const isLoadingInitial = props.isLoading && state.collection.size === 0
    const isLoadingMore = props.isLoading && state.collection.size > 0
    const progressCircleId = useId()

    // We create the listbox layout in Picker and pass it to ListBoxBase below
    // so that the layout information can be cached even while the listbox is not mounted.
    // We also use the layout as the keyboard delegate for type to select.
    const layout = useListBoxLayout()

    let {
        labelProps,
        triggerProps,
        valueProps,
        menuProps,
        descriptionProps,
        errorMessageProps,
        isInvalid,
        validationErrors,
        validationDetails
    } = useSelect(
        {
            ...props,
            'aria-describedby': isLoadingInitial ? progressCircleId : undefined
        },
        state,
        unwrappedTriggerRef
    )

    const { hoverProps, isHovered } = useHover({ isDisabled })
    const isMobile = false

    // Measure the width of the button to inform the width of the menu (below).
    const [buttonWidth, setButtonWidth] = useState<number | null>(null)
    // const { scale } = useProvider()

    const onResize = useCallback(() => {
        console.log(unwrappedTriggerRef, width)

        if (!isMobile && unwrappedTriggerRef.current) {
            const width = unwrappedTriggerRef.current.offsetWidth

            setButtonWidth(width)
        }
    }, [unwrappedTriggerRef, setButtonWidth, isMobile])

    useResizeObserver({
        ref: unwrappedTriggerRef,
        onResize: onResize
    })

    useLayoutEffect(onResize, [/*scale,*/ state.selectedKey, onResize])

    // On small screen devices, the listbox is rendered in a tray, otherwise a popover.
    const listbox = (
        <ListBoxBase
            {...menuProps}
            ref={listboxRef}
            disallowEmptySelection
            autoFocus={state.focusStrategy || true}
            shouldSelectOnPressUp
            focusOnPointerEnter
            layout={layout}
            state={state}
            width={isMobile ? '100%' : undefined}
            // Set max height: inherit so Tray scrolling works
            UNSAFE_style={{ maxHeight: 'inherit' }}
            isLoading={props.isLoading}
            showLoadingSpinner={isLoadingMore}
            onLoadMore={props.onLoadMore}
        />
    )

    // If quiet, use the default width, otherwise match the width of the button. This can be overridden by the menuWidth prop.
    // Always have a minimum width of the button width. When quiet, there is an extra offset to add.
    // Not using style props for this because they don't support `calc`.
    const width = isQuiet ? null : buttonWidth
    const style: React.CSSProperties = {
        width: (menuWidth ? menuWidth : width) ?? undefined,
        minWidth:
            (isQuiet ? `calc(${buttonWidth}px + calc(2 * var(--spectrum-dropdown-quiet-offset)))` : buttonWidth) ??
            undefined
    }

    const overlay = (
        <Popover
            offset={8}
            UNSAFE_style={style}
            //UNSAFE_className={classNames(styles, 'spectrum-Dropdown-popover', {
            //    'spectrum-Dropdown-popover--quiet': isQuiet
            //})}
            ref={popoverRef}
            placement={`${direction} ${align}`}
            shouldFlip={shouldFlip}
            hideArrow
            state={state}
            triggerRef={unwrappedTriggerRef}
            scrollRef={listboxRef}
        >
            {listbox}
        </Popover>
    )

    let contents = state.selectedItem ? state.selectedItem.rendered : placeholder
    if (typeof contents === 'string') {
        contents = <Text>{contents}</Text>
    }

    const picker = (
        <Component
            className={styles.Dropdown}
            data-disabled={isDisabled || undefined}
            data-invalid={isInvalid && !isDisabled}
            data-quiet={isQuiet}
            //className={classNames(styles, 'spectrum-Dropdown', {
            //    'is-invalid': isInvalid && !isDisabled,
            //    'is-disabled': ,
            //    'spectrum-Dropdown--quiet': isQuiet
            //})}
        >
            <HiddenSelect
                autoComplete={autoComplete}
                isDisabled={isDisabled}
                state={state}
                triggerRef={unwrappedTriggerRef}
                name={name}
            />
            <PressResponder {...mergeProps(hoverProps, triggerProps)}>
                <FieldButton
                    ref={triggerRef}
                    isActive={state.isOpen}
                    isQuiet={isQuiet}
                    isDisabled={isDisabled}
                    isInvalid={isInvalid}
                    autoFocus={autoFocus}
                >
                    <div className={styles.Label}>{contents}</div>
                    <ChevronBottomSmall className={styles.ChevronBottomSmall} />
                </FieldButton>
            </PressResponder>
            {state.collection.size === 0 ? null : overlay}
        </Component>
    )

    return <div ref={domRef as any}>{picker}</div>
}

const _Dropdown = React.forwardRef(Dropdown)
export { _Dropdown as Dropdown }
