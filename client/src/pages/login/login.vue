<template>
	<div
		class="flex  w-[100vw] justify-center  h-[100vh] py-4 lg:px-8 bg-zinc-800"
	>
		<div
			class="w-[40%] p-4 rounded fit-h bg-zinc-700 flex flex-col shadow-lg justify-center items-center"
		>
			<div class="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2
					class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-white"
				
				>
					Sign in to your account
				</h2>
			</div>

			<div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
				<div class="">
					<label
						for="email"
						class="block text-sm text-start font-medium leading-6 text-gray-900 text-white font-bold"
						>Email address</label
					>
					<div class="mt-2">
						<div class="relative mt-2">
							<input
								class="p-2 rounded-xl border text-white w-full bg-zinc-700"
								type="email"
								name="email"
								placeholder="Email"
								v-model="email"
							/>
						</div>
					</div>
				</div>

				<div class="mt-4">
					<div class="flex items-center justify-between">
						<label
							for="password"
							class="block text-sm font-medium leading-6 text-gray-900 text-white font-bold"
							>Password</label
						>
						<div class="text-sm">
							<a
								href="#"
								class="font-semibold text-indigo-600 hover:text-indigo-500"
								>Forgot password?</a
							>
						</div>
					</div>
					<div class="relative mt-2">
						<input
							class="p-2 rounded-xl border w-full text-white bg-zinc-700"
							:type="showPassword ? 'password' : 'text'"
							name="password"
							placeholder="Password"
							v-model="password"
						/>
						<icon
							@click="onShowPassword"
							:icon="
								showPassword
									? 'fa-solid fa-eye'
									: 'fa-solid fa-eye-slash'
							"
							class="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
						/>
					</div>
				</div>

				<div class="mt-3">
					<button
						type="submit"
						class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						@click="onLogin"
					>
						Sign in
					</button>
				</div>

				<div class="mt-10 text-center text-sm text-gray-500">
					Not a member?
					{{ ' ' }}
					<router-link to="/signup">
						<button
							class="py-2 ml-2 h-[30px] bg-white border rounded-xl w-[100px] text-center hover:scale-110 duration-300"
						>
							Register
						</button>
					</router-link>
				</div>
			</div>
			<div class="mt-6 grid grid-cols-3 items-center text-gray-400">
					<hr class="border-gray-400" />
					<p class="text-center text-sm">OR</p>
					<hr class="border-gray-400" />
				</div>
			<button
				class="bg-white border w-[60%] rounded-xl mt-2 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
			>
				<svg
					class="mr-3"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 48 48"
					width="25px"
				>
					<path
						fill="#FFC107"
						d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
					/>
					<path
						fill="#FF3D00"
						d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
					/>
					<path
						fill="#4CAF50"
						d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
					/>
					<path
						fill="#1976D2"
						d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
					/>
				</svg>
				Login with Google
			</button>
		</div>
	</div>
</template>

<script>
import UserService from '@/sevices/user.service.js';
import { createNamespacedHelpers } from 'vuex';
const authMappper = createNamespacedHelpers('auth');
export default {
	data() {
		return {
			email: '',
			password: '',
			showPassword: true,
			showComfirmPassword: true,
		};
	},

	methods: {
		...authMappper.mapMutations(['SET_USER_INFO', 'SET_EMAIL']),
		async onLogin() {
			const login = await UserService.login({
				email: this.email,
				password: this.password,
			});
			console.log('login: ', login);
			if (login.data.status === 'success') {
				this.$toast.success('sign up success', {
					position: 'top-right',
					duration: 2000,
				});
				this.SET_USER_INFO(login.data.data[0]);
				localStorage.setItem('tokens', login.data.token);

				this.SET_EMAIL(login.data.data[0].email);

				this.$router.push('/');
			} else {
				this.$toast.error(`${login.data.reason}`, {
					position: 'top-right',
					duration: 2000,
				});
			}
		},

		onShowPassword() {
			this.showPassword = !this.showPassword;
		},
	},
};
</script>

<style></style>
