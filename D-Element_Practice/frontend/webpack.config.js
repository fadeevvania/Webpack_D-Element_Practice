const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

/*let isDev = process.env.NODE_ENV === 'development';
if (process.env.NODE_ENV === 'production') {
    isDev = 'production';
}*/

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';
    return {
        entry: './src/app.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: isProd ? 'js/[name].[contenthash].js' : 'js/[name].js',
            clean: true,
        },
        devtool: isProd ? false : 'inline-source-map'   ,
        devServer: {
            watchFiles: path.join(__dirname, 'src'),
            port: 9000,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    options: {
                        pretty: true
                    }
                },
                {
                    test: /\.(pcss|css)$/i,
                    use: [
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    config: path.resolve(__dirname, 'postcss.config.js'),
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg)($|\?)|\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name][ext]',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src/pages', 'template.pug'),
                filename: 'index.html',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {from: 'src/fonts', to: 'fonts'},
                    {from: 'src/images', to: 'images'},
                ],
            }),
            new MiniCssExtractPlugin({
                filename: './styles/[name].[contenthash].css',
            }),
            new StylelintPlugin({
                files: path.resolve(__dirname, 'src/styles/**/*.(pcss|css)'),
                fix: true,
            }),
            new EslintPlugin({
                files: path.resolve(__dirname, 'src/js/**/*.(js|jsx|ts|tsx)'),
                fix: true,
            }),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin(),
            ],
        },
    };
}
