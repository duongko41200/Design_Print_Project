import { getField, updateField } from 'vuex-map-fields';
import DesignService from '@/sevices/design.service';
import {
	filterKeyWord,
	filterCatalogeProduct,
	filterIsPublic,
	filterDate,
} from '@/utils/filter.js';
export default {
	namespaced: true,

	state() {
		return {
			listDesign: [],
			originListDesign: [],
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
				isPublic: payload.isPublic,
			});
			commit('SET_LIST_DESIGN', allDesigns.data.data);
			commit('SET_ORIGIN_LIST_DESIGN', allDesigns.data.data);
		},
		async deleteDesignByUser({ commit }, payload) {
			const allDesigns = await DesignService.deleteDesignByUser({
				idDesign: payload.idDesign,
				userId: payload.userId,
			});
			commit('SET_LIST_DESIGN', allDesigns.data.data);
			commit('SET_ORIGIN_LIST_DESIGN', allDesigns.data.data);
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
		async getAllDesign({ commit }, payload) {
			console.log('dksjfksdj:', payload);

			const favoriteDesigns = payload?.favoriteDesign ? payload.favoriteDesign:[];
			const allDesign = await DesignService.getAllDesign();
			const statusFavorite = allDesign.data.data;


			// add isLike for Design
			if (favoriteDesigns.length > 0) {
				for (let i = 0; i < statusFavorite.length; i++) {
					for (let j = 0; j < favoriteDesigns.length; j++) {
						if (statusFavorite[i].id === favoriteDesigns[j]) {
							console.log("ddax vaof day ", i)
							statusFavorite[i].isLike = true
						} 
					}
				}
			}

			console.log(
				'allDesign',
				favoriteDesigns,
				statusFavorite
			);
			commit('SET_ALL_DESIGN', statusFavorite);
			commit('SET_ORIGINAL_DESIGN', statusFavorite);
		},

		searchDesign({ commit, state, dispatch }, payload) {
			dispatch('filterCataloge', {
				id: payload.idCataloge,
				name: payload.valueCataloge,
			});
			const dataSearch = state.allDesign.filter(
				(design) => design.name === payload.content
			);
			commit('SET_ALL_DESIGN', dataSearch);
		},
		filterCataloge({ commit, state }, payload) {
			if (payload.name === 'All') {
				commit('SET_ALL_DESIGN', state.originAllDesign);
			} else {
				const dataFilterCataloge = state.originAllDesign.filter(
					(design) => design.product === payload.id
				);
				commit('SET_ALL_DESIGN', dataFilterCataloge);
			}
		},

		filterListDesign(
			{ commit, state },
			{ searchKeyword, cataloge, statusPublics, date }
		) {
			if (!state.originListDesign) return;
			let searchResult = [...state.originListDesign];
			if (searchKeyword) {
				searchResult = filterKeyWord(searchResult, searchKeyword);
			}
			if (statusPublics != 'All') {
				searchResult = filterIsPublic(searchResult, statusPublics);
			}
			if (cataloge != 'All') {
				searchResult = filterCatalogeProduct(searchResult, cataloge);
			}
			if (date.length > 0) {
				searchResult = filterDate(searchResult, date);
			}

			commit('SET_LIST_DESIGN', searchResult);
		},

		getFavoriteDesign({ commit, state }, listFavorite) {
			console.log(state.originAllDesign);
			console.log('favoriteDesign', listFavorite);

			const originAllDesign = state.originAllDesign;

			let favoriteDesign = [];
			for (let i = 0; i < originAllDesign.length; i++) {
				for (let j = 0; j < listFavorite.length; j++) {
					if (listFavorite[j] == originAllDesign[i].id) {
						favoriteDesign = [...favoriteDesign, originAllDesign[i]];
						continue;
					}
				}
			}

			commit('SET_LIST_DESIGN', favoriteDesign);
			commit('SET_ORIGIN_LIST_DESIGN', favoriteDesign);
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
		SET_ALL_DESIGN(state, payload) {
			state.allDesign = payload;
		},
		SET_ORIGINAL_DESIGN(state, payload) {
			state.originAllDesign = payload;
		},
		SET_ORIGIN_LIST_DESIGN(state, payload) {
			state.originListDesign = payload;
		},
	},

	getters: {
		getField,
	},
};
