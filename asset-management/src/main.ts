import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router/index'
// import { getAuth } from 'firebase/auth';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { createPinia } from 'pinia';
// import { initializeApp } from "firebase/app";
import "firebase/auth";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement);


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

//import for globall css
import 'vuetify/dist/vuetify.min.css'; 
import './assets/styles/global.css'
// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'



// import Datepicker from 'vue3-datepicker';
// import 'vue3-datepicker/dist/vue3-datepicker.css';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "asset-management-c67d4.firebaseapp.com",
//   projectId: "asset-management-c67d4",
//   storageBucket: "asset-management-c67d4.firebasestorage.app",
//   messagingSenderId: "477182012947",
//   appId: "1:477182012947:web:bab45814dff855692919e6"
// };

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// export const auth = getAuth(firebaseApp)


export default createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})

const vuetify = createVuetify({
  components,
  directives,
})
const app=createApp(App)
const pinia = createPinia();
app.use(pinia);
app.use(router)
app.use(vuetify);
// app.component('VueDatePicker', VueDatePicker);
// app.component('Datepicker', Datepicker);

app.mount('#app')
