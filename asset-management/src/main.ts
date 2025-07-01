import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router/index'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { createPinia } from 'pinia'

// Chart.js setup
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement)

// Vuetify setup
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Global CSS
import 'vuetify/dist/vuetify.min.css'
import './assets/styles/global.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
