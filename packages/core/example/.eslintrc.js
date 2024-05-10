module.exports = {
  $schema: 'https://json.schemastore.org/eslintrc',
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react-hooks', 'simple-import-sort', 'import'],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  },
  ignorePatterns: ['dist/', 'node_modules/', '.next'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    'no-unused-vars': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/react-in-jsx-scope': 'off',

    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^node:', '^@?\\w'], // packages
          ['^(lib)(/.*|$)', '^(common|modules|services|components|utils|hook|hooks|config)(/.*|$)'], // next alias
          ['^'],
          ['^\\.'], // relative
          ['^.+\\.s?css$'], // style
        ],
      },
    ],
    'simple-import-sort/exports': 'error',

    'sort-imports': 'off',
    'import/order': 'off',
    'import/no-unresolved': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-named-as-default': 'off',

    'prettier/prettier': [
      'error',
      {
        semi: true,
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        arrowParens: 'avoid',
        bracketSameLine: false,
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['debug', 'error'],
      },
    ],
  },
  settings: {
    react: { version: 'detect' },
  },
};
