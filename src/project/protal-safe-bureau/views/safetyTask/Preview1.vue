<template>
  <div class="fill page-layout">
    <div class="pos-box content">
      <div class="qui-fx-ver">
        <div class="qui-fx-f1">
          <div class="bg-fff u-padd-10 u-padd-l20">
            <div class="fill-top">
              <div class="fill-head task">任务内容</div>
            </div>
            <div>
              <div class="title">{{ detailInfo.taskName }}</div>
              <div class="qui-fx-jc u-mar-t10">
                <div class="qui-fx-ver">
                  <div>发布人：{{ detailInfo.userName }}</div>
                  <div>任务开始时间：{{ detailInfo.beginTime | gmtToDate }}</div>
                </div>
                <div class="qui-fx-ver u-mar-l20">
                  <div>发布时间：{{ detailInfo.completeTime | gmtToDate }}</div>
                  <div>任务结束时间：{{ detailInfo.endTime | gmtToDate }}</div>
                </div>
              </div>
              <div class="fill-describe u-mar-t10 u-padd-l10 u-padd-r10">
                市城乡建设委员会欢迎大家积极举报涉黑涉恶问题线索：
                1.在工程项目建设过程中，强揽土石方、劳务施工，垄断建筑机械设备租赁和建筑砂石料供应，强收“保护费”、敲诈勒索、恶意阻拦施工。
                电话：0531-66605634；电子邮箱：sjwjgc@163.com；
                邮寄地址：济南历下区龙鼎大道1号龙奥大厦F435室
                2.在工程项目招投标过程中，以威胁、恐吓、暴力等手段，强迫他人接受限定条件或退出竞争，强迫中标人放弃中标或转包，交易过程寻衅滋事、恶意投诉。
                电话：0531-68967002；电子邮箱：sjwzbtb7002@163.com；
                邮寄地址：济南市站前街9号政务中心2号楼1002室
                3.在工程款结算和农民工工资支付过程中，恶意拖欠、暴力讨薪、聚众滋事。
                电话：0531-61378850；电子邮箱：qingqianban8869@163.com；
              </div>
              <div class="u-mar-t20">
                <div class="upload u-mar-l20 u-mar-r20 u-mar-b10">
                  <div class="upload-title">附件上传</div>
                </div>
                <a-upload class="u-mar-l10" name="file" :multiple="true" @change="handleChange">
                  <a-button>
                    <a-icon type="upload" />文件上传
                  </a-button>
                </a-upload>
              </div>
            </div>
          </div>
          <div class="u-mar-t10 bg-fff u-padd-10 u-padd-l20">
            <div class="fill-top">
              <div class="fill-head report">要求上报内容</div>
            </div>
            <div class="u-mar">
              <div>单选题</div>
              <div class="subject u-mar-t10 u-padd-l20 u-padd-t10 u-padd-b10">
                <div class="qui-fx u-mar-t10" v-for="(list, i) in 2" :key="i">
                  <div class="qui-fx-ver">题目是：</div>
                  <div class="qui-fx-ver u-mar-l20">
                    <div>是否发现过黑恶势力行为？</div>
                    <div class="u-mar-t10">
                      <a-radio-group>
                        <a-radio :value="1">Option A</a-radio>
                        <a-radio :value="2">Option B</a-radio>
                      </a-radio-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="u-mar">
              <div>多选题</div>
              <div class="subject u-mar-t10 u-padd-l20 u-padd-t10 u-padd-b10">
                <div class="qui-fx u-mar-t10" v-for="(list, i) in 2" :key="i">
                  <div class="qui-fx-ver">题目是：</div>
                  <div class="qui-fx-ver u-mar-l20">
                    <div>是否发现过黑恶势力行为？</div>
                    <div class="u-mar-t10">
                      <a-checkbox-group>
                        <a-checkbox :value="1">Option A</a-checkbox>
                        <a-checkbox :value="2">Option B</a-checkbox>
                      </a-checkbox-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="u-mar">
              <div>填空题</div>
              <div class="subject u-mar-t10 u-padd-l20 u-padd-t10 u-padd-b10">
                <div class="qui-fx u-mar-t10" v-for="(list, i) in 2" :key="i">
                  <div class="qui-fx-ver">题目是：</div>
                  <div class="qui-fx u-mar-l20">
                    <div>是否发现过黑恶势力行为？</div>
                    <div class="qui-fx-f1">
                      <a-input placeholder="Basic usage" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="u-tx-c u-mar-t20">
            <a-button @click="cancel">取消</a-button>
            <a-button class="mar-l10" type="primary" @click="submitOk" :disabled="isLoad">保存</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import img from '../../assets/img/choose.png'
import $tools from '@u/tools'
export default {
  name: 'AvoidingTime',
  components: {},
  data() {
    return {
      img,
      params: {},
      isLoad: false,
      detailInfo: {}
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.detailId = this.$route.query.id
    if (this.detailId) {
      this.showDetail()
    }
  },
  methods: {
    ...mapActions('home', ['myTaskDetail']),
    async showDetail() {
      const res = await this.myTaskDetail({ id: this.detailId })
      this.detailInfo = res.data
    },
    handleChange(info) {
      console.log('111', info)
      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList)
      // }
      // if (info.file.status === 'done') {
      //   this.$message.success(`${info.file.name} file uploaded successfully`)
      // } else if (info.file.status === 'error') {
      //   this.$message.error(`${info.file.name} file upload failed.`)
      // }
    },
    cancel() {
      this.$router.go(-1)
    },
    submitOk() {}
  }
}
</script>
<style lang="less" scoped>
.fill {
  background-color: #f4f7fc;
  .content {
    height: calc(100% - 10px);
    overflow-y: scroll;
  }
  .fill-top {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #4d4cac;
    border-bottom: 1px solid #ccc;
    .fill-head {
      text-align: center;
      border-bottom: 3px solid #4d4cac;
    }
  }
  .title {
    height: 35px;
    font-size: 18px;
    text-align: center;
    margin: 20px 10px 0 10px;
    border-bottom: 1px solid #4d4cac;
  }
}
.tip {
  text-align: center;
  color: #4d4cac;
  font-size: 20px;
}
.fill-describe {
  text-indent: 2em;
}
.upload {
  height: 25px;
  border-bottom: 1px solid #4d4cac;
  .upload-title {
    margin-left: 15px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 18px;
      width: 5px;
      background-color: #4d4cac;
      left: -15px;
      top: 3px;
    }
  }
}
.task {
  width: 70px;
}
.report {
  width: 100px;
}
.subject {
  background-color: #fafafa;
}
</style>
