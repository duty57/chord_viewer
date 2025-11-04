<script setup lang="ts">
import Menu from "@/components/Menu.vue";
import {notes} from "@/stores/notes.ts";
import {computed, unref} from "vue";

const visibleNotes = computed(() =>
  unref(notes).filter((n: any) => n.maxAmount > 0)
);

</script>

<template>
  <Menu></Menu>
  <div class="container theme-wrapper">
    <div class="progress-panel" v-for="note in visibleNotes" :key="note.label">
      <div class="progress-info">
        <label class="note-label">{{note.label}}</label>
        <label class="progress-values">{{`${note.currentProgress}/${note.maxAmount}`}}</label>
      </div>
      <div class="progress-bar-bg" >
        <span class="progress-bar" :style="{backgroundColor: note.color, width: note.currentProgress / note.maxAmount * 100 + '%'}"></span>
      </div>
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
  padding: 2.5% 0;
}

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
