<template>
	<div class="flex flex-col items-center px-3 my-6">
		<!-- {/* <div class="flex items-center justify-center w-1/2 h-auto mb-[-60px]">
                <label class="flex flex-col items-center justify-center w-full h-80 rounded-3xl cursor-pointer bg-gray-100 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Cập nhật ảnh bìa</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" />
                </label>
            </div> */} -->
		<img
			src="@/assets/coverImage2.png"
			alt="userImage"
			width="620"
			height="620"
			class="rounded-3xl mb-[-60px] bg-current"
		/>
		<img
			:src="require(`@/assets/${userInfo.image?userInfo.image:'man.png'}`)"
			alt="userImage"
			width="100"
			height="100"
			class="rounded-full w-[100px] h-[100px]"
		/>

		<h2 class="text-[30px] font-semibold">{{ userInfo.username }}</h2>
		<h2 class="text-gray-400">{{ userInfo.email }}</h2>
		<h2 class="">{{ userInfo.description }}</h2>
		<div class="flex gap-4">
			<button
				class="bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full"
			>
				Đã tạo
			</button>
			<button
				class="bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full"
			>
				Đã thích
			</button>
		</div>
	</div>
</template>
<script>


import { createNamespacedHelpers } from 'vuex';
const authMappper = createNamespacedHelpers('auth');
export default {
	data() {
		return {
			isPopoverOpen: false,
		
		};
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
	},
	mounted() {
		// console.log("userInfo:",this.userInfo);
	},
	methods: {

	},
};</script>