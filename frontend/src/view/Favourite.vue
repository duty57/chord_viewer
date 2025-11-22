<script setup lang="ts">

import Menu from "@/components/Menu.vue";
import {userInstance} from "@/models/user.ts";
import Divider from "@/components/Divider.vue";
import {removeFromFavourite, navigateToChord} from "@/utils/chord_manager.ts";
import {useRouter} from "vue-router";
import DeleteButton from "@/components/DeleteButton.vue";
const router = useRouter();
const favouriteChords = userInstance.favouriteChords;

</script>

<template>
  <Menu></Menu>
  <div class="content">
    <h1 class="page-label">My Favourite Tabs</h1>
    <Divider></Divider>
    <div class="chords">
      <div v-for="favChord in favouriteChords" :key="favChord" class="chord-card">
        <div class="chord-name" @click="navigateToChord(router, favChord)">{{ favChord.replace('-', '/').replace('_', '#') }}</div>
        <DeleteButton class="trash-btn" @click="removeFromFavourite(favouriteChords, favChord)"></DeleteButton>
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
  cursor: pointer;
}

.chord-name:hover {
  text-decoration: underline;
}

.trash-btn {
  width: 25%;
}

@media (max-width: 1024px) {
  .chords {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
    width: 80%;
  }

  .chord-name {
    width: 70%;
    font-size: 1rem;
  }

  .trash-btn {
    width: 30%;
  }
}

@media (max-width: 768px) {
  .chords {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
    width: 80%;
  }

  .chord-name {
    width: 70%;
    font-size: 1rem;
  }

  .trash-btn {
    width: 30%;
  }
}

@media (max-width: 480px) {
  .chords {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
    width: 80%;
  }

  .chord-name {
    width: 70%;
    font-size: 1rem;
  }

  .trash-btn {
    width: 30%;
  }
}

@media (max-width: 768px) and (orientation: landscape) {
  .chords {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
    width: 80%;
  }

  .chord-card {
    min-height: 20vh;
  }

  .chord-name {
    width: 70%;
    font-size: 1rem;
  }

  .trash-btn {
    width: 30%;
  }
}

</style>
