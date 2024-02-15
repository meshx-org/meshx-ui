/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import type { StoryObj, Meta } from '@storybook/react'
import { Switch } from '@meshx-org/mxui-switch/src'
import { action } from '@storybook/addon-actions'

const argTypes = {
    isDisabled: {
        control: { disable: true }
    }
}

const meta = {
    title: 'Form/Switch',
    component: Switch,
    args: {
        onChange: action('onChange', { allowFunction: true })
    },
    argTypes
} satisfies Meta<typeof Switch>

type Story = StoryObj<typeof Switch>

export const Default: Story = {}

export const Disabled: Story = {
    args: {
        isDisabled: true
    }
}

export const ReadOnly: Story = {
    args: {
        isReadOnly: true
    }
}

export default meta
