import { createRouter, createWebHistory } from "vue-router"
import routerMap from "@/router/router.js"

const base = "/"

const router = createRouter({
  history: createWebHistory(base),
  routes: routerMap.routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
