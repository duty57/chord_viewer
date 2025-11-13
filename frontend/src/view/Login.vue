<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {applyTheme, getStoredTheme} from "@/utils/theme_manager.ts";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, GithubAuthProvider, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {userInstance, User} from "../models/user.ts"
import {auth} from "../config/firebase.ts"
import {loginAPI, registerAPI} from "@/api/user_api.ts";

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const router = useRouter()


async function login() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const token = await userCredential.user.getIdToken();

    const verification = await loginAPI(new User(email.value, password.value, token));
    if (verification) {
      userInstance.setUser(verification.email, password.value, "", verification.favouriteChords, verification.learnedChords);
      console.log(verification.email, password.value, "", verification.favouriteChords, verification.learnedChords);
      await router.push("/home");
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

    const verification = await registerAPI(new User(email.value, password.value, token));
    if (verification) {
      userInstance.setUser(verification.email, password.value, "", verification.favouriteChords, verification.learnedChords);
      await router.push("/home");
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

async function resetPassword() {
  if (!email.value) {
    error.value = "Please enter your email address.";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email.value);
    success.value = "Password reset email sent! Check your inbox.";
    error.value = "";
    setTimeout(() => {
      success.value = "";
    }, 3000);
  } catch (err: any) {
    console.error("Password reset error:", err);
    switch (err.code) {
      case 'auth/user-not-found':
        error.value = "No account found with this email.";
        break;
      case 'auth/invalid-email':
        error.value = "Invalid email format.";
        break;
      case 'auth/too-many-requests':
        error.value = "Too many requests. Please try again later.";
        break;
      default:
        error.value = err.message || "Failed to send reset email.";
    }
  }
}

async function signInWithGithub() {
  try {
    const provider = new GithubAuthProvider();
    provider.addScope('user:email');

    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const userEmail = result.user.email || "";
    const verification = await loginAPI(new User(userEmail, "", token));
    if (verification) {
      userInstance.setUser(verification.email, "", token, verification.favouriteChords, verification.learnedChords);
      await router.push("/home");
    } else {
      const registrationVerification = await registerAPI(new User(userEmail || '', '', token));
      if (registrationVerification) {
        userInstance.setUser(registrationVerification.email, '', token, registrationVerification.favouriteChords, registrationVerification.learnedChords);
        await router.push("/home");
      } else {
        error.value = "GitHub authentication failed.";
      }

    }
  }catch (err : any) {
    console.error("GitHub sign-in error:", err);
    if (err.code === 'auth/popup-closed-by-user') {
      error.value = "Sign-in cancelled.";
    } else if (err.code === 'auth/account-exists-with-different-credential') {
      error.value = "Account exists with different sign-in method.";
    } else {
      error.value = err.message || "GitHub sign-in failed.";
    }
  }
}

async function singInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile')

    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const userEmail = result.user.email || "";
    const verification = await loginAPI(new User(userEmail, "", token));
    if (verification) {
      userInstance.setUser(verification.email, "", token, verification.favouriteChords, verification.learnedChords);
      await router.push("/home");
    } else {
      const registrationVerification = await registerAPI(new User(userEmail || '', '', token));
      if (registrationVerification) {
        userInstance.setUser(registrationVerification.email, '', token, registrationVerification.favouriteChords, registrationVerification.learnedChords);
        await router.push("/home");
      } else {
        error.value = "Google authentication failed.";
      }

    }
  }catch (err : any) {
    console.error("Google sign-in error:", err);
    if (err.code === 'auth/popup-closed-by-user') {
      error.value = "Sign-in cancelled.";
    } else if (err.code === 'auth/account-exists-with-different-credential') {
      error.value = "Account exists with different sign-in method.";
    } else {
      error.value = err.message || "Google sign-in failed.";
    }
  }
}

onMounted(() => {
  const isDark = getStoredTheme()
  applyTheme(isDark)
})

</script>


<template>
  <div class="content">
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
          <span class="link reset-password" @click="resetPassword">Reset password</span>
        </div>

        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>

        <button type="submit" class="txt-btn submit">Login</button>
      </form>
      <button type="button" class="txt-btn register" @click="register">
        Register
      </button>
      <button type="button" class="txt-btn github" @click="signInWithGithub">
        <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        Continue with GitHub
      </button>
      <button type="button" class="txt-btn google" @click="singInWithGoogle">
        <svg class="google-icon" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>
    </div>
  </div>
</template>

<style scoped>

.content {
  min-height: 100vh;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
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


.submit {
  background-color: var(--button-bg);
  color: var(--text-primary);
}

.submit:hover {
  background-color: var(--button-hover);
}

.github {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #24292e;
  color: white;
  margin-top: 25px;
  padding: 0.6rem 0.9rem;
  line-height: 1;
}

.github:hover {
  background-color: #1b1f23;
}

.github-icon {
  width: 20px;
  height: 20px;
  display: block;
}

.github-icon {
  width: 20px;
  height: 20px;
  display: block;
}

.google {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: white;
  color: #3c4043;
  margin-top: 10px;
  padding: 0.6rem 0.9rem;
  line-height: 1;
  border: 1px solid #dadce0;
}

.google:hover {
  background-color: #f8f9fa;
}

.google-icon {
  width: 20px;
  height: 20px;
  display: block;
}

.register {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  margin-top: 10px;
}

.register:hover {
  background-color: var(--button-bg);
  border-color: var(--button-bg);
}

.reset-password {
  margin: 0;
}

</style>
