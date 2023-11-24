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
												>Email address</label
											>
											<input
												type="email"
												v-model="email"
												class="form-control"
												id="exampleFormControlInput1"
												placeholder="name@example.com"
												disabled
											/>
										</div>
										<div class="mb-3 col-5">
											<label
												for="exampleFormControlInput1"
												class="form-label"
												>Username</label
											>
											<input
												v-model="username"
												type="text"
												class="form-control"
												id="exampleFormControlInput1"
												placeholder="username"
											/>
										</div>
									</div>
									<div class="row space-x-8 space-x-reverse flex">
										<div class="col-6">
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
												disabled
											/>
										</div>
										<div class="mb-3 col-5">
											<label
												for="exampleFormControlInput1"
												class="form-label"
											>
												Roles
											</label>
											<select
												class="form-select"
												aria-label="Default select example"
												:disabled="userInfo.role === 'owner'?false:true"
												v-model="roles"
											>
												<option value="user">User</option>
												<option value="admin">Admin</option>
												<option value="owner">Owner</option>
											</select>
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
									@click="onUpdateUser"
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
import UserService from '@/sevices/user.service.js';
const authMappper = createNamespacedHelpers('auth');
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
		userInfos: {
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
			email: '',
			description: '',
			username: '',
			roles: '',
		};
	},

	mounted() {
		console.log("userInfo.role",this.userInfo)
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
	},
	methods: {
		...authMappper.mapMutations(['SET_USER_INFO']),
		...authMappper.mapActions(['getAllListUser']),
		oncloseModal() {
			this.$emit('oncloseModal');
		},
		async onUpdateUser() {

			const param = {
				id: this.userInfos.id,
				username: this.username,
				image: this.userInfos.image,
				email: this.email,
				password: this.userInfos.password,
				role: this.roles,
				description: this.description,
				favoriteDesign: this.userInfos.favoriteDesign,
			};
			try {
				const updatedata = await UserService.updateProfile({ param});
				const response = updatedata.data.data;

				console.log({ response });
				if (this.userInfos.id === this.userInfo.id) {
				
					localStorage.setItem('tokens', updatedata.data.token);
					this.SET_USER_INFO(response);
				}

				this.$toast.success('update infomation user success', {
					position: 'top-right',
					duration: 2000,
				});
				await this.getAllListUser();
				this.oncloseModal()
			} catch (error) {
				console.log({ error });
				this.$toast.error('update infomation user faile', {
					position: 'top-right',
					duration: 2000,
				});
			}
		},
	},
	watch: {
		showModal() {
			this.email = this.userInfos.email;
			this.description = this.userInfos.description;
			this.username = this.userInfos.username;
			this.roles = this.userInfos.role;
		},
	},
};
</script>
