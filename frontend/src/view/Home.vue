<script setup lang="ts">

import {useRouter} from "vue-router";
import Menu from "@/components/Menu.vue";

const router = useRouter();
</script>

<template>
  <Menu></Menu>
  <div class="theme-wrapper" style="height: 100px; background-color:var(--bg-primary);"></div>
</template>

<style scoped>

</style>
