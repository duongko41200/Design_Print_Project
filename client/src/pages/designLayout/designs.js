import baseSidebar from '@/components/BaseSidebar/baseSidebar.vue';
export default {
	components: {
		baseSidebar,
	},
	data() {
		return {
			titleOption: 'Templates',
			contentOption: [],
			optionDesign: [
				{ icon: 'fa-solid fa-list', name: 'Templates', active: true },
				{ icon: 'fa-solid fa-shapes', name: 'Shapes', active: false },
				{ icon: 'fa-solid fa-image', name: 'Upload', active: false },
				{ icon: '', name: 'Pixabay', active: false },
				{ icon: 'fa-solid fa-font', name: 'Texts', active: false },
				{ icon: 'fa-solid fa-pencil', name: 'Draw', active: false },
			],



			images: [
				{ src: "https://source.unsplash.com/OyCl7Y4y0Bk" },
				{ src: "https://source.unsplash.com/55btQzyDiO8" },
				{ src: "https://source.unsplash.com/v1OW17UcR-Q" },
				{ src: "https://source.unsplash.com/OyCl7Y4y0Bk" },
				{ src: "https://source.unsplash.com/v1OW17UcR-Q" },
				{ src: "https://source.unsplash.com/v1OW17UcR-Q" },
				
			]
		};
	},
	mounted() {
	this.contentOption = this.images 
	},

	methods: {
		onMoveOption(idx, name) {
			this.optionDesign = this.optionDesign.map((value, i) => {
				if (i === idx) {
					value.active = true;
				} else {
					value.active = false;
				}
				return value;
			});
			this.titleOption = name;
			if (name === 'Templates') {
				this.contentOption = this.images
			} else {
				this.contentOption = []
			}

			console.log(this.optionDesign);
		},
		onMoveHome() {
			this.$router.push('/')
		}
	},
};
