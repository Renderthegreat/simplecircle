export default defineNuxtConfig({
	"devtools": { "enabled": true },
	"routeRules": {
		"/": { "prerender": true },
	},
	'pages': true,
});
