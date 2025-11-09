<script setup lang="ts">

import Menu from "@/components/Menu.vue";
import {userInstance} from "@/models/user.ts";
import Divider from "@/components/Divider.vue";
import {removeFromFavourite} from "@/utils/chord_manager.ts";
import {auth} from "@/config/firebase.ts";

const favouriteChords = userInstance.getFavouriteChords();

async function handleRemove(chord: string) {
  const idToken = await auth.currentUser?.getIdToken(false);
  await removeFromFavourite(favouriteChords, chord, idToken);
}

</script>

<template>
  <Menu></Menu>
  <div class="content">
    <h1 class="page-label">My Favourite Tabs</h1>
    <Divider></Divider>
    <div class="chords">
      <div v-for="favChord in favouriteChords" :key="favChord" class="chord-card">
        <div class="chord-name">{{ favChord.replace('-', '/').replace('_', '#') }}</div>
        <button class="trash-btn" title="Remove" @click="handleRemove(favChord)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chords {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  width: 80%;
}

.chord-card {
  display: flex;
  align-items: center;
  background: var(--bg-secondary, #fff);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  overflow: hidden;
  min-height: 7.5vh;
}

.chord-name {
  width: 75%;
  display: flex;
  font-size: 1.2rem;
  color: var(--text-primary);
  background: transparent;
  justify-content: center;
  align-items: center;
}

.trash-btn {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ef4444;
  fill: var(--text-primary);
  border: none;
  outline: none;
  cursor: pointer;
  height: 100%;
  transition: background 0.2s;
}

.trash-btn:hover {
  background: #b91c1c;
}
</style>
