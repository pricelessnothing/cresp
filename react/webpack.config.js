const path = require("path")

module.exports = {
    entry: {
        studio_view: "./src/studio_view/index.js",
        student_view: "./src/student_view/index.js"
    },
    output: {
        path: path.join(__dirname, '../cresp/static/js/src/'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}