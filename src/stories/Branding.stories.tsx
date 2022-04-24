/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'

import { Story, Meta } from '@storybook/react'

import { Branding } from '../components/next/branding/Branding'
import { BrandingProps } from '../components/next/branding/Branding.types'

import logo from './assets/logo.svg'

// 👇 This default export determines where your story goes in the story list
export default {
    title: 'Media/Branding',
    component: Branding,
    parameters: {
        backgrounds: {
            grid: { cellSize: 1 }
        },
        docs: {
            page: null
        }
    }
} as Meta

// 👇 We create a “template” of how args map to rendering
const Template: Story<BrandingProps> = (args) => <Branding {...args} />

export const Primary = Template.bind({})
Primary.args = {
    logo,
    title: 'MeshX',
    to: '#'
}

export const WithSubtitle = Template.bind({})
WithSubtitle.args = {
    logo,
    title: 'MeshX',
    subtitle: 'Docs',
    to: '#'
}
