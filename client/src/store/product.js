import { getField, updateField } from 'vuex-map-fields';
import ProductService from '@/sevices/product.service';
export default {
	namespaced: true,

	state() {
		return {
			product: null,
			cataloge: [],
			products:null

		};
	},

	actions: {
		async getAllProducts({commit}) {
			const getAllProducts = await ProductService.getAllProduct();
			commit('SET_PRODUCTS', getAllProducts.data.data)

			let cataloge = [{ name: "All", isClick: true }];
			let dataCataloge = getAllProducts.data.data
			dataCataloge = dataCataloge.map(value => {
				value.isClick = false
				return value
			})

			cataloge = [...cataloge,...dataCataloge];
			commit('SET_CATALOG',cataloge)



		},
		handleCataloge({ commit ,state}, payload ) {
			let cataloge = structuredClone(state.cataloge);
			cataloge = cataloge.map(value => {
				if (value.name === payload.name) { 
					value.isClick = true
				} else {
					value.isClick = false
				}
				return value
					
			})
			commit('SET_CATALOG',cataloge)




		}
	},

	mutations: {
		updateField,
		SET_PRODUCT_MODEL(state, payload) { 
			state.product = payload
		},
		SET_PRODUCTS(state, payload) { 
			state.products = payload
		},
		SET_CATALOG(state, payload) { 
			state.cataloge = payload
		}

	},

	getters: {
		getField,
	},
};
