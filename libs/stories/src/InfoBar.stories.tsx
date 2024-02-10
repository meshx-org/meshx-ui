import type { StoryObj, Meta } from '@storybook/react'
import { InfoBar } from '@meshx-org/mxui-infobar'
import { FormGroup } from '@meshx-org/mxui-formgroup'
import React from 'react'
import { Text } from '@meshx-org/mxui-text'

const meta = {
    title: 'Status/InfoBar',
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
                <InfoBar {...args} title={true ? 'Visually important content' : undefined}>
                    <Text>Hello</Text>
                </InfoBar>
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
