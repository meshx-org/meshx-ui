/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'

import { Story, Meta } from '@storybook/react'
import { TextBlock } from '../components/next/text-block/TextBlock'
import { TextBlockProps } from '../components/next/text-block/TextBlock.types'
import { View } from 'react-native'

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

const Template: Story<TextBlockProps> = (args) => (
    <View>
        <TextBlock variant="caption" children="Caption" />
        <TextBlock variant="body" children="Body" />
        <TextBlock variant="bodyStrong" children="Body Strong" />
        <TextBlock variant="bodyLarge" children="Body Large" />
        <TextBlock variant="subtitle" children="Subtitle" />
        <TextBlock variant="title" children="Title" />
        <TextBlock variant="display" children="Display" />
    </View>
)

export const Default = Template.bind({})
Default.args = {
    variant: 'body',
    children: 'body'
}
