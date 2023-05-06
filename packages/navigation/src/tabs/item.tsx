import { PropsWithChildren } from 'react'

export function Item(props: PropsWithChildren): JSX.Element {
    return props.children as JSX.Element 
}
