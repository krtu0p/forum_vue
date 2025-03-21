import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Ensure this path is correct
import Login from '../views/Login.vue'; // Ensure this path is correct
import Register from '../views/Register.vue';
import Createpost from "../views/Createpost.vue"; // Ensure this path is correct

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;