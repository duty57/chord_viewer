<script setup lang="ts">

import {onMounted} from "vue";
import {meAPI} from "@/api/user_api.ts";
import {userInstance} from "@/models/user.ts";
import {auth} from "@/config/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";

onMounted( async () => {
  onAuthStateChanged(auth, async () => {
    const res = await meAPI();

    if (res) {
      userInstance.setUser(res.email, "", "", res.favouriteChords, res.learnedChords);
      console.log(res.email, "", "", res.favouriteChords, res.learnedChords)
    }
  });
});
</script>

<template>

  <div class="theme-wrapper">
    <router-view></router-view>
  </div>
</template>

<style scoped>

.theme-wrapper {
  min-height: 100%;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
</style>
