<script setup>
import {ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {fetchPost, toggleLike, addComment} from '../utils/api'; // Import utility functions from api.js

const route = useRoute();
const post = ref({
  postTitle: 'No Title',
  postContent: 'No Content',
  username: 'Anonymous',
  isLiked: false,
  comments: [], // Initialize as an empty array
});
const newComment = ref('');

// Watch for changes in route.params.postID
watch(
    () => route.params.postID,
    async (newPostID) => {
      if (!newPostID) return;

      try {
        const response = await fetchPost(newPostID); // Fetch post details using the utility function
        console.log('Full API Response:', response); // Log the full response
        console.log('Comments from API Response:', response.comments); // Log only the comments

        post.value = {
          postTitle: response.postDetail?.postTitle || 'No Title',
          postContent: response.postDetail?.postContent || 'No Content',
          username: response.postDetail?.username || 'Anonymous',
          isLiked: response.likeCount > 0,
          comments: response.comments.map(comment => ({
            username: comment.username || 'Anonymous', // Default to "Anonymous" if missing
            content: comment.commentContent || 'No comment content', // Map commentContent field
          })) || [],
        };
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    },
    {immediate: true}
);

// Toggle Like Functionality
async function toggleLikeHandler() {
  const postID = route.params.postID;

  try {
    await toggleLike(postID, !post.value.isLiked); // Use the utility function to toggle like
    post.value.isLiked = !post.value.isLiked;
  } catch (error) {
    console.error('Error toggling like:', error);
  }
}

// Add Comment Functionality
async function addCommentHandler() {
  const postID = route.params.postID;

  try {
    // Send the payload with the "commentContent" field
    const createCommentRequest = newComment.value.trim(); // Trim whitespace and match the backend's expected field name

    console.log('Sending comment payload:', {commentContent: createCommentRequest}); // Log the payload

    if (!createCommentRequest) {
      console.error('Comment content is empty');
      return; // Prevent sending empty comments
    }

    await addComment(postID, createCommentRequest); // Use the utility function to add a comment

    // Optionally, fetch the updated comments from the backend
    const response = await fetchPost(postID);
    post.value.comments = response.comments.map(comment => ({
      username: comment.username || 'Anonymous',
      content: comment.commentContent || 'No comment content',
    }));

    newComment.value = ''; // Clear the input
  } catch (error) {
    console.error('Error adding comment:', error);
  }
}
</script>

<template>
  <div>
    <!-- Post Title -->
    <h2>{{ post.postTitle }}</h2>

    <!-- Post Content -->
    <p>{{ post.postContent }}</p>

    <!-- Post Author -->
    <small class="text-muted">By: {{ post.username }}</small>

    <!-- Like Button -->
    <button
        @click="toggleLikeHandler"
        :class="['btn', post.isLiked ? 'btn-success' : 'btn-secondary']"
        style="margin-top: 1rem;"
    >
      {{ post.isLiked ? 'Liked' : 'Like' }}
    </button>

    <!-- Comments Section -->
    <div style="margin-top: 2rem;">
      <h3>Comments</h3>
      <div v-if="post.comments.length > 0">
        <div v-for="(comment, index) in post.comments" :key="index">
          <p><strong>{{ comment.username }}:</strong> {{ comment.content }}</p>
        </div>
      </div>
      <p v-else>No comments yet.</p>
    </div>

    <!-- Add Comment Form -->
    <form @submit.prevent="addCommentHandler" style="margin-top: 1rem;">
      <textarea
          v-model="newComment"
          placeholder="Write a comment..."
          required
          rows="3"
          style="width: 100%; margin-bottom: 1rem; padding: 0.5rem;"
      ></textarea>
      <button type="submit" class="btn btn-primary">Submit Comment</button>
    </form>
  </div>
</template>

<style scoped>
.text-muted {
  font-size: 0.9rem;
  color: #6c757d;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

textarea {
  resize: none;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>