<template>
  <div class="border-notice page-layout bg-fff ">

    <a-row class="u-mar-t20 u-padd-r40 u-mar-b20" type="flex" justify="end" >
      <a-col class="u-fx" >
        <a-button type="primary" class="u-mar-r20" @click="exportHazards(url)">下载通知书 </a-button>
        <!-- <a :href="url" download="baidu">下载通知书</a> -->
      </a-col>
    </a-row>
    <div class="img-box">
      <pdf
        ref="pdf"
        :src="url">
      </pdf>
    </div>
    <a-row class="u-mar-t40" type="flex" justify="center" >
      <a-col :span="3" >
        <a-button type="primary" @click="back(url)">返回</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Tools from '@u/tools'
import moment from 'moment'
import pdf from 'vue-pdf'
export default {
  name: 'SubmitForm',
  components: {
    pdf
  },
  computed: {
    status: {
      get() {
        return this.value
      },
      set() {
        this.$emit('input', false)
      }
    }
  },
  data() {
    return {
      id: '',
      url: ''
    }
  },
  created() {
    this.id = this.$route.query.id || ''
    this._getDangerInfo()
  },
  methods: {
    ...mapActions('home', ['getDangerInfo', 'subsidy', 'getSchool']),
    async _getDangerInfo() {
      const res = await this.getDangerInfo(this.id)
      console.log(res)
      // window.open(res.data.notificationUrl)
      this.url = res.data.notificationUrl
    },
    // 下载通知书
    exportHazards(url1) {
      // window.open(url)
      // this.downloadIamge(url)
      var x = new XMLHttpRequest()
      x.open('GET', url1, true)
      x.responseType = 'blob'
      x.onload = function(e) {
        var url = window.URL.createObjectURL(x.response)
        var a = document.createElement('a')
        a.href = url
        a.download = ''
        a.click()
      }
      x.send()
    },
    downloadIamge(imgsrc, name) {
      // 下载图片地址和图片名
      var image = new Image()
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function() {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        var url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
        var a = document.createElement('a') // 生成一个a元素
        var event = new MouseEvent('click') // 创建一个单击事件
        a.download = name || 'photo' // 设置图片名称
        a.href = url // 将生成的URL设置为a.href属性
        a.dispatchEvent(event) // 触发a的单击事件
      }
      image.src = imgsrc
    },
    // 返回
    back() {
      this.$router.push({
        path: '/schoolDanger',
        props: true
      })
    }
  }
}
</script>
<style lang="less" scoped>
.border-notice{
  width: 100%;
  height: 100%;
  padding: 40px;
                .img-box{
                  // width: 100%;
                  // height: 100%;
                  width: 1000px;
                  height:600px;
                  margin: 0 auto;
                  img{
                    width: 100%;
                    height: 100%;
                  }
            }
}

// .border-notice{
//     margin: 0 auto;
//     margin-top: 80px;
//     border: 1px solid #bbbbbb;
//     font-size: 16px;
//     width: 80%;
//     .title{
//       height: 115px;
//       padding-top: 50px;
//       margin: 0 10px;
//       font-size: 30px;
//       color: #ff0000;
//       text-align: center;
//       border-bottom: 2px solid #ff0000;
//     }
//     .content{
//       .numbering{
//          text-align: right;
//          margin: 20px 80px 0 0
//       }
//       .c-text{
//         margin-top: 60px;
//         text-align: center;
//         font-size: 24px;
//         color: #191919;
//       }
//       .c-school{
//         margin-top: 60px;
//         margin-left: 80px;
//         font-weight: bold
//       }
//       .con-text1{
//         margin-top: 40px;
//         width: 80%;
//         line-height: 30px;
//         margin: 0 auto;
//         text-indent: 30px;
//       }
//     }
//     .foot{
//       padding: 0 80px;
//       margin-top: 40px;
//       .left{
//       }
//       .right{

//       }
//     }
// }
</style>
