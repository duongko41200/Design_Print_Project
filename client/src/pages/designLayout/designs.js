export default {
	data() {
		return {
			optionDesign: [
				{ icon: 'fa-solid fa-list', name: 'Templates', active: true },
				{ icon: 'fa-solid fa-shapes', name: 'Shapes', active: false },
				{ icon: 'fa-solid fa-image', name: 'Upload', active: false },
				{ icon: '', name: 'Pixabay', active: false },
				{ icon: 'fa-solid fa-font', name: 'Texts', active: false },
				{ icon: 'fa-solid fa-pencil', name: 'Draw', active: false },
			],
		};
	},

	methods: {
		onMoveOption(idx) {
			this.optionDesign = this.optionDesign.map((value, i) => {
				
				if (i === idx) {
					value.active = true;
				} else {
					value.active = false;
				}
				return value
			});

			console.log(this.optionDesign);
		},
	},
};