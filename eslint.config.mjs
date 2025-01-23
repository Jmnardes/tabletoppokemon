import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest', // Suporte para ES2022+
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Ativar JSX
        },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Desativar regra para runtime automático
      'plugin:react/jsx-runtime': 'off', // Desativar regra para runtime automático
      'prettier/prettier': ['error', {
        singleQuote: false, // Usar aspas duplas
        semi: true, // Semicolons no final
        trailingComma: 'es5', // Trailing commas onde for permitido (ex: arrays e objetos)
        tabWidth: 2, // Definir 2 espaços para indentação
        bracketSpacing: false, // Não deixar espaço entre chaves em objetos
        jsxBracketSameLine: true, // Colocar o `>` do JSX na mesma linha
      }],
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginPrettier.configs.recommended, // Configuração do Prettier no ESLint
  prettierConfig, // Desabilitar regras de formatação conflitantes com o Prettier
];
