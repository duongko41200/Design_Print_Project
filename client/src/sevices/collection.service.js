
import ApiService from './api.service';

const baseUrl = 'collection/';

const CollectionService = {


	async createCollection(params) {
		return ApiService.post(baseUrl + 'create', params);
	},
	
	async getCollectionByUser(params) {
		return ApiService.get(baseUrl + 'collectionByUser', params);
	},
	async deleteCollection(params) {
		return ApiService.delete(baseUrl + 'deleteCollection', params);
	},




};

export default CollectionService;
