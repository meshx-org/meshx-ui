/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import { View } from 'react-native'

import { Story, Meta } from '@storybook/react'

import { TextBox } from '../components/next/text-box/TextBox'
import { TextBoxProps } from '../components/next/text-box/TextBox.types'

// 👇 This default export determines where your story goes in the story list
const meta: Meta = {
    title: 'Basic Input/TextBox',
    component: TextBox,
    parameters: {
        grid: { cellSize: 1 },
        docs: {
            page: null
        }
    }
}

// 👇 We create a “template” of how args map to rendering
const Template: Story<TextBoxProps> = (args) => (
    <View style={{ alignSelf: 'flex-start' }}>
        <TextBox {...args} />
    </View>
)

export const Rest = Template.bind({})
Rest.args = {
    placeholder: 'Placeholder'
}

export const Disabled = Template.bind({})
Disabled.args = {
    placeholder: 'Placeholder',
    disabled: true
}

export default meta
