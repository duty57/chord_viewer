<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {applyTheme, getStoredTheme} from "@/utils/theme_manager.ts";

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = () => {
  router.push("/home")
}

onMounted(() => {
  const isDark = getStoredTheme()
  applyTheme(isDark)
})

</script>

<template>
  <div class="theme-wrapper">
    <div class="container">
      <div class="card">
        <div class="header">
          <h1>Login</h1>
        </div>
        <form @submit.prevent="login">
          <div class="form-group">
            <label>Username</label>
            <input v-model="username" required/>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="password" required/>
          </div>
          <p v-if="error" class="error">{{ error }}</p>
          <button type="submit" class="submit-btn">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>


.container {
  min-height: 100vh;
  background-color: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.card {
  background-color: var(--bg-secondary);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  transition: background-color 0.3s ease;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-primary);
  margin: 0;
  transition: color 0.3s ease;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: var(--button-bg);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}



.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--button-bg);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: var(--button-hover);
}
</style>
