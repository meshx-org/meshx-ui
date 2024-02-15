// @ts-check

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const svgr = require('@svgr/core')

const ICONS_SOURCE_DIR = 'assets/icons'
const COMPONENTS_DIR = 'src/Icons2'

// Template to generate named exports instaed of default ones
const iconComponentTemplate = ({ template }, opts, { imports, componentName, jsx }) =>
    template.smart({ plugins: ['typescript'] }).ast`
        ${imports}
        ${'\n'}
        export const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
    `

const icons = glob.sync(`${ICONS_SOURCE_DIR}/**.svg`)

const template = (variables, { tpl }) => {
    return tpl`
${variables.imports};

${variables.interfaces};

const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);

${variables.exports};
`
}

async function start() {
    for (const icon of icons) {
        const svg = fs.readFileSync(icon, 'utf8')
        const componentName = path.parse(icon).name

        const componentCode = await svgr.transform(
            svg,
            {
                template: template,
                typescript: true,
                // 1. Clean SVG files using SVGO
                // 2. Generate JSX
                // 3. Format the result using Prettier
                plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
                // Replace hardcoded colors with `currentColor`
                svgoConfig: {
                    plugins: []
                },
                // Replace dimentions
                svgProps: { height: '24', width: '24', viewBox: '0 0 24 24' }
            },
            { componentName }
        )

        fs.writeFileSync(`${COMPONENTS_DIR}/${componentName}.tsx`, componentCode)
    }
}

start()
