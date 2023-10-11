import { createRouter, createWebHistory } from 'vue-router';

import dashboard from '../pages/master/dashboard';
import login from '@/pages/login/login.vue';
import signup from '@/pages/signUps/signup.vue';
import design from '@/pages/designLayout/design';

import home from '../pages/home';
import profile from '../pages/profile';

const routes = [
	{
		name: 'Dashboard',
		path: '/',
		component: dashboard,
		children: [
			{
				name: 'home',
				path: '/home',
				component: home,
			},
			{
				name: 'profile',
				path: '/profile',
				component: profile,
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
export default router;
function Router() {
	const router = new createRouter({
		history: createWebHistory(),
		routes,
	});
	return router;
}
