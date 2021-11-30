const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcDir = path.join(__dirname, 'src');
const imgDir = path.join(__dirname, 'img');
const htmlDir = path.join(__dirname, 'html');
const cssDir = path.join(__dirname, 'css');

module.exports = {
  mode: 'production',
  entry: {
    main: path.join(srcDir, 'main.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(htmlDir, 'main.html'), filename: 'main.html' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, 'manifest.json') },
        { from: path.join(cssDir, 'main.css') },
        { from: path.join(imgDir, 'border-48.png') },
      ],
    }),
  ],
};
