import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

// Create and configure Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // Enable persistence
app.use(pinia);

// Use Router
app.use(router);

// Mount the app
app.mount('#app');