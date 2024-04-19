import { useListState } from 'react-stately'
import { ListBoxBase, useListBoxLayout } from './ListBoxBase'
import React, { ReactElement } from 'react'
import { ListBoxProps } from './ListBox.types'

function ListBox<T extends object>(props: ListBoxProps<T>, ref: any) {
    const state = useListState<T>(props)
    const layout = useListBoxLayout<T>(state, props.isLoading)
    // const domRef = useDOMRef(ref)

    return <ListBoxBase<T> {...props} ref={null as any} state={state} layout={layout} />
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref

/**
 * A list of options that can allow selection of one or more.
 */
const _ListBox = React.forwardRef(ListBox) as <T>(props: ListBoxProps<T> & { ref?: any }) => ReactElement

export { _ListBox as ListBox }
