const path = require('path')
const utils = require('./build/utils')
const theme = require('./src/theme')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const uploadZip = require('./build/upload-zip')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const isProduction = process.env.NODE_ENV === 'production'
const isCdn = process.env.VUE_APP_URL === 'prod'
// const cdn = [
//   'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
//   'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
//   'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
//   'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
//   'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
//   'https://cdn.bootcss.com/moment.js/2.24.0/locale/zh-cn.js'
// ]
// vue.config.js
module.exports = {
  pages: {
    ...utils.entries()
    // index: {
    //   // 入口文件
    //   entry: `src/main.js`,
    //   // 模板来源
    //   template: 'public/index.html',
    //   // 在 dist/index.html 的输出
    //   filename: 'index.html',
    //   // 提取出来的通用 chunk 和 vendor
    //   cdnConfig: process.env.NODE_ENV === 'production' && process.env.VUE_APP_URL === 'prod' ? cdn : []
    // }
  },
  publicPath: isProduction ? './' : '/',
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@store', resolve('src/store'))
      .set('@a', resolve('src/assets'))
      .set('@c', resolve('src/components/common'))
      .set('@coms', resolve('src/components'))
      .set('@u', resolve('src/utils'))
      .set('@api', resolve('src/api'))
      .set('@config', resolve('src/config'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
      .set('@ant-design/icons/lib/dist$', resolve('src/antd-icons.js'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },
  configureWebpack: config => {
    // 忽略moment其它语言库
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    // 配置cdn模块
    if (isProduction) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerPort: 8891
        })
      )
      config.plugins.push(
        new uploadZip()
      )
      if (isCdn) {
        config.externals = {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          vuex: 'Vuex',
          axios: 'axios',
          moment: 'moment'
        }
      }
      // 压缩代码
      config.optimization = {
        splitChunks: {},
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_console: true
              }
            }
          })
        ]
      }
    }
  },
  css: {
    extract: true,
    loaderOptions: {
      less: {
        modifyVars: theme,
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 8001,
    open: true,
    proxy: {
      // 控制中心接口代理
      '/wangxuanzhang': {
        target: 'http://192.168.1.123:10090', // wangxuanzhang
        changeOrigin: true,
        pathRewrite: {
          '^/wangxuanzhang': ''
        }
      },
      'zhuxu': {
        target: 'http://192.168.1.24:10060/', // zhuxu
        changeOrigin: true,
        pathRewrite: {
          '^/zhuxu': ''
        }
      },
      'zhangkun': {
        target: 'http://192.168.1.23:10050/', // zhangkun
        changeOrigin: true,
        pathRewrite: {
          '^/zhangkun': ''
        }
      },
      'gejunwei': {
        target: 'http://192.168.1.46:1010/', // gejunwei
        changeOrigin: true,
        pathRewrite: {
          '^/gejunwei': ''
        }
      },
      'lvzhuo': {
        target: 'http://192.168.1.46:1010/', // lvzhuo
        changeOrigin: true,
        pathRewrite: {
          '^/lvzhuo': ''
        }
      }
    }
  },
  productionSourceMap: false,
  lintOnSave: true,
  transpileDependencies: []
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/css/variables.less')
      ]
    })
}
