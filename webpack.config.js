const slsw = require('serverless-webpack')

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    mode: 'development',
    externals: {
        sharp: 'commonjs sharp',
    },
    // Run babel on all .js files and skip those in node_modules
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader'
                }
            ],
            include: __dirname,
            exclude: /node_modules/,
        }]
    }
}