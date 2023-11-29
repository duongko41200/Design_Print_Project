
import ApiService from './api.service';

const baseUrl = 'notification/';

const NotificationService = {


	/**
	 * Singup
	 * @param {Params} params
	 * @returns {Response} response
	 */
	async creatNotification(params) {
		return ApiService.post(baseUrl + 'create', params);
	},
	async getAllNotificationByUser(params) {
		return ApiService.get(baseUrl + 'allByUser', params);
	},
	/**
	 *  update notifition readed
	 * @param {*} params (id :user_recieve)
	 * @returns notification readed
	 */
	async updateNotifiShare(params) {
		return ApiService.put(baseUrl + 'updateNotifi', params);
	},



	



	

};

export default NotificationService;
