import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
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
