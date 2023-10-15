import baseSidebar from '@/components/BaseSidebar/baseSidebar.vue';
import ImageAssetService from '@/sevices/imageAssets.service';
import ApiService from '@/sevices/api.service';
import { createNamespacedHelpers } from 'vuex';
const authMappper = createNamespacedHelpers('auth');
const globalMappper = createNamespacedHelpers('global');
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

			//DEMO IMAGE LIST
			images: [
				{ image: 'https://source.unsplash.com/OyCl7Y4y0Bk' },
				{ image: 'https://source.unsplash.com/55btQzyDiO8' },
				{ image: 'https://source.unsplash.com/v1OW17UcR-Q' },
				{ image: 'https://source.unsplash.com/OyCl7Y4y0Bk' },
				{ image: 'https://source.unsplash.com/v1OW17UcR-Q' },
				{ image: 'https://source.unsplash.com/v1OW17UcR-Q' },
			],

			imagePixaBay: [],
		};
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
	},
	mounted() {
		this.contentOption = this.images;
	},

	methods: {
		...globalMappper.mapActions(['uploadImageByS3']),

		/// choose option design
		async onMoveOption(idx, name) {
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
				this.imagePixaBay=[]
				this.contentOption = this.images;
			} else if (name === 'Upload') { 
				this.imagePixaBay=[]
				const imageAsset = await ImageAssetService.getAllImagAsset({
					email: this.email,
				});
				console.log('imageAsset', imageAsset.data.data);
				this.contentOption = imageAsset.data.data;
			} else if (name === 'Pixabay') {
				this.contentOption = [];
				const pixaBay = await ApiService.pixaBay();
				this.imagePixaBay = pixaBay.data.hits
				
				console.log('pixaBay', pixaBay);
			} else {
				this.contentOption = [];
				this.imagePixaBay=[]
			}

			console.log(this.optionDesign);
		},


		//upload imageassets 
		async uploadImageAsset(e) {
			e.preventDefault();
			const fileImageAsset = this.$refs.fileImageAsset;

			try {
				const upload = await this.uploadImageByS3(fileImageAsset);
				const imageUrl = upload.data.data.Location;
				const filename = upload.data.data.key;
				await ImageAssetService.createImagAsset({
					email: this.email,
					imageUrl: imageUrl,
					filename: filename,
				});

				const imageAsset = await ImageAssetService.getAllImagAsset({
					email: this.email,
				});

				this.contentOption = imageAsset.data.data;
				this.$toast.success('update image success', {
					position: 'top-right',
					duration: 2000,
				});
			} catch (error) {
				console.log({ error });
			}
		},
		onMoveHome() {
			this.$router.push('/');
		},
	},
};
