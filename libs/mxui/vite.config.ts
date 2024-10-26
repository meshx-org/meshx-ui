/// <reference types='vitest' />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/libs/mxui',

    plugins: [
        react(),
        nxViteTsPaths(),
        dts({ entryRoot: 'src', tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'), skipDiagnostics: true })
    ],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },

    // Configuration for building your library.
    // See: https://vitejs.dev/guide/build.html#library-mode
    build: {
        cssCodeSplit: true, // Required. This is set internally by default.
        outDir: './lib',
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true
        },
        lib: {
            // Could also be a dictionary or array of multiple entry points.
            entry: {
                index: 'src/index.ts'
            },
            name: 'mxui',
            fileName: 'index',
            // Change this to the formats you want to support.
            // Don't forget to update your package.json as well.
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            // External packages that should not be bundled into your library.
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                '@meshx/mxui-button',
                '@meshx/mxui-switch',
                '@meshx/mxui-listbox',
                '@meshx/mxui-overlays',
                '@meshx/mxui-rating',
                '@meshx/mxui-dropdown',
                '@meshx/mxui-badge',
                '@meshx/mxui-tooltip',
                '@meshx/mxui-navigation',
                '@meshx/mxui-formgroup',
                '@meshx/mxui-select',
                '@meshx/mxui-infobar',
                '@meshx/mxui-link',
                '@meshx/mxui-searchbox',
                '@meshx/mxui-stripebox',
                '@meshx/mxui-core',
                '@meshx/mxui-primitives',
                '@meshx/mxui-textbox',
                '@meshx/mxui-tailwind',
                '@meshx/mxui-text',
                '@meshx/mxui-checkbox',
                '@meshx/mxui-slider',
                '@meshx/mxui-treeview'
            ]
        }
    }
})
