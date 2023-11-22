<template>
	<div
		class="max-h-full h-[100%] w-[100%] overflow-x-hidden flex flex-col bg-zinc-800 text-gray-100 text-sm flex justify-center items-center"
	>
		<div
			class="body h-full max-h-full 2xl:h-[700px] overflow-auto w-[80%] flex flex-col py-4 p-6 bg-zinc-700 rounded-2xl shadow-xl shadow-zinc-700/20"
		>
			<div class="w-full flex justify-end">
				<div class="py-2 flex items-center relative w-[250px]">
					<svg
						stroke="currentColor"
						fill="none"
						stroke-width="2"
						viewBox="0 0 24 24"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="absolute left-4 pointer-events-none"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="11" cy="11" r="8"></circle>
						<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
					</svg>
					<input
						id="main-search"
						autocomplete="off"
						class="bg-zinc-700 flex-1 pl-10 w-full rounded-full border text-sm py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-700"
						placeholder="Search for account"
						v-model="valueSearch"
						fdprocessedid="d00fvp"
						@input="filterAccount"
					/>
				</div>
			</div>

			<div
				class="h-[600px] w-[100%] relative bg-white rounded-2xl flex flex-col shadow-xl shadow-zinc-700/20"
			>
				<div class="2xl:h-[550px] md:h-[270px] overflow-auto">
					<table class="table table-striped table-hover">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Image</th>
								<th scope="col">Name Product</th>
								<th scope="col">User</th>
								<th scope="col">Design</th>
								<th scope="col">Created At</th>

								<th scope="col">Handle</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(product, idx) in products" :key="idx">
								<th scope="row">{{ idx + 1 }}</th>
								<td>
									<div
										class="center cursor-pointer"
										@click="previewImageProduct(product)"
									>
										<img
											:src="
												require(`@/uploadImage/${
													product.thumbnail
														? product.thumbnail
														: 'man.png'
												}`)
											"
											class="w-[35px] h-[35px]"
											alt=""
										/>
									</div>
								</td>
								<td>{{ product.name }}</td>
								<td>{{ product.user.username }}</td>
								<td>
									<div
										class="text-sky-600 cursor-pointer font-bold"
										@click="showListDesign(user.id)"
									>
										{{ product.numDesigns }}
									</div>
								</td>
								<td>caapj nhap ngay sau</td>

								<!-- /// option -->
								<td>
									<Menu
										as="div"
										class="bottom-5 right-5 inline-block text-left cursor-pointer"
									>
										<div>
											<MenuButton
												class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 transition-opacity z-20 inset-0"
											>
												<icon icon="fa-solid fa-ellipsis-vertical" />
											</MenuButton>
										</div>

										<transition
											enter-active-class="transition ease-out duration-100"
											enter-from-class="transform opacity-0 scale-95"
											enter-to-class="transform opacity-100 scale-100"
											leave-active-class="transition ease-in duration-75"
											leave-from-class="transform opacity-100 scale-100"
											leave-to-class="transform opacity-0 scale-95"
										>
											<MenuItems
												class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
											>
												<div class="py-1">
													<MenuItem
														v-slot="{ active }"
														v-if="typeCatolog != 'assets'"
													>
														<div
															:class="[
																active
																	? 'bg-gray-100 text-gray-900'
																	: 'text-gray-700',
																'block px-4 py-2 text-sm',
															]"
															@click="editUser(user)"
														>
															Edit
														</div>
													</MenuItem>
													<MenuItem
														v-slot="{ active }"
														v-if="userInfo.role === 'owner'"
													>
														<div
															:class="[
																active
																	? 'bg-gray-100 text-gray-900'
																	: 'text-gray-700',
																'block px-4 py-2 text-sm',
															]"
															@click="shoModalDeleteUser(user.id)"
														>
															Delete
														</div>
													</MenuItem>
												</div>
											</MenuItems>
										</transition>
									</Menu>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="p-2 absolute bottom-1">
					<v-pagination
						v-model="page"
						:pages="allListUser.totalPages"
						:range-size="1"
						active-color="#DCEDFF"
						@update:modelValue="updateHandler"
					/>
				</div>
			</div>
		</div>
	</div>

	<modalPreview
		:showModal="isShowPreview"
		:infoDesign="productModel"
		type="previewProduct"
		:previewFront="productModel.imageFront"
		:previewBack="productModel.imageBack"
		@oncloseModal="oncloseModalPreview"
		
	></modalPreview>
	<baseModal
		:showModal="showModal"
		:products="listDesign"
		:modalType="'manageUser'"
		@oncloseModal="oncloseModal"
		@onDesignProduct="onDesignProduct"
	></baseModal>

	<userModal
		:showModal="showEditForm"
		:userInfos="userInfos"
		@oncloseModal="oncloseModal"
	></userModal>
	<modalNotify
		title="Delete Account"
		content="When deleting an account the designs of this account will be deleted.You may want to delete?"
		:showModalNotify="showModalNotify"
		:id="idUser"
		@closeModalNotify="closeModalNotify"
		@deleteAccess="deleteUser"
	></modalNotify>
</template>
<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import userModal from '@/components/ModalFormUser/userModal.vue';
import baseModal from '@/components/BaseModal/baseModal.vue';
import UserService from '@/sevices/user.service.js';
import modalNotify from '@/components/ModalNotify/modalNotify.vue';
import modalPreview from '@/components/ModalPreview/modalPreview.vue';
import { createNamespacedHelpers } from 'vuex';
const productMappper = createNamespacedHelpers('product');
const authMappper = createNamespacedHelpers('auth');
const designMappper = createNamespacedHelpers('design');
export default {
	components: {
		baseModal,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		userModal,
		modalNotify,
		modalPreview
	},
	data() {
		return {
			showModal: false,
			page: 1,
			showEditForm: false,
			showModalNotify: false,
			isShowPreview: false,

			
			userInfos: '',		
			idUser: '',
			valueSearch: '',

			productModel:''
			
		};
	},

	async mounted() {
		await this.getAllListUser();
	},
	computed: {
		...authMappper.mapState([
			'allListUser',
			'originAllListUser',
			'userInfo',
			'originPaginationsResult',
		]),
		...designMappper.mapState(['listDesign']),
		...productMappper.mapState(['products', 'cataloge']),
	},

	methods: {
		...authMappper.mapMutations(['SET_USER_INFO']),
		...authMappper.mapActions([
			'getAllListUser',
			'paginationListUser',
			'filterListUser',
		]),
		...designMappper.mapActions(['getListDesignByUser']),

		async showListDesign(userId) {
			this.showModal = true;
			await this.getListDesignByUser({
				userId: userId,
				isPublic: 'all',
			});
		},
		oncloseModal() {
			this.showModal = false;
			this.showEditForm = false;
		},
		oncloseModalPreview() {
		
			this.isShowPreview = false
		},

		shoModalDeleteUser(id) {
			this.showModalNotify = true;
			this.idUser = id;
		},
		closeModalNotify() {
			this.showModalNotify = false;
		},
		updateHandler() {
			console.log('all list:', this.originAllListUser);
			this.paginationListUser({
				list: this.originPaginationsResult,
				currentPage: this.page,
			});
		},
		editUser(user) {
			console.log('userID:', user);
			this.showEditForm = true;
			this.userInfos = user;
		},

		async deleteUser(id) {
			try {
				await UserService.deleteByUser({
					userId: id,
				});
				this.$toast.success('Delete user success', {
					position: 'top-right',
					duration: 2000,
				});
				await this.getAllListUser();
				this.showModalNotify = false;
			} catch (error) {
				console.log('error:', error);
				this.$toast.error('delete user faile', {
					position: 'top-right',
					duration: 2000,
				});
				this.showModalNotify = false;
			}
		},

		filterAccount() {
			this.filterListUser({
				searchKeyword: this.valueSearch,
			});
		},
		previewImageProduct(product) {
			console.log("product", product)
			this.productModel = product
			this.isShowPreview = true
		},
	},
};
</script>
<style scope>
.subcategory {
	flex-grow: 1;
}
.images-container {
	width: 146px;
	height: 146px;
	border-radius: 50%;
	margin-bottom: 1rem;
}
h4 {
	font-weight: 700;
}
.body {
	max-height: calc(100vh - 150px);
	/* overflow: scroll; */
}
.test {
	opacity: 0;
}
.test:hover {
	opacity: 1;
}
</style>
