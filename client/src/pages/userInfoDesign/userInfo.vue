<template>
	<!-- <div class="flex flex-col items-center px-3 my-6">
		{/* <div class="flex items-center justify-center w-1/2 h-auto mb-[-60px]">
                <label class="flex flex-col items-center justify-center w-full h-80 rounded-3xl cursor-pointer bg-gray-100 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Cập nhật ảnh bìa</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" />
                </label>
            </div> */} 
		<img
			src="@/assets/coverImage2.png"
			alt="userImage"
			width="620"
			height="620"
			class="rounded-3xl mb-[-60px] bg-current"
		/>
		<img
			:src="require(`@/uploadImage/${userInfo.image?userInfo.image:'man.png'}`)"
			alt="userImage"
			width="100"
			height="100"
			class="rounded-full w-[100px] h-[100px]"
		/>

		<h2 class="text-[30px] font-semibold">{{ userInfo.username }}</h2>
		<h2 class="text-gray-400">{{ userInfo.email }}</h2>
		<h2 class="">{{ userInfo.description }}</h2>
		<div class="flex gap-4">
			<button
				class="bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full"
			>
				Đã tạo
			</button>
			<button
				class="bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full"
			>
				Đã thích
			</button>
		</div>
	</div> -->

	<div class="container profileContainer">
		<div class="row profileHeight">
			<div class="col-md-4 center">
				<img
				:src="require(`@/uploadImage/${userInfo.image?userInfo.image:'man.png'}`)"
					class="profilePhoto rounded-circle"
					alt=""
				/>
			</div>
			<div class="col-md-8 pt-2 profile__des">
				<div class="d-flex justufy-content-center align-items-center">
					<span class="font6 prUsername">{{ userInfo.username }}</span>
					<div class="myEditButton f-bold1 crs-pointer">
						Create Design
					</div>
				</div>
				<br />
				<div class="font3 d-flex gap-4">
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
				<div class="f-bold1" style="text-align: left">
					Avant-Garde Tech Products
				</div>
				<div style="text-align: left">
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
				class="exploreContainer p-1 container"
			>
				<one-post
					:boxWidth="rowList"
					:data="item"
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
		:infoDesign = 'infoDesign'
		:type="'detail'"
		@oncloseModal="oncloseModal"
	></modalPreview>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import onePost from '@/pages/userInfoDesign/PostBase/one-post.vue';
import ImageAssetService from '@/sevices/imageAssets.service';
import modalPreview from '@/components/ModalPreview/modalPreview.vue';
const authMappper = createNamespacedHelpers('auth');
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

			infoDesign:''
		};
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
		...designMappper.mapState(['listDesign']),
	},
	async mounted() {
		console.log("userInfo:",this.userInfo);

		console.log('userInfo:', this.userInfo.id);
		await this.getListDesignByUser({
			userId: this.userInfo.id,
		});
		this.listData = this.listDesign;
	},
	methods: {
		...designMappper.mapActions(['getListDesignByUser']),
		...designMappper.mapMutations(['SET_LIST_DESIGN']),
		async onChooseOption(value) {
			switch (value) {
				case 'design': {
					this.SET_LIST_DESIGN([]);
					this.activeOption = value;
					console.log("id :",this.userInfo.id)
					const data = await this.getListDesignByUser({ userId: this.userInfo.id });

					console.log("data skjdk:",data)

					break;
				}
				case 'assets': {
					this.SET_LIST_DESIGN([]);
					this.activeOption = value;
					let imageAsset = await ImageAssetService.getAllImagAsset({
						email: this.email,
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
			console.log('infoDesign:',  infoDesign);
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
	padding-right: 100px;
}
</style>
