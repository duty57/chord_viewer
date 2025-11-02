<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {applyTheme, getStoredTheme} from "@/utils/theme_manager.ts";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {userInstance} from "../models/user.ts"
import {auth} from "../config/firebase.ts"
import {loginAPI, registerAPI} from "@/api/user_api.ts";

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()


async function login() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const token = await userCredential.user.getIdToken();
    userInstance.setUser(email.value, password.value, token);

    const verification = await loginAPI(userInstance);
    if (verification) {
      // userInstance.setUser(verification.data)
      router.push("/home");
    } else {
      error.value = "Token verification failed.";
    }
  } catch (err: any) {
    console.error("Login error:", err);
    error.value = "Invalid email or password.";
  }
}

async function register() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const token = await userCredential.user.getIdToken();
    userInstance.setUser(email.value, password.value, token);

    const verification = await registerAPI(userInstance);
    if (verification) {
      router.push("/home");
    } else {
      error.value = "Registration succeeded but verification failed.";
    }
  } catch (err: any) {
    console.error("Registration error:", err);
    switch (err.code) {
      case 'auth/email-already-in-use':
        error.value = "Email already registered.";
        break;
      case 'auth/weak-password':
        error.value = "Password must be at least 6 characters.";
        break;
      case 'auth/invalid-email':
        error.value = "Invalid email format.";
        break;
      default:
        error.value = err.message || "Registration failed.";
    }
  }
}

const loginWithGitHub = () => {

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
            <label>Email</label>
            <input type="email" v-model="email" required/>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="password" required/>
          </div>
          <p v-if="error" class="error">{{ error }}</p>
          <button type="submit" class="submit-btn">Login</button>
        </form>
        <button type="button" class="register-btn" @click="register">
          Register
        </button>
        <button type="button" class="github-btn" @click="loginWithGitHub">
          <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Continue with GitHub
        </button>
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

.github-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 25px;
  background-color: #24292e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.github-btn:hover {
  background-color: #1b1f23;
}

.github-icon {
  width: 20px;
  height: 20px;
}

.register-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register-btn:hover {
  background-color: var(--button-bg);
  color: white;
  border-color: var(--button-bg);
}

</style>
