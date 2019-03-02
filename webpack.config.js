const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
var webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: ['babel-polyfill','./js/main.js'],
	output: {
		path: path.resolve(__dirname, 'js'),
		filename: 'app.js'
	},
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader"
			}
		},{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					js: 'babel-loader',
					css: ['vue-style-loader', {
						loader: 'css-loader',
					}],
				}
			}
		}]
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	]
}