/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'

import { Story, Meta } from '@storybook/react'
import { View } from 'react-native'
import { TextBlock } from '../components/text-block/TextBlock'
import { TextBlockProps } from '../components/text-block/TextBlock.types'

export default {
    title: 'Text/TextBlock',
    component: TextBlock,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
} as Meta

const HeadingsTextStory: Story<TextBlockProps> = (args) => (
    <View>
        <TextBlock variant="heading1" children="H1 heading" />
        <TextBlock variant="heading2" children="H2 heading" />
        <TextBlock variant="heading3" children="H3 heading" />
        <TextBlock variant="heading4" children="H4 heading" />
        <TextBlock variant="heading5" children="H5 heading" />
        <TextBlock variant="heading6" children="H6 heading" />
    </View>
)

const BodyTextStory: Story<TextBlockProps> = (args) => (
    <View>
        <TextBlock variant="bodyLarge" children="Body Large" />
        <TextBlock variant="bodyStrong" children="Body Strong" />
        <TextBlock variant="body" children="Body" />
        <TextBlock variant="caption" children="Caption" />
    </View>
)

export const Headings = HeadingsTextStory.bind({})
export const BodyText = BodyTextStory.bind({})
