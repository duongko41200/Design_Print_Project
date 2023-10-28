import { getField, updateField } from 'vuex-map-fields';
// import ProductService from '@/sevices/product.service';
export default {
	namespaced: true,

	state() {
		return {
			product:''

		};
	},

	actions: {
		
	},

	mutations: {
		updateField,
		SET_PRODUCT_MODEL(state, payload) { 
			state.product = payload
		}

	},

	getters: {
		getField,
	},
};
