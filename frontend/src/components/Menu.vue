<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {applyTheme, getStoredTheme, saveTheme} from "@/utils/theme_manager.ts";

const router = useRouter()
const route = useRoute()

const tabs = [
  {name: 'Home', to: '/home'},
  {name: 'Chords', to: '/chords'},
  {name: 'Favourite', to: '/favourite'},
  {name: 'Learning', to: '/learning'}
]
const isDark = ref<boolean>(getStoredTheme()) // Start with light theme

function navigateTo(to: string): void {
  if (route.path !== to) router.push(to)
}

watch(isDark, (newValue) => {
  applyTheme(newValue)
  saveTheme(newValue)
}, { immediate: true })

onMounted(() => {
  applyTheme(isDark.value)
})

function switchMode(): void {
  isDark.value = !isDark.value
}
</script>

<template>
  <nav class="navbar">
    <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab.to"
        class="tab"
        :class="{ active: route.path === tab.to }"
        @click="navigateTo(tab.to)"
      >
        {{ tab.name }}
      </div>
    </div>
    <div class="profile">
      <label for="theme-toggle" class="theme-toggle" @click="switchMode">
        <span v-if="!isDark" class="light-icon">🌙</span>
        <span v-else class="dark-icon">☀️</span>
      </label>
      <img src="/img/placeholder_profile_picture.jpg" alt="Profile" class="profile-img"/>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: stretch;
  background-color: var(--menu-bg);
  color: var(--menu-text);
  padding: 0 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid var(--menu-border);
  user-select: none;
}

.tabs {
  display: flex;
  align-items: stretch;
}

.tab {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s, background-color 0.2s, border-bottom 0.2s;
  border-bottom: 2px solid transparent;
  background: transparent;
}

.tab:hover {
  background-color: var(--menu-hover);
}

.tab.active {
  background-color: var(--menu-hover);
  border-bottom-color: var(--menu-border);
  color: var(--menu-text);
}

.profile {
  display: flex;
  align-items: center;
}

.profile-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  cursor: pointer;
}

.theme-toggle {
  position: relative;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
}

.light-icon {
  display: inline;
}

.dark-icon {
  display: inline;
}
</style>
