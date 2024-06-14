import metadata from "./metadata.json";

export default {
	head: {
		titleTemplate: "%s - SimpleCircle.xyz",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				hid: "description",
				name: "description",
				content: "Welcome to SimpleCircle.xyz",
			},
		],
	},
	router: {
		extendRoutes(routes, resolve) {
			routes.forEach((route) => {
				route.meta = route.meta || {};
				route.meta.description =
					metadata[route.name]?.description ||
					"Welcome to SimpleCircle.xyz";
			});
		},
	},
	devtools: { enabled: true },
	routeRules: {
		"/": { prerender: true },
	},
	router: {
		mode: "history",
	},
	generate: {
		fallback: true,
	},
	pages: true,
};
