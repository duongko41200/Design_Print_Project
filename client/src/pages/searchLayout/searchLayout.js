import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import logoUser from '@/components/logoUser/logoUser.vue';
export default {
	components: {
		logoUser,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		ChevronDownIcon,

	},
	methods: {
		onCreateDesign() {
			this.$emit('onCreateDesign')
		}
	}

	

};