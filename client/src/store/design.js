import { getField, updateField } from 'vuex-map-fields';
import DesignService from '@/sevices/design.service';
import CollectionService from '@/sevices/collection.service.js';
import {
	filterKeyWord,
	filterCatalogeProduct,
	filterIsPublic,
	filterDate,
	filterLike,
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

			statisticalByDesign: [],

			originDesignByCollection: [],
			allDesignByCollection: [],
		};
	},

	actions: {
		async getAllDesign({ commit }, payload) {
			console.log('payload AllDesign:', payload);

			const favoriteDesigns = payload?.favoriteDesign
				? payload.favoriteDesign
				: [];
			const allDesign = await DesignService.getAllDesign();
			console.log('allDesign ', allDesign);
			const listFavoriteDesign = allDesign.data.data;

			// add isLike to listFavoriteDesign and update status like  for Design
			if (favoriteDesigns.length > 0) {
				for (let i = 0; i < listFavoriteDesign.length; i++) {
					for (let j = 0; j < favoriteDesigns.length; j++) {
						if (listFavoriteDesign[i].id === favoriteDesigns[j]) {
				
							listFavoriteDesign[i].isLike = true;
						}
					}
				}
			}

			console.log('allDesign', favoriteDesigns, listFavoriteDesign);
			commit('SET_ALL_DESIGN', listFavoriteDesign);
			commit('SET_ORIGINAL_DESIGN', listFavoriteDesign);
		},

		
		async getListDesignByUser({ commit }, payload) {
			console.log('payload AllDesign :', payload);

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
			// console.log("data designUdate",designUpdate)
			commit('SET_LIST_DESIGN', designUpdate);
			commit('SET_ORIGIN_LIST_DESIGN', designUpdate);
		},

				

		///product
		async getListDesignByProduct({ commit }, payload) {
			const allDesigns = await DesignService.getDesignByProduct({
				productId: payload.productId,
				isPublic: payload.isPublic,
			});

			console.log('allDesigns dsffsddsf', allDesigns);
			const designUpdate = allDesigns.data.data;

			commit('SET_LIST_DESIGN', designUpdate);
		},
		async deleteDesignByUser({ commit }, payload) {
			const allDesigns = await DesignService.deleteDesignByUser({
				idDesign: payload.idDesign,
				userId: payload.userId,
				productId: payload.productId,
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
			const dataSearch = state.allDesign.filter((design) =>
				design.name
					?.toLowerCase()
					.includes(payload.content.toLowerCase())
			);
			commit('SET_ALL_DESIGN', dataSearch);
		},
		filterCataloge({ commit, state }, payload) {
			if (payload.name === 'All') {
				commit('SET_ALL_DESIGN', state.originAllDesign);
			} else {
				const dataFilterCataloge = state.originAllDesign.filter(
					(design) => design.product.id === payload.id
				);
				commit('SET_ALL_DESIGN', dataFilterCataloge);
			}
		},

		filterListDesign(
			{ commit, state },
			{ searchKeyword, cataloge, statusPublics, date, numberLike }
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
		getFavoriteOfUserOther({ commit, state }, listFavorite){
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

		async statisticalInfoByDesign({ state }, payload) {
			console.log(state.originAllDesign);

			console.log('statistical InfoByDesign', payload);

			const statistical = await DesignService.statisticalInfoByDesign({
				idUser: payload.idUser,
			});
			state.statisticalByDesign =statistical.data.data
		},


		/// collection action
				
		async getAllCollectionByUser({commit, state }, payload) {
			console.log("payload dskjsdkfj:", payload);

			const collection = await CollectionService.getCollectionByUser({ userId: payload?.id })
			
			console.log("collection", collection);

			console.log(state.statisticalByDesign);

			commit('SET_LIST_DESIGN', collection.data.data);
			commit('SET_ORIGIN_LIST_DESIGN', collection.data.data);
		},

		async getListDesignByCollection({ commit }, payload) {

			const allDesigns = await DesignService.getAllDesignByUser({
				userId: payload.userId,
				isPublic: payload.isPublic,
			});
			const designUpdate = allDesigns.data.data;


			commit('SET_ORIGIN_DESIGN_BY_COLLECTION', designUpdate);
			commit('SET_ALL_DESIGN_BY_COLLECTION', designUpdate);
		},

		async filterCollectionByCategory({ commit,state }, {cataloge}) { 
			if (!state.originDesignByCollection) return;
			let searchResult = [...state.originDesignByCollection];

			console.log('searchResult', searchResult);

			if (cataloge != 'All') {
				searchResult = filterCatalogeProduct(searchResult, cataloge);
			}

			console.log("RESULT", searchResult);

			// commit('SET_ORIGIN_DESIGN_BY_COLLECTION', searchResult);
			commit('SET_ALL_DESIGN_BY_COLLECTION', searchResult);

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
		SET_ORIGIN_LIST_DESIGN(state, payload) {
			state.originListDesign = payload;
		},

		SET_ORIGIN_DESIGN_BY_COLLECTION(state, payload) { 
			state.originDesignByCollection = payload;
		},
		SET_ALL_DESIGN_BY_COLLECTION(state, payload) { 
			state.allDesignByCollection = payload;
		}
	},

	getters: {
		getField,
	},
};
