import config from './rollup.config'

import { terser } from 'rollup-plugin-terser'

config.plugins = [
    ...config.plugins,
    terser({
        sourcemap: true
    })
]

export default config