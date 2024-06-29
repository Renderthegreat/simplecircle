export default ({ app }, inject) => {
	if (
		localStorage.getItem("IAcceptTheDanger") !== "true" &&
		window.location.protocol === "http:"
	) {
		const originalFetch = window.fetch;
		window.fetch = async (...args) => {
			console.error(
				"Fetch is blocked due to insecure connection (HTTP) and user not accepting the risk.",
			);
			return Promise.reject(
				new Error(
					"Fetch is blocked due to insecure connection (HTTP) and user not accepting the risk.",
				),
			);
		};
		

		inject("restoreFetch", () => {
			window.fetch = originalFetch;
		});
	} else {
		
	}
};
