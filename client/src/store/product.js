import { getField, updateField } from 'vuex-map-fields';
import ProductService from '@/sevices/product.service';
import { pagination } from '@/utils/pagination';
export default {
	namespaced: true,

	state() {
		return {
			product: null,
			cataloge: [],
			products: null,
			originProducts: [],
			limiProductPerPage: 1,
			totalPages:''
			

		};
	},

	actions: {
		async getAllProducts({ commit,dispatch }, status) {
	
			const getAllProducts = await ProductService.getAllProduct(status);
			// commit('SET_PRODUCTS', getAllProducts.data.data)
			commit('SET_ORIFIN_PRODUCTS',getAllProducts.data.data)

			let cataloge = [{ name: "All", isClick: true }];
			let dataCataloge = getAllProducts.data.data
			dataCataloge = dataCataloge.map(value => {
				value.isClick = false
				return value
			})

			cataloge = [...cataloge,...dataCataloge];
			commit('SET_CATALOG', cataloge)
			

			dispatch('paginationListProduct', {
				list: getAllProducts.data.data,
				currentPage: 1,
			});



		},
		paginationListProduct({ commit, state }, { list, currentPage }) {
			const data = pagination(
				list,
				state.limiProductPerPage,
				currentPage
			);

			commit('SET_PRODUCTS', data.data)
			commit('SET_TOTAL_PAGE',data.totalPages)

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
		},
		SET_ORIFIN_PRODUCTS(state, payload) { 
			state.originProducts = payload
		},
		SET_TOTAL_PAGE(state, payload) { 
			state.totalPages = payload
		}

	},

	getters: {
		getField,
	},
};
