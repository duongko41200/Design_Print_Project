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

			const imageAsset = await ImageAssetService.getAllImagAsset({
				userId: payload.userId,
			});

			commit('SET_ALL_IMAGE_ASSET',imageAsset.data.data)
		}
		

	},

	mutations: {
		updateField,
		SET_ALL_IMAGE_ASSET(state, payload) { 
			state.allImageAssets = payload
		}

	},

	getters: {
		getField,
	},
};
