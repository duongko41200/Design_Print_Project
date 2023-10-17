import { getField, updateField } from 'vuex-map-fields';
import UserService from '@/sevices/user.service.js';
export default {
	namespaced: true,

	state() {
		return {
			userInfo: '',
			email: '',
			imageProfile:''
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
			state.imageProfile = payload
		}
	},

	getters: {
		getField,
	},
};
