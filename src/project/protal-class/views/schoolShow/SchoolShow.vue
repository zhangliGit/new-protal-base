<template>
  <div class="school-show qui-page qui-fx-ver">
    <div class="tit u-mar-t10">
      <p class="qui-fx qui-fx-ac">学校简介</p>
    </div>
    <a-textarea
      allowClear
      :maxLength="2000"
      :autoSize="{ minRows: 20, maxRows: 20 }"
      placeholder="请输入学校简介"
      v-model="areaText">
    </a-textarea>
    <div class="tit">
      <p class="qui-fx qui-fx-ac">校园风采</p>
    </div>
    <div class="qui-fx qui-fx-ac u-mar-b10">
      <a-radio-group name="radioGroup" default-value="image" @change="changeType">
        <a-radio value="image">上传图片</a-radio>
        <a-radio value="video">上传视频</a-radio>
      </a-radio-group>
    </div>
    <div class="qui-fx qui-fx-ac">
      <span class="u-mar-l10 u-font-01 u-tips-color">说明：支持上传图片或视频，视频只能上传一个，图片不超过传九张</span>
    </div>
    <div class="qui-fx qui-fx-ac">
      <upload-video :type="chooseType" :length="chooseType === 'image' ? 9 : 1" v-model="fileList" :fileInfo="fileInfo" @delUpload="delUpload" ></upload-video>
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
        height: 120,
        width: 120
      },
      fileList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created () {
    this.fileInfo.url = `${hostEnv.zk_oa}/study/theme/file/uploadFile?schoolCode=${this.userInfo.schoolCode}`
  },
  methods: {
    ...mapActions('home', ['getClassMotto', 'addClassMotto', 'delFile']),
    changeType(e) {
      this.chooseType = e.target.value
      if (this.chooseType === 'image') {
        this.fileInfo.tip = '上传图片'
      } else if (this.chooseType === 'video') {
        this.fileInfo.tip = '上传视频'
      }
      const arr = this.fileList
      arr.forEach(el => {
        this.delFile(el.id)
      })
      this.fileList = []
    },
    delUpload(id) {
      this.delFile(id)
    },
    async getMotto () {
      /* const req = {
        ...this.classInfo,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getClassMotto(req)
      if (!res.data) {
        this.areaText = ''
      } else {
        this.areaText = res.data.introduce
      } */
    },
    async save() {
      if (this.areaText === '') {
        this.$message.error('请输入学校简介')
        return
      }
      const req = {
        ...this.classInfo,
        introduce: this.areaText,
        schoolCode: this.userInfo.schoolCode
      }
      if (this.addOrEditTag) {
        req.id = this.mottoId
      }
      console.log(this.fileList)
      /* this.addClassMotto(req).then(() => {
        this.$message.success('编辑成功')
        this.$tools.goNext(() => {
          this.getMotto()
        })
      }) */
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
