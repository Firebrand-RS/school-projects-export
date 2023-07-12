const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const APP_NAME = 'Minesweeper';
const SOURCE_FOLDER_NAME = 'src';
const DIST_FOLDER_NAME = 'public';
const ENTRY_POINT_NAME = 'app.js';
const SCRIPT_BUNDLE_NAME = 'main.js';
const STYLE_BUNDLE_NAME = 'main.css';
const ASSETS_FOLDER_NAME = 'assets';
const HTML_TEMPLATE_NAME = 'index.html';

const FAVICON_PATH = path.resolve(__dirname, SOURCE_FOLDER_NAME, ASSETS_FOLDER_NAME, 'images/favicon.svg');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, SOURCE_FOLDER_NAME, ENTRY_POINT_NAME),
  output: {
    filename: SCRIPT_BUNDLE_NAME,
    path: path.resolve(__dirname, DIST_FOLDER_NAME),
    clean: true,
  },
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 4200,
    hot: true,
    watchFiles: [path.join(__dirname, SOURCE_FOLDER_NAME, '*.html')],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, SOURCE_FOLDER_NAME, HTML_TEMPLATE_NAME),
      title: isProduction ? APP_NAME : 'development',
      favicon: FAVICON_PATH,
      minify: {
        collapseWhitespace: isProduction,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `${ASSETS_FOLDER_NAME}/styles/${STYLE_BUNDLE_NAME}`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: path.join(ASSETS_FOLDER_NAME, 'fonts', '[name][ext]'),
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: path.join(ASSETS_FOLDER_NAME, 'images', '[name][ext]'),
        },
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
          outputPath: path.join(ASSETS_FOLDER_NAME, 'audio'),
          name: '[name].[ext]',
        },
      },
    ],
  },
};
