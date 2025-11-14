<script setup lang="ts">

import Menu from "@/components/Menu.vue";
import StatsCard from "@/components/StatsCard.vue";
import Divider from "@/components/Divider.vue";
</script>

<template>
  <Menu></Menu>
  <div class="content">
    <StatsCard title="Amount of users registered" :value="0"></StatsCard>
    <Divider></Divider>
    <h1>Users</h1>
    <div class="user-list">
      <div class="user-card">
        <img src="/img/placeholder_profile_picture.jpg">
        <p>admin@gmail.com</p>
        <div>
          <button>Edit</button>
          <button class="delete-btn user-delete">Delete</button>
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
  flex-direction: column;
  justify-content: center;
  gap: 1vh;
}

.user-card {
  width: 100%;
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

</style>
