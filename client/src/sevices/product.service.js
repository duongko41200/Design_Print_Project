
import ApiService from './api.service';

const baseUrl = 'model/';

const ProductService = {


	async getAllProduct(params) {
		return ApiService.get(baseUrl + 'product', params);
	},
	async updateProduct(params) {
		return ApiService.put(baseUrl + 'updateProduct', params);
	},
	async deleteProduct(params) {
		return ApiService.delete(baseUrl + 'deleteProduct', params);
	},


	

};

export default ProductService;
