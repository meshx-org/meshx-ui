import { createGlobalStyle, css } from 'styled-components'

const controlStrokeMixin = css`
    [data-theme='dark'] .color-1 {
        stop-color: rgba(255, 255, 255, 0.24);
    }

    [data-theme='dark'] .color-2,
    [data-theme='dark'] .color-3,
    [data-theme='dark'] .color-4 {
        stop-color: rgba(255, 255, 255, 0.09);
    }

    [data-theme='light'] .color-4 {
        stop-color: rgba(0, 0, 0, 0.3);
    }

    [data-theme='light'] .color-1,
    [data-theme='light'] .color-2,
    [data-theme='light'] .color-3 {
        stop-color: rgba(0, 0, 0, 0.06);
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
        background-color: var(--theme-background-smoke-default);
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

export const GlobalStyle = createGlobalStyle`
    select:focus, button:focus {
        outline: none;
    }

    select:focus-visible, button:focus-visible {
        border-radius: 6px;
        box-shadow: 0 0 0 var(--ring-offset-width) var(--ring-offset-color), 0 0 0 calc(2px + var(--ring-offset-width)) var(--ring-color);
        --ring-offset-color: var(--theme-background-solid-default);
        --ring-offset-width: 2px;
        --ring-color: var(--theme-accent-default);
    }

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

    ${textControlStrokeMixin}
    ${controlStrokeMixin}
    ${overlayMixin}
     
    :root {
        // debug color
        --todo: magenta;
    
        // Fonts
        --theme-font-default: ${({ theme }) => theme.fonts.default};
        --theme-font-mono: ${({ theme }) => theme.fonts.mono};

        // Font sizes
        --theme-font-size-0: ${({ theme }) => theme.fontSizes[0]}px;
        --theme-font-size-1: ${({ theme }) => theme.fontSizes[1]}px;
        --theme-font-size-2: ${({ theme }) => theme.fontSizes[2]}px;
        --theme-font-size-3: ${({ theme }) => theme.fontSizes[3]}px;
        --theme-font-size-4: ${({ theme }) => theme.fontSizes[4]}px;
        --theme-font-size-5: ${({ theme }) => theme.fontSizes[5]}px;
        --theme-font-size-6: ${({ theme }) => theme.fontSizes[6]}px;
        --theme-font-size-7: ${({ theme }) => theme.fontSizes[7]}px;
        --theme-font-size-8: ${({ theme }) => theme.fontSizes[8]}px;

        // Space
        --theme-space-0: ${({ theme }) => theme.space[0]}px;
        --theme-space-1: ${({ theme }) => theme.space[1]}px;
        --theme-space-2: ${({ theme }) => theme.space[2]}px;
        --theme-space-3: ${({ theme }) => theme.space[3]}px;
        --theme-space-4: ${({ theme }) => theme.space[4]}px;
        --theme-space-5: ${({ theme }) => theme.space[5]}px;
        --theme-space-6: ${({ theme }) => theme.space[6]}px;
        --theme-space-7: ${({ theme }) => theme.space[7]}px;
        --theme-space-8: ${({ theme }) => theme.space[8]}px;
        --theme-space-9: ${({ theme }) => theme.space[9]}px;
        --theme-space-10: ${({ theme }) => theme.space[10]}px;
        --theme-space-11: ${({ theme }) => theme.space[11]}px;
        --theme-space-12: ${({ theme }) => theme.space[12]}px;
        --theme-space-13: ${({ theme }) => theme.space[13]}px;
        --theme-space-14: ${({ theme }) => theme.space[14]}px;

        // Space alias
        --theme-spacing-sm: ${(props) => props.theme.space.sm}px;
        --theme-spacing-md: ${(props) => props.theme.space.md}px;
        --theme-spacing-lg: ${(props) => props.theme.space.lg}px;
        --theme-spacing-xl: ${(props) => props.theme.space.xl}px;
        --theme-spacing-2xl: ${(props) => props.theme.space['2xl']}px;
        --theme-spacing-3xl: ${(props) => props.theme.space['3xl']}px;
    }

    [data-theme='light'], .light:root {
        color-scheme: light;

        --theme-accent-default: ${({ theme }) => theme.lightScheme.accent.default};

        // Text Colors 
        --theme-color-text-primary: ${({ theme }) => theme.lightScheme.text.primary};
        --theme-color-text-secondary: ${({ theme }) => theme.lightScheme.text.secondary};
        --theme-color-text-disabled: ${({ theme }) => theme.lightScheme.text.disabled};

        // Accent Text Colors 
        --theme-color-accent-text-primary: ${({ theme }) => theme.lightScheme.accentText.primary};
        --theme-color-accent-text-secondary: ${({ theme }) => theme.lightScheme.accentText.secondary};
        --theme-color-accent-text-disabled: ${({ theme }) => theme.lightScheme.accentText.disabled};

        // Colored Buttons (oveeride)
        --theme-button-accent-default: ${({ theme }) => theme.lightScheme.button.accent.default};
        --theme-button-accent-secondary: ${({ theme }) => theme.lightScheme.button.accent.secondary};
        --theme-button-accent-tertiary: ${({ theme }) => theme.lightScheme.button.accent.tertiary};

        --theme-button-outline-default: ${({ theme }) => theme.lightScheme.button.outline.default};
        --theme-button-outline-secondary: ${({ theme }) => theme.lightScheme.button.outline.secondary};
        --theme-button-outline-tertiary: ${({ theme }) => theme.lightScheme.button.outline.tertiary};

        --theme-button-warning-default: ${({ theme }) => theme.lightScheme.button.warning.default};
        --theme-button-warning-secondary: ${({ theme }) => theme.lightScheme.button.warning.secondary};
        --theme-button-warning-tertiary: ${({ theme }) => theme.lightScheme.button.warning.tertiary};

        --theme-button-danger-default: ${({ theme }) => theme.lightScheme.button.danger.default};
        --theme-button-danger-secondary: ${({ theme }) => theme.lightScheme.button.danger.secondary};
        --theme-button-danger-tertiary: ${({ theme }) => theme.lightScheme.button.danger.tertiary};
        
        // Stroke Colors
        --theme-color-stroke-card: ${({ theme }) => theme.lightScheme.stroke.card};
        --theme-color-stroke-divider: ${({ theme }) => theme.lightScheme.stroke.divider};
        --theme-color-stroke-surface: ${({ theme }) => theme.lightScheme.stroke.surface};
        --theme-color-stroke-control: ${({ theme }) => theme.lightScheme.stroke.control};

        // Backgrounds Colors
        --theme-background-card-default: ${({ theme }) => theme.lightScheme.backgrounds.card.default};
        --theme-background-card-secondary: ${({ theme }) => theme.lightScheme.backgrounds.card.secondary};
        --theme-background-card-tertiary: ${({ theme }) => theme.lightScheme.backgrounds.card.tertiary};

        --theme-background-control-default: ${({ theme }) => theme.lightScheme.backgrounds.control.default};
        --theme-background-control-secondary: ${({ theme }) => theme.lightScheme.backgrounds.control.secondary};
        --theme-background-control-tertiary: ${({ theme }) => theme.lightScheme.backgrounds.control.tertiary};
        --theme-background-control-disabled: ${({ theme }) => theme.lightScheme.backgrounds.control.disabled};

        --theme-background-solid-default: ${({ theme }) => theme.lightScheme.backgrounds.solid.default};
        --theme-background-solid-secondary: ${({ theme }) => theme.lightScheme.backgrounds.solid.secondary};
        --theme-background-solid-tertiary: ${({ theme }) => theme.lightScheme.backgrounds.solid.tertiary};

        --theme-background-layer-default: ${({ theme }) => theme.lightScheme.backgrounds.layer.default};
        --theme-background-layer-alt: ${({ theme }) => theme.lightScheme.backgrounds.layer.alt};

        --theme-background-subtle-default: ${({ theme }) => theme.lightScheme.backgrounds.subtle.default};
        --theme-background-subtle-secondary: ${({ theme }) => theme.lightScheme.backgrounds.subtle.secondary};
        --theme-background-subtle-disabled: ${({ theme }) => theme.lightScheme.backgrounds.subtle.disabled};

        --theme-background-smoke-default: ${({ theme }) => theme.lightScheme.backgrounds.smoke.default};
        --theme-background-acrylic-default: ${({ theme }) => theme.lightScheme.backgrounds.acrylic.default};
    }

    [data-theme='dark'], .dark:root {
        color-scheme: dark;

        --theme-accent-default: ${({ theme }) => theme.darkScheme.accent.default};

        // Text Colors 
        --theme-color-text-primary: ${({ theme }) => theme.darkScheme.text.primary};
        --theme-color-text-secondary: ${({ theme }) => theme.darkScheme.text.secondary};
        --theme-color-text-disabled: ${({ theme }) => theme.darkScheme.text.disabled};

        // Accent Text Colors 
        --theme-color-accent-text-primary: ${({ theme }) => theme.darkScheme.accentText.primary};
        --theme-color-accent-text-secondary: ${({ theme }) => theme.darkScheme.accentText.secondary};
        --theme-color-accent-text-disabled: ${({ theme }) => theme.darkScheme.accentText.disabled};

        // Colored Buttons (oveeride)
        --theme-button-accent-default: ${({ theme }) => theme.darkScheme.button.accent.default};
        --theme-button-accent-secondary: ${({ theme }) => theme.darkScheme.button.accent.secondary};
        --theme-button-accent-tertiary: ${({ theme }) => theme.darkScheme.button.accent.tertiary};

        --theme-button-outline-default: ${({ theme }) => theme.darkScheme.button.outline.default};
        --theme-button-outline-secondary: ${({ theme }) => theme.darkScheme.button.outline.secondary};
        --theme-button-outline-tertiary: ${({ theme }) => theme.darkScheme.button.outline.tertiary};

        --theme-button-warning-default: ${({ theme }) => theme.darkScheme.button.warning.default};
        --theme-button-warning-secondary: ${({ theme }) => theme.darkScheme.button.warning.secondary};
        --theme-button-warning-tertiary: ${({ theme }) => theme.darkScheme.button.warning.tertiary};

        --theme-button-danger-default: ${({ theme }) => theme.darkScheme.button.danger.default};
        --theme-button-danger-secondary: ${({ theme }) => theme.darkScheme.button.danger.secondary};
        --theme-button-danger-tertiary: ${({ theme }) => theme.darkScheme.button.danger.tertiary};
        
        // Stroke Colors
        --theme-color-stroke-card: ${({ theme }) => theme.darkScheme.stroke.card};
        --theme-color-stroke-divider: ${({ theme }) => theme.darkScheme.stroke.divider};
        --theme-color-stroke-surface: ${({ theme }) => theme.darkScheme.stroke.surface};
        --theme-color-stroke-control: ${({ theme }) => theme.darkScheme.stroke.control};

        // Backgrounds Colors
        --theme-background-card-default: ${({ theme }) => theme.darkScheme.backgrounds.card.default};
        --theme-background-card-secondary: ${({ theme }) => theme.darkScheme.backgrounds.card.secondary};
        --theme-background-card-tertiary: ${({ theme }) => theme.darkScheme.backgrounds.card.tertiary};

        --theme-background-control-default: ${({ theme }) => theme.darkScheme.backgrounds.control.default};
        --theme-background-control-secondary: ${({ theme }) => theme.darkScheme.backgrounds.control.secondary};
        --theme-background-control-tertiary: ${({ theme }) => theme.darkScheme.backgrounds.control.tertiary};
        --theme-background-control-disabled: ${({ theme }) => theme.darkScheme.backgrounds.control.disabled};

        --theme-background-solid-default: ${({ theme }) => theme.darkScheme.backgrounds.solid.default};
        --theme-background-solid-secondary: ${({ theme }) => theme.darkScheme.backgrounds.solid.secondary};
        --theme-background-solid-tertiary: ${({ theme }) => theme.darkScheme.backgrounds.solid.tertiary};

        --theme-background-layer-default: ${({ theme }) => theme.darkScheme.backgrounds.layer.default};
        --theme-background-layer-alt: ${({ theme }) => theme.darkScheme.backgrounds.layer.alt};

        --theme-background-subtle-default: ${({ theme }) => theme.darkScheme.backgrounds.subtle.default};
        --theme-background-subtle-secondary: ${({ theme }) => theme.darkScheme.backgrounds.subtle.secondary};
        --theme-background-subtle-disabled: ${({ theme }) => theme.darkScheme.backgrounds.subtle.disabled};

        --theme-background-smoke-default: ${({ theme }) => theme.darkScheme.backgrounds.smoke.default};
        --theme-background-acrylic-default: ${({ theme }) => theme.darkScheme.backgrounds.acrylic.default};
    }
`
