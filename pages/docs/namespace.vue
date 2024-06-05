<template>
	<div>
		<h2>Create Namespace</h2>
		<form @submit.prevent="createNamespace">
			<label>URI:</label>
			<input type="text" v-model="namespaceForm.URI" required><br>
			<label>Token:</label>
			<input type="text" :value="token" readonly><br>
			<button type="submit">Create Namespace</button>
			<p id="status"></p>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			namespaceForm: {
				URI: "",
			},
			token: localStorage.getItem('token') || ""
		};
	},
	methods: {
		async createNamespace() {
			try {
				this.namespaceForm.token = localStorage.getItem('token');
				const response = await fetch("https://simplecircle.xyz/api/v1/docs/namespace", {
					method: "POST",
					body: JSON.stringify(this.namespaceForm)
				});
				const data = await response.json();
				if(data.error&&data.error==="a+Namespace taken") {
					document.getElementById('status').innerHTML = data.error;
				}
				else if(!data.error) {
					document.getElementById('status').innerHTML = "Namespace created.";
				}
			} catch (error) {
				document.getElementById('status').innerHTML = "Fetch error.";
			}
		}
	}
};
</script>