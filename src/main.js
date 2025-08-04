import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router"
import { createPinia } from "pinia"
import quasar from "@/assets/libs/QuasarPlugin.js"

import "@/assets/scss/_colors.scss"

const app = createApp(App)
const pinia = createPinia()
app.use(quasar)

app.use(pinia)

app.use(router)
app.mount("#app")
