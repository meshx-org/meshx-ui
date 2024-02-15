import { RefObject, useImperativeHandle, useRef } from 'react'

export type FocusableRef<T> = any
export type FocusableRefValue<T> = any
export type DOMRefValue<T> = any

export function createDOMRef<T extends HTMLElement = HTMLElement>(ref: RefObject<T>): DOMRefValue<T> {
    return {
        UNSAFE_getDOMNode() {
            return ref.current
        }
    }
}

export function createFocusableRef<T extends HTMLElement = HTMLElement>(
    domRef: RefObject<T>,
    focusableRef: RefObject<any> = domRef
): FocusableRefValue<T> {
    return {
        ...createDOMRef(domRef),
        focus() {
            if (focusableRef.current) {
                focusableRef.current.focus()
            }
        }
    }
}

export function useFocusableRef<T extends HTMLElement = HTMLElement>(
    ref: FocusableRef<T>,
    focusableRef?: RefObject<any>
): RefObject<T> {
    let domRef = useRef<T>(null)
    useImperativeHandle(ref, () => createFocusableRef(domRef, focusableRef))
    return domRef
}
