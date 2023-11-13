import { getField, updateField } from 'vuex-map-fields';
import DesignService from '@/sevices/design.service';
export default {
	namespaced: true,

	state() {
		return {
			listDesign: [],
			designEdit: '',
			infoDesign: '',
			originAllDesign: [],
			allDesign: [],
		};
	},

	actions: {
		async getListDesignByUser({ commit }, payload) {
			const allDesigns = await DesignService.getAllDesignByUser({
				userId: payload.userId,
				isPublic: payload.isPublic
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
		async getAllDesign({ commit }) {
			const allDesign = await DesignService.getAllDesign();
			commit('SET_ALL_DESIGN', allDesign.data.data);
			commit('SET_ORIGINAL_DESIGN', allDesign.data.data);
		},

		searchDesign({ commit ,state,dispatch },payload) {
			console.log('searching', state.allDesign)
			dispatch('filterCataloge', { id: payload.idCataloge, name: payload.valueCataloge });
			const dataSearch = state.allDesign.filter(design => design.name === payload.content)
			commit('SET_ALL_DESIGN',dataSearch);

		},
		filterCataloge({ commit, state }, payload) { 
			if (payload.name === 'All') {
				commit('SET_ALL_DESIGN', state.originAllDesign);
			} else {
				const dataFilterCataloge = state.originAllDesign.filter(design => design.product === payload.id)
				commit('SET_ALL_DESIGN', dataFilterCataloge)
			}
		}
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
		SET_ALL_DESIGN(state, payload) {
			state.allDesign = payload;
		},
		SET_ORIGINAL_DESIGN(state, payload) {
			state.originAllDesign = payload;
		},
	},

	getters: {
		getField,
	},
};
