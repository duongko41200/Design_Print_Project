
import ApiService from './api.service';

const baseUrl = 'imageassets/';

const ImageAssetService = {


	/**
	 * Singup
	 * @param {Params} params
	 * @returns {Response} response
	 */
	async createImagAsset(params) {
		return ApiService.post(baseUrl + 'upload', params);
	},
	async getAllImagAsset(params) {
		return ApiService.get(baseUrl + 'all', params);
	},

	

};

export default ImageAssetService;
