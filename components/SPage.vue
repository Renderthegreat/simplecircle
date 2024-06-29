<template>
	<div>
		<!--div class="grid-container">
			<div class="grid-item" v-for="(item, index) in gridItems" :key="index" :style="{ backgroundColor: item.color }">
		</div>
	</div -->
		<NuxtPage />
	</div>
</template>

<script>
export default {
	mounted() {
		/*setInterval(() => {
			if (this.pathDummy!==this.$route.path) {
				this.gridItems = this.createGridItems(100);
				this.startGridAnimation();
				this.pathDummy = this.$route.path;
			}
		}, 100)*/
		
		
	},
	data() {
		return {
			gridItems: [],
			pathDummy: "/"
		};
	},
	methods: {
		createGridItems(count) {
			const colors = ['purple', 'yellow', 'cyan'];
			return Array.from({ length: count }, () => ({
				color: colors[Math.floor(Math.random() * colors.length)],
			}));
		},
		startBlurAnimation() {
			console.log('startBlurAnimation');
			const items = document.querySelectorAll('.grid-item');
			items.forEach(item => {
				item.style.filter = 'blur(10px)';
				item.style.transition = 'filter 0.5s';
			});
			setTimeout(() => {
				items.forEach(item => {
					item.style.filter = 'blur(0)';
					item.style.display = 'none';
				});
			}, 500);
		},
	}
};
</script>

<style scoped>
.grid-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
	grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
	width: 100vw;
	height: 100vh;
}

.grid-item {
	width: 100%;
	height: 100%;
	transition: filter 0.5s, opacity 0.5s;
}

.grid-blur-enter-active,
.grid-blur-leave-active {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
	grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
	z-index: 999;
}

.grid-blur-enter,
.grid-blur-leave-to {
	opacity: 0;
}
</style>