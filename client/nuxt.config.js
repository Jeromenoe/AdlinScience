
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
	'@nuxtjs/vuetify',
	'@nuxtjs/dotenv',
  ],
  

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
	  '@nuxtjs/axios',
	  ['cookie-universal-nuxt'],
  ],
  axios: {
	  baseURL: process.env.API_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    API_URL: process.env.API_URL
  },
  router: {
	  extendRoutes(routes, resolve) {
		  routes.push({
			  path: '/',
			  redirect: '/reservation'
		  })
	  }
  }
}
