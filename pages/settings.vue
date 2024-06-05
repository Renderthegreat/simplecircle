<template>
	<div id="settings">
		<button onclick="
			localStorage.removeItem('token');
			window.location.href = '/';
			">Logout</button>
	</div>
</template>