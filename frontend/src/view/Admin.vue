<script setup lang="ts">

import Menu from "@/components/Menu.vue";
import StatsCard from "@/components/StatsCard.vue";
import Divider from "@/components/Divider.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import {onMounted, ref} from "vue";
import {getUserCountAPI} from "@/api/admin_api.ts";

const userCount = ref<number>(0);

onMounted(async () => {
  setTimeout(async () => {
    const res = await getUserCountAPI();
    userCount.value = res.count;
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
      <div class="user-card">
        <img src="/img/placeholder_profile_picture.jpg" alt="Profile">
        <p>admin@gmail.com</p>
        <div class="management-buttons">
          <button class="edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <DeleteButton class="trash-btn"></DeleteButton>
        </div>
      </div>
      <div class="user-card">
        <img src="/img/placeholder_profile_picture.jpg" alt="Profile">
        <p>admin@gmail.com</p>
        <div class="management-buttons">
          <button class="edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <DeleteButton class="trash-btn"></DeleteButton>
        </div>
      </div>
      <div class="user-card">
        <img src="/img/placeholder_profile_picture.jpg" alt="Profile">
        <p>admin@gmail.com</p>
        <div class="management-buttons">
          <button class="edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <DeleteButton class="trash-btn"></DeleteButton>
        </div>
      </div>
      <div class="user-card">
        <img src="/img/placeholder_profile_picture.jpg" alt="Profile">
        <p>admin@gmail.com</p>
        <div class="management-buttons">
          <button class="edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <DeleteButton class="trash-btn"></DeleteButton>
        </div>
      </div>
      <div class="user-card">
        <img src="/img/placeholder_profile_picture.jpg" alt="Profile">
        <p>admin@gmail.com</p>
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

</style>
