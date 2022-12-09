import { ReactNode } from 'react'
import { PaddingProps } from 'styled-system'

export interface TabViewProps {
    children: ReactNode[]
    onChange?: ((index: number) => void) | undefined
    selectedIndex?: number
}

interface TabPanelsRenderProps {
    selectedIndex: number
}

export interface TabPanelsProps extends PaddingProps {
    children:
        | ReactNode
        | ReactNode[]
        | ((props: TabPanelsRenderProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>)
}

export interface TabListProps extends PaddingProps {
    children: ReactNode | ReactNode[]
}

export interface ItemProps {
    children: ReactNode
}
