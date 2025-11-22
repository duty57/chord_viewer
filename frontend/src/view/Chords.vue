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
import {useRoute} from "vue-router";

const route = useRoute();

const columns = 18;
const rows = 6;
const minScale = 0.5;
const maxScale = 1;
const targetCols = new Set<number>([3, 5, 7, 9, 12, 15, 17]);

const selectedNote = ref("C");
const selectedAlteration = ref("");
const selectedCompound = ref("");
const selectedChord = ref<Chord>(new Chord());
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

function getFingerAtCell(column: number, row: number): number | null {
  const fretNumber = column;
  const stringIndex = row - 1;

  if (!selectedChord.value.positions || selectedChord.value.positions.length === 0) {
    return null;
  }

  if (Number(selectedChord.value.positions[stringIndex]) === fretNumber) {
    return Number(selectedChord.value.fingerings?.[stringIndex]) ?? null;
  }

  return null;
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

async function getChordData() {
  const fav = userInstance?.favouriteChords ?? new Set<string>();
  const learned = userInstance?.learnedChords ?? new Set<string>();
  isFavourite.value = fav.has(selectedChord.value.chordName);
  isLearned.value = learned.has(selectedChord.value.chordName);
  const res = await getChordPosition(selectedChord.value.chordName);
  if (res) {
    selectedChord.value = new Chord(res.chord, res.positions, res.fingerings);
  }
}

onMounted(() => {
  const chord = route.query.chord as string;
  if (chord) {
    selectedChord.value = new Chord(chord, [], []);
    const match = chord.match(/^([A-G](?:_|b)?)([a-z0-9+]*)(?:-([A-G](?:_|b)?))?$/i);
    if (match) {
      const [_, note, alteration, compound] = match;
      selectNote(note || "C");
      const alterationObj = alterations.find(a => a.value === (alteration || ""));
      selectAlteration(alterationObj?.value || "");
      const compoundObj = compounds.find(c => c.value === (compound ? `-${compound}` : ""));
      selectCompound(compoundObj?.value || "");
      getChordData();
    }
  }
  setTimeout( async () => {
    await getChordData();
  }, 100);
});

watch(
  () => [userInstance.favouriteChords ,userInstance.learnedChords],
  async () => {
    await getChordData();
  },
  {deep: true}
);

watch(
  () => [selectedNote.value, selectedAlteration.value, selectedCompound.value],
  async () => {
    const newChordName = selectedNote.value + selectedAlteration.value + selectedCompound.value;
    selectedChord.value = new Chord(newChordName, [], []);
    await getChordData();
  },
  {immediate: true}
);

async function selectNote(note: string) {
  selectedNote.value = note;
}
async function selectAlteration(alteration: string) {
  selectedAlteration.value = alteration;
}
async function selectCompound(compound: string) {
  selectedCompound.value = compound;
}
const filteredCompounds = computed(() => {
  return compounds.filter(c =>  c.value.slice(1) !== selectedNote.value);
});
</script>

<template>
  <Menu></Menu>
  <main class="content">
    <div class="fret-numeration" :style="{gridTemplateColumns: generateColumns()}">
      <label v-for="n in columns" :key="'num-'+n" class="cell num">{{ n }}</label>
    </div>

    <div class="fret" :style="{gridTemplateColumns: generateColumns()}">
      <div class="fret-column" v-for="column in columns" :key="column">
        <div class="cell" v-for="row in rows" :key="row">
          <div class="string" :style="{height: rows - row + 1 + 'px'}"></div>
          <div v-if="getFingerAtCell(column, row) !== null" class="finger-marker" :style="{backgroundColor: 'var(--fingering-' + getFingerAtCell(column, row) + ')'}">
            {{ getFingerAtCell(column, row) }}
          </div>
        </div>
        <div class="dot" v-if="targetCols.has(column)"></div>
      </div>
    </div>

    <div class="chord-selector">
      <div class="note-selector">
        <div class="note" :class="{active: selectedNote === note.value}" v-for="note in notes" :key="note.value" @click="selectNote(note.value)">{{note.label}}</div>
      </div>
      <div class="alteration-selector">
        <div class="alteration" :class="{active: selectedAlteration === alteration.value}" v-for="alteration in alterations" :key="alteration.value" @click="selectAlteration(alteration.value)">{{alteration.label}}</div>
      </div>
      <div class="compound-selector">
        <div class="compound" :class="{active: selectedCompound === compound.value}" v-for="compound in filteredCompounds" :key="compound.value" @click="selectCompound(compound.value)">{{compound.label}}</div>
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
  </main>
</template>

<style scoped>

.fret {
  display: grid;
  width: 80%;
  border-left: 3px solid #90A4AE;
  overflow-x: auto;
}

.fret-column {
  display: flex;
  flex-direction: column;
  border-right: 3px solid #90A4AE;
  position: relative;
}

.dot {
  width: 25px;
  height: 25px;
  background-color: #FFECB3;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.cell {
  background-color: #4E342E;
  flex: 1;
  min-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.string {
  width: 100%;
  background-color: #BDBDBD;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.finger-marker {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: var(--text-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 10;
  border: 1px solid white;
  position: absolute;
}

.chord-selector {
  display: block;
  width: 100%;
  margin-top: 0;
}

.note-selector, .alteration-selector, .compound-selector {
  display: flex;
  width: 80%;
  margin: 1.5% 10%;
  justify-content: space-between;
  flex-wrap: wrap;
}

.note, .alteration, .compound {
  flex: 1;
  min-width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--selector-inactive);
  color: var(--selector-text);
  cursor: pointer;
  transition: background-color 0.2s ease;
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
  overflow-x: auto;
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
  width: 80%;
  max-width: 400px;
  margin: 2rem auto 0;
  justify-content: center;
  gap: 1rem;
  padding: 0 1rem;
}

.star {
  fill: transparent;
  stroke: #bdbdbd;
  stroke-width: 1;
  transition: fill .15s ease, stroke .15s ease;
}

.star:hover {
  fill: #FFD54F;
  stroke: #FFC107;
}

.star.active {
  fill: #FFD54F;
  stroke: #FFC107;
}

.fav {
  margin-left: 0;
}

.learn {
  flex: 1;
  background-color: var(--selector-inactive);
  color: var(--selector-text);
}

.learn:hover {
  background-color: var(--selector-active);
}

.learn.active {
  background-color: var(--selector-active);
}

@media (max-width: 1024px) {
  .fret, .fret-numeration {
    width: 90%;
  }

  .note-selector, .alteration-selector, .compound-selector {
    width: 90%;
    margin: 1.5% 5%;
    gap: 0.5rem;
  }

  .note, .alteration, .compound {
    border-radius: 4px;
  }

  .cell {
    min-height: 40px;
  }

  .finger-marker {
    width: 25px;
    height: 25px;
    font-size: 16px;
  }

  .dot {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 1rem 0;
  }

  .fret, .fret-numeration {
    width: 95%;
  }

  .note-selector, .alteration-selector, .compound-selector {
    width: 95%;
    margin: 1rem 2.5%;
    gap: 0.25rem;
  }

  .note, .alteration, .compound {
    min-width: 40px;
    height: 40px;
    font-size: 14px;
    border-radius: 4px;
  }

  .cell {
    min-height: 35px;
  }

  .finger-marker {
    width: 22px;
    height: 22px;
    font-size: 14px;
  }

  .dot {
    width: 15px;
    height: 15px;
  }

  .chord-management {
    width: 90%;
    flex-direction: column;
    max-width: none;
  }

  .learn, .fav {
    width: 100%;
  }

  .fav {
    display: flex;
    justify-content: center;
    padding: 0.75rem;
  }

  .fret-numeration .cell {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .fret, .fret-numeration {
    width: 98%;
  }

  .note-selector, .alteration-selector, .compound-selector {
    width: 98%;
    margin: 0.75rem 1%;
    gap: 0.5rem;
  }

  .note, .alteration, .compound {
    min-width: 35px;
    height: 35px;
    font-size: 12px;
    padding: 0.25rem;
    border-radius: 4px;
  }

  .cell {
    min-height: 30px;
  }

  .finger-marker {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }

  .fret-numeration .cell {
    font-size: 10px;
  }

  .chord-management {
    width: 95%;
    padding: 0 0.5rem;
  }
}

@media (max-width: 768px) and (orientation: landscape) {
  .cell {
    min-height: 30px;
  }

  .note, .alteration, .compound {
    height: 35px;
    border-radius: 4px;
  }

  .chord-selector {
    margin-top: 0.5rem;
    gap: 0.5rem;
  }

  .note-selector, .alteration-selector, .compound-selector {
    margin: 0.75rem 2.5%;
  }
}

</style>
