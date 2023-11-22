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
									class="flex-auto w-[780px] overflow-hidden bg-white text-sm leading-6"
								>
									<div class="p-4" v-if="modalType === 'product'">
										<div
											v-for="(product, idx) in products"
											:key="idx"
											class="group relative cursor-pointer flex gap-x-6 p-4 hover:bg-gray-50"
											@click="onDesignProduct(product)"
										>
											<div
												class="mt-1 relative flex h-11 w-11 flex-none items-center justify-center bg-gray-50 group-hover:bg-white"
											>
												<img
													v-if="imageType === 'front'"
													:src="
														require(`@/uploadImage/${
															product.thumbnail
																? product.imageFront
																: 'man.png'
														}`)
													"
													class="absolute z-10"
												/>
												<img
													:src="
														require(`@/uploadImage/${
															product.thumbnail
																? product.imageBack
																: 'man.png'
														}`)
													"
													class="absolute"
												/>
											</div>
											<div>
												<div class="font-semibold text-gray-900">
													{{ product.name }}
													<span class="absolute inset-0" />
												</div>
												<p class="mt-1 text-gray-600">
													{{ product.description }}
												</p>
											</div>
										</div>
									</div>

									<div class="p-4 max-h-[400px] overflow-auto"  v-if="modalType === 'manageUser'">
										<table class="table table-striped table-hover">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">Image</th>
													<th scope="col">Infomation Design</th>
													
												
													<th scope="col">Like</th>

													<th scope="col">Status Public</th>
												</tr>
											</thead>
											<tbody>
												<tr
													v-for="(product, idx) in products"
													:key="idx"
												>
													<th scope="row">{{ idx + 1 }}</th>
													<td>
														<div class="center">
															<img
																:src="
																	product.thumbnailFront
																		? product.thumbnailFront
																		: 'man.png'
																"
																class=" w-[50px] h-[40px]"
																alt=""
															/>
														</div>
													</td>
													<td>
														<div>
															<div class="font-semibold text-gray-900">
																{{ product.name }}
																
															</div>
															<p class="mt-1 text-gray-600">
																{{ product.description }}
															</p>
														</div>
													</td>
													<td>{{ product.numberLike }}</td>

													<td>{{ product.isPublic }}</td>

										
												</tr>
											</tbody>
										</table>

									</div>
								</div>
							</div>
							<div
								class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
							>
								<button
									type="button"
									class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
									@click="oncloseModal"
									ref="cancelButtonRef"
								>
									Cancel
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
		products: {
			type: Array,
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
		return {};
	},
	mounted() {
		console.log('product ', this.products);
	},
	methods: {
		oncloseModal() {
			this.$emit('oncloseModal');
		},

		onDesignProduct(product) {
			this.$emit('onDesignProduct', product);
		},
	},
};
</script>
