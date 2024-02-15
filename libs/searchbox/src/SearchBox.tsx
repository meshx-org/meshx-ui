import React, { useState, useMemo, useEffect } from 'react'
import { SearchBoxProps, Hit } from './SearchBox.types'
import { AnchoredOverlay } from '@meshx-org/mxui-overlays'
import { TextBox } from '@meshx-org/mxui-textbox'
import { Text } from '@meshx-org/mxui-text'
import { FlyoutSurface, Box } from '@meshx-org/mxui-primitives'

import styled from 'styled-components'

export function SearchBox<H = Hit>(props: SearchBoxProps<H>) {
    const { minQueryLength = 3, onRenderHits, onQuery } = props
    const [query, setQuery] = useState('')
    const [focused, setFocused] = useState(false)
    const hasValidQuery = useMemo(() => query.length > minQueryLength, [query])
    const hasHits = props.hits.length > 0
    useEffect(() => onQuery && onQuery(query), [query])

    const onRenderEmpty = () => {
        return (
            <Box width="100%" display="flex" py={6} justifyContent="center">
                <Text variant="body">No hits found for "{query}"</Text>
            </Box>
        )
    }

    return (
        <AnchoredOverlay
            containerPadding={0}
            placement="bottom"
            crossOffset={0}
            offset={8}
            isOpen={focused && hasValidQuery}
        >
            <TextBox
                //onFocus={() => setFocused(true)}
                //onBlur={() => setFocused(false)}
                placeholder="Search..."
                value={query}
                //onChange={(v) => setQuery()}
                //type="search"
                aria-description="search results will appear below"
            />
            <FlyoutSurface width={350} p={1}>
                {hasHits ? onRenderHits({ query, hits: props.hits }) : onRenderEmpty()}
            </FlyoutSurface>
        </AnchoredOverlay>
    )
}
