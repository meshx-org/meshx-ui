/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'

import { Story, Meta } from '@storybook/react'
import { View } from 'react-native'
import { Text, Heading, TextProps, HeadingProps } from '@meshx/mxui-text/src'

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
    },
    argTypes: {
        variant: {
            control: false,
            table: {
                disable: true
            }
        }
    }
} as Meta

const HeadingsStory: Story<HeadingProps> = (args) => (
    <View>
        <Heading {...args} children="Display 1" variant="display1" />
        <Heading {...args} children="Display 2" variant="display2" />
        <Heading {...args} children="H1 heading" variant="heading1" />
        <Heading {...args} children="H2 heading" variant="heading2" />
        <Heading {...args} children="H3 heading" variant="heading3" />
        <Heading {...args} children="H4 heading" variant="heading4" />
        <Heading {...args} children="H5 heading" variant="heading5" />
        <Heading {...args} children="H6 heading" variant="heading6" />
    </View>
)

const TextStory: Story<TextProps> = (args) => (
    <View>
        <Text {...args} variant="bodyAlt" children="Body Alt" />
        <Text {...args} variant="body" children="Body" />
        <Text {...args} variant="caption" children="Caption" />
        <Text {...args} variant="captionAlt" children="Caption Alt" />
    </View>
)

export const Headings = HeadingsStory.bind({})
export const Texts = TextStory.bind({})
