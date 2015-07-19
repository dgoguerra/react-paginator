var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './demo/script.js',
    output: {
        path: './demo/build',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            // Extract css files into a separate native bundle
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },

            // limit=8192: only images equal or under 8KB
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' },

            { test: /\.jsx$/, loaders: ['jsx-loader'] },

            // Needed for the css-loader while loading bootstrap's css.
            // the url-loader uses DataUrls; the file-loader emits files.
            { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&minetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&minetype=image/svg+xml" }
        ]
    },
    resolve: {
        root: __dirname
    }
};
