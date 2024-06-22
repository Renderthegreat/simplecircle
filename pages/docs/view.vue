<script setup>
import imgPencil from "../public/icons/pencil.svg"
</script>

<template>
	<div id="docs-content">
		<div id="metadata">
			<p id="status"></p>
			<span>
				<h1 id="name"></h1>
				<button class="circle-btn" @click="editDocument()"><img id="edit-btn-img" :src="imgPencil" /></button>
			</span>
			<h3 id="description"></h3>
			<h3 id="tags"></h3>
		</div>
		<div id="votes">
			<button class="circle-btn" id="upvote-btn" @click="vote()"><img id="vote-btn-img" /></button>
			<h1 id="votes-count"></h1>
		</div>
		<div id="content"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			voted: null,
			votes: 0
		}
	},
	mounted() {
		this.getDocument();
		this.getVotes();
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
				let data = (await response.json());
				console.log(data)
				data = data.doc;
				
				if (data) {
					document.getElementById("name").innerHTML = kplace.name;
					document.getElementById("description").innerHTML = "description: " + data.description;
					document.getElementById("tags").innerHTML = "tags: " + data.tags;
					document.getElementById("content").innerHTML = data.content;
					document.getElementById("status").innerHTML = "";
				}
				else {
					document.getElementById("status").innerHTML = "Document not found.";
					for (let btn of document.getElementsByClassName("circle-btn")) {
						btn.style.display = "none";
					}
				}
			} catch (error) {
				document.getElementById("status").innerHTML = "Fetch error.";
				console.log(error);
			}
		},
		async editDocument() {
			this.$router.push('/docs/publish' + this.$route.hash)
		},
		async getVotes() {
			var response = await fetch("https://simplecircle.xyz/api/v1/docs/vote", {
				method: "POST",
				body: JSON.stringify({
					action: "getVotes",
					URI: this.$route.hash.split(".")[0].replace('#', ''),
					name: this.$route.hash.split(".")[1]
				})
			});
			var data = (await response.json());
			this.votes = data.votes - 1 == NaN ? "Create an account first" : data.votes;
			document.getElementById("votes-count").innerHTML = this.votes;
			var response = await fetch("https://simplecircle.xyz/api/v1/docs/vote", {
				method: "POST",
				body: JSON.stringify({
					action: "get",
					token: localStorage.getItem("token"),
					URI: this.$route.hash.split(".")[0].replace('#', ''),
					name: this.$route.hash.split(".")[1]
				})
			});
			var data = (await response.json());
			this.voted = data.voted;
			if (this.voted === true) {
				document.getElementById("vote-btn-img").src = "/icons/vote.svg";
			}
			else {
				document.getElementById("vote-btn-img").src = "/icons/unvote.svg";
			}
		},
		async vote() {
			const upvoteBtn = document.getElementById("upvote-btn");
			let action = this.voted ? "unvote" : "upvote";
			var response = await fetch("https://simplecircle.xyz/api/v1/docs/vote", {
				method: "POST",
				body: JSON.stringify({
					action,
					token: localStorage.getItem("token"),
					URI: this.$route.hash.split(".")[0].replace('#', ''),
					name: this.$route.hash.split(".")[1]
				})
			});
			var data = (await response.json());
			document.getElementById("votes-count").innerHTML = this.votes;
			var response = await fetch("https://simplecircle.xyz/api/v1/docs/vote", {
				method: "POST",
				body: JSON.stringify({
					action: "get",
					token: localStorage.getItem("token"),
					URI: this.$route.hash.split(".")[0].replace('#', ''),
					name: this.$route.hash.split(".")[1]
				})
			});
			var data = (await response.json());
			this.voted = data.voted;
			this.getVotes()
			if (this.voted) {
				upvoteBtn.classList.add('upvoted');
				setTimeout(() => upvoteBtn.classList.remove('upvoted'), 300);
			}
			else {
				upvoteBtn.classList.add('unvoted');
				setTimeout(() => upvoteBtn.classList.remove('unvoted'), 300);
			}
		},
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

.circle-btn {
	padding: 10px 12px;
	cursor: pointer;
	border: none;
	background-color: var(--accent-color);
	color: #fff;
	border-radius: 50%;
	transition: background-color 0.3s;
	margin-left: auto;
}

.circle-btn:hover {
	background-color: var(--accent-color-hover);
}

.circle-btn:focus {
	outline: none;
	box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.circle-btn img {
	width: 25;
	height: 25px;
	color: var(--bg-color-low);
}

#docs-content {
	margin: 80px;
}

#metadata {
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	padding: 10px;
	border-radius: 10px;
	display: inline-block;
}

#status #name,
#description,
#tags {
	margin: 10px;
}

#content {
	margin-top: 50px;
}

#votes {
	align-items: center;
	display: flex;
	margin-top: 50px;
	gap: 10px;
}

#upvote-btn {
	transition: transform 0.2s, background-color 0.2s;
}

#upvote-btn:hover {
	transform: scale(1.1);
}

@keyframes upvote-animation {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.2) rotate(-10deg);
	}

	100% {
		transform: scale(1) rotate(0deg);
	}
}

@keyframes unvote-animation {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.2) rotate(10deg);
	}

	100% {
		transform: scale(1) rotate(0deg);
	}
}

.upvoted {
	animation: upvote-animation 0.3s ease-in-out;
	background-color: #28a745 !important;
}

.unvoted {
	animation: downvote-animation 0.3s ease-in-out;
	background-color: #dc3545 !important;
}
</style>