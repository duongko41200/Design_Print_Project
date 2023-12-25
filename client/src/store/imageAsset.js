import { getField, updateField } from 'vuex-map-fields';
import ImageAssetService from '@/sevices/imageAssets.service'

export default {
	namespaced: true,

	state() {
		return {
			allImageAssets:[],

		};
	},

	actions: {
		async getAllImageAssets({ state ,commit }, payload) {
			console.log("state.alliamg:", state.allImageAssets)

			console.log("[au;pad dslkfl'",payload)
			const imageAsset = await ImageAssetService.getAllImagAsset({
				userId: payload.userId,
			});

			console.log("image asset:", imageAsset);
			commit('SET_ALL_IMAGE_ASSET',imageAsset.data.data)
		}
		

	},

	mutations: {
		updateField,

	},

	getters: {
		getField,
		SET_ALL_IMAGE_ASSET(state, payload) { 
			state.allImageAssets = payload
		}
	},
};
