import React, { useCallback, useMemo, useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ControlState, ShortcutsProvider, useShortcuts } from '@meshx-org/mxui-core'

import { useTheme } from '@meshx-org/mxui-core'
import { ControlFillX, ControlStrokeX } from '@meshx-org/mxui-primitives'
import { Text } from '@meshx-org/mxui-text'
import styled from 'styled-components'
import { ShortcutsConfig } from '@meshx-org/mxui-core/src/hooks/shortcuts/shortcutConfig'
import { normalizeKeyCombo } from '@meshx-org/mxui-core/src/hooks/shortcuts/shortcutParser'

const StyledKey = styled.kbd`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    width: 100%;
    height: 26px;
    line-height: 30px;
    min-width: 26px;

    margin-bottom: 3px;
    padding: 0 6px;
`

const ButtonContent = styled.div`
    position: relative;
    z-index: 3;

    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledKeyCombo = styled.div`
    display: inline-flex;
    column-gap: 2px;
`

/** Reverse table of some CONFIG_ALIASES fields, for display by KeyComboTag */
export const DISPLAY_ALIASES: Record<string, string> = {
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up'
}

function KeyCombo({ combo }: { combo: string }) {
    const renderKey = (key: string, index: number) => {
        const keyString = DISPLAY_ALIASES[key] ?? key
        // const icon = KEY_ICONS[key];
        const reactKey = `key-${index}`
        return <Key combo={keyString} key={reactKey}></Key>
    }

    const keys = normalizeKeyCombo(combo)
        .map((key) => (key.length === 1 ? key.toUpperCase() : key))
        .map(renderKey)

    return <StyledKeyCombo>{keys}</StyledKeyCombo>
}

function Key({ combo }: { combo: string }) {
    const theme = useTheme()
    const hasChildren = true

    return (
        <StyledKey style={{ maxWidth: 'fit-content' }} data-theme={theme} data-state={ControlState.Rest}>
            <ButtonContent data-variant="default" data-icon-only={!hasChildren}>
                <Text as="span" variant="body" selectable={false} color={'text.primary'}>
                    {combo}
                </Text>
            </ButtonContent>
            <ControlStrokeX borderRadius={2.5} state={ControlState.Rest} />
            <ControlFillX data-state={ControlState.Rest} variant="default" borderRadius={3} />
        </StyledKey>
    )
}

function Example({ onActivate }: { onActivate: () => void }) {
    const handleRefresh = useCallback(() => onActivate, [])

    // important: hotkeys array must be memoized to avoid infinitely re-binding hotkeys
    const hotkeys = useMemo(
        () =>
            [
                {
                    combo: 'cmd+k',
                    global: true,
                    label: 'Refresh data',
                    onKeyDown: handleRefresh
                }
            ] as ShortcutsConfig[],
        [handleRefresh]
    )
    const { handleKeyDown, handleKeyUp } = useShortcuts(hotkeys)

    return (
        <div tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
            Press <KeyCombo combo="cmd+k" /> to refresh data, <br />
            or <KeyCombo combo="?" />
        </div>
    )
}

const meta = {
    title: 'Core/ShortcutsProvider',
    component: ShortcutsProvider,
} satisfies Meta<typeof ShortcutsProvider>

export default meta
type Story = StoryObj<{ onActivate: () => void }>

export const Default: Story = {
    render: (args) => (
        <ShortcutsProvider>
            <Example onActivate={args.onActivate} />
        </ShortcutsProvider>
    ),
    argTypes: { onActivate: { action: 'clicked' } },
    args: {
        onActivate: () => {}
    }
}
