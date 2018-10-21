const flow = require('rollup-plugin-flow')
const babel = require('rollup-plugin-babel')
const changeCase = require('change-case')
const packageJson = require('./package.json')

process.env.BABEL_ENV = 'production'

module.exports = {
  input: 'src/index.js',
  output: {
    file: `dist/${packageJson.name}.js`,
    format: 'umd',
    sourcemap: true,
    name: changeCase
      .titleCase(packageJson.name.replace(/-/g, ' '))
      .replace(/ /g, ''),
  },
  plugins: [
    flow({ all: true }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        ['@babel/plugin-proposal-class-properties', { loose: false }],
        '@babel/plugin-proposal-json-strings',
      ],
    }),
  ],
}
