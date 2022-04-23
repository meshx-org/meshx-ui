/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

import { getWindow } from './getWindow'

// Initialize global window id.
const CURRENT_ID_PROPERTY = '__currentId__'
const DEFAULT_ID_STRING = 'id__'

interface WindowWithIdProp extends Window {
    [CURRENT_ID_PROPERTY]: number | undefined
}

const _global: WindowWithIdProp | Record<string, unknown> = (getWindow() as WindowWithIdProp | undefined) || {}

if (_global[CURRENT_ID_PROPERTY] === undefined) {
    _global[CURRENT_ID_PROPERTY] = 0
}

/**
 * Generates a unique id in the global scope (this spans across duplicate copies of the same library.)
 *
 * @public
 */
export function getId(prefix?: string): string {
    // eslint-disable-next-line no-plusplus
    const index = (_global[CURRENT_ID_PROPERTY] as number)++

    return (prefix === undefined ? DEFAULT_ID_STRING : prefix) + index
}

/**
 * Resets id counter to an (optional) number.
 *
 * @public
 */
export function resetIds(counter = 0): void {
    _global[CURRENT_ID_PROPERTY] = counter
}
