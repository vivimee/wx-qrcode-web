import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import VisualizeWebpackPlugin from 'webpack-visualizer-plugin';
import webpackBaseConfig from './webpack.config';

const prodConfig = {
    output: {
        filename: 'js/[name].min.[hash].js',
        chunkFilename: 'js/[name].min.[chunkhash].js',
    },
    mode: 'production',
    optimization: {
        moduleIds: 'hashed'
    },
    plugins: [
        new CleanWebpackPlugin('dist', { root: path.resolve(__dirname, '..') }),
        new VisualizeWebpackPlugin({
            filename: './stats.html'
        }),
    ],
};
const webpackConfig = merge(webpackBaseConfig, prodConfig);

const compiler = webpack(webpackConfig);
compiler.run((err, stats) => {
    if (err) {
        console.log(err);
        return;
    }
    const log = stats.toString({
        assets: false,
        chunks: false,
        colors: true,
        cachedAssets: false,
        modules: false,
        children: false,
        entrypoints: false,
    });
    console.log(log);
});
