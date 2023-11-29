<template>
	<div
		ref="square"
		@click="test"
		:style="square"
		class="cursor-pointer post center transition-opacity inset-0 bg-zinc-600 bg-opacity-20"
		style="
			background: linear-gradient(
				to top,
				rgba(0, 0, 0, 0.8) 0%,
				rgba(0, 0, 0, 0) 60%,
				rgba(0, 0, 0, 0) 100%
			);
		"
	>
		<img
			:src="
				data.thumbnailFront
					? data.thumbnailFront
					: require(`@/uploadImage/${data.image}`)
			"
			class="w-100 h-100 post-img z-10"
			alt=""
		/>
		<div class="post-hover w-100 h-100 z-10 center gap-3 text-white">
			<!-- <div class="center">
				<icon-vue name="like" vuestyle="fill:white;"></icon-vue
				>{{ data.likeCount }}
			</div>
			<div class="center">
				<icon-vue name="comment" vuestyle="fill:white;"></icon-vue
				>{{ data.commentCount }}
			</div> -->

			<div
				class="absolute bg-red w-full h-full inset-0"
				@click="onClickImage"
			></div>

			<!-- <div
				class="absolute z-9 top-2 left-2 bg-zinc-900 bg-opacity-30 hover:bg-opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded text-lg h-8 w-8"
			>
				<icon icon="fa-solid fa-magnifying-glass" style="color: #fff" />
			</div> -->
			<div class="flex flex-col space-y-2 absolute top-2 z- 10 right-2">
				<div
					class="bg-zinc-900 bg-opacity-30 hover:bg-opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded text-lg h-8 w-8"
					@click="creatFavoriteDesign()"
				>
					<icon
						icon="fa-solid fa-heart"
						:class="data.isLike === true ? 'text-rose-600' : ''"
					/>
				</div>
				<div
					class="bg-zinc-900 z-10 bg-opacity-30 hover:bg-opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded text-lg h-8 w-8"
					@click="onDownload(data)"
				>
					<icon icon="fa-solid fa-download" style="color: #fff" />
				</div>
			</div>

			<div
				class="absolute bottom-8 left-2 mx-0.5 overflow-hidden z-0 fit-w text-start z-10 font-bold text-base text-white capitalize"
			>
				{{ data.name }}
			</div>
			<div
				class="absolute bottom-2 left-2 mx-0.5 z-0 text-start fit-w z-10 font-bold text-gray"
				@click="onMoveUserDesign(data)"
			>
				by
				<span class="hover:text-blue-500 hover:underline"
					>{{ data.user.username }}
				</span>
			</div>

			<Menu
				as="div"
				class="absolute bottom-5 right-5 inline-block text-left"
				v-if="typeCatolog != 'favorite'"
			>
				<div v-if="role != 'view'">
					<MenuButton
						class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 transition-opacity z-20 inset-0 bg-zinc-600 bg-opacity-20"
					>
						<icon icon="fa-solid fa-ellipsis-vertical" />
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
						class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					>
						<div class="py-1">
							<MenuItem
								v-slot="{ active }"
								v-if="typeCatolog != 'assets'"
							>
								<div
									:class="[
										active
											? 'bg-gray-100 text-gray-900'
											: 'text-gray-700',
										'block px-4 py-2 text-sm',
									]"
									@click="editDesign(data.id)"
								>
									Edit
								</div>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<div
									:class="[
										active
											? 'bg-gray-100 text-gray-900'
											: 'text-gray-700',
										'block px-4 py-2 text-sm',
									]"
									@click="deleteDesign(data)"
								>
									Delete
								</div>
							</MenuItem>
							<MenuItem
								v-slot="{ active }"
								v-if="typeCatolog != 'assets'"
							>
								<div
									href="#"
									:class="[
										active
											? 'bg-gray-100 text-gray-900'
											: 'text-gray-700',
										'block px-4 py-2 text-sm',
									]"

									@click="showModalShare(data)"
									>Share</div
								>
							</MenuItem>
						</div>
					</MenuItems>
				</transition>
			</Menu>
		</div>
	</div>
	<modalShare
		:showModal="isShowModalShare"
		:infoDesign="data"
		:type="typePreview"

		@oncloseModal="oncloseModal"

	></modalShare>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { createNamespacedHelpers } from 'vuex';
import modalShare from '@/components/ModalShare/modalShare.vue';
const authMappper = createNamespacedHelpers('auth');
const designMappper = createNamespacedHelpers('design');
const productMappper = createNamespacedHelpers('product');
export default {
	components: {
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		modalShare,
	},
	props: {
		data: {
			type: Object,
		},
		role: {
			type: String,
			default: 'all',
		},
		typeCatolog: {
			type: String,
			default: 'design',
		},

	},
	data() {
		return {
			square: null,

			isShowModalShare:false
		};
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
	},
	methods: {
		...designMappper.mapActions(['deleteDesignByUser', 'findDesign']),
		...productMappper.mapMutations(['SET_PRODUCT_MODEL']),
		test() {
			console.log('height:' + this.$refs.square.clientWidth + 'px');
		},
		async deleteDesign(design) {
			this.$emit('deleteDesign', design);
		},
		async editDesign(id) {
			const payload = {
				idDesign: id,
			};
			await this.findDesign(payload);
			this.$router.push('/design');
			this.SET_PRODUCT_MODEL(null);
		},
		onClickImage() {
			this.$emit('onClickImage');
		},
		onDownload(infoDesign) {
			this.$emit('onDownload', infoDesign);
		},
		onMoveUserDesign(design) {
			if (this.userInfo.id !== design.user.id) {
				this.$router.push(`/user/${design.user.id}`);
			} else {
				this.$router.push(`/userInfo`);
			}
		},
		creatFavoriteDesign() {
			this.$emit('CreateFavoriteDesign', this.data);
		},

		showModalShare(data) {
			console.log("data:", data)
			this.isShowModalShare = true
		},
		oncloseModal() {
			this.isShowModalShare = false
		}
	},
	created() {
		setInterval(() => {
			try {
				this.square = 'height:' + this.$refs.square.clientWidth + 'px';
			} catch (error) {
				error;
			}
		}, 300);
	},
};
</script>

<style scoped>
.post {
	position: relative;
	flex: 0 0 24%;
	margin: 0px;
}
.post-hover {
	background: linear-gradient(
		to top,
		rgba(0, 0, 0, 0.8) 0%,
		rgba(0, 0, 0, 0) 60%,
		rgba(0, 0, 0, 0) 70%
	);
	position: absolute;
	transition: 0.3s;
	opacity: 0%;
}

.post-hover:hover {
	opacity: 100%;
}
.post-img {
	object-fit: cover;
}
</style>
