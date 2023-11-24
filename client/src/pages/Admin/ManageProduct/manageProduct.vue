<template>
	<div
		class="max-h-full h-[100%] w-[100%] overflow-x-hidden flex flex-col bg-zinc-800 text-gray-100 text-sm flex justify-center items-center"
	>
		<div
			class="body h-full max-h-full 2xl:h-[700px] overflow-auto w-[80%] flex flex-col py-4 p-6 bg-zinc-700 rounded-2xl shadow-xl shadow-zinc-700/20"
		>
			<div
				class="w-full Space Between flex justify-between items-center"
			>
				<div class="flex gap-2 h-[30px]">
					<div
						class="border flex items-center w-[100px] cursor-pointer hover:bg-emerald-800 rounded justify-center text-center h-full "
						:class="optionStatus === 'accept'? 'bg-emerald-700':''"
						@click="ChooseAcceptProduct"
					>
						<div>Accept</div>
					</div>

					<div
						class="border border-yellow-700 cursor-pointer hover:bg-yellow-800 rounded flex items-center w-[100px] justify-center text-center h-full"
						:class="optionStatus === 'pending'? 'bg-yellow-700':''"
						@click="ChoosePendingProduct"
					>
						<div>Pending</div>
					</div>
				</div>
				<div class="flex justify-end">
					<div class="py-2 flex items-center relative w-[250px] mx-2">
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
					<div class="py-2 flex items-center relative w-[40px]">
						<div
							class="border absolute w-full rounded-lg h-[36px] cursor-pointer"
							@click="openFormCreatProduct"
						>
							<icon icon="fa-solid fa-plus" style="font-size: 30px" />
						</div>
					</div>
				</div>
			</div>

			<div
				class="h-[600px] w-[100%] relative bg-white rounded-2xl flex flex-col shadow-xl shadow-zinc-700/20"
			>
				<div class="2xl:h-[550px] md:h-[270px] overflow-auto">
					<!-- table product -->
					<table class="table table-striped table-hover">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Image</th>
								<th scope="col">Name Product</th>
								<th scope="col">User</th>
								<th scope="col">Design</th>
								<th scope="col">Created At</th>
								<th scope="col">Status</th>

								<th scope="col">Handle</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(product, idx) in manageProduct" :key="idx">
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
										@click="showListDesign(product.id)"
									>
										{{ product.numDesigns }}
									</div>
								</td>
								<td>cap nhap ngay sau</td>
								<td
									:class="
										product.status == 'accept'
											? 'text-green'
											: 'text-yellow'
									"
								>
									{{ product.status }}
								</td>

								<!-- /// option -->
								<td>
									<div class="flex gap-2 h-[30px] justify-center">
										<div
											v-if="product.status=== 'pending' && userInfo.role ==='owner'"
											class="border flex items-center w-[80px] h-full cursor-pointer text-white hover:bg-emerald-800 rounded justify-center text-center h-full bg-emerald-700"
											@click="handleAcceptProduct(product)"
										>
											<div>Accept</div>
										</div>

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
																@click="editProduct(product)"
															>
																Edit
															</div>
														</MenuItem>
														<MenuItem
															v-slot="{ active }"
														
														>
															<div
																:class="[
																	active
																		? 'bg-gray-100 text-gray-900'
																		: 'text-gray-700',
																	'block px-4 py-2 text-sm',
																]"
																@click="deleteProduct(product.id)"
															>
																Delete
															</div>
														</MenuItem>
													</div>
												</MenuItems>
											</transition>
										</Menu>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="p-2 absolute bottom-1">
					<v-pagination
						v-model="page"
						:pages="totalPages"
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
		:modalType="'manageProduct'"
		@oncloseModal="oncloseModal"
		@onDesignProduct="onDesignProduct"
	></baseModal>

	<modalProduct
		:showModal="showEditForm"
		:productInfos="productInfos"
		:optionStatus="optionStatus"
		@oncloseModal="oncloseModal"
	></modalProduct>
	<modalNotify
		title="Delete Product"
		content="You cannot delete this template as it has been used to create other instances."
		:showModalNotify="showModalNotify"
		type="view"
		@closeModalNotify="closeModalNotify"
		@deleteAccess="deleteUser"
	></modalNotify>
	<modalFormProduct
		:showModal="showFormCreatProduct"
		@oncloseModal="closeModalFormCreateProduct"
	></modalFormProduct>
</template>
<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import modalProduct from '@/components/ModalFormUser/modalProduct.vue';
import baseModal from '@/components/BaseModal/baseModal.vue';
// import UserService from '@/sevices/user.service.js';
import ProductService from '@/sevices/product.service.js';
import modalNotify from '@/components/ModalNotify/modalNotify.vue';
import modalPreview from '@/components/ModalPreview/modalPreview.vue';
import modalFormProduct from '@/components/ModalCreatProduct/modalFormProduct.vue';
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
		modalProduct,
		modalNotify,
		modalPreview,
		modalFormProduct,
	},
	data() {
		return {
			showModal: false,
			page: 1,
			showEditForm: false,
			showModalNotify: false,
			isShowPreview: false,
			showFormCreatProduct: false,
			optionStatus:'accept',

			productInfos: '',
			idUser: '',
			valueSearch: '',

			productModel: '',
		};
	},

	async mounted() {
		await this.getAllProductsByUser({ status: 'accept', role:this.userInfo.role, userId: this.userInfo.id});
	},
	computed: {
		...authMappper.mapState([
			'allListUser',
			'originAllListUser',
			'userInfo',
			
		]),
		...designMappper.mapState(['listDesign']),
		...productMappper.mapState(['products', 'cataloge','totalPages','originProducts','originPaginationsProduct','manageProduct']),
	},

	methods: {
		...authMappper.mapMutations(['SET_USER_INFO']),
		...authMappper.mapActions([
			'getAllListUser',
		]),
		...designMappper.mapActions([
			'getListDesignByUser',
			'getListDesignByProduct',
		]),
		...productMappper.mapActions(['getAllProducts','paginationListProduct','filterListProduct','getAllProductsByUser']),

		async showListDesign(productId) {
			this.showModal = true;
			console.log('product:', productId);
			await this.getListDesignByProduct({
				productId: productId,
				isPublic: 'all',
			});
		},
		openFormCreatProduct() {
			this.showFormCreatProduct = true;
		},
		closeModalFormCreateProduct() {
			this.showFormCreatProduct = false;
		},
		oncloseModal() {
			this.showModal = false;
			this.showEditForm = false;
		},
		oncloseModalPreview() {
			this.isShowPreview = false;
		},

		closeModalNotify() {
			this.showModalNotify = false;
		},
		updateHandler() {
			console.log('all product:', this.originPaginationsProduct);
			this.paginationListProduct({
				list: this.originPaginationsProduct,
				currentPage: this.page,
			});
		},
		editProduct(product) {
			this.showEditForm = true;
			this.productInfos = product;
		},

		async deleteProduct(id) {
			try {
				const productDelete = await ProductService.deleteProduct({
					productId: id,
				});

				if (productDelete.data.status == 'fail') {
					this.showModalNotify = true;
				} else {
					this.$toast.success('Delete product success', {
						position: 'top-right',
						duration: 2000,
					});
				}
				if (this.optionStatus === 'pending') {
					this.getAllProductsByUser({ status: 'pending', role:this.userInfo.role,userId: this.userInfo.id });
				} else {
					this.getAllProductsByUser({ status: 'accept', role:this.userInfo.role,userId: this.userInfo.id });
				}
			
				
			} catch (error) {
				console.log('error:', error);
				this.$toast.error('delete product fail', {
					position: 'top-right',
					duration: 2000,
				});
				this.showModalNotify = false;
			}
		},

		filterAccount() {
			this.filterListProduct({
				searchKeyword: this.valueSearch,
			});
		},
		previewImageProduct(product) {
			console.log('product', product);
			this.productModel = product;
			this.isShowPreview = true;
		},
		async ChoosePendingProduct() {
			this.optionStatus = 'pending'
			this.page = 1
		
			await this.getAllProductsByUser({ status: 'pending', role: this.userInfo.role, userId: this.userInfo.id })
			this.filterAccount()
		},
		async ChooseAcceptProduct() {
			this.optionStatus = 'accept'
			this.page = 1
			
			await this.getAllProductsByUser({ status: 'accept', role:this.userInfo.role,userId: this.userInfo.id  })
			this.filterAccount()
		},
		async handleAcceptProduct(product) {

			const param = {
				id: product.id,
				productName: product.name,
				description: product.description,
				status: 'accept',

			};

			
			try {
				const updatedata = await ProductService.updateProduct({ param });
				console.log("updatedata:", updatedata)
				this.$toast.success('update infomation product success', {
					position: 'top-right',
					duration: 2000,
				});
				await this.getAllProductsByUser({status:'pending', role:this.userInfo.role,userId: this.userInfo.id })
			
			} catch (error) {
					this.$toast.error('update infomation product faile', {
					position: 'top-right',
					duration: 2000,
				});
			}
			console.log("product:", product);
			
		}
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
.text-green {
	color: rgb(0, 128, 0) !important;
	font-weight: 700;
}
.text-yellow {
	color: rgb(212, 203, 16) !important;
	font-weight: 700;
}
</style>
