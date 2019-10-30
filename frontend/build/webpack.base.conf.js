//https://www.youtube.com/results?search_query=webpack+4++Jack+Coder
//https://habr.com/ru/post/444446/
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'static/'
}
module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		app: `${PATHS.src}/index.jsx`,
		race: `${PATHS.src}/race.jsx`,
		infoEdit: `${PATHS.src}/infoEdit.jsx`,
		info: `${PATHS.src}/info.jsx`,
		/*
		course: `${PATHS.src}/course.jsx`,
		courseEdit: `${PATHS.src}/courseEdit.jsx`,
		courseAll: `${PATHS.src}/courseAll.jsx`,
		aboutUs: `${PATHS.src}/aboutUs.jsx`,
		catalog: `${PATHS.src}/catalog.jsx`,
		trainingProgram: `${PATHS.src}/trainingProgram.jsx`,
		vendor: `${PATHS.src}/vendor.jsx`,
		teachingMethod: `${PATHS.src}/teachingMethod.jsx`,
		news: `${PATHS.src}/news.jsx`,
		*/
	},
	output: {		
		filename: `${PATHS.assets}js/[name].[hash].js`,
		path: PATHS.dist,
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',					
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [		
		{
			test: /\.jsx$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		}, {
			test: /\.(scss|css)$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {sourceMap: true}
				}, {
					loader: 'postcss-loader',
					options: {sourceMap: true, config: {path : './postcss.config.js'}}
				}, {
					loader: 'sass-loader',
					options: {sourceMap: true}
				}
			]
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		}, {
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: 'HEAP/',
			}
		}

		]
	},
	resolve: {
		alias: {
		}
	},	
	// регистрируем плагины
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].[hash].css`
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`,
			filename: 'index.html',
			inject: false,
			chunks: ['app', 'vendors']
		}),		
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/race.html`,
			filename: 'race.html',
			inject: false,
			chunks: ['race', 'vendors']
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/infoEdit.html`,
			filename: 'infoEdit.html',
			inject: false,
			chunks: ['infoEdit', 'vendors']
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/info.html`,
			filename: 'info.html',
			inject: false,
			chunks: ['info', 'vendors']
		}),/*
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/courseEdit.html`,
			filename: 'courseEdit.html',
			inject: false,
			chunks: ['courseEdit', 'vendors']
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/courseAll.html`,
			filename: 'courseAll.html',
			inject: false,
			chunks: ['courseAll', 'vendors']
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/aboutUs.html`,
			filename: 'aboutUs.html',
			inject: false,
			chunks: ['aboutUs', 'vendors']
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/catalog.html`,
			filename: 'catalog.html',
			inject: false,
			chunks: ['catalog', 'vendors']
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/trainingProgram.html`,
			filename: 'trainingProgram.html',
			inject: false,
			chunks: ['trainingProgram', 'vendors']
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/vendor.html`,
			filename: 'vendor.html',
			inject: false,
			chunks: ['vendor', 'vendors']
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/teachingMethod.html`,
			filename: 'teachingMethod.html',
			inject: false,
			chunks: ['teachingMethod', 'vendors']
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/news.html`,
			filename: 'news.html',
			inject: false,
			chunks: ['news', 'vendors']
		}),
		*/
		// копирование файлов
		new CopyWebpackPlugin([
			{from: `${PATHS.src}/assets/img`, to: `${PATHS.assets}img`},
			{from: `${PATHS.src}/assets/fonts`, to: `${PATHS.assets}fonts`},
			{from: `${PATHS.src}/static`, to: ''}
		]),
		new webpack.DefinePlugin({  
			// константа, чтобы картинки и другие ресурсы были доступны при изменении настройки webpack
			PARH_RESOURCE: `/${PATHS.assets}`
      	}),
      	// для работы с редактором страниц
      	new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	]
}