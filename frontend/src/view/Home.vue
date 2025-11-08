<script setup lang="ts">

import Menu from "@/components/Menu.vue";
import Divider from "@/components/Divider.vue";
import {userInstance} from "@/models/user.ts";
import {computed} from "vue";

const latestLearnedChord = computed(() => new Set([...userInstance.getLearnedChords().values()].slice(-5).reverse()));

</script>

<template>
  <Menu></Menu>
  <div class="content">
    <h1>Statistics</h1>
    <div class="stats">
      <div class="stats-card">
        <h2>Chords learned</h2>
        <h1>{{ userInstance.getLearnedChords().size }}</h1>
      </div>
      <div class="stats-card">
        <h2>Favourite chords</h2>
        <h1>{{userInstance.getFavouriteChords().size}}</h1>
      </div>
    </div>
    <Divider></Divider>
    <div class="progress">
      <h1>Latest learned chords</h1>
      <div class="latest-learned">
        <button v-for="chord in latestLearnedChord" class="card-btn chord-card">{{chord.replace('_', '#').replace('-', '/')}}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats{
  display: flex;
  flex-direction: row;
  width: 40%;
  margin: 2vh 30%;
  justify-content: space-between;
}

.stats-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 5vh
}

.stats-card h1 {
  display: flex;
  justify-content: center;
  color: var(--text-secondary);
  margin-top: 1vh;
  font-size: 48px;
}

.progress {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.progress h1 {
  text-align: center;
}

.latest-learned {
  display: flex;
  width: 80%;
  margin: 5vh 10%;
  justify-content: start;
  gap: 5%;
}

.chord-card {
  background-color: var(--button-bg);
  border-radius: 15px;
  width: 16%;
  height: 10vh;
  color: var(--text-primary);
  font-size: 24px;
  font-style: italic;
}

.chord-card:hover {
  background-color: var(--button-hover);
}

</style>
