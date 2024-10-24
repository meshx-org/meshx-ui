import type { StoryObj, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Checkbox } from './Checkbox'
import { Text } from '@meshx/mxui-text'
import { CheckboxProps } from './Checkbox.types'
import React from 'react'

const meta: Meta<CheckboxProps> = {
    title: 'Form/Checkbox',
    component: Checkbox,
    args: {
        onChange: action('onChange', { allowFunction: true })
    },
    argTypes: {
        isDisabled: {
            control: { disable: true }
        }
    }
}

type Story = StoryObj<CheckboxProps>

export const Default: Story = {
    args: {
        children: <Text>Test</Text>
    }
}

export const Disabled: Story = {
    args: {
        isDisabled: true
    }
}

export const ReadOnly: Story = {
    args: {
        isReadOnly: true
    }
}

export default meta
