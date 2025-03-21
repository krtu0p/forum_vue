<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../utils/api';

const posts = ref([]);

onMounted(async () => {
  try {
    const response = await apiClient.get('/posts/', {
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
    });

    if (response.data && Array.isArray(response.data.data)) {
      // Assign unique identifiers based on userID
      posts.value = assignUniqueIdentifiers(response.data.data);
      console.log('Fetched posts:', posts.value);
    } else {
      console.error('Unexpected response structure:', response.data);
    }
  } catch (error) {
    console.error('Error fetching posts:', error.response?.data || error.message);
  }
});

// Function to generate a unique identifier for a given userID
function generateUniqueIdentifier() {
  const base = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let identifier = '';
  const length = 12; // Desired length of the random string

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * base.length);
    identifier += base[randomIndex];
  }

  return identifier;
}
// Function to assign unique identifiers based on userID
function assignUniqueIdentifiers(posts) {
  return posts.map(post => ({
    ...post,
    username: generateUniqueIdentifier(post.userID), // Assign a unique identifier
  }));
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section py-5 text-center">
      <div class="container">
        <h1 class="display-4 fw-bold">Welcome to Our Forum</h1>
        <p class="lead">Join our community to share ideas, ask questions, and connect with like-minded people.</p>
      </div>
    </section>

    <!-- Posts Section -->
    <section class="py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-4">Latest Posts</h2>
        <div v-if="posts.length > 0" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div v-for="post in posts" :key="post.id" class="col">
            <div class="card shadow-sm h-100">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ post.postTitle }}</h5>
                <p class="card-text flex-grow-1">{{ post.postContent }}</p>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                  <div>
                    <small class="text-muted">
                      <strong>By:</strong> {{ post.username }}
                    </small>
                  </div>
                  <div>
                    <small class="text-muted">
                      <strong>Hashtags:</strong>
                      {{ post.postHashtags.join(', ') }}
                    </small>
                  </div>
                  <div>
                    <span
                        :class="['badge', post.isLiked ? 'bg-success' : 'bg-secondary']"
                    >
                      {{ post.isLiked ? 'Liked' : 'Not Liked' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="text-center">No posts available yet.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://via.placeholder.com/1920x400') center/cover no-repeat;
  color: white;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.badge {
  font-size: 0.8rem;
  padding: 0.4rem 0.6rem;
}
</style>