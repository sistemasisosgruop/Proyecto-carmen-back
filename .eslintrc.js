module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2021': true
  },
  'extends': [
    'eslint: recommended',
    'plugin: prettier/recommended'
  ],
  'plugins': ['prettier'],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'ignorePatterns': [
    '/database/config/config.js',
    '/database/models/',
    'package.json',
    'package-lock.json',
  ],
  'rules': {
    'no-unused-vars': [
      'warn', { 
        'vars': 'all', 
        'args': 'after-used',
        'ignoreRestSiblings': true 
      }],
    'padding-line-between-statements': [
      'error',
      { 'blankLine': 'any', 'prev': '*', 'next': '*' },
    ],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'off',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'warn',
      'never'
    ]
  }
}
