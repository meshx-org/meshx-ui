import type { StoryObj, Meta } from '@storybook/react'
import { TextBox } from '@meshx-org/mxui-textbox/src'
import { Switch } from '@meshx-org/mxui-switch/src'
import { FormGroup } from '@meshx-org/mxui-formgroup/src'
import React from 'react'

const meta = {
    title: 'Form/FormGroup',
    component: FormGroup,
    argTypes: {
        label: {
            control: 'check'
        },
        subLabel: {
            defaultValue: 'Label helper text with details...'
        },
        labelInfo: {
            defaultValue: '(required)'
        },
        helperText: {
            type: 'string',
            defaultValue: 'Helper text with details...'
        }
    },
    render: (args) => {
        return (
            <div style={{ width: 300 }}>
                <FormGroup {...args} labelFor="text-input">
                    <TextBox id="test" placeholder="Input" />
                </FormGroup>
            </div>
        )
    }
} satisfies Meta<typeof FormGroup>

export default meta

type Story = StoryObj<typeof FormGroup>

export const Default: Story = {
    args: {
        label: 'Label',
        helperText: 'Helper text with details...',
        subLabel: 'Label helper text with details...',
        labelInfo: '(required)'
    }
}

export const Switches: Story = {
    render: (args) => {
        return (
            <div style={{ width: 300 }}>
                <FormGroup {...args} labelFor="text-input">
                    <Switch />
                    <Switch />
                </FormGroup>
            </div>
        )
    },
    args: {
        label: 'Label',
        helperText: 'Helper text with details...',
        labelInfo: '(required)'
    }
}
