<script setup lang="ts">

import Menu from "@/components/Menu.vue";
import StatsCard from "@/components/StatsCard.vue";
import Divider from "@/components/Divider.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import {computed, onMounted, ref} from "vue";
import {
  deleteUserAPI,
  getUserCountAPI,
  getUsersAPI,
  promoteToAdminAPI,
  updateUserEmailAPI, updateUserProfilePictureAPI
} from "@/api/admin_api.ts";
import type {User} from "@/models/user.ts";
import {getCatImageAPI} from "@/api/cataas.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const userCount = ref<number>(0);
const currentPage = ref<number>(1);
const lastPage = computed(() => Math.max(1, Math.ceil(userCount.value / 5)));
const users = ref<User[]>([]);
const showEditMenu = ref<string | null>(null);
const editingEmail = ref<string | null>(null);
const newEmail = ref<string>("");
const editingProfilePicture = ref<string | null>(null);
const newProfilePictureUrl = ref<string>("");

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

function toggleEditMenu(email: string) {
  if (showEditMenu.value === email) {
    showEditMenu.value = null;
  } else {
    showEditMenu.value = email;
  }
}

function startEditEmail(email: string) {
  if (editingProfilePicture.value == email) return;
  editingEmail.value = email;
  newEmail.value = email;
  showEditMenu.value = null;
}

async function saveNewEmail(oldEmail: string) {
  if (newEmail.value && newEmail.value !== oldEmail) {
    const res = await updateUserEmailAPI(oldEmail, newEmail.value);
    if (res) {
      const user = users.value.find(u => u.email === oldEmail);
      if (user) {
        user.email = newEmail.value;
      }
    }
  }
  editingEmail.value = null;
  newEmail.value = "";
}

function cancelEditEmail() {
  editingEmail.value = null;
  newEmail.value = "";
}

function startEditProfilePicture(email: string, currentUrl: string) {
  if (editingEmail.value == email) return;
  editingProfilePicture.value = email;
  newProfilePictureUrl.value = currentUrl || "";
  showEditMenu.value = null;
}

async function generateRandomPicture() {
  const res = await getCatImageAPI();
  if (res && res.url) {
    newProfilePictureUrl.value = res.url;
  }
}

async function saveNewProfilePicture(email: string) {
  if (newProfilePictureUrl.value) {
    const res = await updateUserProfilePictureAPI(email, newProfilePictureUrl.value);
    if (res) {
      const user = users.value.find(u => u.email === email);
      if (user) {
        user.profilePictureUrl = newProfilePictureUrl.value;
      }
    }
  }
  editingProfilePicture.value = null;
  newProfilePictureUrl.value = "";
}

function cancelEditProfilePicture() {
  editingProfilePicture.value = null;
  newProfilePictureUrl.value = "";
}

async function promoteUser(email: string) {
  showEditMenu.value = null;
  await promoteToAdminAPI(email);
}

async function deleteUser(email: string) {
  console.log("deleting email: " + email);
  const res = await deleteUserAPI(email);
  if (res) {
    console.log("email deleted");
    userCount.value--;
    users.value = users.value.filter(u => u.email !== email);
    await goToPage(currentPage.value);
    if (users.value.length === 0 && currentPage.value > 1) {
      await goToPage(currentPage.value - 1);
    }
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
  <main class="content">
    <StatsCard title="Amount of users registered" :value="userCount || 0"></StatsCard>
    <Divider></Divider>
    <h1>Users</h1>
    <div class="user-list">
      <div class="user-card" v-for="user in users" :key="user.email">
        <img :src="user.profilePictureUrl || '/img/placeholder_profile_picture.jpg'" alt="Profile">

        <!-- Email editing -->
        <div v-if="editingEmail === user.email" class="email-edit">
          <input
            v-model="newEmail"
            type="email"
            class="email-input"
            @keyup.enter="saveNewEmail(user.email)"
            @keyup.esc="cancelEditEmail"
          />
          <button class="save-btn" @click="saveNewEmail(user.email)">✓</button>
          <button class="cancel-btn" @click="cancelEditEmail">✕</button>
        </div>

        <!-- Profile picture editing -->
        <div v-else-if="editingProfilePicture === user.email" class="picture-edit">
          <input
            v-model="newProfilePictureUrl"
            type="text"
            class="picture-input"
            placeholder="Enter image URL"
            @keyup.enter="saveNewProfilePicture(user.email)"
            @keyup.esc="cancelEditProfilePicture"
          />
          <button class="random-btn" @click="generateRandomPicture">🎲</button>
          <button class="save-btn" @click="saveNewProfilePicture(user.email)">✓</button>
          <button class="cancel-btn" @click="cancelEditProfilePicture">✕</button>
        </div>

        <p v-else>{{ user.email }}</p>
        <div class="management-buttons">
          <div class="edit-btn-container">
            <button class="edit-btn" @click="toggleEditMenu(user.email)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
            <div v-if="showEditMenu === user.email" class="edit-menu">
              <button class="edit-menu-btn" @click="startEditEmail(user.email)">
                Update email
              </button>
              <button class="edit-menu-btn" @click="startEditProfilePicture(user.email, user.profilePictureUrl || '')">
                Change profile picture
              </button>
              <button class="edit-menu-btn" @click="promoteUser(user.email)">Promote user</button>
            </div>
          </div>
          <DeleteButton class="trash-btn" @click="deleteUser(user.email)"></DeleteButton>
        </div>
      </div>
    </div>
    <div class="page-scroller">
      <button class="txt-btn arrow" @click="goToPage(Math.max(1, currentPage - 1))">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      <button class="txt-btn" @click="goToPage(currentPage)">{{ currentPage }}</button>
      <span class="ellipsis">...</span>
      <button class="txt-btn" @click="goToPage(lastPage)">{{ lastPage }}</button>
      <button class="txt-btn arrow" @click="goToPage(Math.min(lastPage, currentPage + 1))">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
        </svg>
      </button>
    </div>
  </main>
</template>

<style scoped>

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
  transition: opacity 0.2s;
}

.email-edit, .picture-edit {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  margin: 0 16px;
}

.email-input, .picture-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--menu-border);
  border-radius: 4px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
}

.save-btn, .cancel-btn, .random-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.save-btn {
  background-color: var(--success-color);
  color: var(--text-primary);
}

.save-btn:hover {
  background-color: #45a049;
}

.cancel-btn {
  background-color: var(--error-color);
  color: var(--text-primary);
}

.cancel-btn:hover {
  background-color: #da190b;
}

.random-btn {
  background-color: var(--button-bg);
  color: var(--text-primary);
}

.random-btn:hover {
  background-color: var(--button-hover);
}

.management-buttons {
  display: flex;
  width: 76px;
  align-items: stretch;
  height: 100%;
}

.edit-btn-container {
  position: relative;
  width: 50%;
}

.edit-btn {
  width: 100%;
  height: 100%;
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

.edit-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
}

.edit-menu-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s;
  text-align: left;
}

.edit-menu-btn:hover {
  background-color: var(--selector-active);
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

/* Tablet */
@media (max-width: 1024px) {
  .user-list {
    width: 70%;
  }

  .user-card {
    height: 64px;
  }

  img {
    width: 64px;
    height: 64px;
  }

  .email-edit, .picture-edit {
    gap: 6px;
    margin: 0 12px;
  }

  .email-input, .picture-input {
    padding: 6px 10px;
    font-size: 13px;
  }

  .save-btn, .cancel-btn, .random-btn {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  .management-buttons {
    width: 68px;
  }

  .edit-btn svg {
    width: 20px;
    height: 20px;
  }

  .edit-menu {
    min-width: 180px;
  }

  .edit-menu-btn {
    padding: 0.65rem 0.875rem;
    font-size: 0.9rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .user-list {
    width: 90%;
    gap: 2vh;
  }

  .user-card {
    height: 56px;
    border-radius: 56px;
  }

  img {
    width: 56px;
    height: 56px;
  }

  .email-edit, .picture-edit {
    gap: 4px;
    margin: 0 8px;
    flex-wrap: wrap;
  }

  .email-input, .picture-input {
    padding: 6px 8px;
    font-size: 12px;
    min-width: 0;
  }

  .save-btn, .cancel-btn, .random-btn {
    width: 26px;
    height: 26px;
    font-size: 13px;
  }

  .management-buttons {
    width: 60px;
  }

  .edit-btn svg {
    width: 18px;
    height: 18px;
  }

  .edit-menu {
    min-width: 160px;
    right: -10px;
  }

  .edit-menu-btn {
    padding: 0.6rem 0.75rem;
    font-size: 0.85rem;
  }

  .page-scroller {
    gap: 6px;
    margin-top: 1.5vh;
  }

  .txt-btn {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }

  .arrow {
    width: 28px;
    height: 28px;
  }

  .txt-btn svg {
    width: 20px;
    height: 20px;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .user-list {
    width: 95%;
    gap: 1.5vh;
  }

  .user-card {
    height: 52px;
    border-radius: 52px;
  }

  img {
    width: 52px;
    height: 52px;
  }

  .email-edit, .picture-edit {
    gap: 3px;
    margin: 0 6px;
  }

  .email-input, .picture-input {
    padding: 5px 6px;
    font-size: 11px;
  }

  .save-btn, .cancel-btn, .random-btn {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }

  .management-buttons {
    width: 56px;
  }

  .edit-btn svg {
    width: 16px;
    height: 16px;
  }

  .edit-menu {
    min-width: 140px;
    right: -15px;
  }

  .edit-menu-btn {
    padding: 0.5rem 0.65rem;
    font-size: 0.8rem;
  }

  .page-scroller {
    gap: 4px;
  }

  .txt-btn {
    width: 18px;
    height: 18px;
    font-size: 9px;
  }

  .arrow {
    width: 26px;
    height: 26px;
  }

  .txt-btn svg {
    width: 18px;
    height: 18px;
  }

  .ellipsis {
    font-size: 14px;
  }
}
</style>
