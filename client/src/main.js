import { createApp } from 'vue';
import App from './App.vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
	faUserSecret,
	faCoffee,
	faUser,
	faEnvelope,
	faEye,
	faEyeSlash,
	faChevronLeft,
	faList,
	faShapes,
	faImage,
	faFont,
	faPencil,
	faUpload,
	faBell,
} from '@fortawesome/free-solid-svg-icons';

library.add(
	faUserSecret,
	faCoffee,
	faUser,
	faEnvelope,
	faEye,
	faEyeSlash,
	faChevronLeft,
	faList,
	faShapes,
	faImage,
	faFont,
	faPencil,
	faUpload,
	faBell
);

// import css
import './assets/css/app.css';

// import router
import router from './router';
import store from './store';

const app = createApp(App);
app.use(router);
app.use(VueToast);
app.use(store);
app.component('icon', FontAwesomeIcon);
app.mount('#app');
