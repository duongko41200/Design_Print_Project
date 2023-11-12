<template>
	<div class="flex">
		<div class="sidebar__homePage">
			<SideBar></SideBar>
		</div>

		<div class="swap w-full navbar-homePage max-h-full">
			<div
				class="fixed bottom-0 md:w-[92%] 2xl:w-[94%] h-[56px] sm:top-0 z-50 flex flex-row items-center justify-between backdrop-blur bg-opacity-80 border-t sm:border-t-0 sm:border-b border-opacity-50 text-sm select-none text-slate-50 bg-zinc-900 border-t-zinc-700 sm:border-b-zinc-700"
			>
				<div
					class="hidden sm:flex items-center cursor-pointer px-4 pl-6 left-0 h-full w-32"
				>
					PRINTDESIGN
				</div>
				<div
					class="flex relative items-center h-full -mt-1 w-full sm:w-auto"
				>
					<div
						class="flex flex-row items-center cursor-pointer h-full py-1.5 pb-0 px-2 justify-center transition-all flex-1"
					>
						<div class="relative sm:flex justify-center hidden w-full">
							<div
								class="absolute w-full"
								style="
									border-bottom: 2.5px solid #6366f1;
									bottom: -17px;
								"
							></div>
							<span class="">Home</span>
						</div>
					</div>
					<div
						class="flex flex-row items-center cursor-pointer h-full py-1.5 pb-0 px-2 justify-center transition-all flex-1"
						@click="onCreateDesign"
					>
						<div class="relative sm:flex justify-center hidden w-full">
							<div
								class="absolute w-full"
								style="
									border-bottom: 2.5px solid #6366f1;
									bottom: -17px;
								"
							></div>
							<span class="">Design</span>
						</div>
					</div>
				</div>
				<div
					class="hidden w-32 h-full sm:flex gap-3 items-center justify-end mr-4"
				>
					<icon icon="fa-solid fa-bell" size="lg" />
					<logoUser></logoUser>
				</div>
			</div>
			<router-view @onCreateDesign="onCreateDesign"></router-view>
			<baseModal
				:showModal="showModal"
				:products="products"
				@oncloseModal="oncloseModal"
				@onDesignProduct="onDesignProduct"
			></baseModal>
		</div>
	</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const authMappper = createNamespacedHelpers('auth');
const productMappper = createNamespacedHelpers('product');
const designMappper = createNamespacedHelpers('design');
import ProductService from '@/sevices/product.service.js';
import logoUser from '@/components/logoUser/logoUser.vue';
import baseModal from '@/components/BaseModal/baseModal.vue';
import SideBar from '@/components/Sidebar/SideBar.vue';
export default {
	components: {
		baseModal,
		SideBar,
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

			showModal: false,

			products: [],

			//giải quyết tạm
			// menuClosedPaddingLeftBody:'78px'
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
		...designMappper.mapMutations(['SET_EDIT_DESIGN']),
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
			this.SET_PRODUCT_MODEL(product);
			this.$router.push('/design');
			this.SET_EDIT_DESIGN('');
		},
		oncloseModal() {
			this.showModal = false;
		},
		onMoveUserInfo() {
			this.$router.push('/userInfo');
			this.isPopoverOpen = !this.isPopoverOpen;
		},
	},
};
</script>
<style>
/* .navbar-homePage {
	padding: 10px 260px;
} */
</style>
