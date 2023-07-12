const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const APP_NAME = 'RSS CSS Selectors';
const FolderName = {
  SOURCE: 'src',
  DIST: 'dist',
  ENTRY_POINT: 'index.ts',
  SCRIPT_BUNDLE: 'main.js',
  STYLE_BUNDLE: 'main.css',
  ASSETS: 'assets',
  HTML_TEMPLATE: 'index.html',
};

const FAVICON_PATH = path.resolve(
  __dirname,
  FolderName.SOURCE,
  FolderName.ASSETS,
  'images/favicon.svg'
);

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, FolderName.SOURCE, FolderName.ENTRY_POINT),
  output: {
    filename: FolderName.SCRIPT_BUNDLE,
    path: path.resolve(__dirname, FolderName.DIST),
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
    watchFiles: [path.join(__dirname, FolderName.SOURCE, '*.html')],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, FolderName.SOURCE, FolderName.HTML_TEMPLATE),
      title: isProduction ? APP_NAME : 'development',
      favicon: FAVICON_PATH,
      minify: {
        collapseWhitespace: isProduction,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `${FolderName.ASSETS}/styles/${FolderName.STYLE_BUNDLE}`,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
  },
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
          filename: `${FolderName.ASSETS}/fonts/[name][ext]`,
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: `${FolderName.ASSETS}/images/[name][ext]`,
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};
