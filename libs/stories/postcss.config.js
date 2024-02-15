// libs/shared/ui/postcss.config.js
import { join } from 'path'

export default {
    plugins: {
        tailwindcss: {
            config: join(__dirname, 'tailwind.config.ts')
        },
        autoprefixer: {}
    }
}
