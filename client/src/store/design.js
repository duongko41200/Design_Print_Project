import { getField, updateField } from 'vuex-map-fields';
import DesignService from '@/sevices/design.service';
export default {
	namespaced: true,

	state() {
		return {
			listDesign: [],
			designEdit: '',
			infoDesign: '',
		};
	},

	actions: {
		async getListDesignByUser({ commit }, payload) {
			const allDesigns = await DesignService.getAllDesignByUser({
				userId: payload.userId,
			});
			commit('SET_LIST_DESIGN', allDesigns.data.data);
		},
		async deleteDesignByUser({ commit }, payload) {
			const allDesigns = await DesignService.deleteDesignByUser({
				idDesign: payload.idDesign,
				userId: payload.userId,
			});
			commit('SET_LIST_DESIGN', allDesigns.data.data);
		},
		async findDesign({ commit }, payload) {
			console.log(payload);
			const design = await DesignService.findDesignById({
				idDesign: payload.idDesign,
			});
			console.log('deleted', design);

			const designCanvas = {
				version: '5.3.0',
				objects: design.data.data[0].objects,
				background: 'white',
			};
			commit('SET_EDIT_DESIGN', designCanvas);
			commit('SET_INFO_DESIGN', design.data.data[0]);
		},
	},

	mutations: {
		updateField,
		SET_LIST_DESIGN(state, payload) {
			state.listDesign = payload;
		},
		SET_EDIT_DESIGN(state, payload) {
			state.designEdit = payload;
		},
		SET_INFO_DESIGN(state, payload) {
			state.infoDesign = payload;
		},
	},

	getters: {
		getField,
	},
};
