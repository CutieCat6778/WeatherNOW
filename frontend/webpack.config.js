require('dotenv').config()
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/build'),
        publicPath: "/",
        filename: "[name].bundle.js"
    },
    devServer: {
        port: process.env.PORT || 80,
        watchContentBase: true,
        historyApiFallback: true,
        contentBase: './dist',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ],

    },
    plugins: [
        new webpack.DefinePlugin(
            {
                'process.env': JSON.stringify(process.env),
            }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: "components",
                    test: /[\\/]components[\\/]/,
                    enforce: true
                },
                pages: {
                    name: "pages",
                    test: /[\\/]pages[\\/]/,
                    enforce: true
                },
            }
        }
    },
    //...
};