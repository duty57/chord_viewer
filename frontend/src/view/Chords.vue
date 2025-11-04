<script setup lang="ts">

import Menu from "@/components/Menu.vue";
import {computed, ref} from "vue";
import {alterations, compounds, notes} from "@/stores/notes.ts";
import {userInstance} from "@/models/user.ts";

const columns = 18;
const rows = 5;
const minScale = 0.5;
const maxScale = 1;
const targetCols = [3, 5, 7, 9, 15, 17];
const dotPositions = new Set([
  ...targetCols.map(c => 2 * columns + c),
  11,
  4 * columns + 11
]);


const selectedNote = ref("C");
const selectedAlteration = ref("");
const selectedCompound = ref("");

const chordCombination = computed(() => {
  return selectedNote.value + selectedAlteration.value + selectedCompound.value;
});

let isFavourite = userInstance.getFavouriteChords().has(chordCombination.value);
let isLearned = userInstance.getLearnedChords().has(chordCombination.value);

function generateColumns() {
  const parts = [];
  for (let i = 0; i < columns; i++) {
    const t = i / (columns - 1);
    const scale = maxScale - t * (maxScale - minScale);
    parts.push(`${scale}fr`);
  }
  return parts.join(' ');
}

function cellStyle(n: number) {
  n = (n < columns) ? 0 : n;
  const row = Math.floor((rows * columns - n) / columns + 1);
  const borderWidth = row * .75; // or use a multiplier like row * 2
  return {
    borderTop: `${borderWidth}px solid #CFD8DC`,
    borderBottom: `${borderWidth}px solid #CFD8DC`,
  };
}

function toggleFavourite() {
  const key = chordCombination.value;
  const favourites = userInstance.getFavouriteChords();
  if (!favourites) return;
  if (favourites.has(key)) {
    favourites.delete(key);
    isFavourite = false;
  } else {
    favourites.add(key);
    isFavourite = true;
  }
  userInstance.setFavouriteChords(favourites);
}

function toggleLearned() {
  const key = chordCombination.value;
  const learned = userInstance.getLearnedChords();
  if (!learned) return;
  if (learned.has(key)) {
    learned.delete(key);
  }else {
    learned.add(key);
  }
  userInstance.setLearnedChords(learned);
}

</script>

<template>
  <Menu></Menu>
  <div class="container theme-wrapper">
    <div class="fret-numeration" :style="{gridTemplateColumns: generateColumns()}">
      <label v-for="n in columns" :key="'num-'+n" class="cell num">{{ n }}</label>
    </div>
    <div class="fret-top" :style="{gridTemplateColumns: generateColumns()}">
      <div v-for="n in columns" :key="n" class="cell"></div>
    </div>
    <div class="fret" :style="{gridTemplateColumns: generateColumns()}">
      <div v-for="n in rows * columns" :key="n" class="cell" :style="cellStyle(n)">
        <div v-if="dotPositions.has(n)" class="dot"></div>
      </div>
    </div>
    <div class="fret-bottom" :style="{gridTemplateColumns: generateColumns()}">
      <div v-for="n in columns" :key="n" class="cell"></div>
    </div>

    <div class="chord-selector">
      <div class="note-selector">
        <div class="note" :class="{active: selectedNote === note.value}" v-for="note in notes" :key="note.value" @click="selectedNote = note.value">{{note.label}}</div>
      </div>
      <div class="alteration-selector">
        <div class="alteration" :class="{active: selectedAlteration === alteration.value}" v-for="alteration in alterations" :key="alteration.value" @click="selectedAlteration = alteration.value">{{alteration.label}}</div>
      </div>
      <div class="compound-selector">
        <div class="compound" :class="{active: selectedCompound === compound.value}" v-for="compound in compounds" :key="compound.value" @click="selectedCompound = compound.value">{{compound.label}}</div>
      </div>
    </div>
    <div class="chord-management">
      <button type="button" class="add-learn-btn" @click="toggleLearned" :class="{active: isLearned}">Learn</button>
      <button type="button" class="add-fav-btn" @click="toggleFavourite" :aria-pressed="isFavourite">
        <svg class="star" viewBox="0 0 24 24" width="24" height="24" :class="{active: isFavourite}">
          <path d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.603L19.335 24 12 19.897 4.665 24l1.585-8.647L.5 9.75l7.832-1.732z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>

.container {
  min-height: 100vh;
  background-color: var(--bg-primary);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 0;
}

.fret-top,
.fret-bottom {
  display: grid;
  width: 80%;
  border-left: 2px solid #CFD8DC;
}

.fret-top .cell {
  background-color: #4E342E;
  height: 10px;
  border: none;
  border-right: 4px solid #90A4AE;
}

.fret-bottom .cell {
  background-color: #4E342E;
  height: 10px;
  border: none;
  border-right: 4px solid #90A4AE;
}

.fret {
  display: grid;
  grid-template-rows: repeat(5, minmax(48px, 1fr));
  width: 80%;
  border: 1px solid #CFD8DC;
  border-top: 3px solid #CFD8DC;
}

.cell {
  background-color: #4E342E;
  border: 1px solid #90A4AE;
  border-right: 3px solid #90A4AE;
  display: flex;
  justify-content: center;
  align-items: center;

}

.dot {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #FFECB3;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.12);
}

.chord-selector {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  align-items: center;
}

.chord-selector {
  display: block;
  width: 100%;
  gap: 2rem;
  margin-top: 0;
  justify-content: center;
}

.note-selector, .alteration-selector, .compound-selector {
  display: flex;
  width: 80%;
  margin: 1.5% 10%;
  justify-content: space-between;
}

.note, .alteration, .compound {
  flex: 1;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--selector-inactive);
  color: var(--selector-text);
  cursor: pointer;
}

.note.active, .alteration.active, .compound.active {
  background-color: var(--selector-active);
}

.fret-numeration {
  display: grid;
  width: 80%;
  margin-bottom: 6px;
  grid-auto-rows: minmax(22px, auto);
  justify-items: stretch;
}

.fret-numeration .cell {
  background: transparent;
  height: 22px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 13px;
  user-select: none;
}

.chord-management{
  display: flex;
  width: 20%;
  margin: 0 30%;
  justify-content: center;
}

.star {
  fill: transparent;
  stroke: #bdbdbd;
  stroke-width: 1;
  transition: fill .15s ease, stroke .15s ease;
}
.star.active {
  fill: #FFD54F; /* yellow/gold */
  stroke: #FFC107;
}
.add-fav-btn {
  background: transparent;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
}

.add-learn-btn {
  background-color: var(--selector-inactive);
  color: var(--selector-text);
  box-shadow: none;
  border: none;
  padding: 1rem 2rem;
  border-radius: 2rem;
  cursor: pointer;
}

.add-learn-btn.active {
  background-color: var(--selector-active);
}
</style>
