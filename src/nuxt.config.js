const nodeExternals = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Oumienet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Let your grandparents know you care about them' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  modules: [
    ['@nuxtjs/dotenv', { filename: process.env.NODE_ENV === 'local' ? '.env' : '.env.prod' }],
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  axios: {
    baseURL: process.env.NODE_ENV === 'local' ? 'http://192.168.99.100:3333' : 'https://api.oumie.app'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          user: { url: '/auth/self', method: 'get', propertyName: false },
          logout: false
        }
      }
    }
  },
  plugins: ['~/plugins/vuetify.js'],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    publicPath: process.env.NODE_ENV === 'development' ? '/_nuxt/' : '/assets/client/',
    transpile: [/^vuetify/],
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    extractCSS: true,
    babel: {
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        ['@babel/plugin-transform-runtime', {
          corejs: 2,
          regenerator: true
        }],
        '@babel/plugin-syntax-dynamic-import'
      ]
    },
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options : {
              fix : true
          }
        })
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}