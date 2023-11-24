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
							<div class="z-10 mt-8 flex">
								<div
									class="flex-auto w-[780px] overflow-hidden bg-white text-sm leading-6 p-4"
								>
									<!-- form viet o day -->
									<div class="row space-x-8 space-x-reverse flex">
										<div class="col-6">
											<label
												for="exampleFormControlInput1"
												class="form-label"
												>Product name</label
											>
											<input
												type="text"
												v-model="productName"
												class="form-control"
												id="exampleFormControlInput1"
												placeholder="name@example.com"
											/>
										</div>
										<div class="mb-3 col-5">
											<label
												for="exampleFormControlInput1"
												class="form-label"
												>User</label
											>
											<input
												v-model="username"
												type="text"
												class="form-control"
												id="exampleFormControlInput1"
												placeholder="username"
												disabled
											/>
										</div>
									</div>
									<div class="row space-x-8 space-x-reverse flex">
										<div class="col-11">
											<label
												for="exampleFormControlInput1"
												class="form-label"
												>Description</label
											>
											<input
												v-model="description"
												type="text"
												class="form-control"
												id="exampleFormControlInput1"
												placeholder="Description"
											
											/>
										</div>
									</div>
								</div>
							</div>
							<div
								class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
							>
								<button
									type="button"
									class="mt-3 mx-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
									@click="oncloseModal"
									ref="cancelButtonRef"
								>
									Cancel
								</button>
								<button
									type="button"
									class="mt-3 bg-yellow-300 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
									@click="onUpdateProduct"
									ref="cancelButtonRef"
								>
									Update
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
// import UserService from '@/sevices/user.service.js';
import ProductService from '@/sevices/product.service.js';
const authMappper = createNamespacedHelpers('auth');
const productMappper = createNamespacedHelpers('product');
import { createNamespacedHelpers } from 'vuex';
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
		productInfos: {
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
	data() {
		return {
			productName: '',
			description: '',
			username: '',
			roles: '',
		};
	},

	mounted() {
		console.log("userInfo.role",this.userInfo)
	},
	computed: {
		...authMappper.mapState(['productName', 'userInfo']),
	},
	methods: {
		...authMappper.mapMutations(['SET_USER_INFO']),
		...authMappper.mapActions(['getAllListUser']),
		...productMappper.mapActions(['getAllProducts']),
		oncloseModal() {
			this.$emit('oncloseModal');
		},
		async onUpdateProduct() {

			console.log("infomation product:", this.productInfos)

			const param = {
				id: this.productInfos.id,
				productName: this.productName,
				description: this.description,
				status: this.productInfos.status,

			};
			console.log('param:', param)

			try {
				const updatedata = await ProductService.updateProduct({ param });
				console.log("updatedata:", updatedata)
				this.$toast.success('update infomation product success', {
					position: 'top-right',
					duration: 2000,
				});
				await this.getAllProducts({status:'accept'})
				this.oncloseModal()
			} catch (error) {
					this.$toast.error('update infomation product faile', {
					position: 'top-right',
					duration: 2000,
				});
			}
		
		},
	},
	watch: {
		showModal() {
			this.productName = this.productInfos.name;
			this.description = this.productInfos.description;
			this.username = this.productInfos.user.username;
			this.roles = this.productInfos.role;
		},
	},
};
</script>
