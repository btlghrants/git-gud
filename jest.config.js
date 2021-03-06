module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js'
  ],
  // https://github.com/vuejs/vue-cli/issues/1584
  // https://github.com/vuetifyjs/vuetify/issues/8483
  // https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-plugin-unit-jest/README.md
  transformIgnorePatterns: [
    'node_modules/(?!vue-router|@babel|vuetify)'
  ]
}
