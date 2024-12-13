const path = require("path");

module.exports = {
	webpack: {
		alias: {
			"bitesize-app": path.resolve(__dirname, "src"),
		},
	},
};
