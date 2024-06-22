<script setup>
import imgNoResults from "../public/icons/noResult.svg"
</script>

<template>
	<div id="search-container">
		<div id="search-area">
			<input type="input" id="search-bar" placeholder="Search..." />
			<button @click="search()">Search</button>
		</div>
		<div id="search-results">
			<div id="search-results-list"></div>
			<img :src="imgNoResults" id="noResultsIcon" display="none" />
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			searchQuery: "",
			searchResults: [],
		};
	},
	async mounted() {
		this.searchQuery = this.$route.query.query;
		if (this.searchQuery) {
			document.getElementById('search-bar').value = this.searchQuery;
			await this.search(this.searchQuery);
		}
	},
	methods: {
		async executeQuery(query) {
			const res = await fetch(`https://simplecircle.xyz/api/v1/docs/search?query=${query}`, {
				method: "POST"
			})
			const data = await res.json()

			return data.results
		},
		async search(query) {
			if (!query) {
				try {
					query = document.getElementById('search-bar').value
					if (query.trim().length == 0) {
						return
					}
				}
				catch (err) {
					console.warn('An unexpected error occurred: ', err)
				}
			}
			this.searchResults = await this.executeQuery(query);
			const resultsList = document.getElementById("search-results-list");
			resultsList.innerHTML = "";
			if (this.searchResults.length > 0) {
				for (let result of this.searchResults) {
					result = JSON.parse(result);
					const resultElement = document.createElement("div");
					resultElement.innerHTML = `
					<a href="/docs/view#${result.URI + '.' + result.name}">${result.URI + '/' + result.name}</a>
					<p>${result.description}</p>
					`;
					resultElement.id = "search-result";
					resultsList.appendChild(resultElement);
				}
				document.getElementById("noResultsIcon").style.display = "none";
			}
			else {
				document.getElementById("noResultsIcon").style.display = "block";
			}
		}
	}
}
</script>

<style>
#search-container {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-top: 50px;
}

#search-bar {
	width: 300px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid var(--bg-color-low);
	padding: 5px;
	font-size: 16px;
}

#search-result {
	margin-top: 15px;
	border-radius: 5px;
	padding: 20px 100px;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}

#search-area {
	display: flex;
	margin-top: 20px;
}
</style>