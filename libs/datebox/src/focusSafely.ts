/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { FocusableElement } from './FocusScope'

type ScrollableElement = any

let supportsPreventScrollCached: boolean | null = null
function supportsPreventScroll() {
    if (supportsPreventScrollCached == null) {
        supportsPreventScrollCached = false
        try {
            var focusElem = document.createElement('div')
            focusElem.focus({
                get preventScroll() {
                    supportsPreventScrollCached = true
                    return true
                }
            })
        } catch (e) {
            // Ignore
        }
    }

    return supportsPreventScrollCached
}

function getScrollableElements(element: FocusableElement): ScrollableElement[] {
    var parent = element.parentNode
    var scrollableElements: ScrollableElement[] = []
    var rootScrollingElement = document.scrollingElement || document.documentElement

    while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
        if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
            scrollableElements.push({
                element: parent,
                scrollTop: parent.scrollTop,
                scrollLeft: parent.scrollLeft
            })
        }
        parent = parent.parentNode
    }

    if (rootScrollingElement instanceof HTMLElement) {
        scrollableElements.push({
            element: rootScrollingElement,
            scrollTop: rootScrollingElement.scrollTop,
            scrollLeft: rootScrollingElement.scrollLeft
        })
    }

    return scrollableElements
}

function restoreScrollPosition(scrollableElements: ScrollableElement[]) {
    for (let { element, scrollTop, scrollLeft } of scrollableElements) {
        element.scrollTop = scrollTop
        element.scrollLeft = scrollLeft
    }
}

export function focusWithoutScrolling(element: FocusableElement) {
    if (supportsPreventScroll()) {
        element.focus({ preventScroll: true })
    } else {
        let scrollableElements = getScrollableElements(element)
        element.focus()
        restoreScrollPosition(scrollableElements)
    }
}

/**
 * A utility function that focuses an element while avoiding undesired side effects such
 * as page scrolling and screen reader issues with CSS transitions.
 */
export function focusSafely(element: FocusableElement) {
    // If the user is interacting with a virtual cursor, e.g. screen reader, then
    // wait until after any animated transitions that are currently occurring on
    // the page before shifting focus. This avoids issues with VoiceOver on iOS
    // causing the page to scroll when moving focus if the element is transitioning
    // from off the screen.

    focusWithoutScrolling(element)
}
