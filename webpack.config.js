const globImporter = require('node-sass-glob-importer');
const { extract } = require('extract-text-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: extract([
					{
						loader: 'css-loader'
					}, {
						loader: 'sass-loader',
						options: {
							importer: globImporter()
						}
					}
				])
			}
		]
	}
}