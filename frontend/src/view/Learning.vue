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
  Object.keys(progress).forEach(key => {
    progress[key] = 0;
  });

  const learnedChords = userInstance.learnedChords;

  learnedChords.forEach((chord: string) => {
    const firstChar = chord[0];
    if (firstChar && Object.prototype.hasOwnProperty.call(progress, firstChar)) {
      progress[firstChar] = (progress[firstChar] ?? 0) + 1;
    }
  });
}


onMounted(() => {
  setTimeout(() => {
    calculateProgress();
  }, 100);
});
watch(
  () => userInstance.learnedChords,
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
        <label class="note-label">{{ note.label }}</label>
        <label class="progress-values">{{ `${progress[note.label]}/${note.maxAmount}` }}</label>
      </div>
      <div class="progress-bar-bg">
        <span class="progress-bar"
              :style="{backgroundColor: note.color, width: (progress[note.label] ?? 0)/ note.maxAmount * 100 + '%'}"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.progress-panel {
  width: 80%;
  margin: 0.5% 10%;
  height: 10vh;
  background-color: var(--bg-secondary);
  border-radius: 2vh;
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

@media (max-width: 1024px) {
  .progress-panel {
    height: 8.5vh;
    margin: 1.5% 10%;
  }

  .note-label {
    font-size: 24px;
  }

  .progress-values {
    font-size: 14px;
  }

  .progress-bar-bg {
    margin: 1vh 2.5%;
  }
}

@media (max-width: 768px) {
  .progress-panel {
    height: 8.5vh;
    margin: 1.5% 10%;
  }

  .progress-info {
    margin-top: 1vh;
  }

  .note-label {
    font-size: 24px;
  }

  .progress-values {
    font-size: 14px;
  }

  .progress-bar-bg {
    margin: 1vh 2.5%;
  }
}

@media (max-width: 768px) and (orientation: landscape) {
  .progress-panel {
    height: 15.5vh;
    margin: 1.5% 10%;
    border-radius: 2.5vh;
  }

  .progress-info {
    margin-top: 2vh;
  }

  .note-label {
    font-size: 24px;
  }

  .progress-values {
    font-size: 14px;
  }

  .progress-bar-bg {
    margin: 1vh 2.5%;
  }
}

</style>
