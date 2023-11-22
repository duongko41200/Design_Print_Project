import { getField, updateField } from 'vuex-map-fields';
import UserService from '@/sevices/user.service.js';
import DesignService from '@/sevices/design.service';
import { pagination } from '@/utils/pagination';
import { filterKeyWord } from '@/utils/filter.js';
export default {
	namespaced: true,

	state() {
		return {
			userInfo: '',
			email: '',
			imageProfile: '',
			originAllListUser: [],
			allListUser: [],
			limitUserPerPage: 15,
			originPaginationsResult: [],
		};
	},

	actions: {
		async validateAuth({ commit }, payload) {
			const validate = await UserService.validateAuthToken({
				token: payload.token,
			});

			commit('SET_USER_INFO', validate.data.data);
			commit('SET_EMAIL', validate.data.data.email);
		},

		async getAllListUser({ commit, dispatch }) {
			const allUser = await UserService.getAllUser();
			let arrayAllUsers = allUser.data.data;

			for (let i = 0; i < arrayAllUsers.length; i++) {
				const statistical = await DesignService.statisticalInfoByDesign(
					{
						idUser: arrayAllUsers[i].id,
					}
				);
				arrayAllUsers[i].sumDesign = statistical.data.data.sumDesign;
				arrayAllUsers[i].sumLike = statistical.data.data.sumLike;
			}

			console.log('allUser dsad ', arrayAllUsers);
			commit('SET_ORIGIN_ALL_LIST_USER', arrayAllUsers);
			dispatch('paginationListUser', {
				list: arrayAllUsers,
				currentPage: 1,
			});
		},
		paginationListUser({ commit, state }, { list, currentPage }) {
			const data = pagination(
				list,
				state.limitUserPerPage,
				currentPage
			);
			commit('SET_ALL_LIST_USER', data);
		},

		filterListUser({ dispatch,state }, { searchKeyword }) {
			if (!state.originAllListUser) return;
			let searchResult = [...state.originAllListUser];
			if (searchKeyword) {
				searchResult = filterKeyWord(searchResult, searchKeyword);
			}
			state.originPaginationsResult = searchResult
			dispatch('paginationListUser', {
				list: searchResult,
				currentPage: 1,
			});
		},
	},

	mutations: {
		updateField,
		SET_USER_INFO(state, payload) {
			state.userInfo = payload;
		},
		SET_EMAIL(state, payload) {
			state.email = payload;
		},
		SET_IMAGE_PROFILE(state, payload) {
			state.imageProfile = payload;
		},
		SET_ALL_LIST_USER(state, payload) {
			state.allListUser = payload;
		},
		SET_ORIGIN_ALL_LIST_USER(state, payload) {
			state.originAllListUser = payload;
		},
	},

	getters: {
		getField,
	},
};
