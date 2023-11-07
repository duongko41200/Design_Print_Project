
import ApiService from './api.service';

const baseUrl = 'design/';

const DesignService = {


	async createDesignByProduct(params) {
		return ApiService.post(baseUrl + 'create', params);
	},
	async getAllDesignByUser(params) {
		return ApiService.get(baseUrl + 'all', params);
	},
	async deleteDesignByUser(params) {
		return ApiService.delete(baseUrl + 'delete', params);
	},



	

};

export default DesignService;
