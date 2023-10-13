import { createRouter, createWebHistory } from 'vue-router';

// import dashboard from '../pages/master/dashboard';
import login from '@/pages/login/login.vue';
import signup from '@/pages/signUps/signup.vue';
import design from '@/pages/designLayout/design';
import profileDetail from '@/pages/profileDetail/profileDetail'
import userInfo from '@/pages/userInfoDesign/userInfo'

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
				name: 'home',
				path: '/home',
				component: homeLayout,
			},
			{
				name: 'profile',
				path: '/profileDetail',
				component: profileDetail,
			},
			{
				name: 'userInfo',
				path: '/userInfo',
				component: userInfo,
			}
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
export default router;
function Router() {
	const router = new createRouter({
		history: createWebHistory(),
		routes,
	});
	return router;
}
