
import { createStore } from 'vuex'

import auth from '@/store/auth';
import global from '@/store/global';
import product from '@/store/product';

export default createStore({
	modules: {

		auth,
		global,
		product
	},
});
