<template>
			<div class="relative">
			<button
				@click="togglePopover"
				class="inline-flex items-center gap-x-1 text-sm font-bold leading-6 text-gray-900"
			>
				<img
					:src="require(`@/uploadImage/${userInfo.image?userInfo.image:'man.png'}`)"
					alt="user-image"

					class="hover:bg-gray-300 p-2 rounded-full cursor-pointer w-[53px] h-[53px]"
				/>
				<ChevronDownIcon class="h-6 w-6" aria-hidden="true" />
			</button>

			<transition name="popover-fade">
				<div
					v-if="isPopoverOpen"
					class= "absolute left-1/2 z-20 flex max-w-max -translate-x-[82%] px-4"
				>
					<div
						class="max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5"
					>
						<div class="p-4">
							<div
								class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
								@click="onMoveUserInfo"
							>
								<div
									class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
								>
									<img
										:src="require(`@/uploadImage/${userInfo.image?userInfo.image:'man.png'}`)"
										alt="avatarUser"
										width=50
										height=50
										class="hover:bg-gray-300 p-2 rounded-full cursor-pointer w-[50px] h-[50px]"
									/>
								</div>
								<div>
									<div class="font-semibold text-gray-900">
										{{ userInfo.username }}
										<span class="absolute inset-0"></span>
									</div>
									<p class="mt-1 text-gray-600">{{ this.email }}</p>
								</div>
							</div>
						</div>

						<div
							class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 p-4"
						>
							<div
								class="flex items-center justify-center cursor-pointer gap-x-1 font-semibold text-gray-900 hover:bg-gray-100"
								@click="onChangeProfie"
							>
								Change Profile
							</div>
							<div
								class="flex items-center justify-center gap-x-1 cursor-pointer font-semibold text-gray-900 hover:bg-gray-100"
								@click="onLogout"
							>
								Logout
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const authMappper = createNamespacedHelpers('auth');
import UserService from '@/sevices/user.service.js';
export default {
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
		onMoveUserInfo() {
			this.$router.push('/userInfo');
			this.isPopoverOpen = !this.isPopoverOpen
		},
		async onLogout() {
			await UserService.logout() 
			this.$router.push('/login')
		}
	},
};
</script>