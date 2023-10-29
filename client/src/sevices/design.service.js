
import ApiService from './api.service';

const baseUrl = 'design/';

const DesignService = {


	async createDesignByProduct(params) {
		return ApiService.post(baseUrl + 'create', params);
	},


	

};

export default DesignService;
