import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/view/Login.vue";
import Home from "@/view/Home.vue";
import Chords from "@/view/Chords.vue";
import Favourite from "@/view/Favourite.vue";
import Learning from "@/view/Learning.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", component: Login},
    {path: "/home", component: Home},
    {path: "/chords", component: Chords},
    {path: "/favourite", component: Favourite},
    {path: "/learning", component: Learning},
  ],
})

export default router
