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
			/>

			<Menu
				as="div"
				class="absolute bottom-5 right-5 inline-block text-left"
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
							<MenuItem v-slot="{ active }">
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
									@click="deleteDesign(data.id)"
								>
									Delete
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
									>Share</a
								>
							</MenuItem>
						</div>
					</MenuItems>
				</transition>
			</Menu>
		</div>
	</div>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { createNamespacedHelpers } from 'vuex';
const authMappper = createNamespacedHelpers('auth');
const designMappper = createNamespacedHelpers('design');
const productMappper = createNamespacedHelpers('product');
export default {
	components: {
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
	},
	props: {
		data: {
			type: Object,
		},
		role: {
			type: String,
			default: 'all',
		},
	},
	data() {
		return {
			square: null,
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
		async deleteDesign(id) {
			const payload = {
				userId: this.userInfo.id,
				idDesign: id,
			};
			await this.deleteDesignByUser(payload);
			this.$toast.success('deleted success', {
				position: 'top-right',
				duration: 2000,
			});
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
	},
	created() {
		console.log('sdffdsfdsfsdfsdfsd', this.data);
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
