import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ShortcutsProvider } from '@meshx/mxui-core'
import { PortalProvider } from '@meshx/mxui-core'
import { Overlay2 } from '@meshx/mxui'
import { Button } from '@meshx/mxui'

const meta = {
    title: 'Containers/Overlay2',
    component: ShortcutsProvider
} satisfies Meta<typeof ShortcutsProvider>

export default meta
type Story = StoryObj<{ test: boolean }>

export const Default: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <PortalProvider>
                <Button onPress={() => setIsOpen(!isOpen)}>Open Dialog</Button>
                <Overlay2
                    onClose={() => setIsOpen(!isOpen)}
                    isOpen={isOpen}
                    hasBackdrop
                    enforceFocus
                    canOutsideClickClose
                    autoFocus
                    canEscapeKeyClose
                    usePortal
                >
                    <div>
                        <h3>I'm an Overlay!</h3>
                        <p>
                            This is a simple container with some inline styles to position it on the screen. Its CSS
                            transitions are customized for this example only to demonstrate how easily custom
                            transitions can be implemented.
                        </p>
                        <p>
                            Click the "Focus button" below to transfer focus to the "Show overlay" trigger button
                            outside of this overlay. If persistent focus is enabled, focus will be constrained to the
                            overlay. Use the key to move to the next focusable element to illustrate this effect.
                        </p>
                        <p>
                            Click the "Make me scroll" button below to make this overlay's content really tall, which
                            will make the overlay's container (but not the page) scrollable
                        </p>
                    </div>
                </Overlay2>
            </PortalProvider>
        )
    },

    args: {
        test: true
    }
}
