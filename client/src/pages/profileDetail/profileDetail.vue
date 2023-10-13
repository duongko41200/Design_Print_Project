<template>
	<div class="flex items-center justify-center">
		<div class="grid grid-flow-row">
			<h2 class="font-bold text-3xl text-center mb-3">
				Chỉnh sửa hồ sơ
			</h2>
			<p class="text-center my-2 flex justify-start  flex-col">
				Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm
				vào đây hiển thị cho bất kỳ ai có thể xem hồ sơ của bạn.
			</p>
			<div class="my-2 flex justify-start  flex-col">
				<p class="font-semibold text-start text-start">Ảnh:</p>
				<div class="flex flex-row items-center">
					<img
						src="@/assets/man.png"
						alt="AvatarUser"
						width="60"
						height="60"
						class="mr-3"
					/>
					<form>
						<label class="block">
							<input
								type="file"
								class="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold text-start
                                            file:bg-black file:text-white
                                            file:cursor-pointer"
							/>
						</label>
					</form>
				</div>
			</div>
			<div class="my-2 flex justify-start  flex-col">
				<p class="font-semibold text-start">UserName:</p>
				<input
					type="text"
					placeholder="Nhập tên của bạn"
					class="border-2 border-[#e9e9e9] rounded-2xl p-3 gap-3 w-2/3 focus:outline-none"
				/>
			</div>
			<div class="my-2 flex justify-start  flex-col">
				<p class="font-semibold text-start">Địa chỉ Email:</p>
				<input
					type="text"
					placeholder="Example@gmail.com"
					class="border-2 border-[#e9e9e9] rounded-2xl p-3 gap-3 w-2/3 focus:outline-none"
				/>
			</div>
			<div class="my-2 flex justify-start  flex-col">
				<p class="font-semibold text-start">Giới thiệu:</p>
				<input
					type="text"
					placeholder="Giới thiệu của bạn"
					class="border-2 border-[#e9e9e9] rounded-2xl p-3 gap-3 w-2/3 focus:outline-none"
				/>
			</div>
			<button
				class="bg-black text-white p-2 px-4 rounded-3xl max-w-max my-2 flex justify-start  flex-col"
			>
				Cập nhật
			</button>
		</div>
	</div>
</template>
