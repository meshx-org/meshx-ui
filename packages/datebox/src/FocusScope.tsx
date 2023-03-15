import { RefObject } from 'react'
import { focusSafely } from './focusSafely'

export interface FocusManagerOptions {
    /** The element to start searching from. The currently focused element by default. */
    from?: Element
    /** Whether to only include tabbable elements, or all focusable elements. */
    tabbable?: boolean
    /** Whether focus should wrap around when it reaches the end of the scope. */
    wrap?: boolean
    /** A callback that determines whether the given element is focused. */
    accept?: (node: Element) => boolean
}

export interface FocusManager {
    /** Moves focus to the next focusable or tabbable element in the focus scope. */
    focusNext(opts?: FocusManagerOptions): FocusableElement | undefined

    /** Moves focus to the previous focusable or tabbable element in the focus scope. */
    focusPrevious(opts?: FocusManagerOptions): FocusableElement | undefined

    /** Moves focus to the first focusable or tabbable element in the focus scope. */
    focusFirst(opts?: FocusManagerOptions): FocusableElement | undefined

    /** Moves focus to the last focusable or tabbable element in the focus scope. */
    focusLast(opts?: FocusManagerOptions): FocusableElement | undefined
}

function isStyleVisible(element: Element) {
    if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
        return false
    }

    let { display, visibility } = element.style

    let isVisible = display !== 'none' && visibility !== 'hidden' && visibility !== 'collapse'

    if (isVisible) {
        const { getComputedStyle } = element.ownerDocument.defaultView as any
        let { display: computedDisplay, visibility: computedVisibility } = getComputedStyle(element)

        isVisible = computedDisplay !== 'none' && computedVisibility !== 'hidden' && computedVisibility !== 'collapse'
    }

    return isVisible
}

function isAttributeVisible(element: Element, childElement?: Element) {
    return (
        !element.hasAttribute('hidden') &&
        (element.nodeName === 'DETAILS' && childElement && childElement.nodeName !== 'SUMMARY'
            ? element.hasAttribute('open')
            : true)
    )
}

/**
 * Adapted from https://github.com/testing-library/jest-dom and
 * https://github.com/vuejs/vue-test-utils-next/.
 * Licensed under the MIT License.
 * @param element - Element to evaluate for display or visibility.
 */
export function isElementVisible(element: Element, childElement?: Element): any {
    return (
        element.nodeName !== '#comment' &&
        isStyleVisible(element) &&
        isAttributeVisible(element, childElement) &&
        (!element.parentElement || isElementVisible(element.parentElement, element))
    )
}

const focusableElements = [
    'input:not([disabled]):not([type=hidden])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'a[href]',
    'area[href]',
    'summary',
    'iframe',
    'object',
    'embed',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]'
]

const FOCUSABLE_ELEMENT_SELECTOR =
    focusableElements.join(':not([hidden]),') + ',[tabindex]:not([disabled]):not([hidden])'

focusableElements.push('[tabindex]:not([tabindex="-1"]):not([disabled])')
const TABBABLE_ELEMENT_SELECTOR = focusableElements.join(':not([hidden]):not([tabindex="-1"]),')

function isElementInScope(element: Element, scope: Element[]) {
    return scope.some((node) => node.contains(element))
}

/**
 * Create a [TreeWalker]{@link https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker}
 * that matches all focusable/tabbable elements.
 */
export function getFocusableTreeWalker(root: Element, opts?: FocusManagerOptions, scope?: Element[]) {
    let selector = opts?.tabbable ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR
    let walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node) {
            // Skip nodes inside the starting node.
            if (opts?.from?.contains(node)) {
                return NodeFilter.FILTER_REJECT
            }

            if (
                (node as Element).matches(selector) &&
                isElementVisible(node as Element) &&
                (!scope || isElementInScope(node as Element, scope)) &&
                (!opts?.accept || opts.accept(node as Element))
            ) {
                return NodeFilter.FILTER_ACCEPT
            }

            return NodeFilter.FILTER_SKIP
        }
    })

    if (opts?.from) {
        walker.currentNode = opts.from
    }

    return walker
}

/** Any focusable element, including both HTML and SVG elements. */
export interface FocusableElement extends Element, HTMLOrSVGElement {}

function focusElement(element: FocusableElement | null, scroll = false) {
    if (element != null && !scroll) {
        try {
            focusSafely(element)
        } catch (err) {
            // ignore
        }
    } else if (element != null) {
        try {
            element.focus()
        } catch (err) {
            // ignore
        }
    }
}

function last(walker: TreeWalker) {
    let next: FocusableElement
    let last: FocusableElement
    do {
        last = walker.lastChild() as FocusableElement
        if (last) {
            next = last
        }
    } while (last)

    return next!
}

export function createFocusManager(ref: RefObject<Element>, defaultOptions: FocusManagerOptions = {}): FocusManager {
    return {
        focusNext(opts: FocusManagerOptions = {}): FocusableElement | undefined {
            let root = ref.current
            if (!root) {
                return
            }
            let {
                from,
                tabbable = defaultOptions.tabbable,
                wrap = defaultOptions.wrap,
                accept = defaultOptions.accept
            } = opts
            let node = from || document.activeElement
            let walker = getFocusableTreeWalker(root, { tabbable, accept })
            if (root.contains(node)) {
                walker.currentNode = node!
            }
            let nextNode = walker.nextNode() as FocusableElement
            if (!nextNode && wrap) {
                walker.currentNode = root
                nextNode = walker.nextNode() as FocusableElement
            }
            if (nextNode) {
                focusElement(nextNode, true)
            }
            return nextNode
        },
        focusPrevious(opts: FocusManagerOptions = defaultOptions): FocusableElement | undefined {
            let root = ref.current
            if (!root) {
                return
            }
            let {
                from,
                tabbable = defaultOptions.tabbable,
                wrap = defaultOptions.wrap,
                accept = defaultOptions.accept
            } = opts
            let node = from || document.activeElement
            let walker = getFocusableTreeWalker(root, { tabbable, accept })
            if (root.contains(node)) {
                walker.currentNode = node!
            } else {
                let next = last(walker)
                if (next) {
                    focusElement(next, true)
                }
                return next
            }
            let previousNode = walker.previousNode() as FocusableElement
            if (!previousNode && wrap) {
                walker.currentNode = root
                previousNode = last(walker)
            }
            if (previousNode) {
                focusElement(previousNode, true)
            }
            return previousNode
        },
        focusFirst(opts = defaultOptions): FocusableElement | undefined {
            let root = ref.current
            if (!root) {
                return
            }
            let { tabbable = defaultOptions.tabbable, accept = defaultOptions.accept } = opts
            let walker = getFocusableTreeWalker(root, { tabbable, accept })
            let nextNode = walker.nextNode() as FocusableElement
            if (nextNode) {
                focusElement(nextNode, true)
            }
            return nextNode
        },
        focusLast(opts = defaultOptions): FocusableElement | undefined {
            let root = ref.current
            if (!root) {
                return
            }
            let { tabbable = defaultOptions.tabbable, accept = defaultOptions.accept } = opts
            let walker = getFocusableTreeWalker(root, { tabbable, accept })
            let next = last(walker)

            if (next) {
                focusElement(next, true)
            }

            return next
        }
    }
}
