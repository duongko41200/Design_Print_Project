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
							class="relative transform overflow-hidden bg-zinc-700 text-left rounded shadow-lg transition-all sm:my-8 sm:max-w-xlg"
						>
							<div class="z-10 mt-8 flex">
								<div
									class="flex-auto w-[780px] overflow-hidden bg-white text-sm leading-6"
								>
									<div class="p-4 bg-zinc-700 h-[370px]">
										<div
											class="flex w-full h-full self-stretch flex-col md:flex-row pb-16 md:pb-0 md:pt-0 flex-1"
										>
											<div
												class="w-full flex-shrink-0 overflow-hidden text-base px-2 flex flex-col h-auto"
												style="height: fit-content; width: 400px"
											>
												<div
													class="mt-6 px-4 py-3 bg-zinc-600 rounded-xl shadow bg-opacity-50 font-light flex flex-col space-y-5 text-slate-50"
												>
													<p
														class="bg-red-500 bg-opacity-0 rounded hover:bg-opacity-40 cursor-pointer"
													>
														West world man in black
													</p>
													<div class="flex text-xs font-light">
														<div
															class="flex flex-1 flex-row space-x-2 mr-2"
														>
															<div
																class="text-xs rounded-md sm:text-xs active:scale-95 transition-all transform-gpu whitespace-nowrap flex-1 flex select-none cursor-pointer hover:bg-zinc-600 border border-zinc-600 bg-zinc-700 items-center justify-center shadow px-2.5 py-2 w-fit-content"
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	stroke="currentColor"
																	fill="none"
																	stroke-width="2"
																	viewBox="0 0 24 24"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	class="text-sm mr-2"
																	height="1em"
																	width="1em"
																>
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
																	/>
																</svg>

																Design favories
															</div>
															<div
																class="text-xs rounded-md sm:text-xs active:scale-95 transition-all transform-gpu whitespace-nowrap flex-1 flex select-none cursor-pointer hover:bg-zinc-600 border border-zinc-600 bg-zinc-700 items-center justify-center shadow px-2.5 py-2 w-fit-content"
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	stroke="currentColor"
																	fill="none"
																	stroke-width="2"
																	viewBox="0 0 24 24"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	class="text-sm mr-2"
																	height="1em"
																	width="1em"
																>
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
																	/>
																</svg>

																Download Image
															</div>
														</div>
													</div>
												</div>
												<div class="flex space-x-2 px-2 text-slate-50">
													<div
														class="text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-110 bg-gradient-to-t from-indigo-900 via-indigo-900 to-indigo-800 drop-shadow items-center justify-center px-2.5 py-2.5 w-fit-content active:scale-95 transition-all"
													>
														<svg
															stroke="currentColor"
															fill="currentColor"
															stroke-width="0"
															viewBox="0 0 512 512"
															class="mr-2 text-base transition-all w-3 h-3"
															height="1em"
															width="1em"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160zm352 128l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zm70.62-193.77L417.77 9.38C411.53 3.12 403.34 0 395.15 0c-8.19 0-16.38 3.12-22.63 9.38L9.38 372.52c-12.5 12.5-12.5 32.76 0 45.25l84.85 84.85c6.25 6.25 14.44 9.37 22.62 9.37 8.19 0 16.38-3.12 22.63-9.37l363.14-363.15c12.5-12.48 12.5-32.75 0-45.24zM359.45 203.46l-50.91-50.91 86.6-86.6 50.91 50.91-86.6 86.6z"
															></path>
														</svg>
														name Auth Design
													</div>

													<div
														class="text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-110 bg-gradient-to-t from-zinc-600 via-zinc-600 to-zinc-600 drop-shadow items-center justify-center px-2.5 py-2 w-fit-content"
													>
														Explore this style
													</div>
												</div>
												<div
													class="md:mt-6 mt-4 opacity-80 ml-2 grid grid-cols-2 gap-2 md:flex flex-wrap md:flex-col md:space-x-0 md:space-y-1 h-auto pb-32 sm:pb-8"
												>
													<div>
														<div
															class="text-xs opacity-50 text-gray-400"
														>
															Model
														</div>
														<div class="text-sm text-slate-50">
															Lexica Aperture v3.5
														</div>
													</div>
													<div>
														<div
															class="text-xs opacity-50 text-gray-400"
														>
															Model
														</div>
														<div class="text-sm text-slate-50">
															Lexica Aperture v3.5
														</div>
													</div>
												</div>
											</div>

											<div class="w-full md:h-full flex flex-col">
												<div
													class="flex mt-[20px] h-full text-slate-50"
												>
													<button
														disabled=""
														class="h-full w-14 text-5xl flex items-center justify-center opacity-10"
													>
														<svg
															stroke="currentColor"
															fill="none"
															stroke-width="2"
															viewBox="0 0 24 24"
															stroke-linecap="round"
															stroke-linejoin="round"
															height="1em"
															width="1em"
															xmlns="http://www.w3.org/2000/svg"
														>
															<polyline
																points="15 18 9 12 15 6"
															></polyline>
														</svg>
													</button>

													<div class="relative w-100">
														<!-- Preview imge -->
														<img
															alt=""
															class="absolute top-0 left-0 z-10"
															src="https://image.lexica.art/md2_webp/72d05b06-5dd8-4834-b283-28bda7835416"
															style="
																width: 100%;
																height: 100%;
																max-width: none;
															"
														/>
													</div>

													<button
														class="h-full w-14 text-5xl flex items-center justify-center opacity-80 hover:opacity-100 cursor-pointer"
														fdprocessedid="vh6y2"
													>
														<svg
															stroke="currentColor"
															fill="none"
															stroke-width="2"
															viewBox="0 0 24 24"
															stroke-linecap="round"
															stroke-linejoin="round"
															height="1em"
															width="1em"
															xmlns="http://www.w3.org/2000/svg"
														>
															<polyline
																points="9 18 15 12 9 6"
															></polyline>
														</svg>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 bg-zinc-700"
							>
								<button
									type="button"
									class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
									@click="oncloseModal"
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
			default: true,
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
			this.$emit('onDesignProduct', product);
		},
	},
};
</script>
