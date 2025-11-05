<script setup lang="ts">

import Menu from "@/components/Menu.vue";
import {userInstance} from "@/models/user.ts";


</script>

<template>
  <Menu></Menu>
  <div class="content">
    <label class="page-label">My Favourite Tabs</label>
    <div class="chords">
      <div v-for="favChord in userInstance.getFavouriteChords()" :key="favChord">
        <label class="chord-name"></label>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
