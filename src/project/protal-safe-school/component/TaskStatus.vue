<template>
  <a-modal width="800px" :title="title" v-model="visible" :footer="null" @cancel="visible=false">
    <div class="qui-fx-ver">
      <div class="top bg-fff u-padd-10 u-padd-l20">
        <div class="u-tx-c">{{detailInfo.taskName}}taskName</div>
        <div class="qui-fx-jc u-mar-t10">
          <div class="qui-fx-ver">
            <div>发布人：{{detailInfo.userName}}</div>
            <div class="u-mar-t10">任务开始时间：{{detailInfo.beginTime | gmtToDate}}</div>
          </div>
          <div class="qui-fx-ver u-mar-l20">
            <div>发布时间：{{detailInfo.completeTime | gmtToDate}}</div>
            <div class="u-mar-t10">任务结束时间：{{detailInfo.endTime | gmtToDate}}</div>
          </div>
        </div>
      </div>
      <div class="u-mar-t10 bg-fff u-padd-10 u-padd-l20">
        <div class="qui-fx">
          <no-data
            msg="暂无题目~"
            v-if="radioList && checkList && fillList  && fileList && radioList.length === 0 && checkList.length === 0 && fillList.length === 0 && fileList.length === 0 "
          ></no-data>
          <div class="qui-fx-f1" v-else>
            <div class="u-mar" v-if="radioList.length !== 0">
              <div>单选题</div>
              <div class="subject u-mar-t10 u-padd-l20 u-padd-t10 u-padd-b10">
                <div class="qui-fx u-mar-t10" v-for="(list, i) in radioList" :key="i">
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
            <div class="u-mar" v-if="checkList.length !== 0">
              <div>多选题</div>
              <div class="subject u-mar-t10 u-padd-l20 u-padd-t10 u-padd-b10">
                <div class="qui-fx u-mar-t10" v-for="(list, i) in checkList" :key="i">
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
            <div class="u-mar" v-if="fillList.length !== 0">
              <div>填空题</div>
              <div class="subject u-mar-t10 u-padd-l20 u-padd-t10 u-padd-b10">
                <div class="qui-fx u-mar-t10" v-for="(list, i) in fillList" :key="i">
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
            <div class="u-mar" v-if="fileList.length !== 0">
              <div>附件</div>
              <div class="subject u-mar-t10 u-padd-l20 u-padd-t10 u-padd-b10">
                <div class="qui-fx u-mar-t10" v-for="(list, i) in fileList" :key="i">
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
        </div>
        <div class="detail-deal">
          <div class="detail-title">
            <div class="title">处理流程</div>
          </div>
          <a-timeline class="time-line">
            <a-timeline-item v-for="(item,index) in processes" :key="index">
              <div class="qui-fx">
                <div class="time-left">{{ item.content }}</div>
                <div class="qui-fx-f1">{{ item.createTime | gmtToDate }}</div>
              </div>
            </a-timeline-item>
          </a-timeline>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import hostEnv from '@config/host-env'
import { mapState, mapActions } from 'vuex'
import NoData from '@c/NoData'
import moment from 'moment'
export default {
  name: 'TaskStatus',
  components: {
    NoData
  },
  data() {
    return {
      radioList: [
        {
          id: '1'
        }
      ],
      checkList: [
        {
          id: '1'
        }
      ],
      fillList: [
        {
          id: '1'
        }
      ],
      fileList: [
        {
          id: '1'
        }
      ],
      radioCount: 0,
      checkCount: 0,
      fillCount: 0,
      fileCount: 0,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      isLoad: false,
      form: this.$form.createForm(this),
      times: [],
      taskCode: '',
      cardInfo: {
        taskType: '1'
      },
      value: 2020,
      minValue: 2020,
      weeks: '',
      weekCurrent: [],
      monthCurrent: [],
      allWeek: false,
      allMonth: false,
      isEdit: false,
      devices: [],
      title: 'xx小学',
      url: '',
      params: {},
      docUrl: '',
      show: true,
      flag: false,
      defaultFileList: [],
      docName: '',
      detailInfo: {},
      visible: false,
      processes: {}
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    // this.taskCode = this.$route.query.id
  },
  methods: {
    ...mapActions('home', [
      'reportTaskDetail',
      'addSchoolTask',
      'updateDailyTask',
      'addSafeTask',
      'updateSafeTask',
      'modifySchoolTask'
    ]),
    moment,
    // 获取详情
    async showDetail() {
      const req = {
        schoolCode: this.userInfo.schoolCode,
        // taskCode: this.taskCode
        taskCode: 'S9x0weqfc2oe9'
      }
      const res = await this.reportTaskDetail(req)
      this.cardInfo = res.data
      let questions = res.data.outUserAnswersDtoList.map((el, index) => {
        return {
          ...el,
          key: index
          // pointList: el.content
          //   ? el.content.map((item, i) => {
          //       return {
          //         key: i,
          //         content: item
          //       }
          //     })
          //   : undefined
        }
      })
      questions.map((el) => {
        if (el.questionType === '1') {
          this.radioList.push(el)
          this.radioCount = this.radioList.length
        } else if (el.questionType === '2') {
          this.checkList.push(el)
          this.checkCount = this.checkList.length
        } else if (el.questionType === '3') {
          this.fillList.push(el)
          this.fillCount = this.fillList.length
        } else {
          this.fileList.push(el)
          this.fileCount = this.fileList.length
        }
      })
      this.docName = 'res.data.docName'
      this.show = res.data.docUrl ? false : true
      this.flag = res.data.docUrl ? true : false
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  // height: calc(100% - 10px);
  // overflow-y: scroll;
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
    .task {
      width: 70px;
    }
    .report {
      width: 100px;
    }
  }
  .week-box {
    max-width: 600px;
    margin-top: 10px;
    border-top: 5px solid #6882da;
    box-shadow: 0px 0px 6px #ddd;
    padding: 10px;
    .week-item {
      width: 75px;
      display: inline-block;
      border: 1px solid #e7e7e7;
      text-align: center;
      cursor: pointer;
      margin: 5px 10px;
    }
  }
  .week-task {
    max-width: 1000px;
    .weeks {
      width: 70px;
      height: 30px;
      line-height: 30px;
      margin: 5px;
    }
  }
  .left {
    width: 220px;
    height: 300px;
    background-color: #fcfcfc;
    .left-content {
      width: 100%;
      height: 33px;
      line-height: 33px;
    }
    .bgc {
      color: #4d4cac;
      background-color: #f5f5fb;
    }
  }
  .ant-calendar-picker {
    width: 100% !important;
  }
  .active {
    background-color: #6882da;
    color: #fff;
  }
  .project {
    background-color: #fafafa;
  }
  .input {
    width: 90%;
    border: 1px dashed #cfcfcf;
  }
  .u-line {
    line-height: 32px;
  }
}
.top {
  border-bottom: 1px solid #ccc;
}
.subject {
  background-color: #fafafa;
}
</style>
