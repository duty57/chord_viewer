<script setup lang="ts">

import Menu from "@/components/Menu.vue";
import Divider from "@/components/Divider.vue";
import {userInstance} from "@/models/user.ts";
import {computed} from "vue";
import {useRouter} from 'vue-router'
import {navigateToChord} from "@/utils/chord_manager.ts";

const router = useRouter();
const latestLearnedChord = computed(() => new Set([...userInstance.learnedChords.values()].slice(-5).reverse()));


</script>

<template>
  <Menu></Menu>
  <div class="content">
    <h1>Statistics</h1>
    <div class="stats">
      <div class="stats-card">
        <h2>Chords learned</h2>
        <h1>{{ userInstance.learnedChords.size }}</h1>
      </div>
      <div class="stats-card">
        <h2>Favourite chords</h2>
        <h1>{{userInstance.favouriteChords.size}}</h1>
      </div>
    </div>
    <Divider></Divider>
    <div class="progress">
      <h1>Latest learned chords</h1>
      <div class="latest-learned">
        <button v-for="chord in latestLearnedChord" class="card-btn chord-card" @click="navigateToChord(router, chord)">{{chord.replace('_', '#').replace('-', '/')}}</button>
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
  gap: 2rem;
}

.stats-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 5vh;
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
  align-items: center;
}

.progress h1 {
  text-align: center;
}

.latest-learned {
  display: flex;
  width: 80%;
  margin: 7.5vh auto;
  justify-content: center;
  align-items: center;
  gap: 5%;
  flex-wrap: wrap;
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

@media (max-width: 1024px) {
  .stats {
    width: 60%;
    margin: 2vh 20%;
    gap: 1.5rem;
  }

  .stats-card h1 {
    font-size: 40px;
  }

  .stats-card h2 {
    display: flex;
    justify-content: center;
  }

  .latest-learned {
    width: 90%;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    margin: 7.5vh 0;
  }

  .chord-card {
    width: 90%;
    max-width: 400px;
    height: 8vh;
    min-height: 70px;
    font-size: 22px;
  }
}

@media (max-width: 768px) {
  .stats {
    width: 80%;
    margin: 2vh 10%;
    flex-direction: column;
  }

  .stats-card h1 {
    font-size: 36px;
  }

  .latest-learned {
    width: 95%;
    gap: 1rem;
  }

  .chord-card {
    width: 95%;
    max-width: 350px;
    height: 7vh;
    min-height: 60px;
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .stats {
    width: 90%;
    margin: 2vh 5%;
  }

  .stats-card h1 {
    font-size: 32px;
  }

  .latest-learned {
    width: 98%;
  }

  .chord-card {
    width: 98%;
    max-width: 300px;
    height: 6vh;
    min-height: 55px;
    font-size: 18px;
  }
}

</style>
