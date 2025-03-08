/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				taprom: ["Taprom", "sans-serif"],
				ooohbaby: ["Oooh Baby", "sans-serif"],
				dancingscript: ["Dancing Script", "sans-serif"],
			},
			colors: {
				rose: "#F5BAD8",
				pomegranate: "#990F54",
				lavender: "#CEBAF5",
				grape: "#552EA3",
				peach: "#FFC3AD",
				carrot: "#E85E2C",
				raspberry: "#F5A3A3",
				tomato: "#C92C2C",
				egg: "#F6E8CA",
				eggwash: "#FFFCF5",
				mustard: "#F5B431",
				salt: "#FAFAFA",
				pepper: "#292929",
				mint: "#ABE0CE",
				broccoli: "#0A523A",
			},
		},
	},
	plugins: [],
};
