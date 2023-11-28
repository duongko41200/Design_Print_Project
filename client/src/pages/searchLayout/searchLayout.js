import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import logoUser from '@/components/logoUser/logoUser.vue';
import modalPreview from '@/components/ModalPreview/modalPreview.vue';
import UserService from '@/sevices/user.service';
import DesignService from '@/sevices/design.service';
import { createNamespacedHelpers } from 'vuex';
const designMappper = createNamespacedHelpers('design');
const productMappper = createNamespacedHelpers('product');
const authMappper = createNamespacedHelpers('auth');
export default {
	components: {
		logoUser,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		ChevronDownIcon,
		modalPreview,
	},
	data() {
		return {
			infoDesign: '',
			isShowPreview: false,
			valueSearch: '',
			valueCataloge: 'All',
			idCataloge: '',
			typePreview: '',

			isSearchDesign: true,
		};
	},
	async mounted() {
		await this.getAllDesign(this.userInfo);
		console.log("allDesign dssdfdsff",this.allDesign)
	},
	computed: {
		...designMappper.mapState(['allDesign']),
		...productMappper.mapState(['cataloge']),
		...authMappper.mapState(['email', 'userInfo','allListUser']),
	},
	methods: {
		...designMappper.mapActions([
			'getAllDesign',
			'searchDesign',
			'filterCataloge',
			'handleFavoriteList',
		]),
		...productMappper.mapActions(['handleCataloge']),
		...authMappper.mapMutations(['SET_USER_INFO']),
		...authMappper.mapActions(['getAllListUser','filterListUser']),
		onCreateDesign() {
			this.$emit('onCreateDesign');
		},
		onPreviweDesign(infoDesign) {
			console.log('infoDesign:', infoDesign);
			this.typePreview = 'detail';
			this.infoDesign = infoDesign;
			this.isShowPreview = true;
		},
		onDownload(infoDesign) {
			this.typePreview = 'preview';
			this.infoDesign = infoDesign;
			this.isShowPreview = true;
		},
		oncloseModal() {
			this.isShowPreview = false;
		},
		onClickCataloge(id, name) {
			this.valueCataloge = name;
			this.idCataloge = id;
			console.log('Cataloge:', id, name);
			this.handleCataloge({ id, name });
			this.filterCataloge({ id, name });
		},
		onSearchDesign() {
			if (this.isSearchDesign === true) {
				this.searchDesign({
					content: this.valueSearch,
					valueCataloge: this.valueCataloge,
					idCataloge: this.idCataloge,
				});
			} else {
				this.filterListUser({
					searchKeyword: this.valueSearch
				})
			}

			this.valueSearch = '';
		},
		onMoveUserDesign(design) {
	
			if (this.userInfo.id !== design.user.id) {
				this.$router.push(`/user/${design.user.id}`);
			} else {
				this.$router.push(`/userInfo`);
			}
		},
		onMoveUserAccount(user) {
	
			if (this.userInfo.id !== user.id) {
				this.$router.push(`/user/${user.id}`);
			} else {
				this.$router.push(`/userInfo`);
			}
		},


		async creatFavoriteDesign(design) {
			console.log('design :', design);
			let userInfoUpdate = '';
			if (design.isLike === true) {
				console.log('design dsfsdf :', design);

				const favoriteDesign = await UserService.deleteFavoriteDesign({
					userId: this.userInfo.id,
					designId: design.id,
				});
				await DesignService.unLikeDesign({
					idDesign: design.id,
					idUser: this.userInfo.id,
				});
				userInfoUpdate = favoriteDesign;
				this.handleFavoriteList({
					designId: design.id,
					type: 'delete',
				});
			} else {
				const favoriteDesign = await UserService.creatFavoriteDesign({
					userId: this.userInfo.id,
					designId: design.id,
				});
				await DesignService.likeDesign({
					idDesign: design.id,
					idUser: this.userInfo.id,
				});
				userInfoUpdate = favoriteDesign;
				this.handleFavoriteList({
					designId: design.id,
					type: 'create',
				});
			}

			this.SET_USER_INFO(userInfoUpdate.data?.data);
			localStorage.setItem('tokens', userInfoUpdate.data.token);
			console.log('like :', userInfoUpdate);
		},


		async changeTypeSearch() {
			this.isSearchDesign = !this.isSearchDesign;
			if (this.isSearchDesign === true) {
				await this.getAllDesign(this.userInfo);
			} else {
				await this.getAllListUser()
				console.log('all list user', this.allListUser);
			}
		}
	},
};
