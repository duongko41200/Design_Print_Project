import { getField, updateField } from 'vuex-map-fields';
import ProductService from '@/sevices/product.service';
import { pagination } from '@/utils/pagination';
import { filterKeyWord } from '@/utils/filter.js';
export default {
	namespaced: true,

	state() {
		return {
			product: null,
			cataloge: [],
			products: null,
			originProducts: [],
			limiProductPerPage: 15,
			totalPages: '',
			originPaginationsProduct: '',

			originManageProduct: [],
			manageProduct: '',
		};
	},

	actions: {
		async getAllProducts({ commit }, status) {
			const getAllProducts = await ProductService.getAllProduct(status);
			commit('SET_PRODUCTS', getAllProducts.data.data);
			commit('SET_ORIFIN_PRODUCTS', getAllProducts.data.data);

			let cataloge = [{ name: 'All', isClick: true }];
			let dataCataloge = getAllProducts.data.data;
			dataCataloge = dataCataloge.map((value) => {
				value.isClick = false;
				return value;
			});

			cataloge = [...cataloge, ...dataCataloge];
			commit('SET_CATALOG', cataloge);

			// dispatch('paginationListProduct', {
			// 	list: getAllProducts.data.data,
			// 	currentPage: 1,
			// });
		},
		async getAllProductsByUser(
			{ commit, dispatch,state },
			{ status, role, userId }
		) {
			let getAllProducts = '';
			try {
				if (role === 'owner') {
					const product = await ProductService.getAllProduct({
						status,
					});
					console.log("owner")

					getAllProducts = product;
			
				} else {
					const product = await ProductService.getByProduct({
						userId, status
					});

					console.log("admin")
					getAllProducts = product;
				}

				console.log('manh xinh gai', getAllProducts.data.data);
				commit('SET_ORIGIN_MANAGE_PRODUCTS', getAllProducts.data.data);
				state.originPaginationsProduct = getAllProducts.data.data

				console.log('skdfjksdjf', getAllProducts.data.data);

				dispatch('paginationListProduct', {
					list: getAllProducts.data.data,
					currentPage: 1,
				});
			} catch (error) {
				console.log('error :', error);
			}

			// commit('SET_PRODUCTS', getAllProducts.data.data)

			// let cataloge = [{ name: "All", isClick: true }];
			// let dataCataloge = getAllProducts.data.data
			// dataCataloge = dataCataloge.map(value => {
			// 	value.isClick = false
			// 	return value
			// })

			// cataloge = [...cataloge,...dataCataloge];
			// commit('SET_CATALOG', cataloge)
		},

		paginationListProduct({ commit, state }, { list, currentPage }) {
			const data = pagination(
				list,
				state.limiProductPerPage,
				currentPage
			);

			commit('SET_MANAGE_PRODUCTS', data.data);
			commit('SET_TOTAL_PAGE', data.totalPages);
		},
		filterListProduct({ dispatch, state }, { searchKeyword }) {
			if (!state.originManageProduct) return;
			let searchResult = [...state.originManageProduct];
			if (searchKeyword) {
				searchResult = filterKeyWord(searchResult, searchKeyword);
			}
			state.originPaginationsProduct = searchResult;
			dispatch('paginationListProduct', {
				list: searchResult,
				currentPage: 1,
			});
		},

		handleCataloge({ commit, state }, payload) {
			let cataloge = structuredClone(state.cataloge);
			cataloge = cataloge.map((value) => {
				if (value.name === payload.name) {
					value.isClick = true;
				} else {
					value.isClick = false;
				}
				return value;
			});
			commit('SET_CATALOG', cataloge);
		},
	},

	mutations: {
		updateField,
		SET_PRODUCT_MODEL(state, payload) {
			state.product = payload;
		},
		SET_PRODUCTS(state, payload) {
			state.products = payload;
		},
		SET_CATALOG(state, payload) {
			state.cataloge = payload;
		},
		SET_ORIFIN_PRODUCTS(state, payload) {
			state.originProducts = payload;
		},
		SET_TOTAL_PAGE(state, payload) {
			state.totalPages = payload;
		},
		SET_MANAGE_PRODUCTS(state, payload) {
			state.manageProduct = payload;
		},
		SET_ORIGIN_MANAGE_PRODUCTS(state, payload) {
			state.originManageProduct = payload;
		},
	},

	getters: {
		getField,
	},
};
