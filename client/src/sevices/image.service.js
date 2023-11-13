
import ApiService from './api.service';

const baseUrl = 'image/';

const ImageService = {


	/**
	 * Singup
	 * @param {Params} params
	 * @returns {Response} response
	 */
	async uploadImageS3(params) {
		return ApiService.post(baseUrl + 'upload', params);
	},
	async uploadImageProfile(params) {
		return ApiService.post(baseUrl + 'uploadProfile', params);
	},
	async uploadImageDesign(params) {
		return ApiService.post(baseUrl + 'uploadImageDesign', params);
	},

	

};

export default ImageService;
