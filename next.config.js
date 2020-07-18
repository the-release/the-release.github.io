const TerserPlugin = require("terser-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = () => {
  const nextConfig = {
    distDir: "./dist/.next",
    devIndicators: {
      autoPrerender: false
    }
  };

  const webpack = (config, { dev: isDev }) => {
    config.module.rules.push({
      test: /\.(jsx?|tsx?)$/,
      exclude: [/node_modules/],
      enforce: "pre",
      use: [
        {
          loader: "eslint-loader",
          options: {
            emitWarning: true,
            emitError: !isDev
          }
        }
      ]
    });

    config.optimization.minimizer.push(
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: !isDev
          },
          output: {
            comments: false
          }
        }
      })
    );

    config.plugins.push(
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: !isDev,
        cwd: process.cwd()
      })
    );

    return config;
  };

  return {
    ...nextConfig,
    webpack
  };
};
