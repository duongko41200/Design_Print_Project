import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import logoUser from '@/components/logoUser/logoUser.vue';
import modalPreview from '@/components/ModalPreview/modalPreview.vue';
import { createNamespacedHelpers } from 'vuex';
const designMappper = createNamespacedHelpers('design');
const productMappper = createNamespacedHelpers('product');
export default {
	components: {
		logoUser,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		ChevronDownIcon,
		modalPreview
	},
	data() {
		return {
			infoDesign: '',
			isShowPreview: false,
			valueSearch: '',
			valueCataloge: 'All',
			idCataloge:''
		}	
	},
	async mounted() {
		await this.getAllDesign()

	},
	computed: {
		...designMappper.mapState(['allDesign',]),
		...productMappper.mapState(['cataloge'])
	},
	methods: {
		...designMappper.mapActions(['getAllDesign','searchDesign','filterCataloge']),
		...productMappper.mapActions(['handleCataloge']),
		onCreateDesign() {
			this.$emit('onCreateDesign');
		},
		onPreviweDesign(infoDesign) {
			console.log('infoDesign:',  infoDesign);
			this.infoDesign = infoDesign;
			this.isShowPreview = true;
		},
		oncloseModal() {
			this.isShowPreview = false;
		},
		onClickCataloge(id, name) {
			this.valueCataloge = name
			this.idCataloge = id
			console.log('Cataloge:', id, name);
			this.handleCataloge({ id, name })
			this.filterCataloge({ id, name })
	
		},
		onSearchDesign() {
			this.searchDesign({ content: this.valueSearch ,valueCataloge:this.valueCataloge, idCataloge:this.idCataloge})
			this.valueSearch =''
		}
		
	},
};
