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

									<div class="q-pa-md">
										<form class="q-form">
											<div class="row justify-center w-full">
												<div class="col-12 col-xs-8">
													<div
														class="q-field__inner relative-position col self-stretch"
													>
														<div class="flex gap-4" tabindex="-1">
															<div class="w-full">
																<label class="font-bold">Name</label>
																<input
																	class="bg-gray-200 w-full h-[40px] rounded p-2"
																	tabindex="0"
																	aria-label="Title"
																	id="f_b5eb160d-86dd-4e0c-abb6-fc4b512981d6"
																	type="text"
																	placeholder="Name"
																	v-model="nameProduct"
																/>
															</div>
															<div class="w-full">
																<label class="font-bold"
																	>Description</label
																>
																<input
																	class="bg-gray-200 w-full h-[40px] rounded p-2"
																	tabindex="0"
																	aria-label="Title"
																	id="f_b5eb160d-86dd-4e0c-abb6-fc4b512981d6"
																	type="text"
																	placeholder="Description"
																	v-model="descriptionProduct"
																/>
															</div>
														</div>
														<div
															class="q-field__bottom row items-start q-field__bottom--animated"
														>
															<div class="q-field__messages col"></div>
															<!---->
														</div>
													</div>
												</div>
											</div>
											<div class="row justify-center mt-4">
												<!-- Image Front -->
												<div class="col-6 p-3">
													<div class="shadow-sm rounded">
														<div class="bg-white" role="listitem">
															<div
																class="q-item__section column q-item__section--main justify-center"
															>
																<div class="q-item__label p-2 border">
																	Front
																	<span class="text-red-600"
																		>(Required)</span
																	>
																</div>
															</div>
														</div>
														<div
															class="bg-gray-600 p-1"
															style="
																--q-skeleton-speed: 1500ms;
																height: 200px;
															"
														>
															<img v-if="imageProductFront" class="object-contain w-[100%] h-[100%]" :src="imageProductFront?require(`@/uploadImage/${imageProductFront}`):'#'" />
														</div>
														<div class="py-0.4 justify-center w-full">
															<input
																id="fileFront"
																ref="fileFront"
																type="file"
																accept="image/*"
																class="hidden"
																@input="uploadImageFront"
															/><label
																class="bg-sky-700 hover:bg-sky-800 text-white w-full"
																for="fileFront"
																tabindex="0"
																type="button"
																fdprocessedid="hrdxe5"
															>
																<span
																	class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
																	>Select</span
																>
															</label>
														</div>
													</div>
												</div>

												<!-- Image Back -->
												<div class="col-6 p-3">
													<div class="shadow-sm rounded">
														<div class="bg-white" role="listitem">
															<div
																class="q-item__section column q-item__section--main justify-center"
															>
																<div class="q-item__label p-2 border">
																	Back
																	<span class="text-red-600"
																		>(Required)</span
																	>
																</div>
															</div>
														</div>
														<div
															class="bg-gray-600 p-1"
															style="
																--q-skeleton-speed: 1500ms;
																height: 200px;
															"
														>
															<img v-if="imageProductBack" class="object-contain w-[100%] h-[100%]" :src="imageProductBack?require(`@/uploadImage/${imageProductBack?imageProductBack:'man.png'}`):'#'" />
														</div>
														<div class="py-0.4 justify-center w-full">
															<input
																id="fileBack"
																ref="fileBack"
																type="file"
																accept="image/*"
																class="hidden"
																@input="uploadImageBack"
															/><label
																class="bg-sky-700 hover:bg-sky-800 text-white w-full"
																for="fileBack"
																tabindex="0"
																type="button"
																fdprocessedid="hrdxe5"
															>
																<span
																	class=" text-center col items-center  justify-center row"
																	>Select</span
																>
															</label>
														</div>
													</div>
												</div>
											</div>
										</form>
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
									@click="onCreateProduct"
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
import ImageService from '@/sevices/image.service.js';
import ProductService from '@/sevices/product.service.js';
import { createNamespacedHelpers } from 'vuex';
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
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
		
	},
	data() {
		return {
			nameProduct: '',
			descriptionProduct: '',
			imageProductFront: '',
			imageProductBack:'',
			
		};
	},
	methods: {
		...productMappper.mapActions(['getAllProducts', 'getAllProductsByUser']),
		
		async uploadImageFront() {
			// let valueAwait = 0
			const fileInput = this.$refs.fileFront;
			const file = fileInput.files[0];
			let formData = new FormData();
			formData.append('file', file);
			console.log('fileInput', formData, file);
			if (!file.type.includes('image/')) {
				this.$toast.error('this is not a image', {
					position: 'top-right',
					duration: 2000,
				});
			} else {
				const upload = await ImageService.uploadImageProduct(formData);		
				console.log("Upload", upload)
				setTimeout(() => {
					this.imageProductFront = upload.data.data
				}, 1000);
			
			
			}

		},

		async uploadImageBack() {
		
			const fileInput = this.$refs.fileBack;
			const file = fileInput.files[0];
			let formData = new FormData();
			formData.append('file', file);
			console.log('fileInput', formData, file);

			if (!file.type.includes('image/')) {
				this.$toast.error('this is not a image', {
					position: 'top-right',
					duration: 2000,
				});
			}else{
				const upload = await ImageService.uploadImageProduct(formData);
			
				setTimeout(() => {
					this.imageProductBack = upload.data.data;
				}, 1000);

			}

		},

		oncloseModal() {
			this.$emit('oncloseModal');
		},

		async onCreateProduct() {
			const param = {
				name: this.nameProduct,
				description: this.descriptionProduct,
				user: this.userInfo.id,
				imageFront: this.imageProductFront,
				imageBack: this.imageProductBack,
				thumbnail:this.imageProductFront,
				
			}
			if (!this.nameProduct || !this.imageProductBack || !this.imageProductFront) {
				this.$toast.error('Please complete the required information', {
					position: 'top-right',
					duration: 2000,
				});
			} else {
				const product = await ProductService.creatNewProduct({ param })
		
				// console.log({ product })
				if (product.status == 201) {
					this.$toast.error(product.data.status, {
						position: 'top-right',
						duration: 2000,
					});
				} else {
					this.oncloseModal()
					// this.getAllProducts({ status: 'accept' });
					await this.getAllProductsByUser({
						status: 'pending',
						role: this.userInfo.role,
						userId: this.userInfo.id,
					});
					this.$toast.success('Created product success', {
						position: 'top-right',
						duration: 2000,
					});
					this.$emit("changeToPendding")
				}
				

			}
			
		}

		
	},
};
</script>
