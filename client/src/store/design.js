import { getField, updateField } from 'vuex-map-fields';
import DesignService from '@/sevices/design.service';
export default {
	namespaced: true,

	state() {
		return {
			listDesign:[]
		};
	},

	actions: {
		async getListDesignByUser({ commit }, payload) {
			const allDesigns = await DesignService.getAllDesignByUser({
				userId: payload.userId
			})
			commit('SET_LIST_DESIGN', allDesigns.data.data)


		},
	},

	mutations: {
		updateField,
		SET_LIST_DESIGN(state, payload) {
			state.listDesign = payload;
		},

	},

	getters: {
		getField,
	},
};
