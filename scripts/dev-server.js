import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import path from 'path';
import getWebpackConfig from '../src/web/getWebpackConfig';

const compiler = webpack(getWebpackConfig());
const server = new WebpackDevServer(compiler, {
  contentBase: path.resolve(__dirname, '../src/web'),
  publicPath: '/',
  hot: true,
  inline: true,
});
const port = process.env.PORT || 10080;
server.listen(port);
console.log(`server listening to ${port}...`);

