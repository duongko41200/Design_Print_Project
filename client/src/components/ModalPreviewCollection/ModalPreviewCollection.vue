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
									class="flex-auto w-[700px] overflow-hidden bg-white text-sm leading-6"
								>
									<div class="p-4 pt-0 bg-zinc-700 h-fit flex justify-center ">
										<div
											class="flex justify-center w-[80%] h-full self-stretch md:flex-row pb-16 md:pb-0 md:pt-0 flex-1"
										>
											<!-- // show detail design -->
											<div
												class="w-full flex-shrink-0 overflow-hidden text-base px-2 flex flex-col h-auto"
												style="height: fit-content"
											>
												<div
													class="mt-6 px-4 py-3 bg-zinc-600 rounded-xl shadow bg-opacity-50 font-light flex flex-col space-y-5 text-slate-50"
												>
													<div class="flex justify-between">
														<div
															class="bg-opacity-0 rounded font-bold capitalize"
														>
															{{ infoDesign.name }}
														</div>
														<div
															class="text-slate-400 font-bold bg-opacity-50"
														>
															{{ initTimeDesign }}
														</div>
													</div>
													<div
														class="flex text-xs font-light"
													>
														<div class="w-[250px]">
															<div>
																<div
																	class="text-xs opacity-50 text-gray-100"
																>
																	Created by
																</div>
																<div class="text-sm text-slate-50">
																	{{ infoDesign.user.username }}
																</div>
															</div>
															<div class="mt-2">
																<div
																	class="text-xs opacity-50 text-gray-100"
																>
																	Description
																</div>
																<div class="text-sm text-slate-50">
																	{{ infoDesign.description }}
																</div>
															</div>
														</div>

														<div
															class="w-[50%] md:h-full flex flex-col"
															v-if="type != 'preview'"
														>
															<div class="flex h-full">
																<div
																	class="h-full w-14 text-5xl flex items-center justify-center text-slate-50"
																	@click="() => (thumbnail = 'front')"
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
																		class="text-slate-50 opacity-80 hover:opacity-100 disabled"
																	>
																		<polyline
																			points="15 18 9 12 15 6"
																		></polyline>
																	</svg>
																</div>

																<div class="relative w-100">
																	<div>
																		<img
																			v-if="thumbnail === 'front'"
																			alt=""
																			class=" top-0 left-0 z-10"
																			:class="
																				type === 'previewProduct'
																					? 'object-contain'
																					: 'object-cover'
																			"
																			:src="
																				infoDesign.upperBody
																					.thumbnailFront
																			"
																			style="
																				width: 100%;
																				height: 115px;
																				max-width: none;
																			"
																		/>

																		<img
																			v-if="thumbnail === 'front'"
																			alt=""
																			class=" top-0 left-0 z-10"
																			:class="
																				type === 'previewProduct'
																					? 'object-contain'
																					: 'object-cover'
																			"
																			:src="
																				infoDesign.lowerBody
																					.thumbnailFront
																			"
																			style="
																				width: 100%;
																				height: 115px;
																				max-width: none;
																			"
																		/>
																	</div>

																	<div>
																		<img
																			v-if="thumbnail === 'back'"
																			alt=""
																			class=" top-0 left-0 z-10"
																			:class="
																				type === 'previewProduct'
																					? 'object-contain'
																					: 'object-cover'
																			"
																			:src="
																				infoDesign.upperBody
																					.thumbnailBack
																			"
																			style="
																				width: 100%;
																				height: 115px;
																				max-width: none;
																			"
																		/>

																		<img
																			v-if="thumbnail === 'back'"
																			alt=""
																			class=" top-0 left-0 z-10"
																			:class="
																				type === 'previewProduct'
																					? 'object-contain'
																					: 'object-cover'
																			"
																			:src="
																				infoDesign.lowerBody
																					.thumbnailBack
																			"
																			style="
																				width: 100%;
																				height: 115px;
																				max-width: none;
																			"
																		/>
																	</div>
																	
																</div>

																<div
																	class="h-full w-14 text-5xl flex items-center justify-center cursor-pointer"
																	@click="() => (thumbnail = 'back')"
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
																		class="text-slate-50 opacity-80 hover:opacity-100"
																	>
																		<polyline
																			points="9 18 15 12 9 6"
																		></polyline>
																	</svg>
																</div>
															</div>
														</div>
													</div>
												</div>
												<!-- <div class="flex space-x-2 px-2 text-slate-50">
													<div
														class="text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-110 bg-gradient-to-t from-indigo-900 via-indigo-900 to-indigo-800 drop-shadow items-center justify-center px-2.5 py-2.5 w-fit-content active:scale-95 transition-all"
														@click="onMoveUserDesign"
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
														{{
															infoDesign.user?.username
																? infoDesign.user?.username
																: 'none'
														}}
													</div>

													<div
														class="text-xs rounded-md sm:text-sm group mt-4 whitespace-nowrap flex-1 flex select-none cursor-pointer hover:brightness-110 bg-gradient-to-t from-zinc-600 via-zinc-600 to-zinc-600 drop-shadow items-center justify-center px-2.5 py-2 w-fit-content"
													>
														Explore this style
													</div>
												</div> -->
												<!-- <div
													class="md:mt-6 mt-4 opacity-80 ml-2 grid grid-cols-2 gap-2 md:flex flex-wrap md:flex-col md:space-x-0 md:space-y-1 h-auto pb-32 sm:pb-8"
												>
													<div>
														<div
															class="text-xs opacity-50 text-gray-100"
														>
															Description
														</div>
														<div class="text-sm text-slate-50">
															{{ infoDesign.description }}
														</div>
													</div>
												</div> -->
											</div>

											<!-- // form save design-->
										</div>
									</div>
								</div>
							</div>
							<div
								class="bg-gray-50 px-4 py-2 sm:flex sm:flex-row-reverse gap-2 sm:px-6 bg-zinc-700"
							>
								<div
									type="button"
									class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
									@click="oncloseModal"
								>
									Cancel
								</div>
								<div
									v-if="type === 'save'"
									type="button"
									class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
									@click="clickSaveDesign"
								>
									Save
								</div>
								<div
									v-if="type === 'preview'"
									type="button"
									class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
									@click="downloadDesign"
								>
									Download
								</div>
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
	// transition,
	// Listbox,
	// ListboxButton,
	// ListboxOption,
	// ListboxOptions,
} from '@headlessui/vue';
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { createNamespacedHelpers } from 'vuex';
const authMappper = createNamespacedHelpers('auth');
const dayjs = require('dayjs');

export default {
	components: {
		Dialog,
		DialogPanel,
		// transition,
		TransitionChild,
		TransitionRoot,
		// Listbox,
		// ListboxButton,
		// ListboxOption,
		// ListboxOptions,
		// CheckIcon,
		// ChevronUpDownIcon,
	},
	props: {
		showModal: {
			type: Boolean,
			default: true,
		},
		infoDesign: {
			type: Object,
		},
		type: String,
		previewFront: String,
		previewBack: String,
	},

	data() {
		return {
			thumbnail: 'front',

			nameDesign: '',
			description: '',
			selected: '',

			options: [
				{
					id: 1,
					type: 'public',
					icon: 'fa-solid fa-lock-open',
				},
				{
					id: 2,
					type: 'private',
					icon: 'fa-solid fa-lock',
				},
			],
		};
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
		initTimeDesign() {
			return dayjs(this.infoDesign.createdAt).format('YYYY/MM/DD');
		},
	},
	mounted() {
		console.log('product ádasd ', this.infoDesign);
		if (this.infoDesign) {
			this.nameDesign = this.infoDesign.name;
			this.description = this.infoDesign.description;
			this.selected = this.options.filter(
				(value) => value.type === this.infoDesign.isPublic
			)[0];
		} else {
			this.selected = this.options[0];
		}
	},
	methods: {
		oncloseModal() {
			this.$emit('oncloseModal');
			setTimeout(() => {
				this.thumbnail = 'front';
			}, 1000);
		},

		creatFavoriteDesign(design) {
			this.$emit('CreateFavoriteDesign', design);
		},
	},
	// watch: {
	// 	showModal() {
	// 		console.log("mat truoc;", this.previewFront)
	// 		console.log("mat sau;",this.previewBack)
	// 	}
	// }
};
</script>
