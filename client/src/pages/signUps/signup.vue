<template>

	<div
		class="flex  justify-center  fit-h py-4 bg-zinc-800"
	>
		<div
			class="w-[40%] p-4 rounded fit-h bg-zinc-700 flex flex-col shadow-lg justify-center items-center"
		>
			<div class="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2
					class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-white"
				
				>
				Register to your account
				</h2>
			</div>

			<div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">

				<div class="">
					<label
				
						class="block text-sm text-start font-medium leading-6 text-gray-900 text-white font-bold"
						>Username</label
					>
					<div class="mt-2">
						<div class="relative mt-2">
							<input
								class="p-2 rounded-xl border text-white w-full bg-zinc-700"
								type="text"
								name="username"
								placeholder="Email"
								v-model="username"
							/>
						</div>
					</div>
				</div>
				<div class="mt-4">
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
				<div class="mt-4">
					<div class="flex items-center justify-between">
						<label
							for="password"
							class="block text-sm font-medium leading-6 text-gray-900 text-white font-bold"
							>Comfirm password</label
						>
					</div>
					<div class="relative mt-2">
						<input
							class="p-2 rounded-xl border w-full text-white bg-zinc-700"
							:type="showPassword ? 'password' : 'text'"
							name="password"
							placeholder="Comfirm password"
							v-model="comfirmPassword"
						/>
						<icon
							@click="onShowComfirmPassword"
							:icon="
								showComfirmPassword
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
						@click="onSignup()"
					>
					Register
					</button>
				</div>

				<div class="mt-10 text-center text-sm text-gray-500">
					You have account?
					{{ ' ' }}
					<router-link to="/login">
						<button
							class="py-2 ml-2 h-[30px] bg-white border rounded-xl w-[100px] text-center hover:scale-110 duration-300"
						>
							Sign in
						</button>
					</router-link>
				</div>
			</div>
	
		</div>
	</div>
</template>

<script>
import UserService from '@/sevices/user.service.js';
export default {
	data() {
		return {
			username: '',
			email: '',
			password: '',
			comfirmPassword: '',
			showPassword: true,
			showComfirmPassword:true,
		};
	},

	methods: {
		async onSignup() {

			const signup = await UserService.signup({
				username: this.username,
				email: this.email,
				password: this.password,
				comfirmPassword:this.comfirmPassword
			});
			if (signup.data.status === 'success') {
				this.$toast.success('sign up success', {
					position: 'top-right',
					duration: 2000,
				});
				this.$router.push('/login');
			} else {
				this.$toast.error(`${signup.data.reason}`, {
					position: 'top-right',
					duration: 2000,
				});
			}
		},

		onShowPassword() {
			console.log('show password', this.showPassword);
			this.showPassword = !this.showPassword;
		},
		onShowComfirmPassword() {
			this.showComfirmPassword = !this.showComfirmPassword;
		}
	},
};
</script>

<style></style>
