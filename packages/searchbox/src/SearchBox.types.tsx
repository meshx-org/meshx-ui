import { ReactNode } from 'react'

export interface Hit {
    title: string
}

export interface RenderHitsParams<H extends Hit> {
    hits: H[]
    query: string
}

export interface SearchBoxProps<H extends Hit> {
    minQueryLength?: number
    hits: H[]
    onQuery?: (query: string) => void
    children: (hitsParams: RenderHitsParams<H>) => ReactNode
}
