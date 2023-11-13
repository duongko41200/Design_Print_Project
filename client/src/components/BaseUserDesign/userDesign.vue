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
					<!-- <div class="myEditButton f-bold1 crs-pointer">
						Create Design
					</div> -->
				</div>
				<br />
				<div
					class="justufy-content-start w-[100%] align-items-center d-flex gap-4"
				>
					<div>
						<span class="f-bold1">100</span>
						<span> Design</span>
					</div>
					<div>
						<span class="f-bold1">100</span>
						<span> Likes</span>
					</div>
					<div>
						<span class="f-bold1">20</span>
						<span> follows</span>
					</div>
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
			<div class="myButtonProfile center f-bold1 font1 cursor-pointer">
				Likes
			</div>
		</div>
		<div>
			<div
				:style="
					this.$store.state.screenWidth > 730 ? 'gap:28px' : 'gap:2px'
				"
				class="exploreContainer p-1"
			>
				<one-post
					:boxWidth="rowList"
					:data="item"
					:role="'view'"
					v-for="(item, idx) in listDesign"
					:key="idx"
					class="border"
					@onClickImage="onPreviweDesign(item)"
				></one-post>
			</div>
		</div>
	</div>
	<modalPreview
		:showModal="isShowPreview"
		:infoDesign="infoDesign"
		:type="'detail'"
		@oncloseModal="oncloseModal"
	></modalPreview>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import onePost from '@/pages/userInfoDesign/PostBase/one-post.vue';
import ImageAssetService from '@/sevices/imageAssets.service';
import UserService from '@/sevices/user.service';
import modalPreview from '@/components/ModalPreview/modalPreview.vue';
const designMappper = createNamespacedHelpers('design');
export default {
	components: {
		onePost,
		modalPreview,
	},
	data() {
		return {
			isPopoverOpen: false,
			activeOption: 'design',
			isShowPreview: false,

			infoDesign: '',
			userInfo: '',
		};
	},
	computed: {
		...designMappper.mapState(['listDesign']),
	},

	async mounted() {
		await this.getListDesignByUser({
			userId: this.$route.params.userId,
			isPublic: 'public',
		});
		const user = await UserService.findByUser({
			userId: this.$route.params.userId,
		});
		this.userInfo = user.data.data[0];

		console.log({ user });
	},
	methods: {
		...designMappper.mapActions(['getListDesignByUser']),
		...designMappper.mapMutations(['SET_LIST_DESIGN']),
		async onChooseOption(value) {
			switch (value) {
				case 'design': {
					this.SET_LIST_DESIGN([]);
					this.activeOption = value;
					try {
						await this.getListDesignByUser({
							userId: this.$route.params.userId,
							isPublic: 'public',
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
						userId: this.$route.params.userId,
					});
					console.log('imageAsset:', imageAsset);
					this.SET_LIST_DESIGN(imageAsset.data.data);

					console.log('this.listData:', this.listData);
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
		},
		oncloseModal() {
			this.isShowPreview = false;
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
	justify-content: space-between;
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
