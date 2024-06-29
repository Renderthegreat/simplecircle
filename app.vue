<template>
	<div>
		<HttpWarning v-if="!acceptedDanger && isHttp" />
		<div v-else>
			<application></application>
		</div>
	</div>
</template>

<script>
import HttpWarning from '~/components/HttpWarning.vue';
import { locateTheme } from './javascript/locate.js';
locateTheme("");


export default {
	components: {
		HttpWarning
	},
	data() {
		return {
			acceptedDanger: false,
			isHttp: false
		};
	},
	mounted() {
		const originalFetch = window.fetch;
		this.isHttp = window.location.protocol === 'http:';
		console.log("Protocol is " + window.location.protocol);
		this.acceptedDanger = localStorage.getItem('IAcceptTheDanger') === 'true';
		window.HTTPIgnore = () => {
			window.fetchSecure = originalFetch;
		};
		if (!this.isHttp) {
			window.fetchSecure = window.fetch;
		}
		
		else {
			window.fetchSecure = () => {
				alert("Secure operations can not be using HTTP. Type HTTPIgnore() to ignore this.");
			};
		}
	}
};
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

.interface {
	margin: 80px;
	margin-top: 120px;
}

.page {
	margin: 80px;
	margin-top: 120px;
}
</style>