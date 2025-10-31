import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/view/Login.vue";
import Home from "@/view/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", component: Login},
    {path: "/home", component: Home}
  ],
})

export default router
