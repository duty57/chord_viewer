<script setup lang="ts">

import Menu from "@/components/Menu.vue";
import StatsCard from "@/components/StatsCard.vue";
import Divider from "@/components/Divider.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import {computed, onMounted, ref} from "vue";
import {getUserCountAPI, getUsersAPI} from "@/api/admin_api.ts";
import type {User} from "@/models/user.ts";

const userCount = ref<number>(0);
const currentPage = ref<number>(1);
const lastPage = computed(() => Math.max(1, Math.ceil(userCount.value / 5)));
const users = ref<User[]>([]);

async function loadUserCount() {
  const res = await getUserCountAPI();
  if (res) {
    userCount.value = res.count;
  }
}

async function goToPage(page: number) {
  page = Math.min(lastPage.value, Math.max(1, page));
  const res = await getUsersAPI(page);
  if (res) {
    users.value = res.users || [];
    currentPage.value = res.page;
  }
}

onMounted(async () => {
  setTimeout(async () => {
    await loadUserCount();
    await goToPage(1);
  }, 100);
});

</script>

<template>
  <Menu></Menu>
  <div class="content">
    <StatsCard title="Amount of users registered" :value="userCount || 0"></StatsCard>
    <Divider></Divider>
    <h1>Users</h1>
    <div class="user-list">
      <div class="user-card" v-for="user in users" :key="user.email">
        <img :src="user.profilePictureUrl || '/img/placeholder_profile_picture.jpg'" alt="Profile">
        <p>{{user.email}}</p>
        <div class="management-buttons">
          <button class="edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <DeleteButton class="trash-btn"></DeleteButton>
        </div>
      </div>
    </div>
    <div class="page-scroller">
      <button class="txt-btn arrow" @click="goToPage(Math.max(1, currentPage - 1))">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      <button class="txt-btn" @click="goToPage(currentPage)">{{currentPage}}</button>
      <span class="ellipsis">...</span>
      <button class="txt-btn" @click="goToPage(lastPage)">{{lastPage}}</button>
      <button class="txt-btn arrow" @click="goToPage(Math.min(lastPage, currentPage + 1))">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
        </svg>
      </button>
    </div>
  </div>
<!--  delete button should look like one in Favourites page, and be rounded from the right, next to it(without gap) edit button (pencil (gray/blue)) icon-->
<!--  use pagination for parsing users-->
<!--  edit should be able to change email / send reset password email or reset password and maybe change profile picture-->
</template>

<style scoped>
.content {

}

.user-list {
  width: 50%;
  display: flex;
  margin-top: 2vh;
  flex-direction: column;
  justify-content: center;
  gap: 2.5vh;
}

.user-card {
  width: 100%;
  height: 72px;
  border-radius: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-secondary);
}

img {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  cursor: pointer;
  transition: opacity 0.2s;
}

.management-buttons {
  display: flex;
  width: 76px;
  align-items: stretch;
  height: 100%;
}

.edit-btn {
  width: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--button-bg);
  transition: color 0.2s;
}

.edit-btn:hover {
  background-color: var(--button-hover);
}

.edit-btn svg {
  width: 24px;
  height: 24px;
  fill: var(--text-primary);
}

.trash-btn {
  width: 50%;
  height: 100%;
  border-radius: 0 50% 50% 0;
}

.page-scroller {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.page-scroller {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 2vh;
}

.txt-btn {
  background-color: var(--button-bg);
  color: var(--text-primary);
  transition: background-color 0.2s;
  display: flex;
  width: 24px;
  height: 24px;
  padding: 0;
  font-size: 11px;
}

.arrow {
  width: 32px;
  height: 32px;
}

.txt-btn svg {
  width: 24px;
  height: 24px;
  fill: var(--text-primary);
}

.txt-btn:hover, .txt-btn:hover {
  background-color: var(--button-hover);
}

.ellipsis {
  color: var(--text-secondary);
  user-select: none;
}

.page-scroller span {
  margin-top: 5px;
}
</style>
