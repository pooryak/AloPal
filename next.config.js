const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const withTM = require('next-transpile-modules')(['@material-ui/core/colors']);
// yarn build-analyze
module.exports = withPlugins([
    withTM,
    [
        // withImages,
        {
            exclude: /\.svg$/,
        },
    ],
    // withSourceMaps
],
{

    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
        },
        {
            test: /\.proto$/,
            use: {
                loader: 'protobufjs-loader',
                options: {
                /* controls the "target" flag to pbjs - true for
                 * json-module, false for static-module.
                 * default: false
                 */
                    json: true,

                    /* import paths provided to pbjs.
                 * default: webpack import paths (i.e. config.resolve.modules)
                 */
                    paths: ['/path/to/definitions'],

                    /* additional command line arguments passed to
                 * pbjs, see https://github.com/dcodeIO/ProtoBuf.js/#pbjs-for-javascript
                 * for a list of what's available.
                 * default: []
                 */
                    pbjsArgs: ['--no-encode'],
                },
            },
        });
        return config;
    },
});
