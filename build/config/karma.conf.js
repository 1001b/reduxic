var webpack = require('webpack');


module.exports = function (config) {
  config.set({
    browsers: ['Chrome','Firefox','Safari','PhantomJS'],
    singleRun: true,
    basePath: '..',
    frameworks: ['mocha'],
    files: [
      '../node_modules/phantomjs-polyfill/bind-polyfill.js',
      './tests.webpack.js'
  ],
    preprocessors: {
      './tests.webpack.js' : ['webpack','coverage']
    },
    reporters: ['dots','coverage'], // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN, // possible values: config.LOG_DISABLE ||
                              // config.LOG_ERROR || config.LOG_WARN
                              //|| config.LOG_INFO || config.LOG_DEBUG
    webpack: {
      module: {
        loaders: [
          {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
      },
      resolve: {
        extensions: ['', '.js', '.jsx']
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
}