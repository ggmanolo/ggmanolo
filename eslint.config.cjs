const { FlatCompat } = require("@eslint/eslintrc")
const prettier = require("eslint-config-prettier")

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

module.exports = [
  {
    ignores: [".next/**", ".yarn/**", "node_modules/**", "public/**"],
  },
  ...compat.extends("next/core-web-vitals"),
  prettier,
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
]
