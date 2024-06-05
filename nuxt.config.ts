export default defineNuxtConfig({
	devtools: { enabled: true },
	routeRules: {
		"/": { prerender: true },
	},
	generate: {
		fallback: true,
	},
	pages: true,
});
