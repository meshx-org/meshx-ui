/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'

import { Story, Meta } from '@storybook/react'

import { ToggleSwitch } from '../components/next/toggle-switch/ToggleSwitch'
import { ToggleSwitchProps } from '../components/next/toggle-switch/ToggleSwitch.types'

// 👇 This default export determines where your story goes in the story list
const meta: Meta = {
    title: 'Components/ToggleSwitch',
    component: ToggleSwitch,
    parameters: {
        grid: { cellSize: 1 },
        docs: {
            page: null
        }
    }
}

// 👇 We create a “template” of how args map to rendering
const Template: Story<ToggleSwitchProps> = (args) => <ToggleSwitch {...args} />

export const Rest = Template.bind({})
Rest.args = {
    // defaultChecked: false
}

export default meta
