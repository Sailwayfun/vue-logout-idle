<template>
  <div class="login-form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <button type="button" v-if="isLoggedIn" @click="logOut">Logout</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const isLoggedIn = ref(false);
const email = ref('');
const password = ref('');
const currentUserId = ref('');
function submitForm() {
  console.log('Submitting:', email.value, password.value);
  isLoggedIn.value = true;
  const userId = (currentUserId.value = Math.random());
  localStorage.setItem('activeUserId', userId);
  router.push({ name: 'user', params: { userId } });
}

function logOut() {
  localStorage;
}
</script>

<style>
.login-form {
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type='email'],
input[type='password'],
button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}
</style>
