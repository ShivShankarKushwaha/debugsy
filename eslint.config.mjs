import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// For legacy ESLint plugins/configs like "next/core-web-vitals"
const compat = new FlatCompat({
    baseDirectory: __dirname
});

const lintRules = [
    // Next.js + TypeScript presets
    ...compat.extends('next/core-web-vitals', 'next/typescript'),

    // Add Prettier to disable conflicting rules
    {
        name: 'prettier-config',
        rules: {
            ...prettier.rules
        }
    },

    // Unused imports cleanup
    {
        plugins: {
            'unused-imports': unusedImports
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_'
                }
            ]
        }
    },

    // Ignore Next.js output directories
    {
        ignores: ['.next/', 'dist/', 'build/']
    }
];

export default lintRules;
