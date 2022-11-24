if (!window.Worker) {
	console.log('Warning: Browser does not support Worker threads.');
}

import { createApp } from 'vue';
import App from './App.vue';

import './assets/main.css';
import './assets/clock.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';
import { faPause, faPlay, faForward } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCircle, faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faPause, faPlay, faForward, faSquare, faCircle, faUser);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('font-awesome-layers', FontAwesomeLayers);
app.component('font-awesome-layers-text', FontAwesomeLayersText);
app.mount('#app')
