<template>
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
				<div class="flex h-full gap-4  items-center">
					<div
						class="bg-green-700 h-[4vh] cursor-pointer text-white p-2 px-4 rounded-lg hidden md:block flex "
						@click="onSaveDesignByProduct"
					>
						<div class="text-center">Save</div>
					</div>
					<div
						class="bg-green-700 h-[4vh] cursor-pointer text-white p-2 px-4 rounded-lg hidden md:block flex "
						@click="onPreviewDesign"
					>
						<div class="text-center">Preview</div>
					</div>
					<!-- /// logo -->
					<logoUser></logoUser>
				</div>
			</nav>
		</header>
	</div>
</template>

<script>
import logoUser from '@/components/logoUser/logoUser.vue';
export default {
	components: {
		logoUser,
	},
	props: {},
	data() {
		return {};
	},

	methods: {
		onMoveHome() {
			this.$router.push('/');
		},
		onSaveDesignByProduct() {
			console.log(' kdjksdjfdskfjklsdj')
			this.$emit('onSaveDesignByProduct')
		},
		onPreviewDesign() {
			this.$emit('onPreviewDesign')
		}
	},
};
</script>
