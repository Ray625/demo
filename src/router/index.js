import { createRouter, createWebHistory } from "vue-router"
import routerMap from "@/router/router.js"

const base = "/"

const router = createRouter({
  history: createWebHistory(base),
  routes: routerMap.routes,
})

export default router
