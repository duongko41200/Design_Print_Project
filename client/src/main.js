import { createApp } from 'vue';
import App from './App.vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret,faCoffee, faUser, faEnvelope, faEye,faEyeSlash  } from '@fortawesome/free-solid-svg-icons'



library.add(faUserSecret,faCoffee, faUser, faEnvelope, faEye,faEyeSlash)

// import css
import './assets/css/app.css';

// import router
import router from './router';

const app = createApp(App);
app.use(router);
app.use(VueToast)
app.component('icon', FontAwesomeIcon)
app.mount('#app');
