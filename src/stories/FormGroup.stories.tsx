import React from 'react'
import { Story, Meta } from '@storybook/react'
import { View } from 'react-native'
import Divider from '../components/divider/Divider'
import { TextBox } from '../components/text-box/TextBox'
import { ToggleSwitch } from '../components/toggle-switch/ToggleSwitch'
import FormGroup from '../components/form-group/FormGroup'

export default {
    title: 'Form/FormGroup',
    component: Divider,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
} as Meta

const Template: Story = () => (
    <View>
        <FormGroup helper="Note: we can have a helper text..." label="Label" labelInfo="(required)">
            <TextBox placeholder="Placeholder Text" />
        </FormGroup>
        <FormGroup label="Label" labelInfo="(required)">
            <ToggleSwitch />
            <ToggleSwitch />
        </FormGroup>
    </View>
)

export const Default = Template.bind({})
Default.args = {}
