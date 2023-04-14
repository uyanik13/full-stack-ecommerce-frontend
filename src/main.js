import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import "./assets/css/app.css";


const app = createApp(App)
.use(createPinia());

app.mount("#app");
