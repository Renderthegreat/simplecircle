export function locateTheme() {
	if(!window?.localStorage) {
		return;
	}
	let theme = localStorage.getItem("theme");
	if(theme === "dark") {
		const root = document.documentElement;
		root.style.setProperty("--bg-color", "#151515");
		root.style.setProperty("--bg-color-low", "#050505");
		root.style.setProperty("--text-color", "#ffffff");
	}
}
