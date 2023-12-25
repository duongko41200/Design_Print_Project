
import ApiService from './api.service';

const baseUrl = 'model/';

const ProductService = {

	async creatNewProduct(params) {
		return ApiService.post(baseUrl + 'create', params);
	},
	async getAllProduct(params) {
		return ApiService.get(baseUrl + 'product', params);
	},
	async updateProduct(params) {
		return ApiService.put(baseUrl + 'updateProduct', params);
	},
	async deleteProduct(params) {
		return ApiService.delete(baseUrl + 'deleteProduct', params);
	},
	async getByProduct(params) {
		return ApiService.get(baseUrl + 'getByProduct', params);
	}


	

};

export default ProductService;
