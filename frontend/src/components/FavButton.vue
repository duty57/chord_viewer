<script setup lang="ts">

</script>

<template>
  <button type="button" class="empty-btn fav" @click="toggleFavourite">
    <svg class="star" viewBox="0 0 24 24" width="24" height="24" :class="{active: isFavourite}">
      <path d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.603L19.335 24 12 19.897 4.665 24l1.585-8.647L.5 9.75l7.832-1.732z" />
    </svg>
  </button>
</template>

<style scoped>

</style>
