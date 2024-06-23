<script setup>
import imgPencil from "../public/icons/pencil.svg"
</script>

<template>
	<link rel="stylesheet" href="https://cdn.quilljs.com/1.3.6/quill.snow.css">
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
		<div class="ql-editor" id="content"></div>
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


/*!
	 * Quill Editor v2.0.2
	 * https://quilljs.com
	 * Copyright (c) 2017-2024, Slab
	 * Copyright (c) 2014, Jason Chen
	 * Copyright (c) 2013, salesforce.com
	 */
.ql-container {
	box-sizing: border-box;
	font-family: Helvetica, Arial, sans-serif;
	font-size: 13px;
	height: 100%;
	margin: 0;
	position: relative
}

.ql-container.ql-disabled .ql-tooltip {
	visibility: hidden
}

.ql-container:not(.ql-disabled) li[data-list=checked]>.ql-ui,
.ql-container:not(.ql-disabled) li[data-list=unchecked]>.ql-ui {
	cursor: pointer
}

.ql-clipboard {
	left: -100000px;
	height: 1px;
	overflow-y: hidden;
	position: absolute;
	top: 50%
}

.ql-clipboard p {
	margin: 0;
	padding: 0
}

.ql-editor {
	box-sizing: border-box;
	counter-reset: list-0 list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
	line-height: 1.42;
	height: 100%;
	outline: none;
	overflow-y: auto;
	padding: 12px 15px;
	tab-size: 4;
	-moz-tab-size: 4;
	text-align: left;
	white-space: pre-wrap;
	word-wrap: break-word
}

.ql-editor>* {
	cursor: text
}

.ql-editor p,
.ql-editor ol,
.ql-editor pre,
.ql-editor blockquote,
.ql-editor h1,
.ql-editor h2,
.ql-editor h3,
.ql-editor h4,
.ql-editor h5,
.ql-editor h6 {
	margin: 0;
	padding: 0
}

@supports (counter-set:none) {

	.ql-editor p,
	.ql-editor h1,
	.ql-editor h2,
	.ql-editor h3,
	.ql-editor h4,
	.ql-editor h5,
	.ql-editor h6 {
		counter-set: list-0 list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9
	}
}

@supports not (counter-set:none) {

	.ql-editor p,
	.ql-editor h1,
	.ql-editor h2,
	.ql-editor h3,
	.ql-editor h4,
	.ql-editor h5,
	.ql-editor h6 {
		counter-reset: list-0 list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9
	}
}

.ql-editor table {
	border-collapse: collapse
}

.ql-editor td {
	border: 1px solid #000;
	padding: 2px 5px
}

.ql-editor ol {
	padding-left: 1.5em
}

.ql-editor li {
	list-style-type: none;
	padding-left: 1.5em;
	position: relative
}

.ql-editor li>.ql-ui:before {
	display: inline-block;
	margin-left: -1.5em;
	margin-right: .3em;
	text-align: right;
	white-space: nowrap;
	width: 1.2em
}

.ql-editor li[data-list=checked]>.ql-ui,
.ql-editor li[data-list=unchecked]>.ql-ui {
	color: #777
}

.ql-editor li[data-list=bullet]>.ql-ui:before {
	content: '\2022'
}

.ql-editor li[data-list=checked]>.ql-ui:before {
	content: '\2611'
}

.ql-editor li[data-list=unchecked]>.ql-ui:before {
	content: '\2610'
}

@supports (counter-set:none) {
	.ql-editor li[data-list] {
		counter-set: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9
	}
}

@supports not (counter-set:none) {
	.ql-editor li[data-list] {
		counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9
	}
}

.ql-editor li[data-list=ordered] {
	counter-increment: list-0
}

.ql-editor li[data-list=ordered]>.ql-ui:before {
	content: counter(list-0, decimal) '. '
}

.ql-editor li[data-list=ordered].ql-indent-1 {
	counter-increment: list-1
}

.ql-editor li[data-list=ordered].ql-indent-1>.ql-ui:before {
	content: counter(list-1, lower-alpha) '. '
}

@supports (counter-set:none) {
	.ql-editor li[data-list].ql-indent-1 {
		counter-set: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9
	}
}

@supports not (counter-set:none) {
	.ql-editor li[data-list].ql-indent-1 {
		counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9
	}
}

.ql-editor li[data-list=ordered].ql-indent-2 {
	counter-increment: list-2
}

.ql-editor li[data-list=ordered].ql-indent-2>.ql-ui:before {
	content: counter(list-2, lower-roman) '. '
}

@supports (counter-set:none) {
	.ql-editor li[data-list].ql-indent-2 {
		counter-set: list-3 list-4 list-5 list-6 list-7 list-8 list-9
	}
}

@supports not (counter-set:none) {
	.ql-editor li[data-list].ql-indent-2 {
		counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9
	}
}

.ql-editor li[data-list=ordered].ql-indent-3 {
	counter-increment: list-3
}

.ql-editor li[data-list=ordered].ql-indent-3>.ql-ui:before {
	content: counter(list-3, decimal) '. '
}

@supports (counter-set:none) {
	.ql-editor li[data-list].ql-indent-3 {
		counter-set: list-4 list-5 list-6 list-7 list-8 list-9
	}
}

@supports not (counter-set:none) {
	.ql-editor li[data-list].ql-indent-3 {
		counter-reset: list-4 list-5 list-6 list-7 list-8 list-9
	}
}

.ql-editor li[data-list=ordered].ql-indent-4 {
	counter-increment: list-4
}

.ql-editor li[data-list=ordered].ql-indent-4>.ql-ui:before {
	content: counter(list-4, lower-alpha) '. '
}

@supports (counter-set:none) {
	.ql-editor li[data-list].ql-indent-4 {
		counter-set: list-5 list-6 list-7 list-8 list-9
	}
}

@supports not (counter-set:none) {
	.ql-editor li[data-list].ql-indent-4 {
		counter-reset: list-5 list-6 list-7 list-8 list-9
	}
}

.ql-editor li[data-list=ordered].ql-indent-5 {
	counter-increment: list-5
}

.ql-editor li[data-list=ordered].ql-indent-5>.ql-ui:before {
	content: counter(list-5, lower-roman) '. '
}

@supports (counter-set:none) {
	.ql-editor li[data-list].ql-indent-5 {
		counter-set: list-6 list-7 list-8 list-9
	}
}

@supports not (counter-set:none) {
	.ql-editor li[data-list].ql-indent-5 {
		counter-reset: list-6 list-7 list-8 list-9
	}
}

.ql-editor li[data-list=ordered].ql-indent-6 {
	counter-increment: list-6
}

.ql-editor li[data-list=ordered].ql-indent-6>.ql-ui:before {
	content: counter(list-6, decimal) '. '
}

@supports (counter-set:none) {
	.ql-editor li[data-list].ql-indent-6 {
		counter-set: list-7 list-8 list-9
	}
}

@supports not (counter-set:none) {
	.ql-editor li[data-list].ql-indent-6 {
		counter-reset: list-7 list-8 list-9
	}
}

.ql-editor li[data-list=ordered].ql-indent-7 {
	counter-increment: list-7
}

.ql-editor li[data-list=ordered].ql-indent-7>.ql-ui:before {
	content: counter(list-7, lower-alpha) '. '
}

@supports (counter-set:none) {
	.ql-editor li[data-list].ql-indent-7 {
		counter-set: list-8 list-9
	}
}

@supports not (counter-set:none) {
	.ql-editor li[data-list].ql-indent-7 {
		counter-reset: list-8 list-9
	}
}

.ql-editor li[data-list=ordered].ql-indent-8 {
	counter-increment: list-8
}

.ql-editor li[data-list=ordered].ql-indent-8>.ql-ui:before {
	content: counter(list-8, lower-roman) '. '
}

@supports (counter-set:none) {
	.ql-editor li[data-list].ql-indent-8 {
		counter-set: list-9
	}
}

@supports not (counter-set:none) {
	.ql-editor li[data-list].ql-indent-8 {
		counter-reset: list-9
	}
}

.ql-editor li[data-list=ordered].ql-indent-9 {
	counter-increment: list-9
}

.ql-editor li[data-list=ordered].ql-indent-9>.ql-ui:before {
	content: counter(list-9, decimal) '. '
}

.ql-editor .ql-indent-1:not(.ql-direction-rtl) {
	padding-left: 3em
}

.ql-editor li.ql-indent-1:not(.ql-direction-rtl) {
	padding-left: 4.5em
}

.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {
	padding-right: 3em
}

.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {
	padding-right: 4.5em
}

.ql-editor .ql-indent-2:not(.ql-direction-rtl) {
	padding-left: 6em
}

.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {
	padding-left: 7.5em
}

.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {
	padding-right: 6em
}

.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {
	padding-right: 7.5em
}

.ql-editor .ql-indent-3:not(.ql-direction-rtl) {
	padding-left: 9em
}

.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {
	padding-left: 10.5em
}

.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {
	padding-right: 9em
}

.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {
	padding-right: 10.5em
}

.ql-editor .ql-indent-4:not(.ql-direction-rtl) {
	padding-left: 12em
}

.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {
	padding-left: 13.5em
}

.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {
	padding-right: 12em
}

.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {
	padding-right: 13.5em
}

.ql-editor .ql-indent-5:not(.ql-direction-rtl) {
	padding-left: 15em
}

.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {
	padding-left: 16.5em
}

.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {
	padding-right: 15em
}

.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {
	padding-right: 16.5em
}

.ql-editor .ql-indent-6:not(.ql-direction-rtl) {
	padding-left: 18em
}

.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {
	padding-left: 19.5em
}

.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {
	padding-right: 18em
}

.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {
	padding-right: 19.5em
}

.ql-editor .ql-indent-7:not(.ql-direction-rtl) {
	padding-left: 21em
}

.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {
	padding-left: 22.5em
}

.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {
	padding-right: 21em
}

.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {
	padding-right: 22.5em
}

.ql-editor .ql-indent-8:not(.ql-direction-rtl) {
	padding-left: 24em
}

.ql-editor li.ql-indent-8:not(.ql-direction-rtl) {
	padding-left: 25.5em
}

.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {
	padding-right: 24em
}

.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {
	padding-right: 25.5em
}

.ql-editor .ql-indent-9:not(.ql-direction-rtl) {
	padding-left: 27em
}

.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {
	padding-left: 28.5em
}

.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {
	padding-right: 27em
}

.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {
	padding-right: 28.5em
}

.ql-editor li.ql-direction-rtl {
	padding-right: 1.5em
}

.ql-editor li.ql-direction-rtl>.ql-ui:before {
	margin-left: .3em;
	margin-right: -1.5em;
	text-align: left
}

.ql-editor table {
	table-layout: fixed;
	width: 100%
}

.ql-editor table td {
	outline: none
}

.ql-editor .ql-code-block-container {
	font-family: monospace
}

.ql-editor .ql-video {
	display: block;
	max-width: 100%
}

.ql-editor .ql-video.ql-align-center {
	margin: 0 auto
}

.ql-editor .ql-video.ql-align-right {
	margin: 0 0 0 auto
}

.ql-editor .ql-bg-black {
	background-color: #000
}

.ql-editor .ql-bg-red {
	background-color: #e60000
}

.ql-editor .ql-bg-orange {
	background-color: #f90
}

.ql-editor .ql-bg-yellow {
	background-color: #ff0
}

.ql-editor .ql-bg-green {
	background-color: #008a00
}

.ql-editor .ql-bg-blue {
	background-color: #06c
}

.ql-editor .ql-bg-purple {
	background-color: #93f
}

.ql-editor .ql-color-white {
	color: #fff
}

.ql-editor .ql-color-red {
	color: #e60000
}

.ql-editor .ql-color-orange {
	color: #f90
}

.ql-editor .ql-color-yellow {
	color: #ff0
}

.ql-editor .ql-color-green {
	color: #008a00
}

.ql-editor .ql-color-blue {
	color: #06c
}

.ql-editor .ql-color-purple {
	color: #93f
}

.ql-editor .ql-font-serif {
	font-family: Georgia, Times New Roman, serif
}

.ql-editor .ql-font-monospace {
	font-family: Monaco, Courier New, monospace
}

.ql-editor .ql-size-small {
	font-size: .75em
}

.ql-editor .ql-size-large {
	font-size: 1.5em
}

.ql-editor .ql-size-huge {
	font-size: 2.5em
}

.ql-editor .ql-direction-rtl {
	direction: rtl;
	text-align: inherit
}

.ql-editor .ql-align-center {
	text-align: center
}

.ql-editor .ql-align-justify {
	text-align: justify
}

.ql-editor .ql-align-right {
	text-align: right
}

.ql-editor .ql-ui {
	position: absolute
}

.ql-editor.ql-blank::before {
	color: rgba(0, 0, 0, 0.6);
	content: attr(data-placeholder);
	font-style: italic;
	left: 15px;
	pointer-events: none;
	position: absolute;
	right: 15px
}

/*# sourceMappingURL=quill.core.css.map*/</style>