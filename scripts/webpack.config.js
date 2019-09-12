import fs from 'fs';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackProgressPlugin from 'progress-bar-webpack-plugin';

const PROJECT_ROOT = path.resolve(__dirname, '../');
const SRC_DIR = path.resolve(PROJECT_ROOT, 'src');
const DIST_DIR = path.resolve(PROJECT_ROOT, 'dist');
const ENTRYS_DIR = path.resolve(SRC_DIR, 'entries');
const TEMPLATES_DIR = path.resolve(SRC_DIR, 'templates');
const DEFAULT_TEMPLATE = path.resolve(TEMPLATES_DIR, '_default.pug');

const entryConfig = {};
const htmlPlugins = [];

const entries = fs.readdirSync(ENTRYS_DIR).map((filename) => ({
    name: filename.replace(/\.js$/, ''),
    path: path.resolve(ENTRYS_DIR, filename),
}));

entries.forEach((entry) => {
    entryConfig[entry.name] = entry.path;
    let template = DEFAULT_TEMPLATE;
    const customPugTemplate = path.resolve(TEMPLATES_DIR, `${entry.name}.pug`);
    const customHtmlTemplate = path.resolve(TEMPLATES_DIR, `${entry.name}.html`);
    if (fs.existsSync(customPugTemplate)) {
        template = customPugTemplate;
    } else if (fs.existsSync(customHtmlTemplate)) {
        template = customHtmlTemplate;
    }
    htmlPlugins.push(
        new HtmlWebpackPlugin({
            template,
            filename: `html/${entry.name}.html`,
            chunks: [entry.name],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
    );
});

export default {
    entry: entryConfig,
    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        path: DIST_DIR,
        publicPath: '../',
    },
    devtool: 'source-map',
    resolve: {
        alias: {},
    },
    plugins: [new WebpackProgressPlugin(), ...htmlPlugins],
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            chunks: 'initial',
            name: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            enforce: 'pre',
                            fix: true,
                        },
                    },
                ],
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ],
    },
};
