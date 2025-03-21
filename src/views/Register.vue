<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card bg-black text-white">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Register</h2>
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                    type="text"
                    class="form-control bg-dark text-white"
                    id="name"
                    v-model="formData.name"
                    placeholder="Enter your name"
                    required
                />
              </div>
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
              <button type="submit" class="btn btn-purple w-100">Register</button>
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

const formData = reactive({
  name: '',
  email: '',
  password: '',
});

const handleSubmit = async () => {
  try {
    console.log('Sending registration payload:', formData); // Debug log
    const response = await apiClient.post('/memberships/sign-up', formData);
    if (response.status === 201) {
      alert('Registration successful!');
      // Optionally redirect to login page or clear the form
      formData.name = '';
      formData.email = '';
      formData.password = '';
    }
  } catch (error) {
    console.error('Error during registration:', error.response?.data || error.message);
    alert('Registration failed. Please try again.');
  }
};
</script>

<style scoped>
@import '../assets/main.css';
</style>