module.exports = {
  // https://www.elian.codes/blog/writing-your-own-components-with-tailwind-sass/
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-nested': {},
    'postcss-easy-import': { prefix: '_', extensions: ['.css', '.scss'] },
}
}