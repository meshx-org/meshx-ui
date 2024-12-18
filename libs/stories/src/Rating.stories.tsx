import type { Meta, StoryObj } from '@storybook/react'
import { Rating } from '@meshx/mxui'

const meta = {
    title: 'Basic Input/Rating',
    component: Rating
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {}
}
