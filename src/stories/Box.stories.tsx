/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'

import { Story, Meta } from '@storybook/react'
import { Box } from '../components/box/Box'
import { BoxProps } from '../components/box/Box.types'

export default {
    title: 'Components/Box',
    component: Box,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
} as Meta

const BasicStoryTemplate: Story<BoxProps> = (args) => <Box width={100} height={100} background="red" />
const TestStoryTemplate: Story<BoxProps> = (args) => (
    <Box border="1px solid rgba(0,0,0,.5)" borderRadius={8}>
        <Box width={100} height={100} bg="red" borderRadius={7} />
    </Box>
)

const PaddingStoryTemplate: Story<BoxProps> = (args) => (
    <Box p={10} bg="blue">
        <Box width={100} height={100} bg="red" border="10px solid yellow" marginX={10} borderRadius={8} />
    </Box>
)

export const Basic = BasicStoryTemplate.bind({})
export const test = TestStoryTemplate.bind({})
export const Padding = PaddingStoryTemplate.bind({})
