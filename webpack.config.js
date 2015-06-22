var path = require('path')
var sourceDir = path.join(__dirname, './js/')
var buildDir = path.join(__dirname, './build/')

module.exports = {
  entry: {
    main: sourceDir + 'main.jsx'
  },
  output: {
    path: buildDir,
    filename: '[name].js',
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader'
    }]
  }
}
