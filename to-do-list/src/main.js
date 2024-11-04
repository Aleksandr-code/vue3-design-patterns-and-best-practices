import { createApp } from 'vue'
import './assets/styles.css'
import App from './App.vue'
import Modals from './plugins/modals'

createApp(App).use(Modals).mount('#app')
