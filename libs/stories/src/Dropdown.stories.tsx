import type { StoryObj, Meta } from '@storybook/react'
import { Dropdown, Item } from '@meshx/mxui'
import React from 'react'

const flatOptions = [
    { id: 1, name: 'Aardvark' },
    { id: 2, name: 'Kangaroo' },
    { id: 3, name: 'Snake' },
    { id: 4, name: 'Danni' },
    { id: 5, name: 'Devon' },
    { id: 6, name: 'Ross' },
    { id: 7, name: 'Puppy' },
    { id: 8, name: 'Doggo' },
    { id: 9, name: 'Floof' }
]

const meta = {
    title: 'Basic Input/Dropdown',
    component: Dropdown,
    argTypes: {
        layout: {
            table: {
                disable: true
            }
        },
        children: {
            table: {
                disable: true
            }
        },
        onSelectionChange: {
            table: {
                disable: true
            }
        },
        onOpenChange: {
            table: {
                disable: true
            }
        },
        label: {
            control: 'text'
        },
        description: {
            control: 'text'
        },
        errorMessage: {
            control: 'text'
        },
        isDisabled: {
            control: 'boolean'
        },
        labelAlign: {
            control: 'radio',
            options: ['end', 'start']
        },
        labelPosition: {
            control: 'radio',
            options: ['side', 'top']
        },
        necessityIndicator: {
            control: 'radio',
            options: ['icon', 'label']
        },
        isRequired: {
            control: 'boolean'
        },
        isInvalid: {
            control: 'boolean'
        },
        isQuiet: {
            control: 'boolean'
        },
        direction: {
            control: 'radio',
            options: ['top', 'bottom']
        },
        align: {
            control: 'radio',
            options: ['start', 'end']
        },
        width: {
            control: {
                type: 'radio',
                options: [null, '100px', '480px', 'size-4600']
            }
        },
        menuWidth: {
            control: {
                type: 'radio',
                options: [null, '100px', '480px', 'size-4600']
            }
        },
        isLoading: {
            control: 'boolean'
        },
        autoFocus: {
            control: 'boolean'
        },
        isOpen: {
            control: 'boolean'
        },
        defaultOpen: {
            control: 'boolean'
        }
    },
    render: (args) => {
        return <Dropdown {...args} />
    }
} satisfies Meta<typeof Dropdown>

type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
    args: {
        children: [
            <Item key="rarely">Rarely</Item>,
            <Item key="sometimes">Sometimes</Item>,
            <Item key="always">Always</Item>
        ]
    }
}

export const Dynamic: Story = {
    args: {
        children: (item: any) => <Item>{item.name}</Item>,
        items: flatOptions
    }
}

export default meta
