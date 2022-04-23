/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import { Text, View } from 'react-native'

import { Story, Meta } from '@storybook/react'

import Button from '../components/next/button/Button'
import { ButtonProps } from '../components/next/button/Button.types'

// 👇 This default export determines where your story goes in the story list
export default {
    title: 'Basic Input/Button',
    component: Button,
    parameters: {
        grid: { cellSize: 1 },
        docs: {
            page: null
        }
    }
} as Meta

// 👇 We create a “template” of how args map to rendering
const Template: Story<ButtonProps> = (args) => (
    <View style={{ alignSelf: 'flex-start' }}>
        <Button {...args} />
    </View>
)

export const Primary = Template.bind({})
Primary.args = {
    apparance: 'primary',
    children: 'test'
}

export const Disabled = Template.bind({})
Disabled.args = {
    apparance: 'subtle',
    disabled: true,
    children: 'test'
}
