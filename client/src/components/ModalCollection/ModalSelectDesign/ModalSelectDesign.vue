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
							class="relative transform bg-sky-700  text-left  shadow-lg transition-all sm:my-8 sm:max-w-xlg"
						>
							<div class="z-10 mt-8 flex ">
								<div
									class="flex-auto w-[780px] overflow-hidden bg-white text-sm leading-6"
								>

								<div class="mt-2 ">
					<select
						id="currency"
						name="currency"
						class=" border-2 flex-1 pl-4 text-slate-500 text-sm px-12 py-2.5 text-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-700"
						v-model="catalogeProduct"
						@change="filterSelectDesign"
					>
						<option v-for="(value, idx) in cataloge" :key="idx">
							{{ value.name }}
						</option>
					</select>
				</div>



									<div class="p-4 mt-2 overflow-auto max-h-96" v-if="modalType === 'product'">
										<div
											v-for="(product, idx) in allDesignByCollection"
											:key="idx"
											class="group relative cursor-pointer flex gap-x-6 p-2 hover:bg-gray-100"
											@click="onDesignProduct(product)"
										>
											<div
												class="mt-1 relative flex h-10 w-20 flex-none items-center justify-center bg-gray-50 group-hover:bg-white"
											>
												<img
													v-if="imageType === 'front'"
													:src="
													
															product.thumbnailFront
																? product.thumbnailFront
																: require(`@/uploadImage/${data.image}`)
														
													"
													class="absolute z-10"
												/>
												<img
													:src="
														product.thumbnailBack
																? product.thumbnailBack
																: require(`@/uploadImage/${data.image}`)
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
import { createNamespacedHelpers } from 'vuex';
const designMappper = createNamespacedHelpers('design');
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
		typeCollection: {
			type: String,
			
		}
	},
	data() {
		return {

			catalogeProduct:'All'
		};
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
		...designMappper.mapState(['allDesignByCollection']),
		...productMappper.mapState(['products', 'cataloge']),
	},
	async mounted() {
		console.log('product ', this.products);
		this.getListDesignByCollection({
			userId: this.userInfo.id,
			isPublic: 'all',
		});
		await this.getAllProducts({ status: 'accept' });

		console.log('cataloge', this.cataloge);
		this.catalogeProduct = this.cataloge[0].name;
	},
	methods: {
		...designMappper.mapActions(['getListDesignByCollection','filterCollectionByCategory']),
		...productMappper.mapActions(['getAllProducts']),
		oncloseModal() {
			this.$emit('oncloseModal');
		},

		onDesignProduct(product) {
			if (this.typeCollection === 'upper-body') {
				this.$emit('onDesignProductDesignUpper', product);
			} else {
				this.$emit('onDesignProductDesignLower', product);
			}
			
		},

		filterSelectDesign() {
			this.filterCollectionByCategory({cataloge:this.catalogeProduct})
		}
	},
};
</script>
