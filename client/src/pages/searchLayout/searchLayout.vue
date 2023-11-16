<template>
	<div
		class="max-h-full overflow-auto h-[100%] w-[100%] overflow-x-hidden flex flex-col bg-zinc-800 text-gray-100 text-sm"
	>
		<div class="body flex flex-col py-4 mt-16">
			<div class="flex flex-col items-center">
				<div>
					<!-- <svg
						viewBox="0 0 112 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="h-16 m-4"
					>
						<path
							d="M6.64774 31H0.977744V2.9335H6.64774V31ZM4.66324 31V30.4735H16.8942V31H4.66324ZM33.2749 23.386H38.6209C38.1889 24.979 37.4464 26.383 36.3934 27.598C35.3404 28.813 34.0579 29.758 32.5459 30.433C31.0609 31.081 29.4139 31.405 27.6049 31.405C25.4179 31.405 23.4604 30.9325 21.7324 29.9875C20.0044 29.0425 18.6409 27.733 17.6419 26.059C16.6429 24.358 16.1434 22.4275 16.1434 20.2675C16.1434 18.0805 16.6429 16.15 17.6419 14.476C18.6409 12.802 20.0044 11.4925 21.7324 10.5475C23.4604 9.6025 25.4179 9.13 27.6049 9.13C29.3869 9.13 31.0204 9.454 32.5054 10.102C34.0174 10.75 35.2999 11.668 36.3529 12.856C37.4059 14.017 38.1484 15.394 38.5804 16.987H33.2344C33.0724 15.826 32.7619 14.692 32.3029 13.585C31.8709 12.451 31.2634 11.5195 30.4804 10.7905C29.7244 10.0345 28.7659 9.6565 27.6049 9.6565C26.4709 9.6565 25.4584 10.0615 24.5674 10.8715C23.7034 11.6545 23.0149 12.829 22.5019 14.395C22.0159 15.961 21.7729 17.9185 21.7729 20.2675C21.7729 22.3735 21.9889 24.223 22.4209 25.816C22.8799 27.409 23.5414 28.651 24.4054 29.542C25.2964 30.433 26.3629 30.8785 27.6049 30.8785C29.0359 30.8785 30.2509 30.2575 31.2499 29.0155C32.2759 27.7465 32.9509 25.87 33.2749 23.386ZM18.2089 16.987V16.4605H36.9199V16.987H18.2089ZM39.597 9.535H45.2265L56.4855 31H50.856L39.597 9.535ZM47.535 20.1055L47.94 20.632L41.217 31H40.5285L47.535 20.1055ZM48.5475 20.632L48.1425 20.1055L54.987 9.535H55.6755L48.5475 20.632ZM65.4136 31H59.9461V9.535H65.4136V31ZM62.7001 6.295C61.8091 6.295 61.0666 5.998 60.4726 5.404C59.9056 4.81 59.6221 4.081 59.6221 3.217C59.6221 2.353 59.9056 1.6375 60.4726 1.0705C61.0666 0.476499 61.8091 0.179498 62.7001 0.179498C63.5641 0.179498 64.2796 0.476499 64.8466 1.0705C65.4406 1.6375 65.7376 2.353 65.7376 3.217C65.7376 4.081 65.4406 4.81 64.8466 5.404C64.2796 5.998 63.5641 6.295 62.7001 6.295ZM85.8746 23.5075H91.2206C90.7886 25.0735 90.0461 26.4505 88.9931 27.6385C87.9671 28.8265 86.7116 29.758 85.2266 30.433C83.7416 31.081 82.1081 31.405 80.3261 31.405C78.1391 31.405 76.1816 30.9325 74.4536 29.9875C72.7256 29.0425 71.3621 27.733 70.3631 26.059C69.3641 24.358 68.8646 22.4275 68.8646 20.2675C68.8646 18.0805 69.3641 16.15 70.3631 14.476C71.3621 12.802 72.7256 11.4925 74.4536 10.5475C76.1816 9.6025 78.1391 9.13 80.3261 9.13C82.1081 9.13 83.7416 9.454 85.2266 10.102C86.7116 10.75 87.9671 11.668 88.9931 12.856C90.0461 14.017 90.7886 15.394 91.2206 16.987H85.8746C85.7126 15.799 85.4156 14.6515 84.9836 13.5445C84.5516 12.4105 83.9576 11.479 83.2016 10.75C82.4456 10.021 81.4871 9.6565 80.3261 9.6565C79.1921 9.6565 78.1796 10.0615 77.2886 10.8715C76.4246 11.6545 75.7361 12.829 75.2231 14.395C74.7371 15.961 74.4941 17.9185 74.4941 20.2675C74.4941 22.3735 74.7101 24.223 75.1421 25.816C75.6011 27.409 76.2626 28.651 77.1266 29.542C78.0176 30.433 79.0841 30.8785 80.3261 30.8785C81.3791 30.8785 82.2836 30.5545 83.0396 29.9065C83.7956 29.2315 84.4166 28.3405 84.9026 27.2335C85.3886 26.1265 85.7126 24.8845 85.8746 23.5075ZM111.286 31H105.819V27.7195V24.9655V22.2115V14.5975C105.819 12.7075 105.535 11.4115 104.968 10.7095C104.401 10.0075 103.686 9.6565 102.822 9.6565C102.282 9.6565 101.782 9.8185 101.323 10.1425C100.864 10.4665 100.5 11.0065 100.23 11.7625C99.9596 12.4915 99.8246 13.504 99.8246 14.8C99.8246 15.07 99.8246 15.3535 99.8246 15.6505C99.8516 15.9475 99.8786 16.2175 99.9056 16.4605H94.3166C94.3166 15.0025 94.6811 13.7335 95.4101 12.6535C96.1661 11.5465 97.1921 10.6825 98.4881 10.0615C99.7841 9.4405 101.229 9.13 102.822 9.13C104.442 9.13 105.886 9.454 107.155 10.102C108.424 10.723 109.423 11.6275 110.152 12.8155C110.908 13.9765 111.286 15.367 111.286 16.987V31ZM99.8651 31.405C98.4881 31.405 97.2731 31.135 96.2201 30.595C95.1941 30.055 94.3976 29.326 93.8306 28.408C93.2636 27.463 92.9801 26.41 92.9801 25.249C92.9801 23.98 93.2771 22.873 93.8711 21.928C94.4921 20.956 95.3156 20.2135 96.3416 19.7005C97.3946 19.1605 98.5691 18.8905 99.8651 18.8905H107.074L106.993 19.417H102.822C101.499 19.417 100.446 19.93 99.6626 20.956C98.9066 21.955 98.5286 23.251 98.5286 24.844C98.5286 26.302 98.8391 27.49 99.4601 28.408C100.081 29.326 100.972 29.785 102.133 29.785C102.862 29.785 103.497 29.5825 104.037 29.1775C104.604 28.7725 105.036 28.2055 105.333 27.4765C105.657 26.7475 105.819 25.9105 105.819 24.9655H106.386C106.386 26.9365 105.792 28.5025 104.604 29.6635C103.443 30.8245 101.863 31.405 99.8651 31.405Z"
							fill="white"
						></path>
					</svg> -->

					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						width="330"
						zoomAndPan="magnify"
						viewBox="0 0 168 48"
						height="120"
						preserveAspectRatio="xMidYMid meet"
						version="1.0"
					>
						<defs><g /></defs>
						<g fill="#ffffff" fill-opacity="1">
							<g transform="translate(23.406885, 34.848904)">
								<g>
									<path
										d="M 1.488281 -0.269531 L 1.488281 0 L 14.671875 0 L 14.671875 -0.269531 C 12.5 -0.269531 11.160156 -1.457031 11.160156 -3.421875 L 11.160156 -12.054688 L 21.339844 -12.054688 L 21.339844 -3.421875 C 21.339844 -1.457031 20 -0.269531 17.828125 -0.269531 L 17.828125 0 L 31.011719 0 L 31.011719 -0.269531 C 28.839844 -0.269531 27.5 -1.457031 27.5 -3.421875 L 27.5 -22.234375 C 27.5 -24.195312 28.839844 -25.386719 31.011719 -25.386719 L 31.011719 -25.65625 L 17.828125 -25.65625 L 17.828125 -25.386719 C 20 -25.386719 21.339844 -24.195312 21.339844 -22.234375 L 21.339844 -12.320312 L 11.160156 -12.320312 L 11.160156 -22.234375 C 11.160156 -24.195312 12.5 -25.386719 14.671875 -25.386719 L 14.671875 -25.65625 L 1.488281 -25.65625 L 1.488281 -25.386719 C 3.660156 -25.386719 5 -24.195312 5 -22.234375 L 5 -3.421875 C 5 -1.457031 3.660156 -0.269531 1.488281 -0.269531 Z M 1.488281 -0.269531 "
									/>
								</g>
							</g>
						</g>
						<g fill="#ffffff" fill-opacity="1">
							<g transform="translate(55.899398, 34.848904)">
								<g>
									<path
										d="M 15.296875 0.207031 C 20.65625 0.207031 25.148438 -2.589844 25.148438 -8.125 L 25.148438 -22.382812 C 25.148438 -24.257812 26.429688 -25.386719 28.511719 -25.386719 L 28.511719 -25.65625 L 21.488281 -25.65625 L 21.488281 -25.386719 C 23.632812 -25.386719 24.882812 -24.257812 24.882812 -22.382812 L 24.882812 -8.125 C 24.882812 -2.113281 19.34375 -0.148438 16.457031 -0.148438 C 11.785156 -0.148438 10.953125 -6.371094 10.953125 -10.59375 L 10.953125 -22.441406 C 10.953125 -24.195312 12.144531 -25.386719 14.316406 -25.386719 L 14.316406 -25.65625 L 1.488281 -25.65625 L 1.488281 -25.386719 C 3.632812 -25.386719 4.882812 -24.195312 4.882812 -22.234375 L 4.882812 -8.332031 C 4.882812 -3.453125 10.328125 0.207031 15.296875 0.207031 Z M 15.296875 0.207031 "
									/>
								</g>
							</g>
						</g>
						<g fill="#ffffff" fill-opacity="1">
							<g transform="translate(85.892488, 34.848904)">
								<g>
									<path
										d="M 14.496094 0 C 16.042969 0 17.5 -0.269531 18.898438 -0.773438 C 21.546875 -1.546875 24.40625 -1.367188 24.496094 -0.269531 L 24.761719 -0.269531 L 24.761719 -8.273438 C 24.820312 -10.148438 26.101562 -11.28125 28.15625 -11.28125 L 28.15625 -11.546875 L 15.328125 -11.546875 L 15.328125 -11.28125 C 17.261719 -11.28125 18.660156 -10.207031 18.691406 -8.246094 L 18.691406 -1.25 C 17.589844 -0.773438 15.683594 -0.355469 14.496094 -0.355469 C 12.648438 -0.355469 7.558594 -1.578125 7.53125 -13.035156 C 7.558594 -24.496094 12.648438 -25.714844 14.496094 -25.714844 C 15.058594 -25.714844 16.371094 -25.597656 17.917969 -25.121094 C 21.160156 -24.019531 22.917969 -21.933594 23.007812 -18.78125 L 23.273438 -18.78125 L 23.273438 -25.804688 L 23.007812 -25.804688 C 22.917969 -24.671875 21.695312 -24.464844 18.898438 -25.296875 C 17.5 -25.804688 16.042969 -26.070312 14.496094 -26.070312 C 11.070312 -26.070312 7.855469 -24.734375 5.386719 -22.351562 C 3.007812 -19.941406 1.667969 -17.023438 1.488281 -13.808594 L 1.488281 -12.320312 C 1.875 -5.417969 7.621094 0 14.496094 0 Z M 14.496094 0 "
									/>
								</g>
							</g>
						</g>
						<g fill="#ffffff" fill-opacity="1">
							<g transform="translate(115.52851, 34.848904)">
								<g>
									<path
										d="M 14.523438 0 C 21.726562 0 27.558594 -5.832031 27.558594 -13.035156 C 27.558594 -20.207031 21.695312 -26.070312 14.523438 -26.070312 C 7.351562 -26.070312 1.488281 -20.207031 1.488281 -13.035156 C 1.488281 -5.953125 7.261719 0 14.523438 0 Z M 14.523438 -0.355469 C 12.679688 -0.355469 7.558594 -1.308594 7.558594 -13.035156 C 7.589844 -24.496094 12.679688 -25.714844 14.523438 -25.714844 C 16.398438 -25.714844 21.488281 -24.496094 21.488281 -13.035156 C 21.488281 -1.308594 16.398438 -0.355469 14.523438 -0.355469 Z M 14.523438 -0.355469 "
									/>
								</g>
							</g>
						</g>
					</svg>
				</div>
				<div>
					<!-- <p
						class="mt-2 text-xs text-indigo-300 active:scale-95 text-center font-medium shadow-sm hover:shadow-md bg-indigo-300 bg-opacity-5 hover:bg-opacity-10 border-0 border-indigo-300 border-opacity-10 hover:border-opacity-20 transition-all rounded-md px-6 py-2"
					>
						Try the Next-Gen Aperture v3.5 Model
					</p> -->
				</div>
				<div
					class="flex items-center w-full max-w-[600px] md:ml-[48px] mt-8 px-4 pl-5 md:px-5"
				>
					<div class="w-full">
						<div class="w-full flex items-center relative">
							<svg
								stroke="currentColor"
								fill="none"
								stroke-width="2"
								viewBox="0 0 24 24"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="absolute left-4 pointer-events-none"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="11" cy="11" r="8"></circle>
								<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
							</svg>
							<input
								id="main-search"
								autocomplete="off"
								class="bg-zinc-700 flex-1 pl-10 pr-12 rounded-full text-sm px-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-700"
								placeholder="Search for an image"
								v-model="valueSearch"
								fdprocessedid="d00fvp"
							/>
						</div>
					</div>
				</div>
				<div class="mb-8 flex flex-col items-center">
					<div class="flex space-x-2">
						<button
							class="w-32 sm:w-36 flex items-center text-xs justify-center text-center h-9 rounded-full hover:brightness-110 bg-opacity-0 shadow-sm mt-4 bg-gradient-to-t from-indigo-900 via-indigo-900 to-indigo-800"
							fdprocessedid="dilofl"
							@click="onSearchDesign"
						>
							Search
						</button>

						<button
							class="w-32 sm:w-36 flex items-center text-xs justify-center text-center h-9 rounded-full hover:brightness-110 bg-opacity-0 shadow-sm mt-4 border border-gray-700 hover:bg-zinc-700"
							fdprocessedid="oovm8i"
						>
							Account
						</button>
					</div>
				</div>
			</div>
			<div class="body__content p-2">
				<div class="body__content--title text-left mb-4 px-4">
					<h3 class="text-2xl font-bold leading-9 font-sans">
						Explore Printify's best
					</h3>
					<div class="mb-8 flex flex-col content-start">
						<div class="flex space-x-2">
							<button
								v-for="(cataloge, idx) in cataloge"
								:key="idx"
								class="w-32 sm:fit-w flex items-center text-xs justify-center text-center h-9 rounded-full hover:brightness-110 bg-opacity-0 shadow-sm mt-2 border border-gray-700 hover:bg-zinc-700"
								:class="
									cataloge.isClick === true
										? 'bg-white text-slate-800 font-bold'
										: ''
								"
								fdprocessedid="dilofl"
								@click="onClickCataloge(cataloge.id, cataloge.name)"
							>
								{{ cataloge.name }}
							</button>
						</div>
					</div>
				</div>
				<div
					class="body__content--listImage fit-h flex grid grid-cols-4 gap-2"
				>
					<div
						class="border z-10 cursor-pointer"
						v-for="(design, idx) in allDesign"
						:key="idx"
					>
						<div class="imageList relative">
							<div
								class="absolute test w-[100%] h-[100%] transition-opacity inset-0 bg-zinc-600 bg-opacity-20"
								style="
									background: linear-gradient(
										to top,
										rgba(0, 0, 0, 0.8) 0%,
										rgba(0, 0, 0, 0) 50%,
										rgba(0, 0, 0, 0) 100%
									);
								"
							>
								<div
									class="absolute w-[100%] h-[100%]"
									@click="onPreviweDesign(design)"
								></div>

								<div
									class="absolute z-9 top-2 left-2 bg-zinc-900 bg-opacity-30 hover:bg-opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded text-lg h-8 w-8"
								>
									<icon
										icon="fa-solid fa-magnifying-glass"
										style="color: #fff"
									/>
								</div>
								<div
									class="flex flex-col space-y-2 absolute top-2 z- 10 right-2"
								>
									<div
										class="bg-zinc-900 bg-opacity-30 hover:bg-opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded text-lg h-8 w-8"
										@click="creatFavoriteDesign(design)"
									>
										<icon
											icon="fa-solid fa-heart"
											style="color: #fff"
										/>
									</div>
									<div
										class="bg-zinc-900 z-10 bg-opacity-30 hover:bg-opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded text-lg h-8 w-8"
										@click="onDownload(design)"
									>
										<icon
											icon="fa-solid fa-download"
											style="color: #fff"
										/>
									</div>
								</div>

								<div
									class="absolute bottom-8 left-2 mx-0.5 overflow-hidden z-0 fit-w text-start z-10 font-bold text-base text-white"
								>
									{{ design.name }}
								</div>
								<div
									class="absolute bottom-2 left-2 mx-0.5 z-0 text-start fit-w z-10 font-bold text-gray"
									@click="onMoveUserDesign(design)"
								>
									by
									<span class="hover:text-blue-500 hover:underline">
										{{ design.user.username }}</span
									>
								</div>
							</div>

							<div class="w-[100%] h-[100%]">
								<img alt="T-shirts" :src="design.thumbnailFront" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<modalPreview
		:showModal="isShowPreview"
		:infoDesign="infoDesign"
		:type="typePreview"
		@oncloseModal="oncloseModal"
		@CreateFavoriteDesign="creatFavoriteDesign"
	></modalPreview>
</template>
<script src="./searchLayout.js"></script>
<style scope>
.subcategory {
	flex-grow: 1;
}
.images-container {
	width: 146px;
	height: 146px;
	border-radius: 50%;
	margin-bottom: 1rem;
}
h4 {
	font-weight: 700;
}
.body {
	max-height: calc(100vh - 150px);
	/* overflow: scroll; */
}
.test {
	opacity: 0;
}
.test:hover {
	opacity: 1;
}
</style>
