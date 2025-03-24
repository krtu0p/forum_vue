import axios from 'axios';

// Base URL for the backend
const API_BASE_URL = 'http://localhost:9876';

// Create an Axios instance with the base URL
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use((config) => {
    // Skip adding the token for unauthenticated routes
    const unauthenticatedRoutes = ['/memberships/sign-up'];
    if (!unauthenticatedRoutes.some(route => config.url.includes(route))) {
        const token = localStorage.getItem('authToken'); // Get the access token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to log errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Fetch a post by ID
export async function fetchPost(postID) {
    try {
        const response = await apiClient.get(`/posts/${postID}`);
        console.log('Fetched Post Response:', response.data); // Log the response for debugging
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error.response?.data || error.message);
        throw error;
    }
}

// Toggle like on a post
export async function toggleLike(postID, isLiked) {
    try {
        const response = await apiClient.put(`/posts/user_activity/${postID}`, {
            IsLiked: isLiked,
        });
        console.log('Toggle Like Response:', response.data); // Log the response for debugging
        return response.data;
    } catch (error) {
        console.error('Error toggling like:', error.response?.data || error.message);
        throw error;
    }
}

// Add a comment to a post
export async function addComment(postID, content) {
    try {
        const response = await apiClient.post(`/posts/comment/${postID}`, {
            commentContent: content, // Ensure this matches the backend's expected field name
        });
        console.log('Add Comment Response:', response.data); // Log the response for debugging
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error.response?.data || error.message);
        throw error;
    }
}

export default apiClient;