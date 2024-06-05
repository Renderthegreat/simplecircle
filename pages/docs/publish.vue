<template>
	<div>
		<h2>Publish Document</h2>
		<form @submit.prevent="publishDocument">
			<label>Name:</label>
			<input type="text" v-model="publishForm.name" required><br>
			<label>Description:</label>
			<input type="text" v-model="publishForm.description" required><br>
			<label>Tags:</label>
			<input type="text" v-model="publishForm.tags" required><br>
			<label>Content:</label>
			<textarea v-model="publishForm.content" required></textarea><br>
			<label>Namespace:</label>
			<input type="text" v-model="publishForm.URI" required><br>
			<label>Token:</label>
			<input type="text" :value="token" readonly><br>
			<button type="submit">Publish</button>
			<p id="status"></p>
			<p>You will need a <a href="/docs/namespace">namespace</a> to publish</p>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			publishForm: {
				name: "",
				description: "",
				tags: "",
				content: "",
				URI: "",
				token: ""
			},
			token: ""
		};
	},
	methods: {
		async publishDocument() {
			try {
				this.publishForm.token = localStorage.getItem('token');
				
				const response = await fetch("https://simplecircle.xyz/api/v1/docs/publish", {
					method: "POST",
					body: JSON.stringify(this.publishForm)
				});
				const data = await response.json();
				console.log(data);
				if(data.error&&data.error==="a+Access Denied") {
					document.getElementById('status').innerHTML = "You do not own this namespace.";
				} else if(!data.error) {
					document.getElementById('status').innerHTML = "Document published.";
				}
			} catch (error) {
				document.getElementById('status').innerHTML = "Fetch error.";
			}
		},
	}
};
</script>