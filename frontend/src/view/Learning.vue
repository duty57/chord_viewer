<script setup lang="ts">
import Menu from "@/components/Menu.vue";
import {notes} from "@/stores/notes.ts";
import {computed, onMounted, reactive, unref, watch} from "vue";
import {userInstance} from "@/models/user.ts";

const visibleNotes = computed(() =>
  unref(notes).filter((n: any) => n.maxAmount > 0)
);

const progress = reactive<Record<string, number>>({
  'C': 0,
  'D': 0,
  'E': 0,
  'F': 0,
  'G': 0,
  'A': 0,
  'B': 0
});

function calculateProgress() {

  for (const key in progress) progress[key] = 0;

  const learnedChords: Set<string> = userInstance.getLearnedChords();
  for (const chord of learnedChords) {
      progress[chord[0]] += 1;
  }
  console.log("good");
}


onMounted(() => {
  setTimeout(() => {
    calculateProgress();
  }, 100);
});
watch(
  () => userInstance.getLearnedChords(),
  () => {
    calculateProgress();
  },
  {deep: true}
)

</script>

<template>
  <Menu></Menu>
  <div class="content">
    <div class="progress-panel" v-for="note in visibleNotes" :key="note.label">
      <div class="progress-info">
        <label class="note-label">{{note.label}}</label>
        <label class="progress-values">{{`${progress[note.label]}/${note.maxAmount}`}}</label>
      </div>
      <div class="progress-bar-bg" >
        <span class="progress-bar" :style="{backgroundColor: note.color, width: progress[note.label] / note.maxAmount * 100 + '%'}"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.progress-panel {
  width: 80%;
  margin: 0.5% 10%;
  height: 100px;
  background-color: var(--bg-secondary);
  border-radius: 25px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin: 1% 2.5%;
  align-items: end;
}

.note-label {
  display: block;
  color: var(--text-primary);
  font-size: 32px;
}

.progress-values {
  color: var(--text-secondary);
}

.progress-bar-bg {
  width: 95%;
  height: 15%;
  margin: 0 2.5%;
  border-radius: 10px;
  background-color: var(--selector-inactive);
  overflow: hidden;
  box-sizing: border-box;
}

.progress-bar {
  display: block;
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
