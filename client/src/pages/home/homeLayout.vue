<template>
	<div class="flex justify-between gap-3 md:gap-2 items-center p-4">
		<img
			src="@/assets/logo_design.jpg"
			alt="logo"
			class="hover:bg-gray-300 p-2 rounded-full cursor-pointer w-[60px] h-[60px]"
		/>
		<router-link
			to="/"
			class="bg-black text-white p-2 px-4 rounded-full hidden md:block"
		>
			Home
		</router-link>
		<button
			class="font-bold p-2 px-4 rounded-full"
			@click="onCreateDesign"
		>
			Create
		</button>
		<div
			class="bg-[#e9e9e9] p-3 gap-3 items-center rounded-full w-full hidden md:flex"
		>
			<HiSearch class="text-[25px] text-gray-500" />
			<input
				type="text"
				placeholder="Search"
				class="bg-transparent w-full focus:outline-none"
			/>
		</div>
		<!-- {/* <HiSearch class='text-[25px] text-gray-500 md:hidden' /> */} -->
		<HiBell
			class="text-[25px] md:text-[50px] text-gray-500 cursor-pointer"
		/>

		<icon icon="fa-solid fa-bell" size="lg" />
		<!-- <FlyoutMenu /> -->

		<logoUser></logoUser>
	</div>
	<router-view></router-view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const authMappper = createNamespacedHelpers('auth');
import UserService from '@/sevices/user.service.js';
import logoUser from '@/components/logoUser/logoUser.vue';
export default {
	components: {
		logoUser,
	},
	data() {
		return {
			isPopoverOpen: false,
			solutions: [
				// Define your solutions data here
				{ name: 'UserName', email: 'Email@gmail.com', href: '#' },
			],
			callsToAction: [
				// Define your calls to action data here
				{ name: 'Change Profile', href: '/123/change-profile' },
				{ name: 'Logout', href: '#' },
			],
		};
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
	},
	mounted() {
		// console.log("userInfo:",this.userInfo);
	},
	methods: {
		togglePopover() {
			this.isPopoverOpen = !this.isPopoverOpen;
		},
		openPopover() {
			this.isPopoverOpen = true;
		},
		onChangeProfie() {
			this.$router.push('/profileDetail');
			this.isPopoverOpen = !this.isPopoverOpen;
		},
		onCreateDesign() {
			this.$router.push('/design');
		},
		onMoveUserInfo() {
			this.$router.push('/userInfo');
			this.isPopoverOpen = !this.isPopoverOpen;
		},
		async onLogout() {
			await UserService.logout();
			this.$router.push('/login');
		},
	},
};
</script>
