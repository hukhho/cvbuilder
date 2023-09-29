// eslint-disable-next-line , import/extensions
const prettierConfig = require('./.prettierrc.js');

module.exports = {
  extends: [
    'airbnb', // Airbnb rules
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'react', // Uses the recommended rules from @eslint-plugin-react
    'prettier',
  ],
  rules: {
    // Include your custom rules here
    'react/react-in-jsx-scope': 'off', // No need to import React with JSX Transform introduced in React 17
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }], // Allow JSX syntax in .js, .jsx, .ts, .tsx files
    'no-use-before-define': 'off',
    semi: [1, 'always'],

    // Possible errors
    'no-console': 'warn',

    // Best practices
    'dot-notation': 'error',
    'no-else-return': 'error',
    'no-floating-decimal': 'error',
    'no-sequences': 'error',

    // Stylistic
    'array-bracket-spacing': 'error',
    'computed-property-spacing': ['error', 'never'],
    'unused-imports/no-unused-imports-ts': 'off',
    curly: 'error',
    'no-lonely-if': 'error',
    'no-unneeded-ternary': 'error',
    'one-var-declaration-per-line': 'error',
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: false,
        avoidEscape: true,
      },
    ],

    // ES6
    'array-callback-return': 'off',
    'prefer-const': 'error',

    // Imports
    'import/prefer-default-export': 'off',
    'import/order': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'no-unused-expressions': 'off',
    'no-useless-catch': 'off',
    'no-prototype-builtins': 'off',
    'no-param-reassign': 'off',
    'no-undef': 'off',

    // REACT
    'react/button-has-type': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-uses-react': 'off',
    'react/no-array-index-key': 'off',
    'jsx-a11y/href-no-hash': [0],
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'react/display-name': 0,
    'react/no-deprecated': 'error',
    'react/no-unsafe': [
      'error',
      {
        checkAliases: true,
      },
    ],
    'react/function-component-definition': 'off',
    'react-hooks/exhaustive-deps': 0,
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': ['off', { devDependencies: false, optionalDependencies: false, peerDependencies: false }],

    // Prettier
    // eslint looks for the prettier config at the top level of the package/app
    // but the config lives in the `config/` directory. Passing the config here
    // to get around this.
    'prettier/prettier': ['error', prettierConfig],
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
