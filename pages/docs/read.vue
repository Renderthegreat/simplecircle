<template>
	<div>
		<h2>Get Document</h2>
		<form @submit.prevent="getDocument">
			<label>Namespace:</label>
			<input type="text" v-model="getForm.URI" required><br>
			<label>Name:</label>
			<input type="text" v-model="getForm.name" required><br>
			<button type="submit">Get Document</button>
			<p id="status"></p>
			<h3 id="name"></h3>
			<p id="description"></p>
			<p id="tags"></p>
			<p id="content"></p>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			getForm: {
				URI: "",
				name: ""
			},
		};
	},
	methods: {
		async getDocument() {
			document.getElementById("name").innerHTML = "";
			document.getElementById("description").innerHTML = "";
			document.getElementById("tags").innerHTML = "";
			document.getElementById("content").innerHTML = "";
			document.getElementById("status").innerHTML = "";
			try {
				const response = await fetch("https://simplecircle.xyz/api/v1/docs/get", {
					method: "POST",
					body: JSON.stringify(this.getForm)
				});
				const data = (await response.json()).doc;
				if (data) {
					document.getElementById("name").innerHTML = this.getForm.name;
					document.getElementById("description").innerHTML = data.description;
					document.getElementById("tags").innerHTML = data.tags;
					document.getElementById("content").innerHTML = data.content;
					document.getElementById("status").innerHTML = "Document found.";
				}
				else {
					document.getElementById("status").innerHTML = "Document not found.";
				}
			} catch (error) {
				document.getElementById('status').innerHTML = "Fetch error.";
			}
		},
	}
};
</script>