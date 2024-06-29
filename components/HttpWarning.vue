<template>
	<div v-if="isHttp" class="http-warning">
		<img :src="warningIMG" class="warning-icon" />
		<span>
			Warning: You are accessing this site over an insecure connection (HTTP). Please switch to HTTPS for better
			security.
		</span>
		<button @click="toggleInfo" class="info-toggle-button">More Info</button>
		<div v-if="showInfo" class="info-panel">
			<!-- Detailed information about HTTP risks -->
			<p>
				Using HTTP exposes your data to potential interception by attackers, compromising your privacy and security.
				It's highly recommended to switch to HTTPS to encrypt your communication.
			</p>
		</div>
		<button @click="continueAnyway" class="continue-button">Continue Anyway</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import warningIMG from '../public/icons/warning.svg';

const isHttp = ref(true);
const showInfo = ref(false);

const toggleInfo = () => {
	showInfo.value = !showInfo.value;
};

const continueAnyway = () => {
	localStorage.setItem('IAcceptTheDanger', 'true');
	isHttp.value = false;
	this.$router.push('/');
};
</script>

<style scoped>
.http-warning {
	display: inline-block;
	align-items: center;
	position: fixed;
	top: 0;
	width: 100%;
	background-color: red;
	color: white;
	text-align: center;
	padding: 10px;
	z-index: 1000;
}

.warning-icon {
	width: 24px;
	height: 24px;
	margin-right: 10px;
	fill: yellow;
}

.info-toggle-button,
.continue-button {
	background-color: darkred;
	color: white;
	border: none;
	padding: 5px 10px;
	margin-left: 10px;
	border-radius: 5px;
	cursor: pointer;
}

.info-toggle-button:hover,
.continue-button:hover {
	background-color: crimson;
}

.info-panel {
	margin-top: 10px;
	padding: 10px;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 5px;
	text-align: left;
}
</style>