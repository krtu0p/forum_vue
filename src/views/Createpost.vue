<script setup>
import { ref } from 'vue';
import apiClient from '../utils/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const content = ref('');
const title = ref('');
const hashtags = ref('');

const handleSubmit = async () => {
  try {
    const userID = localStorage.getItem('userID'); // Get the userID from localStorage
    if (!userID) {
      alert('You must be logged in to create a post.');
      return;
    }

    // Prepare hashtags as an array (split by commas)
    const hashtagArray = hashtags.value
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
        .slice(0, 20); // Limit to 20 hashtags

    const response = await apiClient.post('/posts/create', {
      userID: parseInt(userID), // Include the userID in the payload
      postTitle: title.value.substring(0, 300), // Limit to 300 characters
      postContent: content.value.substring(0, 2000), // Limit to 2000 characters
      postHashtags: hashtagArray,
    });

    if (response.status === 201) {
      alert('Post created successfully!');
      router.push('/'); // Redirect to the home page
    }
  } catch (error) {
    console.error('Error creating post:', error.response?.data || error.message);
    alert('Failed to create post. Please try again.');
  }
};
</script>

<template>
  <div>
    <h2>Create a New Post</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Title Field -->
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
            id="title"
            v-model="title"
            type="text"
            class="form-control bg-dark text-white"
            placeholder="Enter a title for your post..."
            required
            maxlength="300"
        />
        <span class="text-muted">
          {{ title.length }}/{{ 300 }}
        </span>
      </div>

      <!-- Content Field -->
      <div class="mb-3">
        <label for="content" class="form-label">Content</label>
        <textarea
            id="content"
            v-model="content"
            class="form-control bg-dark text-white"
            rows="5"
            placeholder="Write your post here..."
            required
            maxlength="20000"
        ></textarea>
        <span class="text-muted">
          {{ content.length }}/{{ 20000 }}
        </span>
      </div>

      <!-- Hashtags Field -->
      <div class="mb-3">
        <label for="hashtags" class="form-label">Hashtags</label>
        <input
            id="hashtags"
            v-model="hashtags"
            type="text"
            class="form-control bg-dark text-white"
            placeholder="Enter up to 20 hashtags separated by commas (e.g., go, gin)"
        />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-purple w-100">Create Post</button>
    </form>
  </div>
</template>

<style scoped>
.btn-purple {
  background-color: #800080;
  color: white;
}

.btn-purple:hover {
  background-color: #6a0dad;
}
</style>