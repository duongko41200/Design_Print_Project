import { getField, updateField } from 'vuex-map-fields';
import DesignService from '@/sevices/design.service';
import {
	filterKeyWord,
	filterCatalogeProduct,
	filterIsPublic,
	filterDate,
	filterLike
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
		async getAllDesign({ commit }, payload) {
			console.log('payload AllDesign:', payload);

			const favoriteDesigns = payload?.favoriteDesign
				? payload.favoriteDesign
				: [];
			const allDesign = await DesignService.getAllDesign();
			console.log("allDesign duong dep trai:", allDesign)
			const statusFavorite = allDesign.data.data;

			// add isLike for Design
			if (favoriteDesigns.length > 0) {
				for (let i = 0; i < statusFavorite.length; i++) {
					for (let j = 0; j < favoriteDesigns.length; j++) {
						if (statusFavorite[i].id === favoriteDesigns[j]) {
							console.log('ddax vaof day ', i);
							statusFavorite[i].isLike = true;
						}
					}
				}
			}

			console.log('allDesign', favoriteDesigns, statusFavorite);
			commit('SET_ALL_DESIGN', statusFavorite);
			commit('SET_ORIGINAL_DESIGN', statusFavorite);
		},
		async getListDesignByUser({ commit }, payload) {
			console.log('payload AllDesign dffsdf:', payload);

			const favoriteDesigns = payload?.favoriteDesign
				? payload.favoriteDesign
				: [];
			const allDesigns = await DesignService.getAllDesignByUser({
				userId: payload.userId,
				isPublic: payload.isPublic,
			});
			const designUpdate = allDesigns.data.data;

			// add isLike for Design
			if (favoriteDesigns.length > 0) {
				for (let i = 0; i < designUpdate.length; i++) {
					for (let j = 0; j < favoriteDesigns.length; j++) {
						if (designUpdate[i].id === favoriteDesigns[j]) {
							console.log('ddax vaof day ', i);
							designUpdate[i].isLike = true;
						}
					}
				}
			}


			commit('SET_LIST_DESIGN', designUpdate);
			commit('SET_ORIGIN_LIST_DESIGN',designUpdate);
		},
		async deleteDesignByUser({ commit }, payload) {
			const allDesigns = await DesignService.deleteDesignByUser({
				idDesign: payload.idDesign,
				userId: payload.userId,
			});
			commit('SET_LIST_DESIGN', allDesigns.data.data);
			commit('SET_ORIGIN_LIST_DESIGN', allDesigns.data.data);
		},

		//edit design by user
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
			{ searchKeyword, cataloge, statusPublics, date,numberLike }
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
			if (numberLike) {
				searchResult = filterLike(searchResult, numberLike);
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
						originAllDesign[i].isLike = true;
						favoriteDesign = [...favoriteDesign, originAllDesign[i]];
					
						continue;
					}
				}
			}

			commit('SET_LIST_DESIGN', favoriteDesign);
			commit('SET_ORIGIN_LIST_DESIGN', favoriteDesign);
		},

		/// backlog check lai khi filter

		handleFavoriteList({ commit, state }, { designId, type }) {
			const originAllDesign = state.originAllDesign;
			const originListDesign = state.originListDesign;

			for (let i = 0; i < originAllDesign.length; i++) {
				if (originAllDesign[i].id === designId) {
					if (type === 'create') {
						originAllDesign[i].isLike = true;
					} else {
						originAllDesign[i].isLike = false;
					}
				}
			}

			for (let i = 0; i < originListDesign.length; i++) {
				if (originListDesign[i].id === designId) {
					if (type === 'create') {
						originListDesign[i].isLike = true;
					} else {
						originListDesign[i].isLike = false;
					}
				}
			}
			console.log('originAllDesign sadasd', originAllDesign);
			commit('SET_ALL_DESIGN', originAllDesign);
			commit('SET_ORIGINAL_DESIGN', originAllDesign);
			commit('SET_LIST_DESIGN', originListDesign);
			commit('SET_ORIGIN_LIST_DESIGN', originListDesign);
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
