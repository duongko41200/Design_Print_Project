<template>
	<div
		class="sidebar-content bg-white w-[20%] h-[93vh] border border-slate-200 p-2 pt-6 overflow-auto"
	>
		<!-- danamic components -->

		<div class="sidebar-content__detail text-left font-bold">
			<div class="detail-tiltle pb-8">{{ title }}</div>
			<div class="detail-body p-3">
				<div v-for="(image, idx) in content" :key="idx" class="image">
					<img :src="image.src" />
				</div>

				<slot v-if="title === 'Upload'" name="upload" ></slot>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: String,
		content: Array,
	},
};
</script>
