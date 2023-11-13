import ApiService from './api.service';

const baseUrl = 'user/';

const UserService = {
	// /**
	//  * Get user info
	//  * @param {Params} params
	//  * @returns {Response} response
	//  */
	// async getUserInfo(params) {
	// 	return await axios.get(`/${baseUrl}username/${params}`);
	// },

	/**
	 * Singup
	 * @param {Params} params
	 * @returns {Response} response
	 */
	async signup(params) {
		return ApiService.post(baseUrl + 'signup', params);
	},

	/**
	 * Login
	 * @param {Params} params
	 * @returns {Response} response
	 */
	async login(params) {
		return ApiService.post(baseUrl + 'login', params);
	},
	async updateProfile(params) {
		return ApiService.put(baseUrl + 'update', params);
	},

	/**
	 *
	 * @param {*} params :token
	 * @returns info user
	 */
	async validateAuthToken(params) {
		return ApiService.post(baseUrl + 'validate', params);
	},
	logout() {
		localStorage.removeItem('tokens');
	},

	/**
	 * Send request to retrieve password
	 * @param {Params} params
	 * @returns {Response} response
	 */
	forgotPassword(params) {
		return ApiService.post(baseUrl + 'password/forgot', params);
	},
	/**
	 * Send request to change password
	 * @param {Params} params
	 * @returns {Response} response
	 */
	changePassword(params) {
		return ApiService.post(baseUrl + 'password/change', params);
	},
	/**
	 * Confirm verification code to change password
	 * @param {Params} params
	 * @returns {Response} response
	 */

	findByUser(params) {
		return ApiService.get(baseUrl + 'findByUser', params);
	}
};

export default UserService;
