
import ApiService from './api.service';

const baseUrl = 'model/';

const ProductService = {


	async getAllProduct(params) {
		return ApiService.get(baseUrl + 'product', params);
	},


	

};

export default ProductService;
