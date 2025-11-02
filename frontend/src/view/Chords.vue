<script setup lang="ts">

import Menu from "@/components/Menu.vue";
import {computed, ref} from "vue";

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

let notes = [
  {label: "C", value: "C"},
  {label: "C#", value: "C_"},
  {label: "D", value: "D"},
  {label: "D#", value: "D_"},
  {label: "E", value: "E"},
  {label: "F", value: "F"},
  {label: "F#", value: "F_"},
  {label: "G", value: "G"},
  {label: "G#", value: "G_"},
  {label: "A", value: "A"},
  {label: "A#", value: "A_"},
  {label: "B", value: "B"}
]
let alterations = [
  {label: "Major", value: ""},
  {label: "Minor", value: "m"},
  {label: "7", value: "7"},
  {label: "5", value: "5"},
  {label: "dim", value: "dim"},
  {label: "dim7", value: "dim7"},
  {label: "aug", value: "aug"},
  {label: "sus2", value: "sus2"},
  {label: "sus4", value: "sus4"},
  {label: "maj7", value: "maj7"},
  {label: "m7", value: "m7"},
  {label: "7sus4", value: "7sus4"}
]
let compounds = [
  {label: "", value: ""},
  {label: "C", value: "-C"},
  {label: "C#", value: "-C_"},
  {label: "D", value: "-D"},
  {label: "D#", value: "-D_"},
  {label: "E", value: "-E"},
  {label: "F", value: "-F"},
  {label: "F#", value: "-F_"},
  {label: "G", value: "-G"},
  {label: "G#", value: "-G_"},
  {label: "A", value: "-A"},
  {label: "A#", value: "-A_"},
  {label: "B", value: "-B"}
]

const selectedNote = ref("C");
const selectedAlteration = ref("");
const selectedCompound = ref("");

const chordCombination = computed(() => {
  return selectedNote.value + selectedAlteration.value + selectedCompound.value;
});

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

</script>

<template>
  <Menu></Menu>
  <div class="container theme-wrapper">
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
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  background-color: var(--bg-primary);
  width: 100%;
  display: block;
  align-items: center;
  justify-content: flex-start;
}


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

</style>
