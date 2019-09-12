import webpack from 'webpack';
import merge from 'webpack-merge';
import chalk from 'chalk';
import ip from 'ip';
import getPort from 'get-port';
import WebpackDevServer from 'webpack-dev-server';
import webpackBaseConfig from './webpack.config';

const ipString = ip.address();
const devConfig = {
    mode: 'development',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
};
const webpackConfig = merge(webpackBaseConfig, devConfig);
const devServerOptions = {
    contentBase: './dist',
    publicPath: '/',
    host: ipString,
    hot: true,
    noInfo: true,
    open: true,
    openPage: 'html/index.html',
    stats: {
        chunks: false,
        assets: false,
        colors: true,
        cachedAssets: false,
        modules: false,
        children: false,
        entrypoints: false,
    },
};
const buildDone = (fullOpenPage, stats) => {
    console.log(chalk.green.bold(`Server listening at http://${fullOpenPage}\n`));
};
const bootstrap = async () => {
    const port = await getPort();
    const fullOpenPage = `${ipString}:${port}${devServerOptions.publicPath}${devServerOptions.openPage}`;
    WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);
    const compiler = webpack(webpackConfig);
    compiler.hooks.done.tap('BuildDone', (stats) => buildDone(fullOpenPage, stats));
    const app = new WebpackDevServer(compiler, devServerOptions);
    app.listen(port);
};

bootstrap();
