<template>
	<div
		class="sidebar-content bg-white w-[16%] border border-slate-200 p-2 pt-6 overflow-auto"
	>
		<!-- danamic components -->

		<div class="sidebar-content__detail text-left font-bold">
			<div class="detail-tiltle pb-8">{{ title }}</div>
			<div class="detail-body p-3" v-if="isImage">
				<slot v-if="title === 'Upload'" name="upload"></slot>

				<div v-for="(image, idx) in content" :key="idx" class="image">
					<img
						:src="
							require(`@/uploadImage/${
								image.image ? image.image : 'man.png'
							}`)
						"
						@click="onClickImage(image)"
					/>
				</div>

				<div
					v-for="(image, idx) in imagePixaBay"
					:key="idx"
					class="image"
				>
					<img
						:src="image.previewURL"
						@click="onClickImageFixabay(image)"
					/>
				</div>
			</div>
			<div v-else>
				<div v-for="(stroke, idx) in strokeDrawing" :key="idx" class="mb-1" :class="stroke.active === true?'bg-slate-200 rounded':''">
					<img class="cursor-pointer" :src="require(`@/assets/${stroke.image}`)" @click="onClickStrokeDraw(stroke)" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: String,
		content: Array,
		imagePixaBay: Array,
		isImage: Boolean,
		strokeDrawing: Array,
	},
	mounted() {
		console.log('content;', this.content.length);
	},
	methods: {
		onClickImage(image) {
			this.$emit('onClickImageUpload', image);
		},
		onClickImageFixabay(image) {
			this.$emit('onClickImageFixabay', image);
		},
		onClickStrokeDraw(stroke) {
			this.$emit('onClickStrokeDraw', stroke);
		}
	},
};
</script>
