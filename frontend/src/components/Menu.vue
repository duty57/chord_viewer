<script setup lang="ts">
import {ref, onMounted, watch, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {applyTheme, getStoredTheme, saveTheme} from "@/utils/theme_manager.ts";
import {auth} from "@/config/firebase.ts";
import {signOut} from "firebase/auth";
import {logoutAPI, updateProfilePictureAPI} from "@/api/user_api.ts";
import {getCatImageAPI} from "@/api/cataas.ts";
import {userInstance} from "@/models/user.ts";

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
const showMobileMenu = ref<boolean>(false)
const defaultPicture = computed(() => userInstance?.profilePictureUrl || '/img/placeholder_profile_picture.jpg')

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

function toggleMobileMenu(): void {
  showMobileMenu.value = !showMobileMenu.value
}

async function changeProfilePicture() {
  const res = await getCatImageAPI();
  if (res) {
    await updateProfilePictureAPI(res.url);
    userInstance.profilePictureUrl = res.url;
  }
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

<template>  <nav class="navbar">
  <div class="hamburger" @click="toggleMobileMenu">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <div class="tabs" :class="{ 'mobile-open': showMobileMenu }">
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
        :src="defaultPicture"
        alt="Profile"
        class="profile-img"
        :title="userInstance.email"
        @click="toggleProfileMenu"
      />
      <div v-if="showProfileMenu" class="profile-menu">
        <button class="dropdown-btn" @click="changeProfilePicture">Change profile picture</button>
        <button class="dropdown-btn" @click="logout">Logout</button>
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

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: var(--menu-text);
  border-radius: 2px;
  transition: all 0.3s ease;
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
  height: 38px;
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

.dropdown-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: var(--selector-text);
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s;
  text-align: center;
}

.dropdown-btn:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}


.dropdown-btn:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.dropdown-btn:hover {
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

@media (max-width: 1024px) {
  .navbar {
    padding: 0 1rem;
  }

  .tab {
    padding: 0 1.5rem;
    font-size: 0.95rem;
  }

  .profile-img {
    width: 32px;
    height: 32px;
  }

  .theme-toggle {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    height: 60px;
    padding: 0 1rem;
  }

  .hamburger {
    display: flex;
  }

  .tabs {
    position: fixed;
    top: 60px;
    left: -100%;
    width: 70%;
    max-width: 300px;
    height: calc(100vh - 60px);
    flex-direction: column;
    align-items: stretch;
    background-color: var(--menu-bg);
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    transition: left 0.3s ease;
    z-index: 999;
    overflow-y: auto;
  }

  .tabs.mobile-open {
    left: 0;
  }

  .tab {
    height: auto;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--menu-border);
    border-left: 2px solid transparent;
  }

  .tab.active {
    border-bottom: 1px solid var(--menu-border);
    border-left-color: var(--button-bg);
  }

  .profile {
    gap: 0.25rem;
  }

  .profile-img {
    width: 30px;
    height: 30px;
  }

  .theme-toggle {
    padding: 0.4rem;
    font-size: 1rem;
  }

  .profile-menu {
    top: 40px;
    right: -5px;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0 0.75rem;
  }

  .tabs {
    width: 80%;
    max-width: 250px;
  }

  .tab {
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
  }

  .profile-img {
    width: 28px;
    height: 28px;
  }

  .theme-toggle {
    font-size: 0.95rem;
    padding: 0.35rem;
  }

  .dropdown-btn {
    padding: 0.65rem 0.875rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) and (orientation: landscape) {
  .navbar {
    height: 50px;
  }

  .tabs {
    top: 50px;
    height: calc(100vh - 50px);
  }

  .tab {
    padding: 0.75rem 1.25rem;
  }
}
</style>
