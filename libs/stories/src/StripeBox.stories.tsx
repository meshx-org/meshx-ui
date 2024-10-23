import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { StripeBox } from '@meshx/mxui'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    'pk_test_51H59owJmQoVhz82aWAoi9M5s8PC6sSAqFI7KfAD2NRKun5riDIOM0dvu2caM25a5f5JbYLMc5Umxw8Dl7dBIDNwM00yVbSX8uS'
)

const meta = {
    title: 'Basic Input/StripeBox',
    render: () => (
        <Elements stripe={stripePromise}>
            <StripeBox />
        </Elements>
    ),
    component: StripeBox
} satisfies Meta<typeof StripeBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {}
}
