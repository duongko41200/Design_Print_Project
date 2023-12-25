
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
	async uploadImageProduct(params) {
		return ApiService.post(baseUrl + 'uploadImageProduct', params);
	},


	async getRemoteImage(params) {
		return ApiService.post(baseUrl + 'get-remote-image', params);
	},

	

};

export default ImageService;
