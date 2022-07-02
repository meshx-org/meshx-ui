import React from 'react'

import { Story, Meta } from '@storybook/react'

import { Person } from '../components/next/person/Person'
import { PersonProps } from '../components/next/person/Person.types'

// 👇 This default export determines where your story goes in the story list
export default {
    title: 'Media/Person',
    component: Person,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            description: {
                story: `An avatar can display custom initials by setting the initials prop. It is generally recommended to use
                  the \`name\` prop instead, as that will automatically determine the initials and display them.`
            },
            page: null
        }
    },
    argTypes: {
        size: {
            options: [20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 96, 120, 128],
            defaultValue: 44,
            control: { type: 'radio' }
        }
    }
} as Meta

// 👇 We create a “template” of how args map to rendering
const Template: Story<PersonProps> = (args) => <Person {...args} />

export const PersonWithImage = Template.bind({})

PersonWithImage.args = {
    size: 44,
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=96&q=100',
    badge: 0
}

PersonWithImage.parameters = {
    docs: {
        description: {
            story: `An avatar can display custom initials by setting the initials prop. It is generally recommended to use
          the \`name\` prop instead, as that will automatically determine the initials and display them.`
        }
    }
}

export const PersonWithInitials = Template.bind({})

PersonWithInitials.args = {
    size: 44,
    name: 'John Doe',
    badge: 0
}
