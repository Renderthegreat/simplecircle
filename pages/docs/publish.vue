<template>
	<div class="interface">
		<h2>Publish Document</h2>
		<form @submit.prevent="publishDocument">
			<input v-model="publishForm.name" placeholder="Name" required /><br>

			<input v-model="publishForm.description" placeholder="Description" required /><br>

			<TagEditor v-model="publishForm.tags" required /><br>

			<input v-model="publishForm.URI" placeholder="URI" required /><br>
			<div class="ql-editor" id="viewer" />
			<QuillEditor v-model="publishForm.content" /><br>

			<button type="submit">Publish</button>
			<p id="status"></p>
			<p>You will need to own a <nuxt-link to="/docs/namespace">namespace</nuxt-link> to publish.</p>
		</form>
	</div>
</template>

<script>
import QuillEditor from '@/components/QuillEditor.vue';
import TagEditor from '@/components/tagInput.vue';

export default {
	components: {
		QuillEditor,
		TagEditor
	},
	async mounted() {
		if (this.$route.hash) {
			const kplace = {
				URI: this.$route.hash.split(".")[0].replace('#', ''),
				name: this.$route.hash.split(".")[1]
			};
			const response = await fetch("https://simplecircle.xyz/api/v1/docs/get", {
				method: "POST",
				body: JSON.stringify(kplace)
			});
			const data = (await response.json()).doc;
			if (data) {
				this.publishForm.name = kplace.name;
				this.publishForm.description = data.description;
				this.publishForm.tags = data.tags;
				console.log(data);
				this.publishForm.content.update(data.content);
				this.publishForm.URI = kplace.URI;
			}
		}
		setInterval(() => {
			this.contentChange()
		}, 100)
	},
	data() {
		return {
			publishForm: {
				name: "",
				description: "",
				tags: [],
				content: {},
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
				if (typeof this.publishForm.tags === "object") this.publishForm.tags = this.publishForm.tags.join(', ').replace(/\s+/g, '_')
				let formData = {};
				for (let item in this.publishForm) {
					formData[item] = this.publishForm[item];
				}
				console.log(JSON.stringify(formData))
				const response = await window.fetchSecure("https://simplecircle.xyz/api/v1/docs/publish", {
					method: "POST",
					body: JSON.stringify(formData)
				});

				const data = await response.json();
				if (data.error && data.error === "a+Access Denied") {
					document.getElementById('status').innerHTML = "You do not own this namespace.";
				} else if (!data.error) {
					document.getElementById('status').innerHTML = "Document published.";
				}
			} catch (error) {
				console.log(error)
				document.getElementById('status').innerHTML = "Fetch error.";
			}
		},
		contentChange() {
			let display = document.getElementById('viewer');
			let passthrough = this.publishForm.content;
			if (!passthrough.html) return
			if (display.innerHTML != passthrough.html) {
				this.publishForm.content = passthrough.html;
			}
			display.innerHTML = passthrough.html;
		}
	}
};
</script>

<style scoped>
textarea {
	width: 200px;
	height: 100px;
	border-radius: 10px;
	border: 1px solid var(--bg-color-low);
	color: black;
	outline: none;
	padding: 0px 10px;
}

input {
	border: 1px solid var(--bg-color-low);
	background-color: var(--bg-color-low);
	color: var(--text-color);
	margin-top: 10px;
	margin-bottom: 20px;
}

#viewer {
	border: 1px solid var(--bg-color-low);
}
</style>
