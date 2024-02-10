import { create } from '@storybook/theming/create'

export const dark = create({
    base: 'light',

    brandTitle: 'MeshX UI',
    brandUrl: 'https://meshx.co',
    // brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
    brandTarget: '_self',

    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: 'monospace',

    //
    colorPrimary: '#3A10E5',
    colorSecondary: '#585C6D',

    // UI
    appBg: DEFAULT_DARK.backgrounds.solid.secondary,
    appContentBg: DEFAULT_DARK.backgrounds.solid.default,
    appBorderColor: DEFAULT_DARK.stroke.divider,
    appBorderRadius: 4,

    // Text colors
    textColor: DEFAULT_DARK.text.primary,
    textInverseColor: '#ffffff',

    // Toolbar default and active colors
    barTextColor: DEFAULT_DARK.text.primary,
    barSelectedColor: '#585C6D',
    barBg: DEFAULT_DARK.backgrounds.solid.default,

    // Form colors
    inputBg: '#ffffff',
    inputBorder: DEFAULT_DARK.stroke.divider,
    inputTextColor: '#10162F',
    inputBorderRadius: 2
})
