<template>
	<div class="profileContainer pt-[127px] bg-zinc-800 text-slate-50">
		<div
			class="flex gap-10 justify-center items-center rounded-full profileHeight md:h-[200px]"
		>
			<div class="center">
				<img
					:src="
						require(`@/uploadImage/${
							userInfo.image ? userInfo.image : 'man.png'
						}`)
					"
					class="profilePhoto rounded-circle"
					alt=""
				/>
			</div>
			<div
				class="pt-2 profile__des bg-zinc-700 md:h-[200px] md:w-[500px] rounded-2xl flex flex-col justify-center items-center"
			>
				<div
					class="w-[100%] d-flex justufy-content-start align-items-center"
				>
					<span class="font6 prUsername">{{ userInfo.username }}</span>
					<div class="myEditButton f-bold1 crs-pointer">
						Create Design
					</div>
				</div>
				<br />
				<div
					class="justufy-content-start w-[100%] align-items-center d-flex gap-4"
				>
					<div>
						<span class="f-bold1">{{
							statisticalByDesign.sumDesign
						}}</span>
						<span> Design</span>
					</div>
					<div>
						<span class="f-bold1">{{
							statisticalByDesign.sumLike
						}}</span>
						<span> Likes</span>
					</div>
					<!-- <div>
						<span class="f-bold1">20</span>
						<span> follows</span>
					</div> -->
				</div>
				<br />
				<div class="f-bold1 w-[100%]" style="text-align: left">
					Avant-Garde Tech Products
				</div>
				<div
					style="text-align: left"
					class="w-[100%] text-slate-100 mt-1"
				>
					{{ userInfo.description }}
				</div>
			</div>
		</div>
		<br /><br />
		<hr class="p-0 m-0" />
		<div style="height: 53px; gap: 60px" class="center">
			<div
				class="myButtonProfile center f-bold1 font1 cursor-pointer"
				:class="activeOption === 'design' ? 'text-sky-400' : ''"
				@click="onChooseOption('design')"
			>
				Design
			</div>
			<div
				class="myButtonProfile center f-bold1 font1 cursor-pointer"
				@click="onChooseOption('assets')"
				:class="activeOption === 'assets' ? 'text-sky-400' : ''"
			>
				Assets
			</div>
			<div
				class="myButtonProfile center f-bold1 font1 cursor-pointer"
				@click="onChooseOption('favorite')"
				:class="activeOption === 'favorite' ? 'text-sky-400' : ''"
			>
				Favorite
			</div>
		</div>

		<baseFilter :typeCatolog="activeOption"></baseFilter>
		<div>
			<div
				:style="
					this.$store.state.screenWidth > 730 ? 'gap:28px' : 'gap:10px'
				"
				class="exploreContainer p-1"
			>
				<one-post
					v-for="(item, idx) in listDesign"
					:key="idx"
					:boxWidth="rowList"
					:data="item"
					:typeCatolog="activeOption"
					class="border"
					@onClickImage="onPreviweDesign(item)"
					@CreateFavoriteDesign="creatFavoriteDesign"
					@deleteDesign="deleteDesign"
					@onDownload ="onDownload"
				></one-post>
			</div>
		</div>
	</div>
	<modalPreview
		:showModal="isShowPreview"
		:infoDesign="infoDesign"
		:type="typePreview"
		@oncloseModal="oncloseModal"
		@CreateFavoriteDesign="creatFavoriteDesign"
	></modalPreview>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import onePost from '@/pages/userInfoDesign/PostBase/one-post.vue';
import ImageAssetService from '@/sevices/imageAssets.service';
import DesignService from '@/sevices/design.service';
import modalPreview from '@/components/ModalPreview/modalPreview.vue';
import baseFilter from '@/components/BaseFilter/baseFilter.vue';
import UserService from '@/sevices/user.service';
const authMappper = createNamespacedHelpers('auth');
const designMappper = createNamespacedHelpers('design');
export default {
	components: {
		onePost,
		modalPreview,
		baseFilter,
	},
	data() {
		return {
			isPopoverOpen: false,
			activeOption: 'design',
			isShowPreview: false,

			infoDesign: '',
			statisticalByDesign: '',
			typePreview: '',

			isUnLike: false,
		};
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
		...designMappper.mapState(['listDesign']),
	},
	async mounted() {
		const startDate = new Date();
		const endDate = new Date(
			new Date().setDate(startDate.getDate() + 7)
		);
		this.date = [startDate, endDate];
		await this.getListDesignByUser({
			userId: this.userInfo.id,
			isPublic: 'all',
			favoriteDesign: this.userInfo.favoriteDesign,
		});

		const statistical = await DesignService.statisticalInfoByDesign({
			idUser: this.userInfo.id,
		});

		this.statisticalByDesign = statistical.data.data;
	},
	methods: {
		...designMappper.mapActions([
			'getListDesignByUser',
			'getFavoriteDesign',
			'handleFavoriteList',
			'getAllDesign',
			'deleteDesignByUser'
		]),
		...designMappper.mapMutations(['SET_LIST_DESIGN']),
		...authMappper.mapMutations(['SET_USER_INFO']),
		async onChooseOption(value) {
			switch (value) {
				case 'design': {
					this.SET_LIST_DESIGN([]);
					this.activeOption = value;
					console.log('id :', this.userInfo.id);
					try {
						await this.getListDesignByUser({
							userId: this.userInfo.id,
							isPublic: 'all',
							favoriteDesign: this.userInfo.favoriteDesign,
						});
					} catch (error) {
						console.log('error :', error);
					}

					break;
				}
				case 'assets': {
					this.SET_LIST_DESIGN([]);
					this.activeOption = value;
					let imageAsset = await ImageAssetService.getAllImagAsset({
						userId: this.userInfo.id,
					});
					console.log('imageAsset:', imageAsset);
					this.SET_LIST_DESIGN(imageAsset.data.data);
					break;
				}
				case 'favorite': {
					this.SET_LIST_DESIGN([]);
					this.activeOption = value;

					console.log('userinfo:', this.userInfo);

					const favoriteDesign = this.userInfo.favoriteDesign;
					console.log(
						'this.userInfo.favoriteDesign',
						this.userInfo.favoriteDesign
					);
					this.getFavoriteDesign(favoriteDesign);
					// await this.getAllDesign(this.userInfo);
					break;
				}

				default:
					break;
			}
		},
		onPreviweDesign(infoDesign) {
			console.log('infoDesign:', infoDesign);
			this.infoDesign = infoDesign;
			this.isShowPreview = true;
			this.typePreview = 'detail';
		},
		oncloseModal() {
			this.isShowPreview = false;
		},

		async deleteDesign(id) {
			const payload = {
				userId: this.userInfo.id,
				idDesign: id,
			};
			await this.deleteDesignByUser(payload);
			const statistical = await DesignService.statisticalInfoByDesign({
				idUser: this.userInfo.id,
			});

			this.statisticalByDesign = statistical.data.data;
			this.$toast.success('deleted success', {
				position: 'top-right',
				duration: 2000,
			});
		},
		onDownload(infoDesign) {
			this.typePreview = 'preview';
			this.infoDesign = infoDesign;
			this.isShowPreview = true;
		},

		async creatFavoriteDesign(design) {
			console.log('design :', design);
			let userInfoUpdate = '';
			if (design.isLike === true) {
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
				this.isUnLike = true;
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
				this.isUnLike = false;
			}
			const statistical = await DesignService.statisticalInfoByDesign({
				idUser: this.userInfo.id,
			});

			this.statisticalByDesign = statistical.data.data;
			this.SET_USER_INFO(userInfoUpdate.data?.data);
			localStorage.setItem('tokens', userInfoUpdate.data.token);

			if (this.isUnLike === true && this.activeOption === 'favorite') {
				this.getFavoriteDesign(this.userInfo.favoriteDesign);
				this.oncloseModal();
			}
			console.log('like :', userInfoUpdate);
		},
	},
};
</script>
<style>
/* @media screen and (min-width: 1200px) {
	.container {
		width: 935px;
	}
} */
.myButtonProfile {
	border-top: 1px solid black;
	height: 100%;
	padding: 0px 10px;
}
.profilePhoto {
	height: 150px;
}
.exploreContainer {
	padding: 0px;
	display: flex;
	flex-wrap: wrap;
}
.prUsername {
	font-weight: 300;
}
.myEditButton {
	font-size: 14px;
	width: 110px;
	height: 30px;
	display: inline-block;
	margin-left: 30px;
	margin-top: 0px;
	border: 1px solid #dbdbdb;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.profileContainer {
	min-height: 100vh;
	max-height: 100vh;
	overflow: auto;
	height: 100%;
}
.profile__des {
	padding: 10px;
	padding-left: 100px;
	min-height: 200px;
	height: fit-content;
	/* width: 500px; */
}
</style>
