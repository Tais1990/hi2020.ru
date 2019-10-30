const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const modeConst = "development"
const devWebpackConfig = merge(baseWebpackConfig, {
	mode: 'development',	
	devtool: 'cheap-module-eval-source-map',

	devServer: {
		contentBase: baseWebpackConfig.externals.paths.dist + '/templates',
		port: 8081,
		overlay: {
			warning: false,
			errors: true
		}
	},
	plugins: [
	    new webpack.SourceMapDevToolPlugin({
	      filename: '[file].map'
	    }),
	    new webpack.DefinePlugin({  
			// константа, для передачи данных о режиме сборки, чтобы разделить разработку фронта и бека
			MODE_NAME: `"${modeConst}"`
      	})
	  ]

})
module.exports = new Promise((resolve, reject) => {
	resolve(devWebpackConfig);
})