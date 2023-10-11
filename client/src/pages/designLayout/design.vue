<template>
	<div class="design">
		<div class="header">
			<header class="bg-current p-1">
				<nav class="flex justify-between items-center w-[92%] mx-auto">
					<div
						class="text-white cursor-pointer min-h-[5vh] flex justify-between items-center gap-3"
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

		<!-- ////HEADER//////////// -->

		<div class="swap flex w-[100%] h-[90vh]">
			<div
				class="swap-sidebar w-fit min-w-[6%] h-[90vh] border-slate-200 border"
			>
				<div
					v-for="(option, idx) in optionDesign"
					:key="idx"
					class="swap-sidebar__option p-4 cursor-pointer grid place-items-center "
					:class="option.active ? 'border-r-2 border-sky-500' : ''"
					@click="onMoveOption(idx)"
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

			<div
				class="sidebar-content bg-white w-[20%] h-[90vh] border-slate-200 border"
			>
				<!-- danamic components -->

				<div class="swap-sidebar__option"></div>
			</div>
<!-- 

			//// <canvas></canvas> -->

			<div class="swap-design"></div>
		</div>
	</div>
</template>
<script src="./designs">

</script>
