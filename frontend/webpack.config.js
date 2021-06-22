require('dotenv').config();
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: "/",
        filename: "[name].bundle.js"
    },
    devServer: {
        port: process.env.PORT || 3000,
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
        new webpack.DefinePlugin({
            'process.env': {
                BACKEND_URL: JSON.stringify(process.env.BACKEND_URL)
            },
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
            }
        }
    },
    //...
};