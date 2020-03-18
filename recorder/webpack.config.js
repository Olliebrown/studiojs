const path = require('path');

// Name of the library
let libraryName = 'Recorder';

// Function to configure webpack
module.exports = (env, argv) => {
  // Setup the base config
  let config = {
    // Entry point and output options
    entry: __dirname + '/src/index.js',
    output: {
      path: __dirname + '/lib',
      filename: libraryName + '.js',
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },

    // Module rules for using babel
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        }
      ]
    },

    // Resolve rules that include the 'src' dir
    resolve: {
      modules: [
        path.resolve('./src'),
        path.resolve('./node_modules')
      ],
      extensions: ['.js']
    }
  }

  // Add things that should only be there in 'production' mode
  if (argv.mode === 'production') {
    config.output.filename = libraryName + '.min.js'
    config.module.rules[0].use.options.presets.push('minify')
  }

  // Add things that should only be there in 'development' mode
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map'
  }

  return config
}
