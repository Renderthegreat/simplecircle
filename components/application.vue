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
			<img :src="imgIcon" id="logo"/>
			<a href="/" class="logo-text">
				<h1 class="logo-text">Simple Circle</h1>
			</a>

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
					<v-if v-if="isLoggedIn">
						<a href="settings"></a>
					</v-if>
					<v-if v-if="!isLoggedIn">
						<a href="auth">Login</a>
					</v-if>
					
					<a href="/settings">Settings</a>
					<a href="#">Link 3</a>
				</div>
			</div>
		</div>
		<div id="main">
			<!-- Main -->
			<NuxtPage></NuxtPage>
		</div>
	</div>
</template>

<style>
	:root {
		--bg-color: #fafeff;
		--bg-color-low: #efefef;
		--text-color: #21212b;
		--rlc-color: #2c974b;
	}
	
	#header {
		background-color: #3b65ed;
		color: #fff;
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
		align-items: center;
	}
	
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	a,
	button,
	input,
	textarea,
	select {
		font-family: "Pixelify Sans", sans-serif;
		color: var(--text-color);
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
		border-radius: 2px;
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
		color: var(--bg-color);
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
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
	}
	
	.dropdown-content a:hover {
		background-color: #f1f1f1;
		border-radius: 10px;
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
				isLoggedIn: false,
			};
		},
		mounted() {
			this.isLoggedIn = !!localStorage.getItem("token");
		},
	}
</script>