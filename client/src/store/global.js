import { getField, updateField } from 'vuex-map-fields';
import ImageService from '@/sevices/image.service'

export default {
	namespaced: true,

	state() {
		return {
			imageUpload:''

		};
	},

	actions: {
		async uploadImageByS3({ state }, fileInput) {
			
			console.log('image', state.imageUpload);
			const file = fileInput.files[0];
			let formData = new FormData();
			formData.append('file', file);

			const upload = await ImageService.uploadImageS3(formData);
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
