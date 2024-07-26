import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importações do FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Importar ícones específicos
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Adicionar ícones à biblioteca
library.add(faEdit, faTrash);

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
