<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card bg-black text-white">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Login</h2>
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                    type="email"
                    class="form-control bg-dark text-white"
                    id="email"
                    v-model="formData.email"
                    placeholder="Enter your email"
                    required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                    type="password"
                    class="form-control bg-dark text-white"
                    id="password"
                    v-model="formData.password"
                    placeholder="Enter your password"
                    required
                />
              </div>
              <button type="submit" class="btn btn-purple w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import apiClient from '../utils/api';
import { useRouter } from 'vue-router';
import { decodeToken } from '../utils/auth';
import { useAuthStore } from '../stores/auth';

const formData = reactive({
  email: '',
  password: '',
});

const router = useRouter();
const authStore = useAuthStore();

const handleSubmit = async () => {
  try {
    const response = await apiClient.post('/memberships/login', formData);
    console.log('Login response:', response.data); // Debug log

    // Ensure the accessToken exists in the response
    if (!response.data || !response.data.accessToken) {
      throw new Error('Access token not found in the response');
    }

    alert('Login successful!');

    // Store the tokens in localStorage
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    localStorage.setItem('authToken', accessToken); // Store the access token
    localStorage.setItem('refreshToken', refreshToken); // Store the refresh token

    // Decode the access token to get the userID
    const decoded = decodeToken(accessToken);
    if (decoded && decoded.id) {
      localStorage.setItem('userID', decoded.id); // Store the userID
    }

    // Update the authentication state
    authStore.login(); // Set isLoggedIn to true

    // Redirect to the home page
    router.push('/');
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    alert('Login failed. Please check your credentials.');
  }
};
</script>
<style scoped>
@import '../assets/main.css';
</style>