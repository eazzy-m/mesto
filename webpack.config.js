const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/pages/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8030,
        open: true
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[hash].[ext]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash].[ext]',
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    "postcss-loader"
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({template: './index.html'}),
        new MiniCssExtractPlugin()
    ]
}