<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { isAuthenticated, logout } from './utils/auth';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

// Check authentication state on page load
onMounted(() => {
  if (isAuthenticated()) {
    authStore.login(); // Set isLoggedIn to true
  } else {
    authStore.logout(); // Set isLoggedIn to false
  }
});

const handleLogout = () => {
  logout(); // Call the logout function
  authStore.logout(); // Update the global state
  alert('You have been logged out.');
  window.location.href = '/login'; // Redirect to login page
};
</script>

<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Forum</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <!-- Links for Logged-In Users -->
            <li v-if="authStore.isLoggedIn" class="nav-item">
              <RouterLink to="/create-post" class="nav-link text-primary">Create Post</RouterLink>
            </li>
            <li v-if="authStore.isLoggedIn" class="nav-item">
              <a href="#" class="nav-link text-primary" @click.prevent="handleLogout">Logout</a>
            </li>

            <!-- Links for Logged-Out Users -->
            <li v-else class="nav-item">
              <RouterLink to="/login" class="nav-link text-primary">Login</RouterLink>
            </li>
            <li v-if="!authStore.isLoggedIn" class="nav-item">
              <RouterLink to="/register" class="nav-link text-primary">Register</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Router View -->
    <RouterView />
  </div>
</template>

<style scoped>
.navbar-brand {
  font-weight: bold;
}

.nav-link {
  cursor: pointer;
}
</style>