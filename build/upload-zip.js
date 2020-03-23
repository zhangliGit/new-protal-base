
/**
 *
 * @Description 压缩文件后上传服务器
 * @Author 张立
 * @Created 2019-06-21
 *
 */
const request = require('request')
const path = require('path')
const fs = require('fs')
const AdmZip = require('adm-zip')
var zip = new AdmZip()
const buildModule = process.argv[process.argv.length - 1]

class uploadZip {
  apply (compiler) {
    compiler.hooks.run.tap('done', compilation => {
    })
    compiler.hooks.done.tap('done', compilation => {
      console.log('\x1b[32m', '*************************************', '\n')
      console.log('\x1b[32m', '打包完成...', '\n')
      console.log('\x1b[32m', '*************************************', '\n')
      let total = 1
      const time = setInterval(() => {
        console.log(total++)
      }, 1000)
      const msg = `正在上传${buildModule}模块，请耐心等候...`
      const url = 'http://39.97.164.4:8090/upload-web'
      zip.addLocalFolder('dist')
      zip.writeZip(`${buildModule}.zip`)
      console.log('\x1b[32m', '*************************************', '\n')
      console.log('\x1b[32m', msg, '\n')
      console.log('\x1b[32m', '*************************************', '\n')
      var formData = {
        file: fs.createReadStream(path.resolve(__dirname, `../${buildModule}.zip`))
      }
      request.post({
        url: url,
        formData: formData
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // 删除压缩包
          fs.unlink(`${buildModule}.zip`, function () {})
          console.log('\x1b[32m', '*************************************', '\n')
          console.log('\x1b[32m', '上传成功', '\n')
          console.log('\x1b[32m', '*************************************', '\n')
          clearInterval(time)
        }
      })
    })
  }
}

module.exports = uploadZip
