import { VARIABLE } from '@meshx-org/mxui-core'
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
    appBg: VARIABLE.backgrounds.solid.secondary,
    appContentBg: VARIABLE.backgrounds.solid.default,
    appBorderColor: VARIABLE.stroke.divider,
    appBorderRadius: 4,

    // Text colors
    textColor: VARIABLE.text.primary,
    textInverseColor: '#ffffff',

    // Toolbar default and active colors
    barTextColor: VARIABLE.text.primary,
    barSelectedColor: '#585C6D',
    barBg: VARIABLE.backgrounds.solid.default,

    // Form colors
    inputBg: '#ffffff',
    inputBorder: VARIABLE.stroke.divider,
    inputTextColor: '#10162F',
    inputBorderRadius: 2
})
