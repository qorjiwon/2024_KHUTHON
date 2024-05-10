const path = require('path');

module.exports = {  
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
  
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        jquery: require.resolve('jquery/src/jquery')
      }
    },
  };
  