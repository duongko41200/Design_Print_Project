
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

	

};

export default ImageService;
