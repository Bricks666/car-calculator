const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const paths = require('./paths');

const tsconfigFile = path.join(paths.root, 'tsconfig.json');

const getConfig = () => {
	/**
	 * @type {import('webpack').Configuration}
	 */
	const config = {
		entry: path.join(paths.src, 'index.tsx'),
		output: {
			path: paths.build,
			filename: 'static/js/[name].[contenthash:8].js',
			publicPath: '.',
			pathinfo: true,
			chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
			assetModuleFilename: 'static/media/[name].[hash][ext]',
			clean: true,
		},
		resolve: {
			plugins: [
				new TsconfigPathsPlugin({
					configFile: tsconfigFile,
				}),
			],
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
		},
		externals: '/node_modules/',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: ['babel-loader'],
				},
				{
					test: /\.ts(x?)$/,
					exclude: /node_modules/,
					use: [
						'babel-loader',
						{
							loader: 'ts-loader',
							options: {
								configFile: tsconfigFile,
							},
						},
					],
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
							options: {
								modules: {
									auto: /\.module.css$/,
									localIdentName: '[name]__[hash:base64]',
								},
							},
						},
					],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(paths.public, 'index.html'),
				minify: true,
			}),
			new MiniCssExtractPlugin(),
		],
	};

	return config;
};

module.exports = getConfig;
