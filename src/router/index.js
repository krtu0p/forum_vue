import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Ensure this path is correct
import Login from '../views/Login.vue'; // Ensure this path is correct
import Register from '../views/Register.vue';
import Createpost from "../views/Createpost.vue";
import Forumpage from "@/views/Forumpage.vue"; // Ensure this path is correct

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/create-post', component: Createpost, name: 'createPost' },
    { path: '/posts/:postID', component: Forumpage, name: 'forum' }, // Ensure :postID matches
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;