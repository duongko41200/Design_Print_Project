<template>
	<TransitionRoot as="template" :show="showModalSave">
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
							class="relative transform overflow-hidden bg-slate-100 border p-6 text-left rounded shadow-lg transition-all sm:my-8 sm:max-w-xlg"
						>
							<form>
								<div class="space-y-12">
									<div class="border-b border-gray-900/10 pb-12">
										<h2
											class="text-base font-semibold leading-7 text-gray-900"
										>
											Personal Information
										</h2>
										<p class="mt-1 text-sm leading-6 text-gray-600">
											Use a permanent address where you can receive
											mail.
										</p>

										<div
											class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
										>
											<div class="col-span-full">
												<label
													for="first-name"
													class="block text-sm font-medium leading-6 text-gray-900"
													>First name</label
												>
												<div class="mt-2">
													<input
														type="text"
														name="first-name"
														id="first-name"
														autocomplete="given-name"
														class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														v-model="nameDesign"
													/>
												</div>
											</div>

											<div class="col-span-full">
												<label
													for="about"
													class="block text-sm font-medium leading-6 text-gray-900"
													>Description</label
												>
												<div class="mt-2">
													<textarea
														id="about"
														name="about"
														rows="3"
														class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														v-model="description"
													/>
												</div>
											</div>

											<div class="col-span-full">
												<p>Do you want public your design?</p>

												<Listbox as="div" v-model="selected">
													<div class="relative mt-2">
														<ListboxButton
															class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
														>
															<span class="flex items-center">
																<img
																	:src="selected.avatar"
																	alt=""
																	class="h-5 w-5 flex-shrink-0 rounded-full"
																/>
																<span class="ml-3 block truncate">{{
																	selected.type
																}}</span>
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
																	v-slot="{ active, selected }"
																>
																	<li
																		:class="[
																			active
																				? 'bg-indigo-600 text-white'
																				: 'text-gray-900',
																			'relative cursor-default select-none py-2 pl-3 pr-9',
																		]"
																	>
																		<div class="flex items-center">
																			<img
																				:src="option.avatar"
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
																				>{{ option.type }}</span
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

							<div
								class="bg-gray-50 px-4 py-3 gap-3 sm:flex sm:flex-row-reverse sm:px-6"
							>
								<button
									type="button"
									class="text-sm font-semibold leading-6 text-gray-900"
									@click="oncloseModal"
								>
									Cancel
								</button>
								<button
									type="submit"
									class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									@click="clickSaveDesign"
								>
									Save
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
// import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid';

import {
	Dialog,
	DialogPanel,
	TransitionChild,
	TransitionRoot,
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
		showModalSave: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
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
		this.selected = this.options[0];
	},

	methods: {
		oncloseModal() {
			this.$emit('oncloseModalSave');
		},

		clickSaveDesign() {
			this.$emit('onclickSaveDesign', {
				name: this.nameDesign,
				description: this.description,
				status: this.selected,
			});
		},
	},
};
</script>
