const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
    const isProd = env.production;
    const publicPath = isProd ? "/dischat/" : "/";

    return {
        entry: path.resolve(__dirname, "src/index.tsx"),
        mode: isProd ? "production" : "development",
        devtool: isProd ? "eval" : "source-map",
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist"),
            filename: '[name].[hash:8].js',
            sourceMapFilename: '[name].[hash:8].map',
            chunkFilename: '[id].[hash:8].js',
            publicPath,
            clean: true
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "public/index.html"),
                publicPath
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "public"),
                        to: path.resolve(__dirname, "dist"),
                        globOptions: {
                            ignore: ["**/index.html"]
                        }
                    }
                ]
            })
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"
                    ],
                    include: path.resolve(__dirname, 'src'),
                },
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    exclude: /node_modules/,
                    loader: "ts-loader"
                }
            ]
        },
        optimization: {
            minimize: true,
            usedExports: true,
            splitChunks: {
                chunks: 'all',
              },
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin(),
            ]
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            plugins: [new TsconfigPathsPlugin()]
        },
        devServer: {
            static: {
                directory: path.join(__dirname, "public")
            },
            compress: true,
            port: 3000,
            historyApiFallback: true,
            liveReload: false,
            hot: true,
            client: {
                overlay: false
            }
        }
    };
};
