<template>
	<div class="interface">
		<h2>Publish Document</h2>
		<form @submit.prevent="publishDocument">
			<label>Name:</label>
			<input type="text" v-model="publishForm.name" required><br>
			<label>Description:</label>
			<input type="text" v-model="publishForm.description" required><br>
			<label>Tags:</label>
			<input type="text" v-model="publishForm.tags" required><br>
			<label>Namespace:</label>
			<input type="text" v-model="publishForm.URI" required><br>
			<p id="display-content">Enter HTML to start</p><br>
			<textarea v-model="publishForm.content" id="content" @change="contentChange()" required></textarea><br>
			<button type="submit">Publish</button>
			<p id="status"></p>
			<p>You will need to own a <nuxt-link to="/docs/namespace">namespace</nuxt-link> to publish.</p>
		</form>
	</div>
</template>

<script>
export default {
	async mounted() {
		if(this.$route.hash) {
			const kplace = {
				URI: this.$route.hash.split(".")[0].replace('#', ''),
				name: this.$route.hash.split(".")[1]
			};
			const response = await fetch("https://simplecircle.xyz/api/v1/docs/get", {
				method: "POST",
				body: JSON.stringify(kplace)
			});
			const data = (await response.json()).doc;
			if(data) {
				this.publishForm.name = kplace.name;
				this.publishForm.description = data.description;
				this.publishForm.tags = data.tags;
				this.publishForm.content = data.content
				this.publishForm.URI = kplace.URI;
			}
		}
	},
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
		contentChange() {
			let content = document.getElementById('content').value;
			let display = document.getElementById('display-content');
			display.innerHTML = content;
		}
	}
};
</script>

<style>
	textarea {
		width: 200px;
		height: 100px;
		border-radius: 10px;
		border: 1px solid var(---bg-color-low);
		color: black;
		outline: none;
		padding: 0px 10px;
	}
	input {
		border: 1px solid var(---bg-color-low);
		background-color: var(--bg-color-low);
		color: var(--text-color);
	}
</style>