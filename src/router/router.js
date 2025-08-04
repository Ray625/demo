const BaseLayout = () => import("@/components/BaseLayout.vue")

const routes = [
  {
    path: "/",
    component: BaseLayout,
    children: [
      {
        path: "demo",
        name: "entrance",
        component: () => import("@/views/entrance.vue"),
      },
    ],
  },
  {
    path: "/product",
    component: BaseLayout,
    children: [
      {
        path: "Upload",
        name: "productUpload",
        component: () => import("@/views/products/ProductUpload.vue"),
      },
    ],
  },
]

export default { routes }
