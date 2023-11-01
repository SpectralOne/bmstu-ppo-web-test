const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.tsx'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: './js/[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          },
        ],
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader'
          }
        ]
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     { loader: 'style-loader' },
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         publicPath: './Less',
      //         hmr: process.env.NODE_ENV === 'development',
      //       },
      //     },
      //     { loader: 'css-loader' },
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         strictMath: true,
      //         noIeCompat: true,
      //       }
      //     },
      //   ]
      // },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json', '.css']
  },
  devServer: {
    port: process.env.CPORT || 3001,
    open: true,
    hot: true,
    historyApiFallback: true,
    contentBase: './',
    proxy: {
      '/api/v1/**': {
        target: 'https://team-gen.com',
        secure: false,
        changeOrigin: true
      }
    }
  },
  optimization: {
    minimize: false
  },
  plugins: [
    // new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      title: 'Team Gen',
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: './css/[id].css',
    }),
    new CopyPlugin([
      { from: './src/client/assets', to: 'assets' },
    ])
  ],
};
