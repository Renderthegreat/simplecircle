<template>
	<div id="bottom-settings">
		<div class="theme-switch">
			<label for="theme-toggle">Theme:</label>
			<input type="checkbox" @change="toggleTheme" id="theme-toggle">
			<span class="slider"></span>
		</div>
		<button id="logout-btn" @click="logout" aria-label="Logout">Logout</button>
	</div>
</template>

<script>
import { locateTheme } from '../javascript/locate.js';

export default {
	data() {
		return {
			initialLoad: true
		};
	},
	mounted() {
		const themeToggle = document.getElementById('theme-toggle');
		const currentTheme = localStorage.getItem('theme');
		if (currentTheme === 'dark') {
			themeToggle.checked = true;
		}
		this.initialLoad = false;
	},
	methods: {
		toggleTheme() {
			const themeToggle = document.getElementById('theme-toggle');
			const newTheme = themeToggle.checked ? 'dark' : 'light';
			localStorage.setItem('theme', newTheme);
			console.log(`Theme is now ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)}`);
			if (!this.initialLoad) {
				locateTheme();
			}
		},
		logout() {
			localStorage.removeItem('token');
			window.location.href = '/';
		}
	}
}
</script>

<style>
#bottom-settings {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: var(--bg-color-low);
}

#bottom-settings button {
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
	border: none;
	background-color: var(--accent-color);
	color: var(--text-color);
	border-radius: 5px;
	transition: background-color 0.3s;
}

#bottom-settings button:hover {
	background-color: var(--accent-color-hover);
}

#bottom-settings button:focus {
	outline: none;
	box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.theme-switch {
	display: flex;
}

.theme-switch label {
	margin-right: 10px;
}

.theme-switch input[type="checkbox"] {
	appearance: none;
	width: 40px;
	height: 20px;
	background: #ccc;
	border-radius: 20px;
	border: none;
	position: relative;
	outline: none;
	cursor: pointer;
	transition: background 0.3s;
}

.theme-switch input[type="checkbox"]:checked {
	background: #007bff;
}

.theme-switch input[type="checkbox"]:before {
	content: '';
	position: absolute;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	top: 1px;
	left: 0px;
	background: white;
	transition: transform 0.3s;
}

.theme-switch input[type="checkbox"]:checked:before {
	transform: translateX(20px);
}
</style>
