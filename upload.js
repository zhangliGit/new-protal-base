/**
 *
 * @Description 压缩文件后上传服务器
 * @Author 张立
 * @Created 2019-06-21
 *
 */
const inquirer = require('inquirer')
const request = require('request')
const path = require('path')
const fs = require('fs')
const AdmZip = require('adm-zip')
var zip = new AdmZip()
const params = process.argv.slice(2)
const buildModule = params[0]
require('colors')
function logLine(msg) {
  console.log('\n')
  console.log(`========================================`.green)
  console.log(`==========${msg}`.green)
  console.log(`========================================`.green)
  console.log('\n')
}

// 项目列表
const envHost = {
  production: 'http://39.97.164.4:8090/upload-web',
  testing: 'http://39.97.164.4:8090/upload-web'
}
const moduleList = [{
  type: 'list',
  message: '请选择上传模块',
  name: 'module',
  choices: [
    'login',
    'entry',
    'admin'
  ]
}]
const envList = [{
  type: 'list',
  message: '请选择发布环境',
  name: 'env',
  choices: [
    'production',
    'testing'
  ]
}]
inquirer.prompt(moduleList).then(answers => {
  const moduleName = answers.module
  logLine(answers.module)
  inquirer.prompt(envList).then(answers => {
    logLine(answers.env)
    const url = envHost[answers.env]
    const msg = answers.env === 'production' ? '正式环境' : '测试环境'
    logLine(`您正在上传：${moduleName} 到 ${msg}，请耐心等待....`)
    zip.addLocalFolder('dist')
    zip.writeZip(`${moduleName}.zip`)
    var formData = {
      file: fs.createReadStream(path.resolve(__dirname, `${moduleName}.zip`))
    }
    request.post({
      url: url,
      formData: formData
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        fs.unlink(`${moduleName}.zip`, function () {})
        logLine('上传成功')
      }
    })
  })
})