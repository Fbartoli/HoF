module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    "vue/attributes-order": "off",
    "vue/prop-name-casing": "off",
    "vue/attribute-hyphenation": "off",
    "vue/no-v-html": "off",
    "vue/multi-word-component-names": "off",
    "no-unused-vars": "off",
    "camelcase": "off",
    "object-shorthand": "off",
    "prefer-const": "off",
    "eqeqeq": "off",
    "spaced-comment": "off",
    "vue/v-slot-style": "off",
  },
}
