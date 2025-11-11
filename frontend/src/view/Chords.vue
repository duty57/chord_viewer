<script setup lang="ts">

import Menu from "@/components/Menu.vue";
import {computed, onMounted, ref, watch} from "vue";
import {alterations, compounds, notes} from "@/stores/notes.ts";
import {userInstance} from "@/models/user.ts";
import {
  addToFavourite,
  addToLearned,
  removeFromFavourite,
  removeFromLearned
} from "@/utils/chord_manager.ts";
import {getChordPosition} from "@/api/chord_api.ts";
import {Chord} from "@/models/chord.ts";

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
const selectedChord = ref<Chord>(new Chord());
  // computed(() => new Chord(selectedNote.value + selectedAlteration.value + selectedCompound.value, [], []));

const isFavourite = ref(false);
const isLearned = ref(false);

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

async function toggleFavourite() {
  const key = selectedChord.value.chordName;
  const favourites = userInstance.favouriteChords;
  if (!favourites) return;
  if (favourites.has(key)) {
    await removeFromFavourite(favourites, key);
    isFavourite.value = false;
  } else {
    await addToFavourite(favourites, key);
    isFavourite.value = true;
  }
}

async function toggleLearned() {
  const key = selectedChord.value.chordName;
  const learned = userInstance.learnedChords;
  if (!learned) return;
  if (learned.has(key)) {
    await removeFromLearned(learned, key);
    isLearned.value = false;
  }else {
    await addToLearned(learned, key);
    isLearned.value = true;
  }
}

async function checkUserChords() {
  const fav = userInstance?.favouriteChords ?? new Set<string>();
  const learned = userInstance?.learnedChords ?? new Set<string>();
  isFavourite.value = fav.has(selectedChord.value.chordName);
  isLearned.value = learned.has(selectedChord.value.chordName);
  const res = await getChordPosition(selectedChord.value.chordName);
  if (res) {
    selectedChord.value = new Chord(res.chord, res.positions, res.fingerings);
    console.log(selectedChord.value);
  }
}

onMounted(() => {
  setTimeout( async () => {
    await checkUserChords();
  }, 100);
});
watch(
  () => [userInstance.favouriteChords ,userInstance.learnedChords],
  async () => {
    await checkUserChords();
  },
  {deep: true}
)

watch(
  () => [selectedNote.value, selectedAlteration.value, selectedCompound.value],
  async () => {
    const newChordName = selectedNote.value + selectedAlteration.value + selectedCompound.value;
    selectedChord.value = new Chord(newChordName, [], []);
    await checkUserChords();
  },
  {immediate: true}
)

async function selectNote(note: string) {
  selectedNote.value = note;
}

async function selectAlteration(alteration: string) {
  selectedAlteration.value = alteration;
}

async function selectCompound(compound: string) {
  selectedCompound.value = compound;
}

</script>

<template>
  <Menu></Menu>
  <div class="content">
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
        <div class="note" :class="{active: selectedNote === note.value}" v-for="note in notes" :key="note.value" @click="selectNote(note.value)">{{note.label}}</div>
      </div>
      <div class="alteration-selector">
        <div class="alteration" :class="{active: selectedAlteration === alteration.value}" v-for="alteration in alterations" :key="alteration.value" @click="selectAlteration(alteration.value)">{{alteration.label}}</div>
      </div>
      <div class="compound-selector">
        <div class="compound" :class="{active: selectedCompound === compound.value}" v-for="compound in compounds" :key="compound.value" @click="selectCompound(compound.value)">{{compound.label}}</div>
      </div>
    </div>
    <div class="chord-management">
      <button type="button" class="txt-btn learn" @click="toggleLearned" :class="{active: isLearned}">{{(isLearned)? "Learned" : "Learn"}}</button>
      <button type="button" class="empty-btn fav" @click="toggleFavourite">
        <svg class="star" viewBox="0 0 24 24" width="24" height="24" :class="{active: isFavourite}">
          <path d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.603L19.335 24 12 19.897 4.665 24l1.585-8.647L.5 9.75l7.832-1.732z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>

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
  width: 15%;
  margin: 0 42.5%;
  justify-content: center;
}

.star {
  fill: transparent;
  stroke: #bdbdbd;
  stroke-width: 1;
  transition: fill .15s ease, stroke .15s ease;
}

.star:hover {
  fill: #FFD54F; /* yellow/gold */
  stroke: #FFC107;
}

.star.active {
  fill: #FFD54F; /* yellow/gold */
  stroke: #FFC107;
}

.fav {
  margin-left: 1rem;
}

.learn {
  background-color: var(--selector-inactive);
  color: var(--selector-text);
}

.learn:hover {
  background-color: var(--selector-active);
}

.learn.active {
  background-color: var(--selector-active);
}
</style>
