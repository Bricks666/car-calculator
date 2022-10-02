const { HotModuleReplacementPlugin } = require('webpack');
const { default: webpackMerge } = require('webpack-merge');
const baseConfig = require('./webpack.config');

const getConfig = () => {
	/**
	 * @type {import('webpack').Configuration}
	 */
	const config = {
		target: 'web',
		mode: 'development',
		devtool: 'source-map',
		devServer: {
			port: 3000,
			open: true,
			historyApiFallback: true,
			compress: true,
			server: 'http',
			watchFiles: ['./src/**/*.*'],
			hot: true,
		},
		plugins: [new HotModuleReplacementPlugin()],
	};

	return webpackMerge(baseConfig, config);
};

module.exports = getConfig;
