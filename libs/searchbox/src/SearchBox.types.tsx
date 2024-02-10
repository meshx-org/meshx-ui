import { ReactNode } from 'react'

export interface Hit {
    title: string
}

export interface RenderHitsParams<H> {
    hits: H[]
    query: string
}

export interface SearchBoxProps<H> {
    minQueryLength?: number
    hits: H[]
    onQuery?: (query: string) => void
    onRenderHits: (hitsParams: RenderHitsParams<H>) => ReactNode
}
