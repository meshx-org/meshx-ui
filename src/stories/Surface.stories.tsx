/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'

import { Story, Meta } from '@storybook/react'
import { View } from 'react-native'
import { Surface } from '../components/surface/Surface'
import { SurfaceProps } from '../components/surface/Surface.types'
import { TextBlock } from '../components/text-block/TextBlock'

export default {
    title: 'Components/Surface',
    component: Surface,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        }
    }
} as Meta

const BasicStoryTemplate: Story<SurfaceProps> = (args) => (
    <View>
        <Surface variant="card" mb={10} p={10}>
            <TextBlock variant="body">This is a surface</TextBlock>
        </Surface>

        <Surface variant="flyout" mb={10} p={10}>
            <TextBlock variant="body">This is a surface</TextBlock>
        </Surface>

        <Surface variant="layer" p={10}>
            <TextBlock variant="body">This is a surface</TextBlock>
        </Surface>
    </View>
)

export const Basic = BasicStoryTemplate.bind({})
