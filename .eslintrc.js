/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		"prettier/prettier": [
			"error",
			{
				printWidth: 80,
				trailingComma: "es5",
				semi: true,
				singleQuote: true,
				jsxSingleQuote: false,
				useTabs: true,
				endOfLine: "auto",
			},
		],
	},
}
