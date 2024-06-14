<template>
	<application></application>
</template>

<script>
	import { locateTheme } from './javascript/locate.js';
	locateTheme();
</script>

<style>
	input {
		width: 200px;
		height: 40px;
		border-radius: 10px;
		border: 1px solid #efefef;
		padding: 0px 10px;
	}

	button {
		border-radius: 10px;
		padding: 10px;
		background-color: var(--rlc-color);
		border-width: 0px;
		padding-left: 20px;
		padding-right: 20px;
	}
	
	.auth-container {
		display: flex;
		border-radius: 10px;
		background-color: var(--bg-color-low);
		margin-left: 10%;
		padding: 20px;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 80vw;
		height: 80vh;
	}
	
	.rlc-icon {
		height: 20px;
		width: 20px;
	}
	
	.rlc-icon-large {
		height: 60px;
		width: 60px;
	}
</style>