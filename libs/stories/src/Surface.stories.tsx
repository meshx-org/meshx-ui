/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'

import { Story, Meta } from '@storybook/react'
import { View } from 'react-native'
import {
    FlyoutSurface,
    CardSurface,
    SmokeSurface,
    LayerSurface,
    LayerSurfaceProps,
    SmokeSurfaceProps,
    FlyoutSurfaceProps,
    CardSurfaceProps,
    ControlSurface,
    SubtleSurface
} from '@meshx/mxui-primitives'
import { Text } from '@meshx/mxui-text'

export default {
    title: 'Primitives/Surface',
    component: FlyoutSurface,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        }
    }
} as Meta

const SubtleSurfaceTemplate: Story<FlyoutSurfaceProps> = (args) => (
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

        <SubtleSurface as="main" p={10} {...args} />
    </View>
)

export const Subtle = SubtleSurfaceTemplate.bind({})

Subtle.args = {
    children: <Text variant="body">This is a SubtleSurface</Text>,
    borderRadius: 5
}

const ControlSurfaceTemplate: Story<FlyoutSurfaceProps> = (args) => (
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

        <ControlSurface as="main" p={10} {...args} />
    </View>
)

export const Control = ControlSurfaceTemplate.bind({})

Control.args = {
    children: <Text variant="body">This is a ControlSurface</Text>,
    borderRadius: 5
}

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

        <FlyoutSurface as="main" p={10} {...args} />
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
    children: <Text variant="body">This is a LayerSurface</Text>,
    borderRadius: 4
}
