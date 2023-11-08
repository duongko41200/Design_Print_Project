<template>
	<div class=" max-h-full overflow-auto h-[100%]">
	<div class="flex justify-between gap-3 md:gap-2 items-center p-4">
		<Menu as="div" class="relative inline-block text-left">
			<div>
				<MenuButton
					class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				>
					Create
					<ChevronDownIcon
						class="-mr-1 h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
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
					class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<div class="py-1">
						<MenuItem v-slot="{ active }">
							<div
								class="cursor-pointer"
								@click="onCreateDesign"
								:class="[
									active
										? 'bg-gray-100 text-gray-900'
										: 'text-gray-700',
									'block px-4 py-2 text-sm',
								]"
							>
								Design
							</div>
						</MenuItem>
						<MenuItem v-slot="{ active }">
							<a
								href="#"
								:class="[
									active
										? 'bg-gray-100 text-gray-900'
										: 'text-gray-700',
									'block px-4 py-2 text-sm',
								]"
								>Template</a
							>
						</MenuItem>
					</div>
				</MenuItems>
			</transition>
		</Menu>

		<div
			class="bg-[#f7f7f7] border p-3 gap-3 items-center rounded-full w-full hidden md:flex"
		>
			<HiSearch class="text-[25px] text-gray-500" />
			<input
				type="text"
				placeholder="Search"
				class="bg-[#f7f7f7] w-full focus:outline-none"
			/>
		</div>
		<!-- {/* <HiSearch class='text-[25px] text-gray-500 md:hidden' /> */} -->

		<icon icon="fa-solid fa-bell" size="lg" />
		<!-- <FlyoutMenu /> -->

		<logoUser></logoUser>
	</div>
	<div class="body w-full p-2">
		<div class="body__header mb-8">
			<div class="body__header--title text-left mb-4">
				<h3 class="text-2xl font-bold leading-9 font-sans">
					Explore Printify's best
				</h3>
				<p class="text-base leading-10">
					Here are some of the most popular product categories in our
					catalog.
				</p>
			</div>
			<div class="body__header--section">
				<div class="desktop-subcategories flex w-[100%]">
					<div
						data-testid="subcategory"
						class="subcategory desktop flex flex-col justify-center items-center"
					>
						<img
							width="152"
							height="152"
							class="images-container"
							alt="T-shirts"
							src="https://images.printify.com/api/catalog/64394d8c2a4d01d9960aa971.png?s=152"
						/>
						<h4 _ngcontent-ng-c3227146306="" class="label">T-shirts</h4>
					</div>
					<div
						_ngcontent-ng-c3227146306=""
						data-testid="subcategory"
						class="subcategory desktop flex flex-col justify-center items-center"
					>
						<img
							_ngcontent-ng-c3227146306=""
							width="152"
							height="152"
							class="images-container"
							alt="Sweatshirts"
							src="https://images.printify.com/api/catalog/644a247275064722a60fc141.png?s=152"
						/>
						<h4 _ngcontent-ng-c3227146306="" class="label">
							Sweatshirts
						</h4>
					</div>
					<div
						_ngcontent-ng-c3227146306=""
						data-testid="subcategory"
						class="subcategory desktop flex flex-col justify-center items-center"
					>
						<img
							_ngcontent-ng-c3227146306=""
							width="152"
							height="152"
							class="images-container"
							alt="Hoodies"
							src="https://images.printify.com/api/catalog/5f61f729f714624d567e1ad3.png?s=152"
						/>
						<h4 _ngcontent-ng-c3227146306="" class="label">Hoodies</h4>
					</div>
					<div
						_ngcontent-ng-c3227146306=""
						data-testid="subcategory"
						class="subcategory desktop flex flex-col justify-center items-center"
					>
						<img
							_ngcontent-ng-c3227146306=""
							width="152"
							height="152"
							class="images-container"
							alt="Drinkware"
							src="https://images.printify.com/api/catalog/636bafc0a0485656700a4fc4.png?s=152"
						/>
						<h4 _ngcontent-ng-c3227146306="" class="label">
							Drinkware
						</h4>
					</div>
					<div
						_ngcontent-ng-c3227146306=""
						data-testid="subcategory"
						class="subcategory desktop flex flex-col justify-center items-center"
					>
						<img
							_ngcontent-ng-c3227146306=""
							width="152"
							height="152"
							class="images-container"
							alt="Baby Clothing"
							src="https://images.printify.com/api/catalog/6385fad37da87fcb1f0f1939.png?s=152"
						/>
						<h4 _ngcontent-ng-c3227146306="" class="label">
							Baby Clothing
						</h4>
					</div>
					<div
						_ngcontent-ng-c3227146306=""
						data-testid="subcategory"
						class="subcategory desktop flex flex-col justify-center items-center"
					>
						<img
							_ngcontent-ng-c3227146306=""
							width="152"
							height="152"
							class="images-container"
							alt="Tank Tops"
							src="https://images.printify.com/api/catalog/6384685c3b3df4d0e505ea74.png?s=152"
						/>
						<h4 _ngcontent-ng-c3227146306="" class="label">
							Tank Tops
						</h4>
					</div>
					<!---->
				</div>
			</div>
		</div>
		<div class="body__content">
			<div class="body__content--title text-left mb-4">
				<h3 class="text-2xl font-bold leading-9 font-sans">
					Explore Printify's best
				</h3>
				<p class="text-base leading-10">
					Here are some of the most popular product categories in our
					catalog.
				</p>
			</div>
			<div
				class="body__content--listImage fit-h flex grid grid-cols-4 gap-2"
			>
				<div class="border cursor-pointer" v-for="idx in 9" :key="idx">
					<div class="imageList relative">
						<div
							class="absolute test w-[100%] h-[100%] transition-opacity inset-0 bg-zinc-600 bg-opacity-20"
							style="
								background: linear-gradient(
									to top,
									rgba(0, 0, 0, 0.8) 0%,
									rgba(0, 0, 0, 0) 60%,
									rgba(0, 0, 0, 0) 100%
								);
							"
						>
							<div
								class="absolute w-[100%] h-[100%] bg-gray-100 opacity-25"
							></div>
							<div
								class="absolute top-2 left-0 w-[100%] fit-h hover-top flex justify-between px-3"
							>
								<div
									class="bg-zinc-900 bg-opacity-30 hover:bg-opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded text-lg h-8 w-8"
								>
									<icon
										icon="fa-solid fa-magnifying-glass"
										style="color: #fff"
									/>
								</div>
								<div class="flex flex-col space-y-2">
									<div
										class="bg-zinc-900 bg-opacity-30 hover:bg-opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded text-lg h-8 w-8"
									>
										<icon
											icon="fa-solid fa-heart"
											style="color: #fff"
										/>
									</div>
									<div
										class="bg-zinc-900 bg-opacity-30 hover:bg-opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded text-lg h-8 w-8"
									>
										<icon
											icon="fa-solid fa-download"
											style="color: #fff"
										/>
									</div>
								</div>
							</div>
							<div
								class="absolute mx-0.5 z-0 select-none overflow-hidden bottom-2 left-0 w-[100%] fit-h hover-button p-3"
							>
								<div class="text-start font-bold text-base text-white">
									Ao T-shirt sunny
								</div>
								<div class="text-start font-bold text-gray">
									by D.Duong
								</div>
							</div>
						</div>
						<div class="w-[100%] h-[100%]">
							<img
								alt="T-shirts"
								src="https://images.printify.com/api/catalog/64394d8c2a4d01d9960aa971.png?s=152"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>
<script src="./searchLayout.js"></script>
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
