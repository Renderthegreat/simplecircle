<template>
	<div class="container">
		<div class="error-content">
			<h1>Oops! Page Not Found</h1>
			<p>The page you are looking for does not exist or has been moved.</p>
			<a href="/" class="home-link">Go back to the homepage</a>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'default'
}
</script>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #f8f9fa;
	color: #343a40;
	text-align: center;
	font-family: 'Arial', sans-serif;
}

.error-content {
	max-width: 500px;
	padding: 20px;
	border: 1px solid #dee2e6;
	border-radius: 10px;
	background-color: #ffffff;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
	font-size: 2.5em;
	margin-bottom: 20px;
	color: #dc3545;
}

p {
	font-size: 1.2em;
	margin-bottom: 30px;
}

.home-link {
	display: inline-block;
	padding: 10px 20px;
	color: #fff;
	background-color: #007bff;
	border-radius: 5px;
	text-decoration: none;
	transition: background-color 0.3s ease;
}

.home-link:hover {
	background-color: #0056b3;
}
</style>