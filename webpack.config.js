const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

const federationConfig = {
    name: 'container',
    filename: 'remoteEntry.js',
    remotes: {
        mfe: "mfe@http://localhost:3001/remoteEntry.js",
    },
    // shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
};

module.exports = {
    entry: "./src/index.ts",
    mode: 'development',
    output: {
        publicPath: 'auto',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader"
            },
            {
                test: /\.css$/i,
                use: [
                    { loader: "style-loader" },
                    { loader: 'css-loader', options: { url: false } }
                ]
            }
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [
        new ModuleFederationPlugin(federationConfig),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
};