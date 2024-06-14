<script setup>
	import pencil from "../public/icons/pencil.svg"
</script>

<template>
	<div>
		<p id="status"></p>
		<span><h3 id="name"></h3><button id="edit-btn" @click="editDocument()"><img id="edit-btn-img" :src="pencil"/></button></span>
		<p id="description"></p>
		<p id="tags"></p>
		<p id="content"></p>
	</div>
</template>

<script>
export default {
	mounted() {
		this.getDocument();
	},
	methods: {
		async getDocument() {
			document.getElementById("name").innerHTML = "";
			document.getElementById("description").innerHTML = "";
			document.getElementById("tags").innerHTML = "";
			document.getElementById("content").innerHTML = "";
			document.getElementById("status").innerHTML = "";
			try {
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
					document.getElementById("name").innerHTML = kplace.name;
					document.getElementById("description").innerHTML = data.description;
					document.getElementById("tags").innerHTML = data.tags;
					document.getElementById("content").innerHTML = data.content;
					document.getElementById("status").innerHTML = "";
				}
				else {
					document.getElementById("status").innerHTML = "Document not found.";
				}
			} catch (error) {
				document.getElementById('status').innerHTML = "Fetch error.";
			}
		},
		async editDocument() {
			window.location.href = '/docs/publish' + this.$route.hash;
		}
	}
};
</script>

<style>
input {
	border: 1px solid var(---bg-color-low);
}
span {
	display: flex;
	align-items: center;
}

#edit-btn {
	padding: 0px 2px;
	cursor: pointer;
	border: none;
	background-color: var(--accent-color);
	color: #fff;
	border-radius: 50%;
	transition: background-color 0.3s;
	margin-left: auto;
}

#edit-btn:hover {
	background-color: var(--accent-color-hover);
}

#edit-btn:focus {
	outline: none;
	box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

#edit-btn-img {
	width: 15px;
	height: 15px;
	color: var(--bg-color-low);
}
</style>