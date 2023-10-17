<template>
	<div class="design">
		<!-- ////HEADER//////////// -->
		<div class="header">
			<header class="bg-current p-1">
				<nav class="flex justify-between items-center w-[92%] mx-auto">
					<div
						class="text-white cursor-pointer min-h-[5vh] flex justify-between items-center gap-3"
						@click="onMoveHome"
					>
						<icon icon="fa-solid fa-chevron-left" />
						<div>Home</div>
					</div>
					<div
						class="nav-links duration-500 md:static absolute bg-current md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5"
					>
						<label class="relative block">
							<span class="sr-only">Search</span>
							<span
								class="absolute inset-y-0 left-0 flex items-center pl-2"
							>
								<svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
									<!-- ... -->
								</svg>
							</span>
							<input
								class="placeholder:italic placeholder:text-slate-400 block bg-current w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
								placeholder="Name design"
								type="text"
								name="search"
							/>
						</label>
					</div>
					<div class="flex items-center gap-6">
						<button
							class="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
						>
							Sign in
						</button>
						<ion-icon
							onclick="onToggleMenu(this)"
							name="menu"
							class="text-3xl cursor-pointer md:hidden"
						></ion-icon>
					</div>
				</nav>
			</header>
		</div>

		<!-- sidebar -->
		<div class="swap flex w-[100%] h-[90vh]">
			<div
				class="swap-sidebar w-fit min-w-[6%]  border-slate-200 border"
			>
				<div
					v-for="(option, idx) in optionDesign"
					:key="idx"
					class="swap-sidebar__option p-4 cursor-pointer grid place-items-center"
					:class="option.active ? 'border-r-2 border-sky-500' : ''"
					@click="onMoveOption(idx, option.name)"
				>
					<icon
						v-if="option.name != 'Pixabay'"
						:icon="option.icon"
						class="font-black"
						size="lg"
						:style="{ color: option.active ? 'rgb(14 165 233)' : '' }"
					/>
					<img v-else src="../../assets/pixabay.svg" />
					<div
						class="text-sm p-1"
						:class="option.active ? 'text-sky-500' : ''"
					>
						{{ option.name }}
					</div>
				</div>
			</div>

			<baseSidebar :title="titleOption" :content="contentOption" :imagePixaBay="imagePixaBay">
				<template v-slot:upload>
					<div class="swap-sidebar w-fit">
						<label
							class="swap-sidebar__option p-4 cursor-pointer grid place-items-center w-fit border-dashed border-2 border-indigo-600"
						>
							<icon icon="fa-solid fa-upload" size="lg"></icon>
							<!-- <img v-else src="../../assets/pixabay.svg" /> -->
							<div class="text-sm p-1">Upload</div>
							<input
								class="hidden"
								type="file"
								id="file"
								ref="fileImageAsset"
								accept=".png"
								@input="uploadImageAsset"
							/>
						</label>
					</div>
				</template>
			</baseSidebar>

			<!-- //// <canvas></canvas>  -->

			<div class="swap-design bg-slate-100 w-[74%] h-[93vh]">
				<div class="design-nav bg-white w-[100%] h-[5vh]"></div>
				<div class="canvas h-[88vh] flex justify-center items-center">
					<canvas ref="canvas">
						<!-- <img src="../../assets/anh_test.png" ref="image" /> -->
					</canvas>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./designs">



</script>
<style>
.detail-body {
	/* grid-template-columns: repeat(2, 1fr); */
	grid-gap: 6px;
	columns: 2 5px;

	grid-auto-flow: dense;
}

.image {
	width: 100%;
	margin-bottom: 5px;
	break-inside: avoid;
	height: fit-content;
	/* overflow: hidden; */
}

.image img {
	max-width: 100%;
	height: auto;
	object-fit: cover;
}
</style>
