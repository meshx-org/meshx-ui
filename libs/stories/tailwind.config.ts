import type { Config } from 'tailwindcss'

import { preset } from '@meshx/mxui-tailwind'
import { createGlobPatternsForDependencies } from '@nx/react/tailwind'
import { join } from 'path'

export default {
    // presets: [preset],
    content: [join(__dirname, './src/**/*.{js,ts,jsx,tsx}')],
    darkMode: 'class'
} satisfies Config
