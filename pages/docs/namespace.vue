<template>
	<div class="interface">
		<h2>Create Namespace</h2>
		<form @submit.prevent="createNamespace">
			<input type="text" v-model="namespaceForm.URI" placeholder="Namespace"  required><br>
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
			token: ""
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
				if (data.error && data.error === "a+Namespace taken") {
					document.getElementById('status').innerHTML = data.error;
				}
				else if (!data.error) {
					document.getElementById('status').innerHTML = "Namespace created.";
				}
			} catch (error) {
				document.getElementById('status').innerHTML = "Fetch error.";
			}
		}
	}
};
</script>
<style>
button {
	margin-top: 10px;
}
</style>