<template>
  <div class="class-newspaper qui-fx">
    <div class="left">
      <class-tree @select="select"></class-tree>
    </div>
    <div class="right qui-fx-ver">
      <div class="u-mar-b10">
        <div class="u-bold u-mar-b10">温馨提示：</div>
        <div class="u-font-01 u-tips-color">1、限制最多9张图片</div>
        <div class="u-font-01 u-tips-color">2、支持发布不大于10M的png、jpg格式图片</div>
      </div>
      <div class="qui-fx-ver">
        <div class="box-scroll" :style="{height: scrollH -50+ 'px'}">
          <div class="qui-fx qui-fx-ac">
            <upload-video
              showTimeTag
              type="image"
              :length="9"
              v-model="fileList"
              :fileInfo="fileInfo"
              @delUpload="delUpload">
            </upload-video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UploadVideo from '@c/UploadVideo'
import ClassTree from '@c/ClassTree'
import hostEnv from '@config/host-env'

export default {
  components: {
    ClassTree,
    UploadVideo
  },
  data () {
    return {
      dataList: [],
      fileInfo: {
        url: '',
        tip: '上传图片',
        h: 300,
        w: 300
      },
      fileList: [],
      scrollH: 0
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created () {
    this.scrollH = document.documentElement.offsetHeight - 180
    this.fileInfo.url = `${hostEnv.zk_oa}/study/theme/file/uploadFile?schoolCode=${this.userInfo.schoolCode}`
  },
  methods: {
    ...mapActions('home', ['delFile', 'getClassMotto', 'addClassMotto', 'delFile']),
    // 选中年级
    select (item) {
      console.log(item)
      if (item.classCode) {
        this.classInfo = item
        this.showList()
      }
    },
    delUpload(id) {
      this.delFile(id)
    },
    async showList () {
      const req = {
        ...this.classInfo,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getClassMotto(req)
      if (!res.data) {
        this.inputText = ''
        this.areaText = ''
      } else {
        this.inputText = res.data.motto
        this.areaText = res.data.introduce
      }
    },
    deleHonor(type, record) {
      if (type) {
      } else {
        if (this.chooseList.length === 0) {
          this.$message.warning('请选择删除项')
        }
      }
    },
    submitForm(values) {
      const req = {
        ...values,
        ...this.classInfo,
        schoolCode: this.userInfo.schoolCode,
        schoolId: this.userInfo.schoolId,
        admissionTime: values.admissionTime[0] || values.admissionTime,
        photoUrl: this.fileList.length > 0 ? this.fileList[0].url : ''
      }
      let res = null
      if (this.type === 0) {
        res = this.addStudent(req)
      } else {
        req.userId = this.userId
        res = this.studentUpdate(req)
      }
      res
        .then(() => {
          this.keywords = ''
          this.$message.success(this.type === 0 ? '添加成功' : '编辑成功')
          this.$tools.goNext(() => {
            this.showList()
            this.$refs.form.reset()
            this.fileList = []
          })
        })
        .catch(() => {
          this.$refs.form.error()
        })
    }
  }
}
</script>

<style lang="less" scoped>
.class-newspaper{
  flex: 1;
  overflow: hidden;
  .left{
    background: #fff;
    margin-right: 10px;
    padding: 10px;
    width: 200px;
  }
  .right{
    position: relative;
    flex: 1;
    background: #fff;
    padding: 10px;
    width: calc(100% - 210px);
    .box-scroll{
      overflow: auto;
    }
    .notice-card {
      border-radius: 4px;
      background-color:#f5f5f5;
      padding: 10px;
      float: left;
      width: 24%;
      margin-left: 1%;
      overflow: hidden;
      margin-bottom: 20px;
      min-height: 200px;
    }
  }
}
</style>
