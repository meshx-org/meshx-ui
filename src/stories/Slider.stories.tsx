/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import { View } from 'react-native'

import { Story, Meta } from '@storybook/react'

import { Slider } from '../components/next/slider/Slider'
import { SliderProps } from '../components/next/slider/Slider.types'

// 👇 This default export determines where your story goes in the story list
const meta: Meta = {
    title: 'Basic Input/Slider',
    component: Slider,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
}

// 👇 We create a “template” of how args map to rendering
const Template: Story<SliderProps> = (args) => <Slider {...args} />

export const Rest = Template.bind({})
Rest.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true
}

export default meta
