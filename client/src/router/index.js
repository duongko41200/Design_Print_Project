import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
// import dashboard from '../pages/master/dashboard';
import login from '@/pages/login/login.vue';
import signup from '@/pages/signUps/signup.vue';
import design from '@/pages/designLayout/design';
import profileDetail from '@/pages/profileDetail/profileDetail';
import userInfo from '@/pages/userInfoDesign/userInfo';
import searchLayout from '@/pages/searchLayout/searchLayout.vue';
import userDesign from '@/components/BaseUserDesign/userDesign.vue'
 
// import home from '../pages/home';
import homeLayout from '@/pages/home/homeLayout.vue';
// import profile from '../pages/profile';

const routes = [
	{
		name: 'HomeLayout',
		path: '/',
		component: homeLayout,
		children: [
			{
				name: 'profile',
				path: '/profileDetail',
				component: profileDetail,
			},
			{
				name: 'userInfo',
				path: '/userInfo',
				component: userInfo,
			},
			{
				name: 'searchLayout',
				path: '/',
				component: searchLayout,
			},
			{
				name: 'userDesign',
				path: '/user/:userId',
				component: userDesign,
			},
		],
	},
	{
		name: 'Login',
		path: '/login',
		component: login,
	},
	{
		name: 'signup',
		path: '/signup',
		component: signup,
	},
	{
		name: 'design',
		path: '/design',
		component: design,
	},
];
const router = Router();
function Router() {
	const router = new createRouter({
		history: createWebHistory(),
		routes,
	});
	return router;
}

router.beforeEach(async (to, from, next) => {
	if (['/signup', '/login'].includes(to.path)) {
		next();
		return;
	}

	let token =await localStorage.getItem('tokens');

	console.log('token: ' , token);
	if (!token) {
		next('/login');
		return
	}
	try {
		await store.dispatch(
			'auth/validateAuth',{token}
		);

		
	} catch (error) {

			localStorage.removeItem('token');
			next('/login');
			return;
		
	}

	next();
});
export default router;
