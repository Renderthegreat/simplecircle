<template>
	<div class="auth-container">
		<button onclick="
			window.location.href = '/authority/renderlabs';
			">
			<img src="../public/icons/renderlabs.svg" alt="renderlabs" class="rlc-icon"/>
			<h2>Login with Renderlabs</h2>
		</button>
	</div>
</template>

<style>
	button {
		color: var(--text-color);
		background-color: var(--rlc-color);
		display: flex;
		align-items: center;
	}
</style>