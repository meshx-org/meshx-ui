import { StoryObj, Meta } from '@storybook/react'
import { Divider } from './Divider'

const meta = {
    title: 'Primitives/Divider',
    component: Divider
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {
    args: {}
}
