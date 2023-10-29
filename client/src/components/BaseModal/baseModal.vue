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
					class="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"
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
									<div class="p-4">
										<div
											v-for="(product, idx) in products"
											:key="idx"
											class="group relative cursor-pointer flex gap-x-6 p-4 hover:bg-gray-50"
											@click="onDesignProduct(product)"
										>
											<div
												class="mt-1 flex h-11 w-11 flex-none items-center justify-center bg-gray-50 group-hover:bg-white"
											>
												<img
													:src="
														require(`@/uploadImage/${
															product.thumbnail
																? product.thumbnail
																: 'man.png'
														}`)
													"
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
			this.$emit('onDesignProduct',product);
		}
	},
};
</script>
