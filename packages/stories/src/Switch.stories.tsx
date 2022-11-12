import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Switch, SwitchProps } from '@meshx-org/mxui-switch/src'

export default {
    title: 'Form/Switch',
    component: Switch,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
} as Meta

const Template: Story<SwitchProps> = (args) => <Switch {...args} />

export const Rest = Template.bind({})
Rest.args = {
    // defaultChecked: false
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true
}
