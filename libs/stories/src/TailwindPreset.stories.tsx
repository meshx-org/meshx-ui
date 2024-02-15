import type { StoryObj, Meta } from '@storybook/react'
import { Link } from '@meshx-org/mxui-link'
import React from 'react'

function ColorCard({ className }: { className: string }) {
    return (
        <div className="relative flex">
            <div className="flex items-center gap-x-3 w-full cursor-pointer sm:block sm:space-y-1.5">
                <div
                    className={`${className} h-10 w-10 rounded ring-1 ring-inset ring-black/10 dark:ring-white/20 sm:w-full`}
                />
            </div>
        </div>
    )
}

const meta = {
    // title: 'Other/Tailwind',
    component: Link,
    argTypes: {},
    render: (args) => {
        return (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-2 gap-y-8 sm:grid-cols-1">
                <div className="2xl:contents">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-200 2xl:col-end-1 2xl:pt-2.5">
                        Accent
                    </div>
                    <div className="grid mt-3 grid-cols-1 sm:grid-cols-11 gap-y-3 gap-x-2 sm:mt-2 2xl:mt-0">
                        <ColorCard className="bg-[var(--theme-accent-default)]" />
                        <ColorCard className="bg-red-500" />
                        <ColorCard className="bg-red-500" />
                    </div>
                </div>
            </div>
        )
    }
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof Link>

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'link'
    }
}
