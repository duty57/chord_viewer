<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()

const tabs = [
  { name: 'Chords', to: '/chords' },
  { name: 'Favourite', to: '/favourite' },
  { name: 'Learning', to: '/learning' }
]

function navigateTo(to: string) :void {
  if (route.path !== to) router.push(to)
}

</script>

<template>
  <nav class="navbar theme-wrapper">
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
      <img src="/img/placeholder_profile_picture.jpg" alt="Profile" class="profile-img" />
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: stretch; /* allow children to fill navbar height */
  background-color: var(--menu-bg);
  color: var(--menu-text);
  padding: 0rem 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid var(--menu-border);
}

.tabs {
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
}

.tab {
  display: flex;
  align-items: center;
  height: 100%; /* fills navbar height because parent is stretched */
  padding: 0 0.75rem;
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
  background-color: var(--menu-active-bg, rgba(255,255,255,0.06));
  border-bottom-color: white;
  color: white;
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
</style>
