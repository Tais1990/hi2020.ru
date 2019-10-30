const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const modeConst = "production"
const buildWebpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	plugins: [
		new webpack.DefinePlugin({  
			// константа, для передачи данных о режиме сборки, чтобы разделить разработку фронта и бека
			MODE_NAME: `"${modeConst}"`
			})
	]

})
module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig);
})