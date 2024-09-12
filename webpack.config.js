// webpack.config.js
const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import the plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: {
    'async_hooks': 'commonjs async_hooks',
    'crypto': 'commonjs crypto',
    'url': 'commonjs url',
    'path': 'commonjs path',
    'util': 'commonjs util',
    'stream': 'commonjs stream',
    'buffer': 'commonjs buffer',
    'fs': 'commonjs fs',
    'string_decoder': 'commonjs string_decoder',
    'querystring': 'commonjs querystring',
    'http': 'commonjs http',
    'net': 'commonjs net',
    'zlib': 'commonjs zlib',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        use: {
          loader: 'json-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './src/client/index.html', // Path to your HTML template
    //   filename: 'index.html', // Output HTML file name
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/client'),
          to: path.resolve(__dirname, 'build'),
          globOptions: {
            ignore: ['*.js', '*.css'], // Ignore files you don't want to copy
          }
        },
        {
          from: path.resolve(__dirname, 'src/server/server.js'),
          to: path.resolve(__dirname, 'build/server.js')
        },
        {
          from: path.resolve(__dirname, 'src/server/config.js'),
          to: path.resolve(__dirname, 'build/config.js')
        }
      ]
    })
  ],
  devServer: {
    static: path.join(__dirname, 'build'), // Serve your static files from here
    compress: true, // Gzip compress files for faster transfer
    port: 9000, // Set the server port to 9000
    // open: true, // Automatically open the browser when the server starts
    hot: true, // Enable hot module replacement (HMR) for live reloading
  },
};
