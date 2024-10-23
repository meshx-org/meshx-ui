import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { SearchBox, SearchBoxProps, Hit } from '@meshx/mxui'
import { Text } from '@meshx/mxui'

const argTypes = {}

export default {
    title: 'Basic Inputs/SearchBox',
    component: SearchBox,
    argTypes: argTypes
} as Meta

const SearchBoxTemplate: Story<SearchBoxProps<Hit>> = (args) => {
    const [query, setQuery] = useState('')
    const items: Hit[] = [{ title: 'Hello 1' }, { title: 'Hello 2' }, { title: 'Hello 3' }]
    const filtered: Hit[] = items.filter((item) => item.title.indexOf(query) != -1)

    const renderHits = ({ hits }: { hits: any[] }) => {
        return hits.map((hit) => <Text children={hit.title} />)
    }

    return (
        <SearchBox onQuery={setQuery} minQueryLength={1} hits={filtered}>
            {renderHits}
        </SearchBox>
    )
}

export const Default = SearchBoxTemplate.bind({})
Default.args = {}
