<template>
	<div class="w-full h-[100px] relative bg-gray-700 block p-2">
		<div
			class="w-[100%] h-[100%] flex justify-start space-x-5 items-center"
		>
			<div class="">
				<label
					id="listbox-label"
					class="block text-sm font-medium leading-6 text-slate-200 text-left"
					>Search</label
				>
				<div class="mt-2">
					<input
						id="main-search"
						autocomplete="off"
						class="bg-zinc-700 border flex-1 pl-10 pr-12 rounded-full text-sm px-10 py-2.5 text-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-700"
						placeholder="Search for an image"
						v-model="inputSearch"
						fdprocessedid="d00fvp"
						@input="filterDesign"
					/>
				</div>
			</div>

			<div class="">
				<label
					id="listbox-label"
					class="block text-sm font-medium leading-6 text-slate-200 text-left"
					>Date</label
				>
				<div class="mt-2">
					<VueDatePicker
						v-model="date"
						range
						:dark="true"
						class="bg-black"
						placeholder="Select by date"
						@internal-model-change="filterDesign"
						:multi-calendars="{ static: false }"
						:enable-time-picker="false"
					/>
				</div>
			</div>

			<div class="" v-if="typeCatolog !='assets'">
				<label
					id="listbox-label"
					class="block text-sm font-medium leading-6 text-slate-200 text-left"
					>Product</label
				>
				<div class="mt-2">
					<select
						id="currency"
						name="currency"
						class="bg-zinc-700 border flex-1 pl-4 rounded-xl text-sm px-12 py-2.5 text-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-700"
						v-model="catalogeProduct"
						@change="filterDesign"
					>
						<option v-for="(value, idx) in cataloge" :key="idx">
							{{ value.name }}
						</option>
					</select>
				</div>
			</div>
			<div class="" v-if="isStatus && typeCatolog ==='design'">
				<label
					id="listbox-label"
					class="block text-sm font-medium leading-6 text-slate-200 text-left"
					>Status</label
				>
				<div class="mt-2">
					<div class="mt-2">
						<select
							id="currency"
							name="currency"
							class="bg-zinc-700 border flex-1 pl-4 rounded-xl text-sm px-12 py-2.5 text-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-700"
							v-model="statusPublic"
							@change="filterDesign"
						>
							<option value="All">All</option>
							<option value="public">Public</option>
							<option value="private">Private</option>
						</select>
					</div>
				</div>
			</div>
			<div class="" v-if="typeCatolog !='assets'">
				<label
					id="listbox-label"
					class="block text-sm font-medium leading-6 text-slate-200 text-left"
					>Likes</label
				>
				<div class="mt-2">
					<div
						class="bg-zinc-700 pl-4 border rounded-xl text-sm py-2 px-8 flex items-center text-slate-50"
					>
						<input
							id="main-search"
							autocomplete="off"
							type="range"
							class="w-[100%]"
							placeholder="Search for an image"
							v-model="numberLike"
							@change="filterDesign"
							fdprocessedid="d00fvp"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const productMappper = createNamespacedHelpers('product');
const designMappper = createNamespacedHelpers('design');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc'); // Import plugin UTC
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(utc); // Sử dụng plugin UTC
dayjs.extend(customParseFormat);
export default {
	data() {
		return {
			date: '',
			statusPublic: 'All',
			catalogeProduct: 'All',
			inputSearch: '',
			numberLike: 100,
		};
	},
	props: {
		isStatus: {
			type: Boolean,
			default: true,
		},
		typeCatolog: {
			type: String,
			default:'design'
		}
	},
	computed: {
		...productMappper.mapState(['products', 'cataloge']),
	},

	async mounted() {
		await this.getAllProducts();
		this.catalogeProduct = this.cataloge[0].name;
	},
	methods: {
		...productMappper.mapActions(['getAllProducts']),
		...designMappper.mapActions(['filterListDesign']),

		filterDesign() {
			let dateTime = [];

			if (this.date) {
				const dateStarts = dayjs(this.date[0])
					.set('hour', 0)
					.set('minute', 0)
					.set('second', 0)
					.format('YYYY/MM/DD HH:mm:ss');
				const dateEnds = dayjs(this.date[1])
					.set('hour', 23)
					.set('minute', 59)
					.set('second', 59)
					.format('YYYY/MM/DD HH:mm:ss');
				const dateStart = dayjs(dateStarts).unix();
				const dateEnd = dayjs(dateEnds).unix();
				dateTime = [dateStart, dateEnd];
			}

			this.filterListDesign({
				searchKeyword: this.inputSearch,
				cataloge: this.catalogeProduct,
				statusPublics: this.statusPublic,
				date: dateTime,
				numberLike:this.numberLike
			});
		},
	},
	watch: {
		typeCatolog() {
			this.date = null
			this.inputSearch = '',
			this.catalogeProduct = this.cataloge[0].name;
			this.statusPublic = 'All'
		}
	}
};
</script>
<style>
.dp__theme_dark {
	--dp-background-color: rgb(63 63 70) !important;
	--dp-text-color: #fff !important;
	--dp-hover-color: #b7afaf !important;
	--dp-hover-text-color: #fff;
	--dp-hover-icon-color: #959595;
	--dp-primary-color: #005cb2;
	--dp-primary-disabled-color: #61a8ea;
	--dp-primary-text-color: #fff;
	--dp-secondary-color: #a9a9a9;
	--dp-border-color: #f4f1f1 !important;
	--dp-menu-border-color: #2d2d2d;
	--dp-border-color-hover: #aaaeb7;
	--dp-disabled-color: #737373;
	--dp-disabled-color-text: #d0d0d0;
	--dp-scroll-bar-background: #212121;
	--dp-scroll-bar-color: #484848;
	--dp-success-color: #00701a;
	--dp-success-color-disabled: #428f59;
	--dp-icon-color: #fff !important;
	--dp-danger-color: #e53935;
	--dp-marker-color: #e53935;
	--dp-tooltip-color: #3e3e3e;
	--dp-highlight-color: rgb(0 92 178 / 20%);
	--dp-range-between-dates-background-color: var(
		--dp-hover-color,
		#484848
	);
	--dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
	--dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>
