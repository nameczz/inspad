// http://tutuxxx.github.io/2016/08/14/%E5%9C%A8Vue+Babel+Webpack%E7%8E%AF%E5%A2%83%E4%B8%AD%E4%BD%BF%E7%94%A8ESLint/

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  parser: 'babel-eslint',
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': [2, 'never'],
    'generator-star-spacing': 0,
    'comma-dangle': [2, 'always-multiline'],
    'prefer-const': 2,
    // 'no-param-reassign': 2,
    'prefer-template': 2,
    'template-curly-spacing': [2, 'never'],
    'lines-around-comment': [2, {
      beforeBlockComment: true,
      beforeLineComment: true,
      allowBlockStart: true,
      allowObjectStart: true,
      allowArrayStart: true,
    }],
    'spaced-comment': [2, 'always'],
    'no-useless-escape': 2,
    'prefer-spread': 2,
    'prefer-arrow-callback': 2,
    'arrow-parens': [2, 'as-needed'],
    'no-dupe-class-members': 2,
    'dot-notation': 2,
    'camelcase': [2, {
      properties: 'never'
    }],
    'max-len': [2, {
      code: 100,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true
    }],
    'array-bracket-spacing': [2, 'never'],
    'object-curly-spacing': [2, 'always'],
    'one-var': [2, 'never'],
    'new-cap': 2,
    'spaced-comment': [2, 'always'],
    'eqeqeq': [2, "smart"],
    'no-nested-ternary': 2,
    'no-unneeded-ternary': 2,
    'prefer-rest-params': 2,
    'no-var': 2,
    'object-shorthand': 2,
    'array-callback-return': 2,
    'no-const-assign': 2,
    'quote-props': [2, 'as-needed'],
  },
  globals: {},
}
