import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { io } from "socket.io-client";



const app = createApp(App)

app.use(createPinia())

app.mount('#app')

const { token } = sessionStorage;

const socket = io("http://localhost:3000", { query: { token:'qwerty' } });

// соединение установлено
socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

// соединение разорвано
socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

// ошибка авторизации
socket.on("connect_error", (err) => {
  console.log(err.message); // not authorized
  console.log(err.data);
});
