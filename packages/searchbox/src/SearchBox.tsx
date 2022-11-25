import React, { useState, useMemo, useEffect } from 'react'

import { SearchBoxProps, Hit } from './SearchBox.types'

import { AnchoredOverlay } from '@meshx-org/mxui-overlays'
import { TextBox } from '@meshx-org/mxui-textbox'
import { Text } from '@meshx-org/mxui-text'
import { FlyoutSurface, Box } from '@meshx-org/mxui-primitives'

export function SearchBox<H extends Hit>(props: SearchBoxProps<H>) {
    const { minQueryLength = 3, children, onQuery } = props
    const [query, setQuery] = useState('')
    const [focused, setFocused] = useState(false)
    const hasValidQuery = useMemo(() => query.length > minQueryLength, [query])
    const hasHits = props.hits.length > 0
    useEffect(() => onQuery && onQuery(query), [query])

    const renderEmpty = () => {
        return (
            <Box width="100%" display="flex" py={ 8} justifyContent="center">
                <Text variant="body">No hits found</Text>
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
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search..."
                value={query}
                onChange={setQuery}
            />
            <FlyoutSurface width={300} p={1}>
                {hasHits ? children({ query, hits: props.hits }) : renderEmpty()}
            </FlyoutSurface>
        </AnchoredOverlay>
    )
}
