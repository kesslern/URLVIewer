const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
    entry: './app/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'js/main.js'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.(html|css)$/, use: 'file-loader?name=[path][name].[ext]&context=./app'}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
    ]
};
