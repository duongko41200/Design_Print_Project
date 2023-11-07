import { createApp } from 'vue';
import App from './App.vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import globalStyle from '@/assets/globalStyle.css';

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
	faAlignLeft,
	faAlignCenter,
	faAlignRight,
	faAlignJustify,
	faListOl,
	faListUl,
	faUndo,
	faRedo,
	faBold,
	faUnderline,
	faItalic,
	faCopy,
	faTrash,
	faMagnifyingGlass,
	faHeart,
	faDownload,
	faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';

// import {faCopy} from '@fortawesome/free-regular-svg-icons'

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
	faBell,
	faAlignLeft,
	faAlignCenter,
	faAlignRight,
	faAlignJustify,
	faListOl,
	faListUl,
	faUndo,
	faRedo,
	faBold,
	faUnderline,
	faItalic,
	faCopy,
	faTrash,
	faMagnifyingGlass,
	faHeart,
	faDownload,
	faEllipsisVertical
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
app.use(globalStyle);
app.component('icon', FontAwesomeIcon);
app.mount('#app');
