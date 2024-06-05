<template>
	<div class="auth-container">
		<img src="../../public/icons/renderlabs.svg" alt="renderlabs" class="rlc-icon-large" />
		<h2>Login with Renderlabs</h2>
		<p>Don't have an account? Click
			<a href="https://renderlabs.cloud/signup">Here</a>
		</p>
		<input type="text" placeholder="Email" id="email" />
		<input type="password" placeholder="Password" id="password" />
		<button onclick="
			async function login() {
				let status = document.getElementById('status');
				let email = document.getElementById('email').value;
				let password = document.getElementById('password').value;
				status.innerHTML = 'Logging in...';
				const response = await (await fetch('https://renderlabs.cloud/api/v1/auth/login', {
					method: 'POST',
					body: JSON.stringify({
						email: email,
						password: password
					}),
				})).json();
				const token = JSON.parse(response.responseJson).token;
				if (token) {
					const hasAccount = await (await fetch('https://simplecircle.xyz/api/v1/auth/token', {
						method: 'POST',
						body: JSON.stringify({
							token,
						}),
					})).json()
					
					if (hasAccount.user.results.length) {
						localStorage.setItem('token', token);
						window.location.href = '/';
					}
					else {
						const accountCreated = await (await fetch('https://simplecircle.xyz/api/v1/auth/createUser', {
							method: 'POST',
							body: JSON.stringify({
								token
							}),
						})).json();
						console.log('Account created.')
						localStorage.setItem('token', token);
						window.location.href = '/';
					}
				}
				else {
					status.innerHTML = 'Incorrect username or password.';
				}
			}
			login()
			" id="login">Login</button>
		<p id="status"></p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},
	mounted() {
		this.email = localStorage.getItem("email");
		this.password = localStorage.getItem("password");
	},
};
</script>

<style>
input {
	width: 200px;
	height: 40px;
	border-radius: 10px;
	border: 1px solid #efefef;
	padding: 0px 10px;
}

#login {
	border-radius: 10px;
	padding: 10px;
	background-color: var(--rlc-color);
	border-width: 0px;
	padding-left: 30px;
	padding-right: 30px;
}
</style>