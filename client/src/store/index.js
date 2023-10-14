
import { createStore } from 'vuex'

import auth from '@/store/auth';
import global from '@/store/global';

export default createStore({
	modules: {

		auth,
		global
	},
});
