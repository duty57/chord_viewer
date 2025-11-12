<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {applyTheme, getStoredTheme, saveTheme} from "@/utils/theme_manager.ts";
import {auth} from "@/config/firebase.ts";
import {signOut} from "firebase/auth";
import {logoutAPI} from "@/api/user_api.ts";

const router = useRouter()
const route = useRoute()

const tabs = [
  {name: 'Home', to: '/home'},
  {name: 'Chords', to: '/chords'},
  {name: 'Favourite', to: '/favourite'},
  {name: 'Learning', to: '/learning'}
]
const isDark = ref<boolean>(getStoredTheme())
const showProfileMenu = ref<boolean>(false)

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

function toggleProfileMenu(): void {
  showProfileMenu.value = !showProfileMenu.value
}

async function logout(): Promise<void> {
  try {
    const res = await logoutAPI();
    if (!res) console.log("LOGOUT ERROR");
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
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
      <div class="profile-container">
        <img
          src="/img/placeholder_profile_picture.jpg"
          alt="Profile"
          class="profile-img"
          @click="toggleProfileMenu"
        />
        <div v-if="showProfileMenu" class="profile-menu">
          <button class="logout-btn" @click="logout">Logout</button>
        </div>
      </div>
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

.profile-container {
  position: relative;
}

.profile-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  cursor: pointer;
  transition: opacity 0.2s;
}

.profile-img:hover {
  opacity: 0.8;
}

.profile-menu {
  position: absolute;
  top: 45px;
  right: 0;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  min-width: 120px;
  z-index: 1000;
}

.logout-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: var(--menu-text);
  cursor: pointer;
  font-size: 0.95rem;
  text-align: left;
  transition: background-color 0.2s;
  border-radius: 8px;

}

.logout-btn:hover {

  background-color: var(--selector-active);
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
