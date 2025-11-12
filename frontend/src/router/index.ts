import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/view/Login.vue";
import Home from "@/view/Home.vue";
import Chords from "@/view/Chords.vue";
import Favourite from "@/view/Favourite.vue";
import Learning from "@/view/Learning.vue";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/config/firebase.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", component: Login, meta: {requiresAuth: false}},
    {path: "/home", component: Home, meta: {requiresAuth: true}},
    {path: "/chords", component: Chords, meta: {requiresAuth: true}},
    {path: "/favourite", component: Favourite, meta: {requiresAuth: true}},
    {path: "/learning", component: Learning, meta: {requiresAuth: true}},
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  if (requiresAuth) {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        next();
      } else {
        next('/');
      }
    })
  } else {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user && to.path === '/') {
        next('/home');
      } else {
        next();
      }
    });
  }
})

export default router
