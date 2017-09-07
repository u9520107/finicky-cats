import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import firebaseConfig from '../../credentials/firebaseConfig.js';

export default function getWebpackConfig({
  env = 'development',
} = {}) {
  const config = {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            'babel-loader',
            'locale-loader',
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.woff|\.woff2|.eot|\.ttf/,
          use: 'url-loader?limit=15000&publicPath=./&name=fonts/[name]_[hash].[ext]',
        },
        {
          test: /\.png|\.jpg|\.gif|\.svg/,
          use: 'url-loader?limit=20000&publicPath=./&name=images/[name]_[hash].[ext]',
          exclude: /assets(\/|\\)images(\/|\\).+\.svg/,
        },
        {
          test: /\.sass|\.scss/,
          use: [
            'style-loader',
            'css-loader?modules&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [__dirname],
                outputStyle: 'expanded'
              }
            }
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env),
        },
      }),
      new webpack.DefinePlugin({
        config: JSON.stringify({
          firebase: firebaseConfig,
        }),
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    entry: {
      index: ['core-js/es6/array', path.resolve(__dirname, './index')],
    },
  };
  if (env !== 'production') {
    config.devtool = 'inline-source-map';
    config.module.rules = [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
      ...config.module.rules,
    ];
  }
  return config;
}
