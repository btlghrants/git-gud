module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/git-gud/' : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
