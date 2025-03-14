const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader", // Creates `style` nodes from JS strings
					"css-loader", // Translates CSS into CommonJS
					"sass-loader", // Compiles Sass to CSS
				],
			},
		],
	},
};
