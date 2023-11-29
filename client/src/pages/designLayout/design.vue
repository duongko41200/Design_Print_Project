<template>
	<div class="design">
		<!-- ////HEADER//////////// -->
		<navbarDesign
			@onSaveDesignByProduct="openModeSave"
			@onPreviewDesign="PreviewDesign"
			@onMoveHome = "handleBack"
		></navbarDesign>

		<!-- body -->
		<div class="swap flex w-[100%] h-[88vh]">
			<!-- sideBar -->
			<div
				class="swap-sidebar w-fit min-w-[6%] border-slate-200 border"
			>
				<div
					v-for="(option, idx) in optionDesign"
					:key="idx"
					class="swap-sidebar__option md:p-2 2xl:p-4 cursor-pointer grid place-items-center"
					:class="option.active ? 'border-r-2 border-sky-500' : ''"
					@click="onMoveOption(idx, option.name)"
				>
					<icon
						v-if="option.name != 'Pixabay'"
						:icon="option.icon"
						class="font-black"
						size="lg"
						:style="{ color: option.active ? 'rgb(14 165 233)' : '' }"
					/>
					<img v-else src="../../assets/pixabay.svg" />
					<div
						class="text-sm p-1"
						:class="option.active ? 'text-sky-500' : ''"
					>
						{{ option.name }}
					</div>
				</div>
			</div>

			<baseSidebar
				:title="titleOption"
				:content="contentOption"
				:imagePixaBay="imagePixaBay"
				:isImage="isImage"
				:strokeDrawing="strokeDrawing"
				:nameOption="nameOption"
				@onClickImageUpload="onClickImageUpload"
				@onClickImageFixabay="onClickImageFixabay"
				@onClickStrokeDraw="onClickStrokeDraw"
			>
				<template v-slot:upload>
					<div class="swap-sidebar w-fit">
						<label
							class="swap-sidebar__option 2xl:p-4 md:p-2 cursor-pointer grid place-items-center w-fit border-dashed border-2 border-indigo-600"
						>
							<icon icon="fa-solid fa-upload" size="lg"></icon>
							<!-- <img v-else src="../../assets/pixabay.svg" /> -->
							<div class="text-sm p-1">Upload</div>
							<input
								class="hidden"
								type="file"
								id="file"
								ref="fileImageAsset"
								accept=".png"
								@input="uploadImageAsset"
							/>
						</label>
					</div>
				</template>
			</baseSidebar>

			<!--  <canvas></canvas>  -->

			<div class="swap-design relative bg-slate-100 w-[78%] h-[88vh]">
				<div class="design-nav bg-white w-[100%] h-[6vh] md:h-[50px]">
					<!-- tool text -->

					<div
						class="flex justify-center items-center"
						v-show="isBoxEditText"
					>
						<div
							class="container max-w-max mx-auto bg-white rounded-lg overflow-hidden"
						>
							<div class="toolbar p-1">
								<div class="btn-toolbar flex flex-wrap items-center">
									<select
										class="mr-3 w-[150px] h-10 bg-white border border-gray-400 rounded outline-none cursor-pointer"
										v-model="textDesign.fontFamily"
										@change="changeTextDesign"
									>
										<option value="" selected hidden disabled>
											Font size
										</option>
										<option
											v-for="(fontFamily, idx) in fontFamilyOptions"
											:key="idx"
											:style="{ 'font-family': fontFamily }"
										>
											{{ fontFamily }}
										</option>
									</select>
									<div
										class="mr-3 h-10 color bg-white border border-gray-400 rounded outline-none cursor-pointer flex items-center gap-2 px-2"
									>
										<span>Color</span>
										<input
											type="color"
											v-model="textDesign.textColor"
											@input="changeTextDesign"
										/>
									</div>
									<div
										class="me-3 h-10 color bg-white border border-gray-400 rounded outline-none cursor-pointer flex items-center gap-2 px-2"
									>
										<span>Background</span>
										<input
											type="color"
											v-model="textDesign.bgColor"
											@input="changeTextDesign"
										/>
									</div>
									<select
										class="mr-3 h-10 bg-white border border-gray-400 rounded outline-none cursor-pointer"
										v-model="textDesign.fontSize"
										@change="changeTextDesign"
									>
										<option value="" selected hidden disabled>
											Font size
										</option>
										<option value="20">Extra small</option>
										<option value="35">Small</option>
										<option value="40">Regular</option>
										<option value="44">Medium</option>
										<option value="48">Large</option>
										<option value="55">Extra Large</option>
										<option value="60">Big</option>
									</select>
									<div class="flex mr-3">
										<button
											class="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
											@click="changeTextStyle('bold')"
										>
											<icon icon=" fa-solid fa-bold" />
										</button>
										<div
											class="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
											@click="changeTextStyle('underline')"
										>
											<icon icon=" fa-solid fa-underline" />
										</div>
										<button
											class="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
											@click="changeTextStyle('italic')"
										>
											<icon icon=" fa-solid fa-italic" />
										</button>
									</div>
									<div class="flex mr-3">
										<button
											class="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
											@click="changeTextStyle('align-left')"
										>
											<icon icon=" fa-solid fa-align-left" />
										</button>
										<button
											class="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
											@click="changeTextStyle('align-right')"
										>
											<icon icon=" fa-solid fa-align-right" />
										</button>
										<button
											class="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
											@click="changeTextStyle('align-center')"
										>
											<icon icon=" fa-solid fa-align-center" />
										</button>
										<button
											class="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
											@click="changeTextStyle('align-justify')"
										>
											<icon icon=" fa-solid fa-align-justify" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- tool drawing -->
				</div>

				<!-- canvas content -->

				<div class="fit-h w-[80%] absolute left-[6%] pt-6 pl-0">
					<div
						class="canvas w-[100%] fit-w absolute flex justify-between bg-white p-1 shadow-xl border p-6 rounded-2xl"
					>
						<div class="md:w-[80px] 2xl:w-[90px] h-[100%] rounded p-2 md:px-0">
							<div
								@click="changeMode('front')"
								class="w-[100%] md:h-[100px] cursor-pointer rounded border-2 shadow-lg bg-white"
								:class="
									mode === 'front'
										? 'border-sky-300'
										: 'border-gray-200'
								"
							>
								front
							</div>
							<div
								@click="changeMode('back')"
								class="w-[100%] md:h-[100px] cursor-pointer mt-3 rounded border-2 shadow-lg bg-white"
								:class="
									mode === 'back' ? 'border-sky-300' : 'border-gray-200'
								"
							>
								back
							</div>
						</div>
						<div class="fit-w flex justify-center">
							<canvas ref="canvas" class="">
								<!-- <img src="../../assets/anh_test.png" ref="image" /> -->
							</canvas>
						</div>

						<div
							class="w-[60px] h-[100%] rounded p-2 flex justify-center flex-col"
						>
							<div
								@click="copySelectedObject"
								class="w-[100%]  cursor-pointer rounded border-2 p-1 shadow-lg bg-white"
							>
								<icon icon="fa-solid fa-copy" class="w-[2vh] h-[3vh]" />
							</div>
							<div
								@click="deleteSelectedObject"
								class="w-[100%] 2xl:h-[4vh] cursor-pointer 2xl:mt-3 md:mt-2 rounded border-2 p-1 shadow-lg bg-white"
							>
								<icon
									icon="fa-solid fa-trash"
									class="w-[2vh] h-[3vh]"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<img class="w-[200px] h-[300px bg-black]" :sr="imgPreviewFront"/>
	<img :sr="imgPreviewBack"/>

	<modalPreview
		:showModal="isShowPreview"
		:infoDesign = 'infoDesign'
		:type="typePreview"
		:previewFront="imgPreviewFront"
		:previewBack="imgPreviewBack"
		:shape="shape"
		@oncloseModal="oncloseModal"
		@onclickSaveDesign="clickSaveDesign"
	></modalPreview>

	<!-- <div v-if="imgCanvasPreview">
		<img  :src="imgCanvasPreview" alt="Hình ảnh từ canvas" />
	</div> -->
</template>
<script src="./designs"></script>
<style>
.detail-body {
	/* grid-template-columns: repeat(2, 1fr); */

	grid-gap: 6px;
	columns: 2 5px;

	grid-auto-flow: dense;
}

.image {
	width: 100%;
	margin-bottom: 5px;
	break-inside: avoid;
	height: fit-content;
	/* overflow: hidden; */
}

.image img {
	max-width: 100%;
	height: auto;
	object-fit: cover;
}
.swap-sidebar {
	display: inline-block;
}
</style>
