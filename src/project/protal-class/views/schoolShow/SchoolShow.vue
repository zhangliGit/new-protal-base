<template>
  <div class="school-show qui-page qui-fx-ver">
    <div class="tit u-mar-t10">
      <p class="qui-fx qui-fx-ac">学校简介</p>
    </div>
    <a-textarea
      allowClear
      :maxLength="2000"
      :autoSize="{ minRows: 10, maxRows: 20 }"
      placeholder="请输入学校简介"
      v-model="areaText">
    </a-textarea>
    <div class="tit">
      <p class="qui-fx qui-fx-ac">校园风采</p>
    </div>
    <div class="qui-fx qui-fx-ac u-mar-b10">
      <a-radio-group name="radioGroup" v-model="chooseType">
        <a-radio value="image">上传图片</a-radio>
        <a-radio value="video">上传视频</a-radio>
      </a-radio-group>
    </div>
    <div class="qui-fx qui-fx-ac">
      <span class="u-mar-l10 u-font-01 u-tips-color">说明：支持上传图片或视频，视频只能上传一个，图片不超过传九张</span>
    </div>
    <div class="qui-fx qui-fx-ac">
      <upload-video
        v-if="chooseType === 'image'"
        type="image"
        fileName="file"
        :length="9"
        v-model="imgList"
        :fileInfo="fileInfo"
        @delUpload="delUpload"
        @beforeUpload="beforeUpload"
        @success="success" >
      </upload-video>
      <upload-video
        v-if="chooseType === 'video'"
        type="video"
        fileName="file"
        :length="1"
        v-model="videoList"
        :fileInfo="fileInfo"
        @delUpload="delUpload"
        @beforeUpload="beforeUpload"
        @success="success" >
      </upload-video>
    </div>
    <div class="button">
      <a-button type="primary" @click="save">
        保存
      </a-button>
    </div>
  </div>
</template>

<script>
import UploadVideo from '@c/UploadVideo'
import { mapActions, mapState } from 'vuex'
import hostEnv from '@config/host-env'
export default {
  components: {
    UploadVideo
  },
  data () {
    return {
      chooseType: 'image',
      areaText: '',
      fileInfo: {
        url: '',
        tip: '上传图片',
        h: 120,
        w: 120
      },
      imgList: [],
      videoList: [],
      canUpload: true
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created () {
    this.fileInfo.url = `${hostEnv.zq_class}/school/introduction/file/uploadFile?schoolCode=${this.userInfo.schoolCode}`
    this.getMotto()
  },
  methods: {
    ...mapActions('home', ['getSchoolShow', 'addSchoolShow', 'editSchoolShow', 'delFile', 'getSchoolShowFile']),
    changeType(e) {
      if (this.chooseType === 'image') {
        this.fileInfo.tip = '上传图片'
      } else if (this.chooseType === 'video') {
        this.fileInfo.tip = '上传视频'
      }
    },
    beforeUpload() {
      this.canUpload = false
    },
    success() {
      this.canUpload = true
    },
    delUpload(value) {
      this.canUpload = true
    },
    async getMotto () {
      const res = await this.getSchoolShow(this.userInfo.schoolCode)
      this.areaText = res.data.content
      this.mottoId = res.data.id
      const fileRes = await this.getSchoolShowFile(this.userInfo.schoolCode)
      if (fileRes.data.length === 0) {
        return
      }
      if ('mp4|ogg|webm'.toLowerCase().indexOf(fileRes.data[0].fileType.toLowerCase()) !== -1) {
        this.chooseType = 'video'
        this.videoList = fileRes.data
      } else {
        this.chooseType = 'image'
        this.imgList = fileRes.data
      }
    },
    async save() {
      if (this.areaText === '') {
        this.$message.error('请输入学校简介')
        return
      }
      if (!this.canUpload) {
        this.$message.error('附件上传中')
      }
      const req = {
        content: this.areaText,
        schoolCode: this.userInfo.schoolCode,
        fileUrlList: [],
        fileAddIdList: []
      }
      if (this.chooseType === 'image') {
        this.imgList.forEach(el => {
          req.fileUrlList.push(el.url)
          req.fileAddIdList.push(el.id)
        })
        this.videoList.forEach(el => {
          this.delFile(el.id)
        })
      } else if (this.chooseType === 'video') {
        this.videoList.forEach(el => {
          req.fileUrlList.push(el.url)
          req.fileAddIdList.push(el.id)
        })
        this.imgList.forEach(el => {
          this.delFile(el.id)
        })
      }
      console.log(req)
      let res = null
      if (this.mottoId) {
        req.id = this.mottoId
        res = this.editSchoolShow(req)
      } else {
        res = this.addSchoolShow(req)
      }
      res.then(() => {
        this.$message.success('编辑成功')
        this.$tools.goNext(() => {
          this.getMotto()
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.school-show{
    position: relative;
    flex: 1;
    background: #fff;
    padding: 10px;
    .tit{
      margin: 20px 0;
      p {
        border-left: 3px solid @main-color;
        padding-left: 10px;
        font-weight: bold;
        margin: 0 0 0 5px;
        line-height: 16px;
        height: 16px;
      }
    }
    input{
      margin-bottom: 20px;
    }
    .button{
      margin: 20px auto;
    }
  }
</style>
