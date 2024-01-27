import { getField, updateField } from 'vuex-map-fields';
import UserService from '@/sevices/user.service.js';
import DesignService from '@/sevices/design.service';
import NotificationService from '@/sevices/notification.service';
import { pagination } from '@/utils/pagination';
import { filterKeyWord } from '@/utils/filter.js';

const countNotifi = (data) => {
	let count =0
	for (let i = 0; i < data.length; i++) {
		if (data[i].is_readed === false) {
			count = count + 1
		}
		
	}
	return count
}
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

			listReceiveShare: [],
			countNotifi_notRead:0,
			listNotifications: [],
		};
	},

	actions: {
		async validateAuth({ commit }, payload) {
			const validate = await UserService.validateAuthToken({
				token: payload.token,
			});

			// console.log('validateAuth',validate);

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

		filterListUser({ dispatch, state }, { searchKeyword }) {
			if (!state.originAllListUser) return;
			let searchResult = [...state.originAllListUser];
			if (searchKeyword) {
				searchResult = filterKeyWord(searchResult, searchKeyword);
			}
			// console.log("trong startor",searchKeyword)
			state.originPaginationsResult = searchResult;
			dispatch('paginationListUser', {
				list: searchResult,
				currentPage: 1,
			});
		},

		findListUserToShare({ commit,state }, { searchKeyword }) {
			if (!state.originAllListUser) return;
			let searchResult = [...state.originAllListUser];
			if (searchKeyword) {
				searchResult = filterKeyWord(searchResult, searchKeyword);
			}
			console.log("searchResult: ", searchResult);
			searchResult = searchResult.filter(value => value.id != state.userInfo.id)
			commit('SET_ALL_LIST_USER', searchResult);
		},

		async addUserShare({ state, commit }, payload) {
		
			let list = state.listReceiveShare;
			const check = list.find((user) => user && user.id === payload.id)
	

			if ( !check) {
				list = [...list, payload];
				commit('SET_LIST_RECIEVE_USER', list);

			}
	
		},
		deleteUserShare({ state, commit }, payload) { 
			console.log('payload', payload);
			let list = state.listReceiveShare;
			list = list.filter((user) => user && user.id != payload.id)
			commit('SET_LIST_RECIEVE_USER', list)
		},

		async createNotificaShare({ state }, payload) { 
			console.log('payload', payload)
			console.log("state",state.allListUser)
			await NotificationService.creatNotification(payload)

			// console.log('notifi',notifi)
		},
		async getAllNotificationByUser({ commit }, payload) {
			console.log('payload', payload)
			
			const notifi = await NotificationService.getAllNotificationByUser(payload)
			// console.log('gia tri notifi',notifi.data.data)
		
			// let data = notifi.data.data

			let count = countNotifi(notifi.data.data)



			commit('SET_COUNT_NOT_READ_NOTIFI', count)
			commit('SET_LIST_NOTIFICATIONS',notifi.data.data)
			
		},
		async updatNotifi({ state }, payload) { 
			console.log('payload', payload)
			console.log("state", state.allListUser)
			
			await NotificationService.updateNotifiShare(payload)
			// console.log('gia tri notifi',notifi.data.data)

		},

		async updateAcceptShare({ state }, payload) {
			console.log('payload', payload)
			console.log("state", state.allListUser)
			await NotificationService.updateStatusAccept(payload)
		}

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
		SET_LIST_RECIEVE_USER(state, payload) {
			state.listReceiveShare = payload;
		},
		SET_COUNT_NOT_READ_NOTIFI(state, payload) { 
			state.countNotifi_notRead = payload;
		},
		SET_LIST_NOTIFICATIONS(state, payload) { 
			state.listNotifications = payload;
		}
	},

	getters: {
		getField,
	},
};
