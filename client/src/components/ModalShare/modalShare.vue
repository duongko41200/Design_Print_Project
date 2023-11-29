<template>
	<TransitionRoot as="template" :show="showModal">
		<Dialog as="div" class="relative z-10" @click="oncloseModal">
			<TransitionChild
				as="template"
				enter="ease-out duration-300"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="ease-in duration-200"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div
					class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				/>
			</TransitionChild>

			<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div
					class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
				>
					<TransitionChild
						as="template"
						enter="ease-out duration-300"
						enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enter-to="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leave-from="opacity-100 translate-y-0 sm:scale-100"
						leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<DialogPanel
							class="relative transform overflow-hidden bg-sky-700 text-left rounded shadow-lg transition-all sm:my-8 sm:max-w-xlg"
						>
							<div class="flex w-full justify-center items-center">
								<div class="text-white font-bold text-2xl">
									Share Design
								</div>
							</div>
							<div class="z-10 flex">
								<div
									class="flex-auto w-[580px] overflow-hidden bg-white text-sm leading-6 p-4"
								>
									<!-- form viet o day -->
									<div class="flex justify-between">
										<div class="text-lg">Receive user name</div>
										<div class="relative">
											<input
												class="bg-gray-100 border flex-1 pl-10 pr-10 rounded-xl z-10 text-sm w-[200px] py-2"
												placeholder="Receive user name"
												v-model="valueKey"
												@input="onSearchUser"
											/>
											<div
												class="bg-gray-200 w-full max-h-[170px] overflow-auto absolute p-2"
												v-if="valueKey"
											>
												<div
													v-for="(user, idx) in allListUser.data"
													:key="idx"
													class="w-full h-[20px] cursor-pointer hover:bg-gray-300"
												>
													<div @click="addUserToListShare(user)">
														{{ user.username }}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div>
										<div class="text-lg">Receive user list</div>
										<div class="w-full flex justify-center">
											<div
												class="h-[200px] w-[70%] px-2  max-h-[170px] overflow-auto"
											>

											<div v-if="listReceiveShare.length > 0">
												<div
													class="flex justify-between items-center p-2 border-b-2 mt-2 border-b-black"
													v-for="(user, idx) in listReceiveShare"
													:key="idx"
												>
													<icon
														icon="fa-solid fa-user"
														class="w-[20px] h-[20px]"
													/>
													<div class="shareModal__contentRow--caption text-lg">
														{{ user.username }}
													</div>
													<icon
														icon="fa-solid fa-circle-xmark"
														class="w-[20px] h-[20px] cursor-pointer"
														@click="removeUserShare(user)"
													/>
												</div>

											</div>
											<div v-else class="flex justify-center items-center w-full h-full"> 

												<div class="text-lg text-gray-400">Receive user not found</div>
											</div>
								
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse flex justify-center sm:px-6"
							>
								<button
									type="button"
									class="mt-3 mx-2 inline-flex justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-700 sm:mt-0 text-white w-[180px]"
									@click="oncloseModal"
									ref="cancelButtonRef"
								>
									Cancel
								</button>
								<button
									type="button"
									class="mt-3 bg-green-600 inline-flex  justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-700 sm:mt-0 text-white w-[180px]"
									ref="cancelButtonRef"
									@click="handleShareDesign"
								>
									Share Design
								</button>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
<script>
import {
	Dialog,
	DialogPanel,
	TransitionChild,
	TransitionRoot,
} from '@headlessui/vue';
// import ImageService from '@/sevices/image.service.js';
// import ProductService from '@/sevices/product.service.js';
import { createNamespacedHelpers } from 'vuex';
import { socket } from "@/Contant/socket"
const authMappper = createNamespacedHelpers('auth');
const productMappper = createNamespacedHelpers('product');
export default {
	components: {
		Dialog,
		DialogPanel,

		TransitionChild,
		TransitionRoot,
	},
	props: {
		showModal: {
			type: Boolean,
			default: false,
		},
		infoDesign: {
			type: Object,
		},
		imageType: {
			type: String,
			default: 'front',
		},
		modalType: {
			type: String,
			default: 'product',
		},
	},
	computed: {
		...authMappper.mapState([
			'email',
			'userInfo',
			'allListUser',
			'listReceiveShare',
		]),
	},
	data() {
		return {
			nameProduct: '',
			descriptionProduct: '',
			imageProductFront: '',
			imageProductBack: '',

			valueKey: '',
		};
	},
	mounted() {
		this.getAllListUser();
	},
	methods: {
		...productMappper.mapActions([
			'getAllProducts',
			'getAllProductsByUser',
		]),
		...authMappper.mapActions([
			'filterListUser',
			'getAllListUser',
			'addUserShare',
			'deleteUserShare',
			'createNotificaShare'
		]),

		oncloseModal() {
			this.$emit('oncloseModal');
			this.valueKey = '';
		},
		onSearchUser() {
			console.log('duong dep trai', this.allListUser);
			this.filterListUser({
				searchKeyword: this.valueKey,
			});
		},
		addUserToListShare(user) {
			this.addUserShare(user);
		},
		removeUserShare(user) {
			this.deleteUserShare(user);
		},
		async handleShareDesign() {

			console.log("design share;", this.infoDesign)

			const param = {
				design: this.infoDesign.id,
				user_request: this.userInfo.id,
				user_recive: this.listReceiveShare[0].id,
				type: "share",
				message:' đã chia sẻ cho bạn'

			}
			console.log("param:", param)

			console.log("listReceiveShare", this.listReceiveShare)
			await this.createNotificaShare(param)
			socket.emit('notification', this.listReceiveShare[0].id);
	
		}
	},
};
</script>
