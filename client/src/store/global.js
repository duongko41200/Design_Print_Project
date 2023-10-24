import { getField, updateField } from 'vuex-map-fields';
import ImageService from '@/sevices/image.service'

export default {
	namespaced: true,

	state() {
		return {
			imageProfile:''

		};
	},

	actions: {
		async uploadImageByS3({ state }, fileInput) {
			
			console.log('image', state.imageProfile);
			const file = fileInput.files[0];
			let formData = new FormData();
			formData.append('file', file);

			const upload = await ImageService.uploadImageS3(formData);
			return upload
		},
		async uploadImageByProfile({ state }, fileInput) {
			console.log('image', state.imageProfile);
			const file = fileInput.files[0];
			let formData = new FormData();
			formData.append('file', file);

			const upload = await ImageService.uploadImageProfile(formData);
			return upload
		},
		async uploadImageByDesign({ state }, fileInput) {
			console.log('image', state.imageProfile);
			const file = fileInput.files[0];
			let formData = new FormData();
			formData.append('file', file);

			const upload = await ImageService.uploadImageDesign(formData);
			return upload
		},
	},

	mutations: {
		updateField,

	},

	getters: {
		getField,
	},
};
