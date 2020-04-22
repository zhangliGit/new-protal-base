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
      // 控制中心接口代理
      '/wangxuanzhang': {
        target: 'http://112.125.89.37/', // wangxuanzhang
        changeOrigin: true,
        pathRewrite: {
          '^/wangxuanzhang': ''
        }
      },
      zhuxu: {
        target: 'http://112.125.89.37/', // zhuxu
        changeOrigin: true,
        pathRewrite: {
          '^/zhuxu': ''
        }
      },
      zhangkun: {
        target: 'http://112.125.89.37/', // zhangkun
        changeOrigin: true,
        pathRewrite: {
          '^/zhangkun': ''
        }
      },
      gejunwei: {
        target: 'http://112.125.89.37/', // gejunwei
        changeOrigin: true,
        pathRewrite: {
          '^/gejunwei': ''
        }
      },
      lvzhuo: {
        target: 'http://112.125.89.37/', // lvzhuo
        changeOrigin: true,
        pathRewrite: {
          '^/lvzhuo': ''
        }
      },
      wxz: {
        // target: 'http://39.97.164.4:8081/', // 王选章
        target: 'http://192.168.1.123:10090/',
        changeOrigin: true,
        pathRewrite: {
          '^/wxz': ''
        }
      },
      lz: {
        // target: 'http://39.97.164.4:10091/', // 吕卓
        target: 'http://192.168.1.170:10091/',
        changeOrigin: true,
        pathRewrite: {
          '^/lz': ''
        }
      },
      zx: {
        // target: 'http://39.97.164.4:10160//', // 朱旭
        target: 'http://192.168.1.24:10160/',
        changeOrigin: true,
        pathRewrite: {
          '^/zx': ''
        }
      },
      mj: {
        // target: 'http://39.97.164.4:10162/', // 朱旭门禁
        target: 'http://192.168.1.24:10162/',
        changeOrigin: true,
        pathRewrite: {
          '^/mj': ''
        }
      },
      zk: {
        target: 'http://pugai.natapp1.cc/', // 张坤
        changeOrigin: true,
        pathRewrite: {
          '^/zk': ''
        }
      },
      base: {
        target: 'http://39.97.164.4:10050/', // 平台
        changeOrigin: true,
        pathRewrite: {
          '^/base': ''
        }
      },
      year: {
        target: 'http://112.125.89.37:1010/', // 吕卓
        changeOrigin: true,
        pathRewrite: {
          '^/year': ''
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
