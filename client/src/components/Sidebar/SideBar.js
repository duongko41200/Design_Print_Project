
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
const authMappper = createNamespacedHelpers('auth');
import { createNamespacedHelpers } from 'vuex';
export default {
	name: 'SidebarMenuAkahon',
	components: {
		Menu, MenuButton, MenuItem, MenuItems,ChevronDownIcon
	},
	props: {
		//! Menu settings
		isMenuOpen: {
			type: Boolean,
			default: false,
		},
		isUsedVueRouter: {
			type: Boolean,
			default: false,
		},

		menuLogo: {
			type: String,
			default: '',
		},
		menuIcon: {
			type: String,
			default: 'bxl-c-plus-plus',
		},
		isPaddingLeft: {
			type: Boolean,
			default: true,
		},
		menuOpenedPaddingLeftBody: {
			type: String,
			default: '250px',
		},
		menuClosedPaddingLeftBody: {
			type: String,
			default: '78px',
		},

		//! Menu items
		menuItems: {
			type: Array,
			default: () => [
				{
					link: '/',
					name: 'Trang Chủ',
					tooltip: 'Trang Chủ',
					icon: 'bx-grid-alt',
	
				},

				// {
				// 	link: '#',
				// 	name: 'Tin Nhắn',
				// 	tooltip: 'Tin Nhắn',
				// 	icon: 'bx-chat',
				// },
				// {
				// 	link: '#',
				// 	name: 'Analytics',
				// 	tooltip: 'Analytics',
				// 	icon: 'bx-pie-chart-alt-2',
				// },
				{
					link: '/profileDetail',
					name: 'My Profile',
					tooltip: 'Danh Mục',
					icon: 'bx-folder-plus',

				},
				{
					link: '/userInfo',
					name: 'Design',
					tooltip: 'Kho',
					icon: 'bx-data',
	
				},
				// {
				// 	link: '/quantri',
				// 	name: 'Quản trị',
				// 	tooltip: 'Quản trị',
				// 	icon: 'bx-cog',
			
				// },
				// {
				// 	link: '/baocao',
				// 	name: 'Thống Kê',
				// 	tooltip: 'Thống kê báo cáo',
				// 	icon: 'bx-bookmark',
		
				// },
				// {
				// 	link: '#',
				// 	name: 'Setting',
				// 	tooltip: 'Setting',
				// 	icon: 'bx-cog',
				// },
			],
		},

		//! Search
		isSearch: {
			type: Boolean,
			default: true,
		},
		searchPlaceholder: {
			type: String,
			default: 'Search...',
		},
		searchTooltip: {
			type: String,
			default: 'Search',
		},

		//! Profile detailes
		profileImg: {
			type: String,
			default: '',
		},
		profileName: {
			type: String,
			default: 'HUGO',
		},
		profileRole: {
			type: String,
		},
		isExitButton: {
			type: Boolean,
			default: true,
		},
		isLoggedIn: {
			type: Boolean,
			default: true,
		},

		//! Styles
		bgColor: {
			type: String,
			default: '#fff',
		},
		secondaryColor: {
			type: String,
			default: '#1d1b31',
		},
		homeSectionColor: {
			type: String,
			default: '#e4e9f7',
		},
		logoTitleColor: {
			type: String,
			default: '#11101d',
		},
		iconsColor: {
			type: String,
			default: '#11101d',
		},
		itemsTooltipColor: {
			type: String,
			default: '#e4e9f7',
		},
		searchInputTextColor: {
			type: String,
			default: '#11101d',
		},
		menuItemsHoverColor: {
			type: String,
			default: '#11101d',
		},
		menuItemsTextColor: {
			type: String,
			default: '#11101d',
		},
		menuFooterTextColor: {
			type: String,
			default: '#11101d',
		},
	},
	data() {
		return {
			isOpened: false,
			isHover: false,
			
			isSelectByAdmin:false
		};
	},
	mounted() {
		this.isOpened = this.isMenuOpen;

	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
		cssVars() {
			return {
				// '--padding-left-body': this.isOpened ? this.menuOpenedPaddingLeftBody : this.menuClosedPaddingLeftBody,
				'--bg-color': this.bgColor,
				'--secondary-color': this.secondaryColor,
				'--home-section-color': this.homeSectionColor,
				'--logo-title-color': this.logoTitleColor,
				'--icons-color': this.iconsColor,
				'--items-tooltip-color': this.itemsTooltipColor,
				'--serach-input-text-color': this.searchInputTextColor,
				'--menu-items-hover-color': this.menuItemsHoverColor,
				'--menu-items-text-color': this.menuItemsTextColor,
				'--menu-footer-text-color': this.menuFooterTextColor,
			};
		},
	},
	watch: {
		// isOpened() {
		// 	window.document.body.style.paddingLeft =
		// 		this.isOpened && this.isPaddingLeft
		// 			? this.menuOpenedPaddingLeftBody
		// 			: this.menuClosedPaddingLeftBody;
		// },
	},
	methods: {
		tooltipAttached() {
			const tooltips = document.querySelectorAll('.tooltip');
			tooltips.forEach((tooltip) => {
				document.body.appendChild(tooltip);
			});
			document.querySelectorAll('.tooltip').forEach((tooltip) => {
				const targetID = tooltip.dataset.target;
				const target = document.querySelector(`#${targetID}`);
				if (!target) return;
				target.addEventListener('mouseenter', () => {
					const targetPosition = target.getBoundingClientRect();
					if (this.isOpened) return;
					tooltip.style.top = `${targetPosition.top + window.scrollY}px`;
					tooltip.style.left = `${targetPosition.left + targetPosition.width + 20}px`;
					tooltip.classList.add('active');
				});
				target.addEventListener('mouseleave', () => {
					tooltip.classList.remove('active');
				});
			});



		},
		handleHover() {
			this.isHover = true;
			// this.isSelectByAdmin = true
		},
		handleOver() {
			this.isHover = false;
			// this.isSelectByAdmin = false
		},
		onClickAdmin() {
			this.isSelectByAdmin = !this.isSelectByAdmin
			console.log('isSelectByAdmin', this.isSelectByAdmin)
		},
		onMoveManageUser() {
			this.isSelectByAdmin = false
			this.isOpened = false
			this.$router.push('/manageUser')
		},
		onMoveManageProduct() {
			this.isSelectByAdmin = false
			this.isOpened = false
			this.$router.push('/manageProduct')
		}
	},
};
