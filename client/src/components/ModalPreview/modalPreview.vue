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
									<div class="p-4 pt-0 bg-zinc-700 h-[400px]">
										<div
											class="flex w-full h-full self-stretch flex-col md:flex-row pb-16 md:pb-0 md:pt-0 flex-1"
										>
											<!-- // show detail design -->
											<div
												class="w-full flex-shrink-0 overflow-hidden text-base px-2 flex flex-col h-auto"
												style="height: fit-content; width: 370px"
												v-if="type === 'detail'"
											>
												<div
													class="mt-6 px-4 py-3 bg-zinc-600 rounded-xl shadow bg-opacity-50 font-light flex flex-col space-y-5 text-slate-50"
												>
													<p class="bg-opacity-0 rounded">
														{{ infoDesign.name }}
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
														{{ infoDesign.user.username }}
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
															class="text-xs opacity-50 text-gray-100"
														>
															Description
														</div>
														<div class="text-sm text-slate-50">
															{{ infoDesign.description }}
														</div>
													</div>
												</div>
											</div>

											<!-- // form save design-->
											<div
												class="w-full flex-shrink-0 overflow-hidden text-base px-2 flex flex-col h-auto"
												style="height: fit-content; width: 370px"
												v-if="type === 'save'"
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
														class="relative transform h-full overflow-hidden bg-zinc-700 p-2 text-left rounded shadow-sm transition-all"
													>
														<form>
															<div class="space-y-12">
																<div
																	class="border-b border-gray-900/10 pb-12"
																>
																	<div
																		class="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6"
																	>
																		<div class="col-span-full">
																			<label
																				for="first-name"
																				class="block text-sm font-medium leading-6 text-gray-700 text-slate-100"
																				>Name Desigm</label
																			>
																			<div class="mt-2">
																				<input
																					type="text"
																					name="first-name"
																					id="first-name"
																					autocomplete="given-name"
																					class="block w-full rounded-md p-2 bg-zinc-700 border py-1.5 text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
																					v-model="nameDesign"
																				/>
																			</div>
																		</div>

																		<div class="col-span-full">
																			<label
																				for="about"
																				class="block text-sm font-medium leading-6 text-slate-100"
																				>Description</label
																			>
																			<div class="mt-2">
																				<textarea
																					id="about"
																					name="about"
																					rows="3"
																					class="block w-full rounded-md p-2 bg-zinc-700 border py-1.5 text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
																					v-model="description"
																				/>
																			</div>
																		</div>

																		<div
																			class="col-span-full text-slate-100"
																		>
																			<p>
																				Do you want public your design?
																			</p>

																			<Listbox
																				as="div"
																				v-model="selected"
																			>
																				<div class="relative mt-2">
																					<ListboxButton
																						class="relative bg-zinc-700 text-slate-100 border w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
																					>
																						<span
																							class="flex items-center"
																						>
																							<img
																								:src="selected.avatar"
																								alt=""
																								class="h-5 w-5 flex-shrink-0 rounded-full"
																							/>
																							<span
																								class="ml-3 block truncate"
																								>{{
																									selected.type
																								}}</span
																							>
																						</span>
																						<span
																							class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
																						>
																							<ChevronUpDownIcon
																								class="h-5 w-5 text-gray-400"
																								aria-hidden="true"
																							/>
																						</span>
																					</ListboxButton>

																					<transition
																						leave-active-class="transition ease-in duration-100"
																						leave-from-class="opacity-100"
																						leave-to-class="opacity-0"
																					>
																						<ListboxOptions
																							class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
																						>
																							<ListboxOption
																								as="template"
																								v-for="option in options"
																								:key="option.id"
																								:value="option"
																								v-slot="{
																									active,
																									selected,
																								}"
																							>
																								<li
																									:class="[
																										active
																											? 'bg-indigo-600 text-white'
																											: 'text-gray-900',
																										'relative cursor-default select-none py-2 pl-3 pr-9',
																									]"
																								>
																									<div
																										class="flex items-center"
																									>
																										<img
																											:src="
																												option.avatar
																											"
																											alt=""
																											class="h-5 w-5 flex-shrink-0 rounded-full"
																										/>
																										<span
																											:class="[
																												selected
																													? 'font-semibold'
																													: 'font-normal',
																												'ml-3 block truncate',
																											]"
																											>{{
																												option.type
																											}}</span
																										>
																									</div>

																									<span
																										v-if="selected"
																										:class="[
																											active
																												? 'text-white'
																												: 'text-indigo-600',
																											'absolute inset-y-0 right-0 flex items-center pr-4',
																										]"
																									>
																										<CheckIcon
																											class="h-5 w-5"
																											aria-hidden="true"
																										/>
																									</span>
																								</li>
																							</ListboxOption>
																						</ListboxOptions>
																					</transition>
																				</div>
																			</Listbox>
																		</div>
																	</div>
																</div>
															</div>
														</form>
													</DialogPanel>
												</TransitionChild>
											</div>

											<div
												class="w-full md:h-full flex flex-col"
												v-if="type != 'preview'"
											>
												<div class="flex mt-[20px] h-full">
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
														<img
															v-if="thumbnail === 'front'"
															alt=""
															class="absolute top-0 left-0 z-10 object-cover"
															:src="
																infoDesign.thumbnailFront
																	? infoDesign.thumbnailFront
																	: previewFront
															"
															style="
																width: 100%;
																height: 100%;
																max-width: none;
															"
														/>
														<img
															v-if="thumbnail === 'back'"
															alt=""
															class="absolute top-0 left-0 z-10 object-cover"
															:src="
																infoDesign.thumbnailBack
																	? infoDesign.thumbnailBack
																	: previewBack
															"
															style="
																width: 100%;
																height: 100%;
																max-width: none;
															"
														/>
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

											<div
												class="w-full md:h-full flex flex-col"
												v-if="type === 'preview'"
											>
												<div class="flex mt-[20px] h-full">
													<div class="relative w-[353px] flex gap-6">
														<!-- Preview imge -->
														<img
															alt=""
															class="top-0 left-0 z-10 object-cover"
															:src="
																infoDesign.thumbnailFront
																	? infoDesign.thumbnailFront
																	: previewFront
															"
															style="
																width: 100%;
																height: 100%;
																max-width: none;
															"
														/>
														<img
															alt=""
															class="top-0 left-0 z-10 object-cover"
															:src="
																infoDesign.thumbnailBack
																	? infoDesign.thumbnailBack
																	: previewBack
															"
															style="
																width: 100%;
																height: 100%;
																max-width: none;
															"
														/>
													</div>
												</div>
											</div>
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
	transition,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

export default {
	components: {
		Dialog,
		DialogPanel,
		transition,
		TransitionChild,
		TransitionRoot,
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions,
		CheckIcon,
		ChevronUpDownIcon,
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
					avatar:
						'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
				},
				{
					id: 2,
					type: 'private',
					avatar:
						'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
				},
			],
		};
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
		clickSaveDesign() {
			this.$emit('onclickSaveDesign', {
				name: this.nameDesign,
				description: this.description,
				status: this.selected,
			});
		},

		onDesignProduct(product) {
			this.$emit('onDesignProduct', product);
		},
		downloadDesign() {
			this.downloadImage(this.previewFront, this.infoDesign.name?`${this.infoDesign.name}(Front)`:"name_default(Front)")
			this.downloadImage(this.previewBack,this.infoDesign.name?`${this.infoDesign.name}(Back)`:"name_default(Back)")
		},
		downloadImage(imageUrl,name) {
			const link = document.createElement('a');
			link.href = imageUrl;
			link.download = name; // Tên tệp tải về, bạn có thể thay đổi nó nếu cần
			link.click();
		},
	},
};
</script>
