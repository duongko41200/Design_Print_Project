<template>
	<div
		class="sidebar border"
		:class="isOpened ? 'open' : ''"
		:style="cssVars"
	>
		<div class="logo-details border">
			<img
				v-if="menuLogo"
				:src="menuLogo"
				alt="menu-logo"
				class="menu-logo icon"
			/>
			<div v-if="!isOpened" class="h-10"></div>
			<!-- <img v-else :src="menuIcon" class="bx icon" /> -->
			<div class="logo_name">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						width="200"
						zoomAndPan="magnify"
						viewBox="0 0 178 48"
						height="54"
						preserveAspectRatio="xMidYMid meet"
						version="1.0"
					>
						<defs><g /></defs>
						<g fill="#000000" fill-opacity="1">
							<g transform="translate(23.407084, 35.482279)">
								<g>
									<path
										d="M 1.488281 -0.269531 L 1.488281 0 L 14.671875 0 L 14.671875 -0.269531 C 12.5 -0.269531 11.160156 -1.457031 11.160156 -3.421875 L 11.160156 -12.054688 L 21.339844 -12.054688 L 21.339844 -3.421875 C 21.339844 -1.457031 20 -0.269531 17.828125 -0.269531 L 17.828125 0 L 31.011719 0 L 31.011719 -0.269531 C 28.839844 -0.269531 27.5 -1.457031 27.5 -3.421875 L 27.5 -22.230469 C 27.5 -24.195312 28.839844 -25.386719 31.011719 -25.386719 L 31.011719 -25.652344 L 17.828125 -25.652344 L 17.828125 -25.386719 C 20 -25.386719 21.339844 -24.195312 21.339844 -22.230469 L 21.339844 -12.320312 L 11.160156 -12.320312 L 11.160156 -22.230469 C 11.160156 -24.195312 12.5 -25.386719 14.671875 -25.386719 L 14.671875 -25.652344 L 1.488281 -25.652344 L 1.488281 -25.386719 C 3.660156 -25.386719 5 -24.195312 5 -22.230469 L 5 -3.421875 C 5 -1.457031 3.660156 -0.269531 1.488281 -0.269531 Z M 1.488281 -0.269531 "
									/>
								</g>
							</g>
						</g>
						<g fill="#000000" fill-opacity="1">
							<g transform="translate(55.901159, 35.482279)">
								<g>
									<path
										d="M 15.296875 0.207031 C 20.65625 0.207031 25.148438 -2.589844 25.148438 -8.125 L 25.148438 -22.378906 C 25.148438 -24.253906 26.429688 -25.386719 28.511719 -25.386719 L 28.511719 -25.652344 L 21.488281 -25.652344 L 21.488281 -25.386719 C 23.628906 -25.386719 24.878906 -24.253906 24.878906 -22.378906 L 24.878906 -8.125 C 24.878906 -2.113281 19.34375 -0.148438 16.457031 -0.148438 C 11.785156 -0.148438 10.953125 -6.367188 10.953125 -10.59375 L 10.953125 -22.441406 C 10.953125 -24.195312 12.144531 -25.386719 14.316406 -25.386719 L 14.316406 -25.652344 L 1.488281 -25.652344 L 1.488281 -25.386719 C 3.632812 -25.386719 4.882812 -24.195312 4.882812 -22.230469 L 4.882812 -8.332031 C 4.882812 -3.453125 10.328125 0.207031 15.296875 0.207031 Z M 15.296875 0.207031 "
									/>
								</g>
							</g>
						</g>
						<g fill="#000000" fill-opacity="1">
							<g transform="translate(85.895689, 35.482279)">
								<g>
									<path
										d="M 14.492188 0 C 16.042969 0 17.5 -0.269531 18.898438 -0.773438 C 21.546875 -1.546875 24.40625 -1.367188 24.492188 -0.269531 L 24.761719 -0.269531 L 24.761719 -8.273438 C 24.820312 -10.148438 26.101562 -11.28125 28.152344 -11.28125 L 28.152344 -11.546875 L 15.328125 -11.546875 L 15.328125 -11.28125 C 17.261719 -11.28125 18.660156 -10.207031 18.691406 -8.242188 L 18.691406 -1.25 C 17.589844 -0.773438 15.683594 -0.355469 14.492188 -0.355469 C 12.648438 -0.355469 7.558594 -1.578125 7.53125 -13.035156 C 7.558594 -24.492188 12.648438 -25.714844 14.492188 -25.714844 C 15.058594 -25.714844 16.367188 -25.59375 17.917969 -25.117188 C 21.160156 -24.015625 22.917969 -21.933594 23.003906 -18.78125 L 23.273438 -18.78125 L 23.273438 -25.804688 L 23.003906 -25.804688 C 22.917969 -24.671875 21.695312 -24.464844 18.898438 -25.296875 C 17.5 -25.804688 16.042969 -26.070312 14.492188 -26.070312 C 11.070312 -26.070312 7.855469 -24.730469 5.386719 -22.351562 C 3.007812 -19.941406 1.667969 -17.023438 1.488281 -13.808594 L 1.488281 -12.320312 C 1.875 -5.417969 7.617188 0 14.492188 0 Z M 14.492188 0 "
									/>
								</g>
							</g>
						</g>
						<g fill="#000000" fill-opacity="1">
							<g transform="translate(115.533142, 35.482279)">
								<g>
									<path
										d="M 14.523438 0 C 21.726562 0 27.558594 -5.832031 27.558594 -13.035156 C 27.558594 -20.207031 21.695312 -26.070312 14.523438 -26.070312 C 7.351562 -26.070312 1.488281 -20.207031 1.488281 -13.035156 C 1.488281 -5.953125 7.261719 0 14.523438 0 Z M 14.523438 -0.355469 C 12.679688 -0.355469 7.558594 -1.308594 7.558594 -13.035156 C 7.589844 -24.492188 12.679688 -25.714844 14.523438 -25.714844 C 16.398438 -25.714844 21.488281 -24.492188 21.488281 -13.035156 C 21.488281 -1.308594 16.398438 -0.355469 14.523438 -0.355469 Z M 14.523438 -0.355469 "
									/>
								</g>
							</g>
						</g>
					</svg>
				</div>
			</div>
			<i
				class="bx"
				:class="isOpened ? 'bx-menu-alt-right' : 'bx-menu w-[100%]'"
				id="btn"
				@click="isOpened = !isOpened"
			/>
		</div>

		<div
			style="
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex-grow: 1;
				max-height: calc(100% - 60px);
			"
		>
			<div id="my-scroll" style="margin: 6px 14px 0 14px">
				<ul class="nav-list" style="overflow: visible">
					<!-- <li id="links_search" v-if="isSearch" @click="isOpened = true">
						<i class="bx bx-search" />
						<input
							type="text"
							:placeholder="searchPlaceholder"
							@input="$emit('search-input-emit', $event.target.value)"
						/>
						<span data-target="links_search" class="tooltip">{{ searchTooltip }}</span>
					</li> -->

					<li
						v-for="(menuItem, index) in menuItems"
						:key="index"
						:id="'links_' + index"
					>
						<router-link v-if="isUsedVueRouter" :to="menuItem.link">
							<i
								class="bx fs-4"
								:class="menuItem.icon || 'bx-square-rounded'"
							/>
							<span class="links_name">{{ menuItem.name }} </span>
						</router-link>
						<router-link
							v-else
							@click.stop.prevent="
								$emit('menuItemClcked', menuItem.link)
							"
							:to="menuItem.link"
						>
							<i
								class="bx fs-4"
								:class="menuItem.icon || 'bx-square-rounded'"
							/>
							<span class="links_name">{{ menuItem.name }}</span>
						</router-link>
						<span :data-target="'links_' + index" class="tooltip">{{
							menuItem.tooltip || menuItem.name
						}}</span>
					</li>
					<li>
						<div
							v-if="isUsedVueRouter"
							class="flex items-center hover:bg-black cursor-pointer"
						>
							<i
								class="bx fs-4"
								:class="'bx-cog' || 'bx-square-rounded'"
							/>
							<span class="links_name">Quản trị </span>
						</div>
						<div
							v-else
							class="flex items-center hover:bg-black cursor-pointer hover:text-white rounded-xl"
							:class = "isSelectByAdmin?'bg-black text-white rounded-b-none':''"
							@mouseover="handleHover"
							@mouseleave="handleOver"
							@click="onClickAdmin"
						>
							<i
								class="bx fs-4 bx-cog" 
								:class="isHover === true?'text-white':''||isSelectByAdmin?'bg-black text-white ':''"
							/>
							<span class="links_name w-[100px] text-start"
							v-if="isOpened == true"
					
								>Quản trị</span
							>
							<icon icon="fa-solid fa-caret-down" style="color: #fff" />
						</div>
						<!-- <span :data-target="'links_' + index" class="tooltip">{{
							menuItem.tooltip || menuItem.name
						}}</span> -->

						<div class="border  shadow-sm rounded-b-xl" v-show="isSelectByAdmin == true">
							<div class="text-start p-2 hover:bg-black hover:text-white" @click="onMoveManageUser"> quản lý user</div>
							<div class="text-start p-2 hover:bg-black hover:text-white" @click="onMoveManageProduct">quan lý mẫu</div>
						</div>
					</li>
				</ul>
			</div>

			<div v-if="isLoggedIn" class="profile bg-white">
				<div class="profile-details">
					<img v-if="profileImg" :src="profileImg" alt="profileImg" />
					<i v-else class="bx bxs-user-rectangle" />
					<div class="name_job">
						<div class="name">
							{{ profileName }}
						</div>
						<div class="job">
							{{ profileRole }}
						</div>
					</div>
				</div>
				<i
					v-if="isExitButton"
					class="bx bx-log-out text-slate-50"
					id="log_out"
					@click.stop="$emit('button-exit-clicked')"
					style="color: #fff"
				/>
			</div>
		</div>
	</div>
</template>
<script src="./SideBar.js"></script>
<style src="./SideBar.css"></style>
