import axiosBase from 'axios';
// import router from '@/routes/router';
// import { showSwal } from '../util/swal';
// import i18n from '@/locales/i18n';

const axios = axiosBase.create({
	// This is development host
	baseURL: process.env.VUE_APP_URL,
	timeout: 10000,
});

// axios.interceptors.request.use(
// 	function (config) {
// 		config.headers['Authorization'] = `Bearer ${localStorage.getItem(
// 			'token'
// 		)}`;
// 		return config;
// 	},
// 	function (error) {
// 		return Promise.reject(error);
// 	}
// );

// axios.interceptors.response.use(
// 	function (response) {
// 		return response;
// 	},
// 	function (error) {
// 		console.log('error', error);
// 		if (error.response.status === 401) {
// 			showSwal({
// 				type: 'info',
// 				title: i18n.t('notifications'),
// 				text: i18n.t('sessionOff'),
// 			});
// 			router.push('/').catch(() => { });
// 		}
// 		if (error.response.status === 403) {
// 			router.push('/profile').catch(() => { });
// 			showSwal({
// 				type: 'info',
// 				title: this.$t('notifications'),
// 				text: this.$t('userExperiedMessage')
// 			})
// 		}
// 		return Promise.reject(error);
// 	}
// );

const ApiService = {
	async get(resource, params) {
		return await axios.get(`/${resource}`, { params: params });
	},

	async post(resource, body) {
		return await axios.post(`/${resource}`, body);
	},

	async postFormData(resource, body) {
		return await axios.post(`/${resource}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},

	async put(resource, body) {
		return await axios.put(`/${resource}`, body);
	},

	async delete(resource, params) {
		return await axios.delete(`/${resource}`, { params: params });
	},


	/**
	 * @param resource
	 */
	async pixaBay() {
		return await axios.get(`https://pixabay.com/api/?key=40057597-c53c6ba2db497a29e02cc9d55`);
		
	},
	// async getFontFamily() {
	// 	return await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCuGzSbiKK9tsav3UXNK6B9NfmE-XicGo4&sort=popularity`);
		
	// }
};

export default ApiService;
