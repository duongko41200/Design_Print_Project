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
						<span class="f-bold1">100</span>
						<span> Design</span>
					</div>
					<div>
						<span class="f-bold1">100</span>
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
			<div class="myButtonProfile center f-bold1 font1 cursor-pointer">
				Likes
			</div>
		</div>

		<div class="w-full h-[100px] relative bg-gray-700 block p-2">
			<div
				class="w-[100%] h-[100%] flex justify-start space-x-5 items-center"
			>
				<div class="">
					<label
						id="listbox-label"
						class="block text-sm font-medium leading-6 text-slate-200 text-left"
						>Assigned to</label
					>
					<div class="mt-2">
						<input
							id="main-search"
							autocomplete="off"
							class="bg-zinc-700 border flex-1 pl-10 pr-12 rounded-full text-sm px-10 py-2.5 text-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-700"
							placeholder="Search for an image"
							v-model="valueSearch"
							fdprocessedid="d00fvp"
						/>
					</div>
				</div>

				<div class="">
					<label
						id="listbox-label"
						class="block text-sm font-medium leading-6 text-slate-200 text-left"
						>Date</label
					>
					<div class="mt-2">
						<!-- <input
							id="main-search"
							autocomplete="off"
							class="bg-zinc-700 border flex-1 pl-10 pr-12 rounded-xl text-sm px-10 py-2.5 text-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-700"
							placeholder="Search for an image"
							v-model="valueSearch"
							fdprocessedid="d00fvp"
						/> -->
						<VueDatePicker
							v-model="date"
							range
							:dark = "true"
							class="bg-black"
							:multi-calendars="{ static: false }"
						/>
					</div>
				</div>

				<div class="">
					<label
						id="listbox-label"
						class="block text-sm font-medium leading-6 text-slate-200 text-left"
						>product</label
					>
					<div class="mt-2">
						<select
							id="currency"
							name="currency"
							class="bg-zinc-700 border flex-1 pl-4 rounded-xl text-sm px-12 py-2.5 text-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-700"
						>
							<option>USD</option>
							<option>CAD</option>
							<option>EUR</option>
						</select>
					</div>
				</div>
				<div class="">
					<label
						id="listbox-label"
						class="block text-sm font-medium leading-6 text-slate-200 text-left"
						>Trang thai</label
					>
					<div class="mt-2">
						<div class="mt-2">
							<select
								id="currency"
								name="currency"
								class="bg-zinc-700 border flex-1 pl-4 rounded-xl text-sm px-12 py-2.5 text-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-700"
							>
								<option>All</option>
								<option>Public</option>
								<option>Private</option>
							</select>
						</div>
					</div>
				</div>
				<div class="">
					<label
						id="listbox-label"
						class="block text-sm font-medium leading-6 text-slate-200 text-left"
						>Yeu thich</label
					>
					<div class="mt-2">
						<div
							class="bg-zinc-700 pl-4 border rounded-xl text-sm py-2 px-8 flex items-center text-slate-50"
						>
							<input
								id="main-search"
								autocomplete="off"
								type="range"
								class="w-[100%]"
								placeholder="Search for an image"
								v-model="valueSearch"
								fdprocessedid="d00fvp"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div
				:style="
					this.$store.state.screenWidth > 730 ? 'gap:28px' : 'gap:10px'
				"
				class="exploreContainer p-1"
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
		:infoDesign="infoDesign"
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

			infoDesign: '',
			date:''
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
		});
	},
	methods: {
		...designMappper.mapActions(['getListDesignByUser']),
		...designMappper.mapMutations(['SET_LIST_DESIGN']),
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



.dp__theme_dark {
    --dp-background-color: rgb(63 63 70) !important;
    --dp-text-color: #fff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #fff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #005cb2;
    --dp-primary-disabled-color: #61a8ea;
    --dp-primary-text-color: #fff;
    --dp-secondary-color: #a9a9a9;
    --dp-border-color: #f4f1f1 !important;
    --dp-menu-border-color: #2d2d2d;
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #737373;
    --dp-disabled-color-text: #d0d0d0;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #fff !important;
    --dp-danger-color: #e53935;
    --dp-marker-color: #e53935;
    --dp-tooltip-color: #3e3e3e;
    --dp-highlight-color: rgb(0 92 178 / 20%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
    --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>
