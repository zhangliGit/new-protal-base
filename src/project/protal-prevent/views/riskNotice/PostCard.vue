<template>
  <div class="page-layout qui-fx-ver">
    <div class="content pos-box">
      <div class="bg-fff">
        <div class="fill-top">
          <div class="u-mar-l40"> 岗位安全风险告知卡 </div>
        </div>
        <div>
          <div class="top-btn-group">
            <a-button icon="download" class="play-action-btn">下载</a-button>
            <a-button icon="export" class="export-btn">上传</a-button>
          </div>
          <div class="info u-padd-l40 u-padd-r40">
            <div class="u-tx-c u-font-2 u-mar-b10">岗位风险告知卡</div>
            <div>
              <div class="info-box qui-fx" v-for="item in detailInfo" :key="item.id">
                <div class="info-title">{{ item.title }}</div>
                <div class="info-content qui-fx-f1">{{ item.content }}</div>
              </div>
            </div>
            <div class="img-content">
              <div class="img-box qui-fx" v-for="item in detailImg" :key="item.id">
                <div class="info-title">{{ item.title }}</div>
                <div class="info-content info-img qui-fx-f1" v-if="item.title === '警示标识：'">
                  <img v-for="(list,index) in item.content" :key="index" :src="list" alt />
                </div>
                <div v-else class="info-content qui-fx-f1">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hostEnv from '@config/host-env'
import { mapState, mapActions } from 'vuex'
import ChoosePost from '@c/choose/ChoosePost'
export default {
  name: 'PostCard',
  components: {
    ChoosePost
  },
  data() {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      },
      detailInfo: [],
      detailImg: [],
      isLoad: false,
      emergencyPhone: '',
      userTag: false,
      active: '',
      leaderList: [],
      viceLeaderList: [],
      memberList: [],
      fileList: [],
      url: '',
      params: {},
      pageList: {
        page: 0,
        size: 1
      }
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.url = `${hostEnv.zx_subject}/file/upload/doc`
    this.params.schoolCode = this.userInfo.schoolCode
    this.showDetail()
  },
  methods: {
    ...mapActions('home', ['riskCard', 'saveRiskGroup', 'riskFileList', 'addRiskFile', 'delRiskFile']),
    async showDetail() {
      const req = {
        ...this.pageList,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.riskCard(req)
      const data = res.data.records[0]
      this.detailInfo = [
        {
          title: '部门：',
          content: data.deptName
        },
        {
          title: '岗位：',
          content: data.responsibilityPostName
        }
      ]
      this.detailImg = [
        {
          title: '检查对象：',
          content: data.checkObject
        },
        {
          title: '风险编号：',
          content: data.riskAssessmentId
        },
        {
          title: '事故类型：',
          content: data.riskType
        },
        {
          title: '潜在风险：',
          content: data.riskContent
        },
        {
          title: '应急处置：',
          content: data.emergencyMeasure
        },
        {
          title: '责任人：',
          content: data.emergencyUser
        },
        {
          title: '警示标识：',
          content: data.signs
        }
      ]
    },
    async _riskFileList(info) {
      const result = await this.riskFileList(this.userInfo.schoolCode)
      this.fileList = result.data
    },
    addTag(type) {
      this.active = type
      this.userTag = true
    },
    choosePost(list) {
      this[this.active] = list
      this.$refs.choosePost.reset()
    },
    userClose(removedTag, string) {
      this[string] = this[string].filter(tag => tag !== removedTag)
    },
    async _addRiskFile(info) {
      const req = {
        fileName: info.file.name,
        fileUrl: info.file.response.data[0],
        schoolCode: this.userInfo.schoolCode
      }
      this.addRiskFile(req).then(res => {
        this.$message.success(`${info.file.name} 上传成功`)
        this.$tools.goNext(() => {
          this.isLoad = false
          this._riskFileList()
        })
      })
    },
    beforeUpload (file) {
      console.log(file)
      const isDoc = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      const isPdf = file.type === 'application/pdf'
      const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isDoc && !isPdf && !isXlsx) {
        this.$message.error('请上传格式的文件(doc/docx/pdf/xlsx/xls)')
        return false
      }
    },
    handleChange(info) {
      if (info.file.status !== 'uploading' && info.file.status !== 'removed') {
        if (info.file.response) {
          this.$message.error(info.file.response.message)
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.code === 200) {
          this._addRiskFile(info)
        } else {
          this.$message.error(info.file.response.message)
        }
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败`)
      }
    },
    async del(record) {
      await this.delRiskFile(record.id)
      this.$message.success('操作成功')
      this.$tools.goNext(() => {
        this._riskFileList()
      })
    },
    exportClick (url) {
      window.open(url)
    },
    filterData(type, data) {
      const newData = data.map(el => {
        if (type) {
          return {
            code: el.userCode,
            name: el.userName
          }
        } else {
          return {
            userCode: el.code,
            userName: el.name
          }
        }
      })
      return newData
    },
    submitOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.leaderList.length === 0 || this.viceLeaderList.length === 0 || this.memberList.length === 0) {
            this.$message.warning('请选择人员')
            return
          }
          values.schoolCode = this.userInfo.schoolCode
          values.leaderList = this.filterData(1, this.leaderList)
          values.viceLeaderList = this.filterData(1, this.viceLeaderList)
          values.memberList = this.filterData(1, this.memberList)
          this.saveRiskGroup(values)
            .then(() => {
              this.$message.success('操作成功')
              this.$tools.goNext(() => {
                this.isLoad = false
                this.showDetail()
              })
            })
            .catch(() => {
              this.isLoad = false
            })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  height: calc(100% - 10px);
  overflow-y: scroll;
  .fill-top {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 18px;
      width: 3px;
      background-color: #4d4cac;
      left: 25px;
      bottom: 15px;
    }
  }
  img {
    width: 25px;
    height: 32px;
  }
.down {
    height: 40px;
  }
}
      .info {
        .info-box {
          border-top: 1px solid #9698d6;
          height: 55px;
          line-height: 52px;
          width: 50%;
          float: left;
          &:nth-child(2n) {
            border-right: 1px solid #9698d6;
          }
        }
        .img-content {
          margin-top: 55px;
        }
        .info-title {
          width: 150px;
          background-color: #f5f5fb;
          border-right: 1px solid #9698d6;
          border-left: 1px solid #9698d6;
          text-align: right;
          padding: 0 5px;
          color: #575758;
        }
        .info-content {
          padding: 0 10px;
          color: #333;
          width: 100%;
          overflow-x: scroll;
          img {
            width: 60px;
            height: 60px;
            margin-right: 10px;
          }
        }
        .img-box {
          border: 1px solid #9698d6;
          border-left: none;
          height: 55px;
          line-height: 50px;
          border-bottom: none;
          &:last-child {
            border-bottom: 1px solid #9698d6;
          }
          .info-title {
            &:last-child {
              border-bottom: 1px solid #9698d6 !important;
            }
          }
        }
      }
    .detail-title {
      height: 35px;
      border-bottom: 1px solid #ddd;
      .title {
        margin-left: 40px;
        position: relative;
        &::before{
          content: '';
          position: absolute;
          height: 20px;
          width: 5px;
          background-color: #4D4CAC;
          left: -20px;
        }
      }
    }
    .detail-deal {
      margin-top: 20px;
      padding: 20px 0;
      background-color: #fff;
      .time-line {
        margin: 30px 0 0 20px;
        .time-left {
          width: 360px;
        }
      }
}

</style>
