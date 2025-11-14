<script setup lang="ts">

const props = defineProps<{
  title: string;
  value: number;
}>()

</script>

<template>
<div class="stats-card">
  <p class="title">{{props.title}}</p>
  <p class="value">{{props.value}}</p>
</div>
</template>

<style scoped>
.stats-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 5vh;
  font-size: 24px;
}

.stats-card .title {
  color: var(--text-primary);
}

.stats-card .value{
  display: flex;
  justify-content: center;
  color: var(--text-secondary);
  margin-top: 1vh;
  font-size: 48px;
}


@media (max-width: 1024px) {
  .stats-card .value {
    font-size: 40px;
  }

  .stats-card .title {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .stats-card .value {
    font-size: 36px;
  }

  .stats-card .title {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .stats-card .value {
    font-size: 32px;
  }

  .stats-card .title {
    display: flex;
    justify-content: center;
  }
}
</style>
