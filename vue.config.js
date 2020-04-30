const path = require('path')
const utils = require('./build/utils')
const theme = require('./src/theme')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const uploadZip = require('./build/upload-zip')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const isProduction = process.env.NODE_ENV === 'production'
const isCdn = process.env.VUE_APP_URL === 'prod'
// vue.config.js
module.exports = {
  pages: {
    ...utils.entries()
  },
  publicPath: isProduction ? '././' : '/',
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
      // config.plugins.push(
      //   new BundleAnalyzerPlugin({
      //     analyzerPort: 8891
      //   })
      // )
      config.plugins.push(new uploadZip())
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        moment: 'moment'
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
      // 单独人脸识别接口
      '/dorm': {
        target: 'http://192.168.1.123:10080/', // wangxuanzhang
        changeOrigin: true,
        pathRewrite: {
          '^/dorm': ''
        }
      },
      '/wxz_control': {
        // 'target': 'http://192.168.1.123:10090/', // 王选章-控制中心
        'target': 'http://canpointtest.com/wxz_control',
        'changeOrigin': true,
        'pathRewrite': {
          '^/wxz_control': ''
        }
      },
      '/zk_school': {
       // 'target': 'http://192.168.1.23:10050/', // 张坤-学校管理
        'target': 'http://canpointtest.com/zk_school',
        'changeOrigin': true,
        'pathRewrite': {
          '^/zk_school': ''
        }
      },
      '/zk_leave': {
        //'target': 'http://192.168.1.23:10054/', // 张坤-校历请假
        'target': 'http://canpointtest.com/zk_leave',
        'changeOrigin': true,
        'pathRewrite': {
          '^/zk_leave': ''
        }
      },
      '/zx_protal': {
       // 'target': 'http://192.168.1.24:10060/', // 朱旭-平台应用系统
        'target': 'http://canpointtest.com/zx_protal',
        'changeOrigin': true,
        'pathRewrite': {
          '^/zx_protal': ''
        }
      },
      '/zx_door': {
        //'target': 'http://192.168.1.24:10162/', // 朱旭-门禁系统
        'target': 'http://canpointtest.com/zx_door',
        'changeOrigin': true,
        'pathRewrite': {
          '^/zx_door': ''
        }
      },
      '/zx_visitor': {
        //'target': 'http://192.168.1.24:10160/', // 朱旭-访客系统
        'target': 'http://canpointtest.com/zx_visitor',
        'changeOrigin': true,
        'pathRewrite': {
          '^/zx_visitor': ''
        }
      },
      '/lz_attendance': {
        // 'target': 'http://192.168.1.46:11004/', // 吕卓-考勤
        'target': 'http://canpointtest.com/lz_attendance',
        'changeOrigin': true,
        'pathRewrite': {
          '^/lz_attendance': ''
        }
      },
      '/lz_user_center': {
        // 'target': 'http://192.168.1.46:11002/', // 吕卓-用户中心
        'target': 'http://canpointtest.com/lz_user_center',
        'changeOrigin': true,
        'pathRewrite': {
          '^/lz_user_center': ''
        }
      }
    }
  },
  productionSourceMap: false,
  lintOnSave: true,
  transpileDependencies: []
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, 'src/assets/css/variables.less')]
    })
}
