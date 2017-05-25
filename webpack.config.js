const path = require('path');

module.exports = {
    entry: ['./src/index'],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'sensorium.js' 
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0']
                },
                exclude: /node_modules/
            }
        ]
    }
}