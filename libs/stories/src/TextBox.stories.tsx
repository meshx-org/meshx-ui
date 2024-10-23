import type { StoryObj, Meta } from '@storybook/react'
import { TextBox } from '@meshx/mxui'
import React from 'react'
import { action } from '@storybook/addon-actions'

const meta = {
    title: 'Form/TextBox',
    component: TextBox,
    argTypes: {
        onFocus: action('onFocus'),
        onBlur: action('onBlur'),
        onFocusChange: action('onFocusChange'),
        onHoverStart: action('onHoverStart'),
        onHoverEnd: action('onHoverEnd'),
        onHoverChange: action('onHoverChange')
    }
} satisfies Meta<typeof TextBox>

export default meta

type Story = StoryObj<typeof TextBox>

export const Default: Story = {
    args: {
        isDisabled: false,
        placeholder: 'TextBox'
    }
}
