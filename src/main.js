import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronUp, faChevronDown, faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)
library.add(faChevronUp)
library.add(faChevronDown)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(store)

app.mount('#app')
