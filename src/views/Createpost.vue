<script setup>
import { ref } from 'vue';
import apiClient from '../utils/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const content = ref('');

const handleSubmit = async () => {
  try {
    const userID = localStorage.getItem('userID'); // Get the userID from localStorage
    if (!userID) {
      alert('You must be logged in to create a post.');
      return;
    }

    const response = await apiClient.post('/posts/create', {
      userID: parseInt(userID), // Include the userID in the payload
      content: content.value,
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
      <div class="mb-3">
        <label for="content" class="form-label">Content</label>
        <textarea
            id="content"
            v-model="content"
            class="form-control bg-dark text-white"
            rows="5"
            placeholder="Write your post here..."
            required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-purple w-100">Create Post</button>
    </form>
  </div>
</template>