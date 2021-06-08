const path = require('path');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasureWebpackPlugin()

function resolve(dir) {
  return path.join(__dirname, dir);
}
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  configureWebpack: (config) => {
    const plugins = []
    if (NODE_ENV === 'production') {
      // plugins.push(new BundleAnalyzerPlugin())
    } else {
      // 
    }
    return plugins
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@utils', resolve('src/utils'))
  },
  productionSourceMap: true,
  pages: {
    'index': {
      entry: 'src/main.js',
      title: '',
      template: 'public/index.html',
    }
  },
  devServer: {
    proxy: {
      "/api|/open|/v1": {
        target: 'https://console-test.map.airlook.com',
        ws: true,
        changeOrigin: true
      },
    }
  }
}