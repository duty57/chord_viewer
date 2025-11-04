<script setup lang="ts"></script>

<template>

  <div class="theme-wrapper">
    <router-view></router-view>
  </div>
</template>

<style scoped>

.theme-wrapper {
  min-height: 100%;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
</style>
