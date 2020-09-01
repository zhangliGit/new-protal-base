<template>
  <div class="notice page-layout bg-fff ">
    <a-row class="u-mar-t20 u-padd-r20" type="flex" justify="end" >
      <a-col class="u-fx" >
        <a-button type="primary" class="u-mar-r20" @click="saveImage('canvasPic','整改通知书','download')">下载通知书</a-button>
      </a-col>
      <a-col class="u-fx" v-if="isEidt" >
        <a-button type="primary" @click="reset()">恢复默认</a-button>
      </a-col>
      <a-col class="u-fx" v-else>
        <a-button type="primary" @click="editNotice()">编辑通知书</a-button>
      </a-col>
    </a-row>
    <!-- <a-row class="u-mar-t20 u-padd-r20" type="flex" justify="star" > -->
    <a-form-model v-if="isEidt" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="红头文件">
        <a-radio-group v-model="form.resource">
          <a-radio value="1">
            显示
          </a-radio>
          <a-radio value="2">
            不显示
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="文件公章" >
        <a-radio-group v-model="form.officialSeal">
          <a-radio value="1">
            显示
          </a-radio>
          <a-radio value="2">
            不显示
          </a-radio>
          <a-upload
            :multiple="false"
            class="upload-img"
            v-if="form.officialSeal=='1'"
            :showUploadList="false"
            name="file"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <a-button> <a-icon type="upload" /> 上传 </a-button>
          </a-upload>
          <!-- <upload-multi v-if="form.officialSeal=='1'" class="upload-img" :length="1" v-model="fileList" :fileInfo="fileInfo" ></upload-multi> -->
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="整改期限" >
        <a-radio-group v-model="form.theTerm" @change="changeTime">
          <a-radio value="1">
            7个工作日(默认)
          </a-radio>
          <a-radio value="2">
            15个工作日
          </a-radio>
          <a-radio value="3">
            自定义
            <div class="customize" v-if="form.theTerm=='3'">
              <a-input size="small" @change="changeTimeCustomize" v-model="form.customWorkingDay" placeholder="3" />
              <span>个工作日</span>
            </div>
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
    <!-- </a-row> -->
    <div class="border-notice" ref="canvasPic" id="canvasPic">
      <div v-if="form.resource=='1'" class="title">
        <a-input class="text text-input  u-fx-ac-jc" v-if="isEidt" v-model="noticeData.redHeader">{{ noticeData.redHeader }}</a-input>
        <div class="text u-fx-ac-jc" v-else>{{ noticeData.redHeader }}</div>
        <!-- <div ></div> -->
        <!-- <div class="border-bottm"></div> -->
      </div>
      <div class="content">
        <div class="numbering">{{ noticeData.numbering }}</div>
        <div class="c-text">整改通知书</div>
        <div class="c-school u-mar-b20">{{ noticeData.schoolName }}</div>
        <div class="div" v-if="isEidt">
          <a-textarea class="con-text1 u-fx-ac-jc" v-model="noticeData.conAsk"></a-textarea>
          <a-textarea class="con-text1 u-fx-ac-jc" v-model="inintConResult"></a-textarea>
        </div>
        <div v-else>
          <div class="con-text1" >{{ noticeData.conAsk }}</div>
          <div class="con-text1">{{ inintConResult }}</div>
        </div>
      </div>
      <div class="foot u-fx-jsb u-line3">
        <div class="left">签收单位（盖章）：</div>
        <div class="right">
          <div class="r-t">{{ noticeData.redHeader }}</div>
          <div class="r-m">{{ noticeData.currentTime }}</div>
          <div class="r-b">签收人：</div>
          <div class="dongzhang-img" v-if="form.officialSeal=='1'&&this.noticeData.url">
            <!-- <img :src="this.noticeData.url" alt=""> -->
            <img :src="`data:image/jpeg;base64,${this.noticeData.url}`" alt="">
          </div>
        </div>
      </div>
    </div>
    <a-row class="u-mar-t40" type="flex" justify="center" >
      <a-col :span="3" >

        <!-- <a-button type="primary" v-if="!isEidt" @click="confirmNotifica(noticeData)">确定并下发通知</a-button> -->
        <a-button type="primary" v-if="!isEidt" @click="saveImage('canvasPic','整改通知书','upload')">确定并下发通知</a-button>
        <div v-else>
          <a-button type="primary" class="u-mar-r10" @click="determine(noticeData)">确定</a-button>
          <a-button type="info" @click="cancel()">取消</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Tools from '@u/tools'
import { getPdfFromHtml, htmlToImg } from '@u/htmlToPdf'
import UploadMulti from '@c/UploadMulti'
import moment from 'moment'
import hostEnv from '@config/host-env'
import html2canvas from 'html2canvas'

export default {
  name: 'SubmitForm',
  components: {
    UploadMulti
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    formData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    ...mapState('home', ['schoolCode', 'schoolName']),
    inintConResult() {
      // return 0
      return `${this.noticeData.conResultleft}${this.noticeData.rectificationTime}${this.noticeData.conResultRight}`
    }
  },
  data() {
    return {
      id: '',
      isEidt: false,
      noticeData: {
        numbering: '0001',
        redHeader: '武汉市洪山区教育局',
        schoolName: '校鸽演示学校',
        conAsk: '我局在对你校（园）的工作检查中发现，你校（园）存在以下隐患（问题）',
        conResultleft: `请你校（园）根据学校安全管理的相关规定，加强校园安全管理，严格落实整改措施，确保在`,
        conResultRight: `将上述隐患（问题）整改到位，同时将整改落实情况书面报市教育局（安督办）`,
        sign: '武汉市洪山区教育局',
        rectificationTime: Tools.getDate(new Date().getTime() + 86400 * 7 * 1000, 1),
        currentTime: Tools.getDate(new Date().getTime(), 1),
        url: ''
      },
      hazardDetails: {},
      labelCol: { span: 6 },
      wrapperCol: { span: 8 },
      form: {
        officialSeal: '2',
        theTerm: '1',
        resource: '1',
        customWorkingDay: '3'
      },
      // 图片上传
      fileList: [],
      fileInfo: {
        tip: '上传',
        h: 120, // 高度
        w: 120 // 宽度
      }
    }
  },
  created() {
    this.id = this.$route.query.id || ''
    this._getDangerInfo()
    this._getCode()
  },
  methods: {
    ...mapActions('home', ['getDangerInfo', 'notification', 'getSchool', 'uploadPdf', 'getCode']),
    // 上传红章
    beforeUpload (file) {
      const isJpg = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJpg && !isPng) {
        this.$message.error('请上传图片格式的文件(jpg/png)')
      }
      console.log(file.size / 1024)
      const isLt1M = file.size / 1024 < 100 && file.size / 1024 > 20
      if (!isLt1M) {
        this.$message.error('照片大小超过限制')
      }
      return (isJpg || isPng) && isLt1M
    },
    handleChange(file) {
      var that = this
      var BaseFile = file.fileList[0].originFileObj
      var reader = new FileReader()
      reader.readAsDataURL(BaseFile)
      reader.onload = () => {
        that.noticeData.url = reader.result.split(',')[1]
      }
    },
    async _getDangerInfo() {
      const res = await this.getDangerInfo(this.id)
      this.noticeData.conAsk = `${this.noticeData.conAsk}${res.data.description}`
      this.noticeData.schoolName = `${res.data.schoolName}:`
    },
    async _getCode() {
      const res = await this.getCode()
      console.log(res)
      this.noticeData.numbering = res.data
    },
    // 取消
    cancel() {
      this.$router.push({
        path: '/accountList/rectificationNotice',
        props: true,
        query: {
          id: this.id
        }
      })
    },
    // 确定
    determine() {
      this.isEidt = false
      // this.$router.push({
      //   path: '/accountList/eidtRectificationNotice',
      //   props: true,
      //   query: {
      //     id: this.id,
      //     eidt: true
      //   }
      // })
    },
    // 修改时间
    changeTime(value) {
      if (value.target.value === '1') {
        this.noticeData.rectificationTime = Tools.getDate(new Date().getTime() + 86400 * 7 * 1000, 1)
      } else if (value.target.value === '2') {
        this.noticeData.rectificationTime = Tools.getDate(new Date().getTime() + 86400 * 15 * 1000, 1)
      } else if (value.target.value === '3') {
        this.noticeData.rectificationTime = Tools.getDate(new Date().getTime() + 86400 * this.form.customWorkingDay * 1000, 1)
      }
    },
    // 自定义时间
    changeTimeCustomize(value) {
      this.noticeData.rectificationTime = Tools.getDate(new Date().getTime() + 86400 * value.data * 1000, 1)
    },
    editNotice() {
      this.isEidt = true
    },
    reset() {
      this.$router.go(0)
    },
    // 下载通知书
    async saveImage(divText, imgText, type) {
      getPdfFromHtml(this.$refs.canvasPic, imgText, type, this.callback)
      // htmlToImg(this.$refs.canvasPic, '整改通知书', type, this.imgCallback)
      // const a = document.createElement('a')
      // const that = this
      // const canvasID = this.$refs[divText]
      // const w = parseInt(window.getComputedStyle(canvasID).width)
      // const h = parseInt(window.getComputedStyle(canvasID).height)
      // const canvas2 = document.createElement('canvas')
      // canvas2.width = w * 2
      // canvas2.height = h * 2
      // canvas2.style.width = w + 'px'
      // canvas2.style.height = h + 'px'
      // const context = canvas2.getContext('2d')
      // context.scale(2, 2)
      // html2canvas(canvasID, { canvas: canvas2 }).then(canvas => {
      // html2canvas(canvasID).then(canvas => {
      //   const dom = document.body.appendChild(canvas)
      //   dom.style.display = 'none'
      //   a.style.display = 'none'
      //   document.body.removeChild(dom)
      //   const blob = Tools.dataURLToBlob(dom.toDataURL('image/png'))
      //   if (type === 'download') {
      //     a.setAttribute('href', URL.createObjectURL(blob))
      //     // 这块是保存图片操作  可以设置保存的图片的信息
      //     a.setAttribute('download', imgText + '.png')
      //     document.body.appendChild(a)
      //     a.click()
      //     URL.revokeObjectURL(blob)
      //     document.body.removeChild(a)
      //   } else if (type === 'upload') {
      //     this.uploadFiles(blob)
      //   }
      // })
    },

    // 发整改通知书
    async uploadNotification(url) {
      const req = {
        id: this.id,
        notificationUrl: url
      }
      const res = await this.notification(req)
      this.$message.success(`下发${res.data}`)
      this.$router.push({
        path: '/accountList/rectificationNotice',
        props: true,
        query: {
          id: this.id
        }
      })
    },
    // 确定并下发通知
    async confirmNotifica() {
      this.getPdfFromHtml(this.$refs.canvasPic, '整改通知书', 'upload', this.callback)
      // const arr = []
      // console.log(dataForm)
      // arr.push(dataForm)
      // const res = await this.uploadPdf({
      //   schoolCode: this.schoolCode,
      //   fileList: arr
      // })
      // console.log(res)
      // const req = {
      //   ...this.noticeData,
      //   ...this.form,
      //   id: this.id
      // }
      // console.log(req)
      // const res = await this.notification(req)
      // console.log(res)
      // console.log(req)
    },
    callback(value) {
      this.uploadFiles(value)
      // var url = `${hostEnv.zx_subject}/file/upload/doc?schoolCode=${this.schoolCode}`
      // var xhr = new XMLHttpRequest()
      // xhr.open('POST', url, true) // 也可以使用POST方式，根据接口
      // xhr.responseType = 'blob'
      // xhr.onload = function () {
      //   if (this.status === 200) {
      //     var content = this.response
      //     var aTag = document.createElement('a')
      //     var blob = new Blob([content])
      //     var headerName = xhr.getResponseHeader('Content-disposition')
      //     var fileName = decodeURIComponent(headerName).substring(20)
      //     aTag.download = fileName
      //     aTag.href = URL.createObjectURL(blob)
      //     aTag.click()
      //     URL.revokeObjectURL(blob)
      //   }
      // }
      // const req = {
      //   fileList: value
      // }
      // xhr.send(JSON.stringify(req))
    },
    // 上传图片文件到服务器
    uploadFiles(files) {
      const that = this
      const blob = Tools.dataURLToBlob(files)
      var form = new FormData()
      form.append('fileList', blob, 'pdf.pdf')// 文件对象
      // XMLHttpRequest 对象
      var xhr = new XMLHttpRequest()
      xhr.timeout = 30000 // 设置超时
      var url = `${hostEnv.zx_subject}/file/upload/doc?schoolCode=${this.schoolCode}`
      // var url = `${hostEnv.zk_school}/file/freeUpload?schoolCode=${this.schoolCode}`
      xhr.open('post', url, true)
      const token = sessionStorage.getItem('token')
      xhr.setRequestHeader('token', token)
      xhr.responseType = 'json'
      xhr.onload = function () {
        if (xhr.response.status !== 0) {
          that.uploadNotification(xhr.response.data[0])
          return false
        }
        that.$message.success('上传文件成功!')
      }
      xhr.ontimeout = function () {
        that.$message.error('数据加载失败，请刷新页面')
      }
      xhr.onerror = function (res) {
        that.$message.error('数据加载失败，请刷新页面')
      }
      xhr.send(form)
    }

    // downloadByXmlhttprequest(imgDom, cb) {
    //   var xhr = new XMLHttpRequest()
    //   xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4) {
    //       // 使用URL.createObjectURL将Blob对象转换为可访问的url地址
    //       var src = URL.createObjectURL(xhr.response)
    //       imgDom.src = src
    //       cb(src)
    //     }
    //   }
    //   xhr.open('GET', imgDom.src, true)
    //   xhr.withCredentials = true
    //   // 设置响应数据格式为Blob对象
    //   xhr.responseType = 'blob'

    //   // 设置请求头
    //   xhr.setRequestHeader('X-Requested-With', 'OpenAPIRequest')

    //   xhr.send()
    // }
  },
  watch: {
    fileList(value) {
      this.noticeData.url = value[0].url
    }
  }
}
</script>
<style lang="less" scoped>
.page-layout{
  .ant-layout{
    overflow-y: auto !important;
  }
  .border-notice{
    margin: 0 auto;
    margin-top: 20px;
    border: 1px solid #bbbbbb;
    font-size: 16px;
    width: 80%;
    .title{
      height: 115px;
      padding-top: 30px;
      margin: 0 10px;
      text-align: center;
      border-bottom: 2px solid #ff0000;
      .text{
        font-size: 30px;
        justify-content: center;
        width: 100%;
        height: 50px;
        color: #ff0000;
      }
      .text-input{
        width: 500px;
      }
    }
    .content{
      .numbering{
         text-align: right;
         margin: 20px 80px 0 0
      }
      .c-text{
        margin-top: 40px;
        text-align: center;
        font-size: 24px;
        color: #191919;
      }
      .c-school{
        margin-top: 40px;
        margin-left: 80px;
        font-weight: bold
      }
      .con-text1{
        margin: 0 auto;
        margin-top: 30px;
        margin-left: 80px;
        width: 80%;
        line-height: 30px;
        text-indent: 30px;
      }
    }
    .foot{
      padding: 0 80px;
      margin-top: 30px;
      height: 100px;
      .left{
      }
      .right{
        position: relative;
        .dongzhang-img{
          position: absolute;
          right: 0;
          top: 0;
          transform: translate(-50%,-20% );
          width: 150px;
          height: 150px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
}
.ant-form-item{
  margin-bottom: 0;
  .ant-radio-group{
     position: relative;
    .upload-img{
      width: 50px;
      height: 50px;
      position: absolute;
      right: 0;
      transform: translateX(100%);
      top: 0;
      z-index: 100;
    }
    .customize{
      position: absolute;
      left: 0;
      right: 0;
      transform: translate(100%,-100%);
    }
  }
}
}

</style>
