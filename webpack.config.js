const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        // ADD YOUR JS FILE HERE
        aws: './src/js/aws.js',
        index: './src/js/index.js',
        test: './src/js/test.js',
        signup: './src/js/signup.js',
        login: './src/js/login.js', 
        requests: './src/js/requests.js', 
        mapSetup: './src/js/mapSetup.js',
        createPost: './src/js/createPost.js',
        home: './src/js/home.js',
        postdetails: './src/js/postdetails.js', 
        profile: './src/js/profile.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        overlay: true,
        hot: true
    },
    plugins: [
        new CopyWebpackPlugin(['./src/html/']),
        new CopyWebpackPlugin(['./src/css/']),
        new CopyWebpackPlugin(['./src/imgs/']),
        new webpack.HotModuleReplacementPlugin()
    ]
};