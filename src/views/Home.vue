<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../utils/api';

const posts = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await apiClient.get('/posts/', {
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
    });

    if (response.data && Array.isArray(response.data.data)) {
      posts.value = response.data.data.map((post) => ({
        ...post,
        postHashtags: post.postHashtags.slice(0, 3).join(', ') + (post.postHashtags.length > 3 ? '...' : ''),
      }));
      console.log('Fetched posts:', posts.value);
    } else {
      console.error('Unexpected response structure:', response.data);
    }
  } catch (error) {
    console.error('Error fetching posts:', error.response?.data || error.message);
  }
});
function viewPost(postID) {
  console.log('Navigating to post ID:', postID); // Log the postID
  if (!postID) {
    console.error('Invalid post ID');
    return;
  }
  router.push({ name: 'forum', params: { postID } }); // Ensure param name matches :postID
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
            <div class="card shadow-sm h-100" @click="viewPost(post.id)">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ post.postTitle }}</h5>
                <p class="card-text flex-grow-1">
                  {{ post.postContent.length > 150 ? post.postContent.slice(0, 150) + '...' : post.postContent }}
                </p>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                  <div>
                    <small class="text-muted">
                      <strong>By:</strong> {{ post.username }}
                    </small>
                  </div>
                  <div>
                    <small class="text-muted">
                      <strong>Hashtags:</strong>
                      {{ post.postHashtags }}
                    </small>
                  </div>
                  <div>
                    <span class="badge bg-secondary cursor-pointer" @click.stop="viewPost(post.id)">
                      Like
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
  cursor: pointer; /* Make the card clickable */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.badge {
  font-size: 0.8rem;
  padding: 0.4rem 0.6rem;
  cursor: pointer; /* Make the badge clickable */
}
</style>