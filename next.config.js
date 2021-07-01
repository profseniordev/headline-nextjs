const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

module.exports = withCss(withSass({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };
    config.module.rules.push({
      test: /\.(png|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          esModule: false
        }
      }
    });

    return config
  }
}));
