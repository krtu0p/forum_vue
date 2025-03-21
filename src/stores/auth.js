import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
    }),
    actions: {
        login() {
            this.isLoggedIn = true;
            console.log('User logged in. isLoggedIn:', this.isLoggedIn); // Debug log
        },
        logout() {
            this.isLoggedIn = false;
            console.log('User logged out. isLoggedIn:', this.isLoggedIn); // Debug log
        },
    },
});