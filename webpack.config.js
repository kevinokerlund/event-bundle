var webpack = require('webpack');

module.exports = {
	entry: './src/event-bundle.js',
	devtool: 'source-map',
	output: {
		path: './lib',
		filename: 'event-bundle.js',
		library: 'EB',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
		}),
	]
};
