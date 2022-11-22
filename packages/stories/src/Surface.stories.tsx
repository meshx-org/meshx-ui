/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'

import { Story, Meta } from '@storybook/react'
import { View } from 'react-native'
import { ControlState } from '@meshx-org/mxui-core'
import {
    FlyoutSurface,
    CardSurface,
    SmokeSurface,
    LayerSurface,
    LayerSurfaceProps,
    SmokeSurfaceProps,
    FlyoutSurfaceProps,
    CardSurfaceProps
} from '@meshx-org/mxui-primitives/src'
import { Text } from '@meshx-org/mxui-text/src'

export default {
    title: 'Primitives/Surface',
    component: FlyoutSurface,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        }
    }
} as Meta

const FlyoutSurfaceTemplate: Story<FlyoutSurfaceProps> = (args) => (
    <View>
        <View
            style={{
                position: 'absolute',
                backgroundColor: 'rgb(3, 150, 255)',
                left: -10,
                top: -10,
                height: 100,
                width: 70
            }}
        />

        <FlyoutSurface p={10} {...args} />
    </View>
)

export const Flyout = FlyoutSurfaceTemplate.bind({})

Flyout.args = {
    children: <Text variant="body">This is a FlyoutSurface</Text>,
    borderRadius: 4
}

const CardSurfaceTemplate: Story<CardSurfaceProps> = (args) => (
    <View>
        <View
            style={{
                position: 'absolute',
                backgroundColor: 'rgb(3, 150, 255)',
                left: -10,
                top: -10,
                height: 100,
                width: 70
            }}
        />

        <CardSurface mb={10} p={10} {...args} />
    </View>
)

export const Card = CardSurfaceTemplate.bind({})

Card.args = {
    children: <Text variant="body">This is a CardSurface</Text>,
    state: ControlState.Rest,
    borderRadius: 4
}

const SmokeSurfaceTemplate: Story<SmokeSurfaceProps> = (args) => (
    <View>
        <View
            style={{
                position: 'absolute',
                backgroundColor: 'rgb(3, 150, 255)',
                left: -10,
                top: -10,
                height: 100,
                width: 70
            }}
        />

        <SmokeSurface p={10} {...args} />
    </View>
)

export const Smoke = SmokeSurfaceTemplate.bind({})

Smoke.args = {
    children: <Text variant="body">This is a SmokeSurface</Text>,
    borderRadius: 0
}

const LayerSurfaceTemplate: Story<LayerSurfaceProps> = (args) => <LayerSurface p={10} {...args} />

export const Layer = LayerSurfaceTemplate.bind({})

Layer.args = {
    children: <Text variant="body">This is a SmokeSurface</Text>,
    borderRadius: 4
}