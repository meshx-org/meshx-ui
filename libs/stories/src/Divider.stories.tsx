import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Divider, DividerProps } from '@meshx/mxui'
import { Button } from '@meshx/mxui'

export default {
    title: 'Components/Divider',
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

const Template: Story<{ vertical: boolean }> = ({ vertical }) =>
    vertical ? (
        <div>
            <Button>Button1</Button>
            <Divider />
            <Button>Hello</Button>
        </div>
    ) : (
        <div style={{ flexDirection: 'row' }}>
            <Button>Hello</Button>
            <Divider />
            <Button>Hello</Button>
        </div>
    )

export const Default = Template.bind({ test: 'true' })
Default.args = { vertical: false }
