<template>
	<div class="flex">
		<div class="sidebar__homePage ">
			<SideBar></SideBar>
		</div>


		<div class="swap w-full navbar-homePage max-h-full">
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
import ProductService from '@/sevices/product.service.js';

import baseModal from '@/components/BaseModal/baseModal.vue';
import SideBar from '@/components/Sidebar/SideBar.vue';
export default {
	components: {

		baseModal,
		SideBar,
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
