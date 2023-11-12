import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import logoUser from '@/components/logoUser/logoUser.vue';
import DesignService from '@/sevices/design.service';
import modalPreview from '@/components/ModalPreview/modalPreview.vue';
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
			allDesign: [],
			infoDesign: '',
			isShowPreview:false
		}	
	},
	async mounted() {
		const allDesign = await DesignService.getAllDesign();
		console.log('allDesign:', allDesign.data.data);
		this.allDesign = allDesign.data.data
	},
	methods: {
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
	},
};
