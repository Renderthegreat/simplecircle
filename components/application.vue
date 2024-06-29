<script setup>
import imgIcon from "../public/icons/icon.svg"
</script>

<template>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link
		href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Quicksand:wght@300..700&display=swap"
		rel="stylesheet">
	<div id="app">
		<div id="header">
			<img :src="imgIcon" id="logo" />
			<nuxt-link to="/" class="logo-text">
				<h1 class="logo-text">Simple Circle</h1>
			</nuxt-link>
			<div class="dropdown">
				<button onclick="
					const dropdownContent = document.getElementById('dropdown-content');
					const dropdownButton = document.getElementById('menu-button');
					if(dropdownButton.style.borderRadius!=='10px'&&dropdownButton.style.borderRadius!=='10px 10px 0px 0px') {
						dropdownButton.style.borderRadius = '10px';
					}
					dropdownContent.style.display = dropdownContent.style.display === 'inline-block' ? 'none' : 'inline-block';
					dropdownButton.style.borderRadius = dropdownButton.style.borderRadius !== '10px' ? '10px' : '10px 10px 0px 0px';
					" id="menu-button"></button>
				<div id="dropdown-content" style="display: none;" class="dropdown-content">
					<input type="input" id="search-mini" placeholder="Search..." @change="search()" />
					<v-if v-if="isLoggedIn">

					</v-if>
					<v-if v-if="!isLoggedIn">
						<nuxt-link to="/auth">Login</nuxt-link>
					</v-if>
					<nuxt-link to="/settings">Settings</nuxt-link>
					<nuxt-link to="/docs/publish">Publish</nuxt-link>
				</div>
			</div>
		</div>
		<div id="main">
			<!-- Main -->
			<transition name="blur" mode="out-in">
				<SPage />
			</transition>
		</div>
	</div>
</template>

<style>
:root {
	--bg-color: #ffffff;
	--bg-color-low: #efefef;
	--text-color: #21212b;
	--rlc-color: #2c974b;
	--accent-color: #007bff;
	--accent-color-hover: #0056b3;
}

#header {
	background-color: #3b45ed;
	color: #ffffff;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

body {
	background-color: var(--bg-color);
}

body,
div {
	margin: 0;
	padding: 0;
	align-items: center;
}

* {
	font-family: "Roboto", sans-serif;
	color: var(--text-color);
	outline: none;

}

input {
	background-color: var(--bg-color-low);
	border: none;
	-webkit-appearance: none;
}

#menu-button {
	color: var(--bg-color);
	background-color: #3039e3;
	border-color: transparent;
	border-width: 0;
	width: 40px;
	height: 40px;
	border-radius: 10px;
	position: relative;
	cursor: pointer;
	margin-left: auto;
	display: flex;
	align-items: center;
	justify-content: center;
}

#menu-button::before,
#menu-button::after {
	content: "";
	position: absolute;
	left: 50%;
	background-color: currentColor;
	width: 60%;
	height: 4px;
}

#menu-button::before {
	top: 36%;
	transform: translateX(-50%);
}

#menu-button::after {
	top: 56%;
	transform: translateX(-50%);
}

.logo-text {
	text-decoration: none;
	color: #ffffff;
}

#main {
	margin-top: 70px;
}

.dropdown {
	position: relative;
	display: inline-block;
	padding-right: 10px;
	margin-left: auto;
}

.dropdown-content {
	position: absolute;
	background-color: var(--bg-color);
	border-radius: 10px 0px 10px 10px;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	margin-left: -120px;
	display: none;
}

.dropdown-content a {
	padding: 12px 16px;
	text-decoration: none;
	display: block;
}

.dropdown-content a:hover {
	background-color: var(--bg-color-low);
}

.dropdown-content #search-mini {
	padding: 12px 8px;
	text-decoration: none;
	display: block;
	border-radius: 10px 0px 0px 0px;
	background-color: var(--bg-color);
	border: none;
}


#logo {
	border-radius: 20px;
	margin-right: 10px;
	margin-left: 10px;
	border-color: black;
	border-width: 10px;
	height: 50px;
}
</style>

<script>
export default {
	data() {
		return {
			isLoggedIn: false
		};
	},
	mounted() {
		this.isLoggedIn = !!localStorage.getItem("token");
	},
	methods: {
		search() {
			this.$router.push(`/docs/search?query=${document.getElementById("search-mini").value}`);
		},
	}
}
</script>