<template>
	<div id="settings">
		<div class="theme-switch">
			<label for="theme-toggle">Theme:</label>
			<input type="checkbox" @onload="onThemeLoad()" @change="toggleTheme()" id="theme-toggle">
			<span class="slider"></span>
		</div>
		<button id="logout-btn" @click="logout()" aria-label="Logout">Logout</button>
	</div>
</template>

<script>
import { locateTheme } from '../javascript/locate.js';

export default {
	mounted() {
		const themeToggle = document.getElementById('theme-toggle');
		const currentTheme = localStorage.getItem('theme');
		if (currentTheme === 'dark') {
			themeToggle.checked = true;
		}
	},
	methods: {
		toggleTheme() {
			const themeToggle = document.getElementById('theme-toggle');
			const currentTheme = localStorage.getItem('theme');
			if (currentTheme === 'dark') {
				themeToggle.checked = true;
				themeToggle.long = true;
			}

			console.log('Theme toggle clicked');
			if (themeToggle.checked&&!themeToggle.long) {
				localStorage.setItem('theme', 'dark');
			} else {
				localStorage.setItem('theme', 'light');
			}
			window.location.href = '/settings';
		},
		logout() {
			localStorage.removeItem('token');
			window.location.href = '/';
		}
	}
}
</script>

<style>
#settings {
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

#settings button {
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
	border: none;
	background-color: var(--accent-color);
	color: var(--text-color);
	border-radius: 5px;
	transition: background-color 0.3s;
}

#settings button:hover {
	background-color: var(--accent-color-hover);
}

#settings button:focus {
	outline: none;
	box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.theme-switch {
	display: flex;
	align-items: center;
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