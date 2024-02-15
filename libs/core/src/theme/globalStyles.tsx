import { createGlobalStyle, css, DefaultTheme, ThemeProps } from 'styled-components'
import { fontStack, rgba } from './utils'

const controlStrokeMixin = css`
    [data-theme='dark'] .color-1 {
        stop-color: rgba(255, 255, 255, 0.24);
    }

    [data-theme='dark'] .color-2,
    [data-theme='dark'] .color-3,
    [data-theme='dark'] .color-4 {
        stop-color: rgba(255, 255, 255, 0.06);
    }

    [data-theme='light'] .color-4 {
        stop-color: rgba(0, 0, 0, 0.3);
    }

    [data-theme='light'] .color-1,
    [data-theme='light'] .color-2,
    [data-theme='light'] .color-3 {
        stop-color: rgba(0, 0, 0, 0.08);
    }
`

const textControlStrokeMixin = css`
    [data-theme='light'] .text-control-stroke-stop:nth-child(1),
    [data-theme='light'] .text-control-stroke-stop:nth-child(2) {
        stop-color: rgba(0, 0, 0, 0.11);
    }

    [data-theme='light'] .text-control-stroke-stop:nth-child(3) {
        stop-color: rgba(0, 0, 0, 0.4);
    }

    [data-theme='dark'] .text-control-stroke-stop:nth-child(1),
    [data-theme='dark'] .text-control-stroke-stop:nth-child(2) {
        stop-color: rgba(255, 255, 255, 0.11);
    }

    [data-theme='dark'] .text-control-stroke-stop:nth-child(3) {
        stop-color: rgba(255, 255, 255, 0.4);
    }
`

const portalMixin = css`
    .portal {
        left: 0;
        // take the portal out of the document flow to prevent browsers from autoscrolling to the bottom
        // of the document (where portals are appended) when programmatically focusing within a portal
        // child element. also, don't use 'fixed', because then Tether'd elements won't reposition
        // themselves properly as the document scrolls.
        position: absolute;
        // ensure content won't be horizontally scrunched
        right: 0;
        // ensure content still offsets from the top of the document
        top: 0;
    }
`

const overlayMixin = css`
    // restricts scrolling of underlying content while the overlay is open
    body.overlay-open {
        overflow: hidden;
    }

    .overlay {
        // 0-out all positions so page won't jump when position changes (0s already there)
        bottom: 0;
        left: 0;
        position: static;
        right: 0;
        top: 0;

        z-index: 20;

        &:not(.overlay-open) {
            // because of the 0-position covering the viewport,
            // we must ignore the mouse when not open
            pointer-events: none;
        }

        &.overlay-container {
            overflow: hidden;
            // container covers the entire viewport
            position: fixed;

            &.overlay-inline {
                // when rendered inline, we want the overlay to position itself relative to
                // its parent container, not relative to the whole window. thus, we change
                // to position:absolute.
                position: absolute;
            }
        }

        &.overlay-scroll-container {
            overflow: auto;
            // scroll container covers the entire viewport
            position: fixed;

            &.overlay-inline {
                // when rendered inline, we want the overlay to position itself relative to
                // its parent container, not relative to the whole window. thus, we change
                // to position:absolute.
                position: absolute;
            }
        }

        &.overlay-inline {
            display: inline;
            // inline overlays can overflow container by default (see Dialog & Popover)
            overflow: visible;
        }
    }

    // this class is added to each Overlay child so that users won't need to
    // explicitly manage the position mode for inline and non-inline rendering.
    .overlay-content {
        // default fixed pulls it out of the flow and makes it viewport-relative
        position: fixed;
        z-index: 20;

        .overlay-inline &,
        .overlay-scroll-container & {
            // but inline (or scrollable) overlays want their children to respect
            // the parent positioning context. also allows the content to scroll.
            position: absolute;
        }
    }

    // fixed position so the backdrop forecefully covers the whole screen
    .overlay-backdrop {
        background-color: var(--theme-smoke-default);
        bottom: 0;
        left: 0;
        opacity: 1;
        overflow: auto;
        position: fixed;
        right: 0;
        top: 0;
        user-select: none;
        z-index: 20;

        &:focus {
            outline: none;
        }

        // as mentioned above: when inline, Overlay backdrop must respect parent
        .overlay-inline & {
            position: absolute;
        }
    }
`

function variables({ theme }: ThemeProps<DefaultTheme>) {
    return `
        // debug color
        --todo: magenta;
        
        --theme-font-default: ${fontStack(theme.fonts.default)};
        --theme-font-mono: ${fontStack(theme.fonts.mono)};

        // Font sizes
        --theme-font-size-0: ${theme.fontSizes[0]}px;
        --theme-font-size-1: ${theme.fontSizes[1]}px;
        --theme-font-size-2: ${theme.fontSizes[2]}px;
        --theme-font-size-3: ${theme.fontSizes[3]}px;
        --theme-font-size-4: ${theme.fontSizes[4]}px;
        --theme-font-size-5: ${theme.fontSizes[5]}px;
        --theme-font-size-6: ${theme.fontSizes[6]}px;
        --theme-font-size-7: ${theme.fontSizes[7]}px;
        --theme-font-size-8: ${theme.fontSizes[8]}px;

        // Space
        --theme-space-0: ${theme.space[0]}px;
        --theme-space-1: ${theme.space[1]}px;
        --theme-space-2: ${theme.space[2]}px;
        --theme-space-3: ${theme.space[3]}px;
        --theme-space-4: ${theme.space[4]}px;
        --theme-space-5: ${theme.space[5]}px;
        --theme-space-6: ${theme.space[6]}px;
        --theme-space-7: ${theme.space[7]}px;
        --theme-space-8: ${theme.space[8]}px;
        --theme-space-9: ${theme.space[9]}px;
        --theme-space-10: ${theme.space[10]}px;
        --theme-space-11: ${theme.space[11]}px;
        --theme-space-12: ${theme.space[12]}px;
        --theme-space-13: ${theme.space[13]}px;
        --theme-space-14: ${theme.space[14]}px;

        // Space alias
        --theme-spacing-sm: ${theme.space.sm}px;
        --theme-spacing-md: ${theme.space.md}px;
        --theme-spacing-lg: ${theme.space.lg}px;
        --theme-spacing-xl: ${theme.space.xl}px;
        --theme-spacing-2xl: ${theme.space['2xl']}px;
        --theme-spacing-3xl: ${theme.space['3xl']}px;
    `
}

const colorVariables =
    (scheme: keyof Omit<DefaultTheme, 'name' | 'colors' | 'fontSizes' | 'fonts' | 'space' | 'lineHeights'>) =>
    ({ theme }: ThemeProps<DefaultTheme>) => {
        return `
            --theme-accent-default: ${rgba(theme[scheme].accent.default)};

            // Text Colors 
            --theme-text-primary: ${rgba(theme[scheme].text.primary)};
            --theme-text-secondary: ${rgba(theme[scheme].text.secondary)};
            --theme-text-disabled: ${rgba(theme[scheme].text.disabled)};

            // Accent Text Colors 
            --theme-accent-text-primary: ${rgba(theme[scheme].accentText.primary)};
            --theme-accent-text-secondary: ${rgba(theme[scheme].accentText.secondary)};
            --theme-accent-text-disabled: ${rgba(theme[scheme].accentText.disabled)};
        `
    }

export const GlobalStyle = createGlobalStyle`
    select:focus, button:focus {
        outline: none;
    }

    input:focus { outline: none; }

    select:focus-visible, button:focus-visible {
        border-radius: 6px;
        box-shadow: 0 0 0 var(--ring-offset-width) var(--ring-offset-color), 0 0 0 calc(2px + var(--ring-offset-width)) var(--ring-color);
        --ring-offset-color: var(--theme-solid-default);
        --ring-offset-width: 2px;
        --ring-color: var(--theme-accent-default);
    }

    ${textControlStrokeMixin}
    ${controlStrokeMixin}
    ${overlayMixin}
    ${portalMixin}
     
    // Shared tokens that are not dependent on dark/light switch
    :root {
        ${variables}        
    }

    [data-theme='light'], .light:root {
        color-scheme: light;

        ${colorVariables('lightScheme')}

        // Colored Buttons (oveeride)
        --theme-button-accent-default: ${({ theme }) => rgba(theme.lightScheme.button.accent.default)};
        --theme-button-accent-secondary: ${({ theme }) => rgba(theme.lightScheme.button.accent.secondary)};
        --theme-button-accent-tertiary: ${({ theme }) => rgba(theme.lightScheme.button.accent.tertiary)};

        --theme-button-outline-default: ${({ theme }) => rgba(theme.lightScheme.button.outline.default)};
        --theme-button-outline-secondary: ${({ theme }) => rgba(theme.lightScheme.button.outline.secondary)};
        --theme-button-outline-tertiary: ${({ theme }) => rgba(theme.lightScheme.button.outline.tertiary)};

        --theme-button-warning-default: ${({ theme }) => rgba(theme.lightScheme.button.warning.default)};
        --theme-button-warning-secondary: ${({ theme }) => rgba(theme.lightScheme.button.warning.secondary)};
        --theme-button-warning-tertiary: ${({ theme }) => rgba(theme.lightScheme.button.warning.tertiary)};

        --theme-button-danger-default: ${({ theme }) => rgba(theme.lightScheme.button.danger.default)};
        --theme-button-danger-secondary: ${({ theme }) => rgba(theme.lightScheme.button.danger.secondary)};
        --theme-button-danger-tertiary: ${({ theme }) => rgba(theme.lightScheme.button.danger.tertiary)};
        
        // Stroke Colors
        --theme-stroke-card: ${({ theme }) => rgba(theme.lightScheme.stroke.card)};
        --theme-stroke-well: ${({ theme }) => rgba(theme.lightScheme.stroke.well)};
        --theme-stroke-divider: ${({ theme }) => rgba(theme.lightScheme.stroke.divider)};
        --theme-stroke-surface: ${({ theme }) => rgba(theme.lightScheme.stroke.surface)};
        --theme-stroke-control: ${({ theme }) => rgba(theme.lightScheme.stroke.control)};

        // Backgrounds Colors
        --theme-card-default: ${({ theme }) => rgba(theme.lightScheme.backgrounds.card.default)};
        --theme-card-secondary: ${({ theme }) => rgba(theme.lightScheme.backgrounds.card.secondary)};
        --theme-card-tertiary: ${({ theme }) => rgba(theme.lightScheme.backgrounds.card.tertiary)};

        --theme-control-default: ${({ theme }) => rgba(theme.lightScheme.backgrounds.control.default)};
        --theme-control-secondary: ${({ theme }) => rgba(theme.lightScheme.backgrounds.control.secondary)};
        --theme-control-tertiary: ${({ theme }) => rgba(theme.lightScheme.backgrounds.control.tertiary)};
        --theme-control-disabled: ${({ theme }) => rgba(theme.lightScheme.backgrounds.control.disabled)};

        --theme-solid-default: ${({ theme }) => rgba(theme.lightScheme.backgrounds.solid.default)};
        --theme-solid-secondary: ${({ theme }) => rgba(theme.lightScheme.backgrounds.solid.secondary)};
        --theme-solid-tertiary: ${({ theme }) => rgba(theme.lightScheme.backgrounds.solid.tertiary)};

        --theme-layer-default: ${({ theme }) => rgba(theme.lightScheme.backgrounds.layer.default)};
        --theme-layer-alt: ${({ theme }) => rgba(theme.lightScheme.backgrounds.layer.alt)};

        --theme-subtle-default: ${({ theme }) => rgba(theme.lightScheme.backgrounds.subtle.default)};
        --theme-subtle-secondary: ${({ theme }) => rgba(theme.lightScheme.backgrounds.subtle.secondary)};
        --theme-subtle-disabled: ${({ theme }) => rgba(theme.lightScheme.backgrounds.subtle.disabled)};

        --theme-smoke-default: ${({ theme }) => rgba(theme.lightScheme.backgrounds.smoke.default)};
        --theme-acrylic-default: ${({ theme }) => rgba(theme.lightScheme.backgrounds.acrylic.default)};
    }

    [data-theme='dark'], .dark:root {
        color-scheme: dark;

        ${colorVariables('darkScheme')}       

        // Button backgrounds
        --theme-button-accent-default: ${({ theme }) => rgba(theme.darkScheme.button.accent.default)};
        --theme-button-accent-secondary: ${({ theme }) => rgba(theme.darkScheme.button.accent.secondary)};
        --theme-button-accent-tertiary: ${({ theme }) => rgba(theme.darkScheme.button.accent.tertiary)};

        --theme-button-outline-default: ${({ theme }) => rgba(theme.darkScheme.button.outline.default)};
        --theme-button-outline-secondary: ${({ theme }) => rgba(theme.darkScheme.button.outline.secondary)};
        --theme-button-outline-tertiary: ${({ theme }) => rgba(theme.darkScheme.button.outline.tertiary)};

        --theme-button-warning-default: ${({ theme }) => rgba(theme.darkScheme.button.warning.default)};
        --theme-button-warning-secondary: ${({ theme }) => rgba(theme.darkScheme.button.warning.secondary)};
        --theme-button-warning-tertiary: ${({ theme }) => rgba(theme.darkScheme.button.warning.tertiary)};

        --theme-button-danger-default: ${({ theme }) => rgba(theme.darkScheme.button.danger.default)};
        --theme-button-danger-secondary: ${({ theme }) => rgba(theme.darkScheme.button.danger.secondary)};
        --theme-button-danger-tertiary: ${({ theme }) => rgba(theme.darkScheme.button.danger.tertiary)};
        
        // Strokes
        --theme-stroke-card: ${({ theme }) => rgba(theme.darkScheme.stroke.card)};
        --theme-stroke-well: ${({ theme }) => rgba(theme.lightScheme.stroke.well)};
        --theme-stroke-divider: ${({ theme }) => rgba(theme.darkScheme.stroke.divider)};
        --theme-stroke-surface: ${({ theme }) => rgba(theme.darkScheme.stroke.surface)};
        --theme-stroke-control: ${({ theme }) => rgba(theme.darkScheme.stroke.control)};

        // Card backgrounds
        --theme-card-default: ${({ theme }) => rgba(theme.darkScheme.backgrounds.card.default)};
        --theme-card-secondary: ${({ theme }) => rgba(theme.darkScheme.backgrounds.card.secondary)};
        --theme-card-tertiary: ${({ theme }) => rgba(theme.darkScheme.backgrounds.card.tertiary)};

        // Control backgrounds
        --theme-control-default: ${({ theme }) => rgba(theme.darkScheme.backgrounds.control.default)};
        --theme-control-secondary: ${({ theme }) => rgba(theme.darkScheme.backgrounds.control.secondary)};
        --theme-control-tertiary: ${({ theme }) => rgba(theme.darkScheme.backgrounds.control.tertiary)};
        --theme-control-disabled: ${({ theme }) => rgba(theme.darkScheme.backgrounds.control.disabled)};

        // Solid fills
        --theme-solid-default: ${({ theme }) => rgba(theme.darkScheme.backgrounds.solid.default)};
        --theme-solid-secondary: ${({ theme }) => rgba(theme.darkScheme.backgrounds.solid.secondary)};
        --theme-solid-tertiary: ${({ theme }) => rgba(theme.darkScheme.backgrounds.solid.tertiary)};

        // Layer fills
        --theme-layer-default: ${({ theme }) => rgba(theme.darkScheme.backgrounds.layer.default)};
        --theme-layer-alt: ${({ theme }) => rgba(theme.darkScheme.backgrounds.layer.alt)};

        // Subtle
        --theme-subtle-default: ${({ theme }) => rgba(theme.darkScheme.backgrounds.subtle.default)};
        --theme-subtle-secondary: ${({ theme }) => rgba(theme.darkScheme.backgrounds.subtle.secondary)};
        --theme-subtle-disabled: ${({ theme }) => rgba(theme.darkScheme.backgrounds.subtle.disabled)};

        // Smoke
        --theme-smoke-default: ${({ theme }) => rgba(theme.darkScheme.backgrounds.smoke.default)};
        
        // Acrylic
        --theme-acrylic-default: ${({ theme }) => rgba(theme.darkScheme.backgrounds.acrylic.default)};
    }
`
