import express from 'express';
import path from 'path';
import config from '../webpack.config.dev';
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const bundler = webpack(config);

app.use(historyApiFallback());

app.use(webpackDevMiddleware(bundler, {
  // Dev middleware can't access config, so we provide publicPath
  publicPath: config.output.publicPath,

  // These settings suppress noisy webpack output so only errors are displayed to the console.
  noInfo: true,
  quiet: false,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  },

  // for other settings see
  // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
}));

app.use(webpackHotMiddleware(bundler));

app.use('/static', express.static(path.join(__dirname, '../../src/static')));

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../../src/index.html'));
});


app.listen(port);
