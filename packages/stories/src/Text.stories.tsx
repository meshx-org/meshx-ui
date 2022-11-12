/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'

import { Story, Meta } from '@storybook/react'
import { View } from 'react-native'
import { Text, TextProps } from '@meshx-org/mxui-text/src'

export default {
    title: 'Primitives/Text',
    component: Text,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
} as Meta

const HeadingsTextStory: Story<TextProps> = (args) => (
    <View>
        <Text variant="heading1" children="H1 heading" />
        <Text variant="heading2" children="H2 heading" />
        <Text variant="heading3" children="H3 heading" />
        <Text variant="heading4" children="H4 heading" />
        <Text variant="heading5" children="H5 heading" />
        <Text variant="heading6" children="H6 heading" />
    </View>
)

const BodyTextStory: Story<TextProps> = (args) => (
    <View>
        <Text variant="bodyLarge" children="Body Large" />
        <Text variant="bodyStrong" children="Body Strong" />
        <Text variant="body" children="Body" />
        <Text variant="caption" children="Caption" />
    </View>
)

export const Headings = HeadingsTextStory.bind({})
export const BodyText = BodyTextStory.bind({})
