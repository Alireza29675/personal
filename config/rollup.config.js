import path from 'path'
import typescript from 'rollup-plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import bundleSize from 'rollup-plugin-bundle-size'
import scss from 'rollup-plugin-scss'

const app = {
    input: 'src/index.tsx',
    output: {
        name: 'app',
        file: path.resolve(__dirname, '../public/bundle.js'),
        format: 'iife',
    }
}

export default {
    ...app,
    plugins: [
        typescript(),
        resolve(),
        commonjs(),
        bundleSize(),
        scss({
            output: true,
            output: path.resolve(__dirname, '../public/bundle.css'),
        })
    ]
}