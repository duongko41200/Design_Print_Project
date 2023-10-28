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
		<!-- <button
			class="font-bold p-2 px-4 rounded-full"
			@click="onCreateDesign"
		>
			Create
		</button> -->
		<Menu as="div" class="relative inline-block text-left">
			<div>
				<MenuButton
					class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				>
					Create
					<ChevronDownIcon
						class="-mr-1 h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
				</MenuButton>
			</div>

			<transition
				enter-active-class="transition ease-out duration-100"
				enter-from-class="transform opacity-0 scale-95"
				enter-to-class="transform opacity-100 scale-100"
				leave-active-class="transition ease-in duration-75"
				leave-from-class="transform opacity-100 scale-100"
				leave-to-class="transform opacity-0 scale-95"
			>
				<MenuItems
					class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<div class="py-1">
						<MenuItem v-slot="{ active }">
							<div
								class="cursor-pointer"
								@click="onCreateDesign"
								:class="[
									active
										? 'bg-gray-100 text-gray-900'
										: 'text-gray-700',
									'block px-4 py-2 text-sm',
								]"
							>
								Design
							</div>
						</MenuItem>
						<MenuItem v-slot="{ active }">
							<a
								href="#"
								:class="[
									active
										? 'bg-gray-100 text-gray-900'
										: 'text-gray-700',
									'block px-4 py-2 text-sm',
								]"
								>Template</a
							>
						</MenuItem>
					</div>
				</MenuItems>
			</transition>
		</Menu>

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

		<icon icon="fa-solid fa-bell" size="lg" />
		<!-- <FlyoutMenu /> -->

		<logoUser></logoUser>
	</div>
	<router-view></router-view>
	<baseModal
		:showModal="showModal"
		:products="products"
		@oncloseModal="oncloseModal"
		@onDesignProduct="onDesignProduct"
	></baseModal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const authMappper = createNamespacedHelpers('auth');
const productMappper = createNamespacedHelpers('product');
import UserService from '@/sevices/user.service.js';
import ProductService from '@/sevices/product.service.js';
import logoUser from '@/components/logoUser/logoUser.vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import baseModal from '@/components/BaseModal/baseModal.vue';
export default {
	components: {
		logoUser,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		ChevronDownIcon,
		baseModal,
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

			showModal: false,

			products: [],
		};
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
	},
	async mounted() {
		const getAllProducts = await ProductService.getAllProduct();
		this.products = getAllProducts.data.data;

		console.log('getAllProducts', this.products);
	},
	methods: {
		...productMappper.mapMutations(['SET_PRODUCT_MODEL']),
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
			this.showModal = true;
		},
		onDesignProduct(product) {
			this.SET_PRODUCT_MODEL(product)
			this.$router.push('/design');
		},
		oncloseModal() {
			this.showModal = false;
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
