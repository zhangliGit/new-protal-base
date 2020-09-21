<template>
  <div class="check-completion page-layout bg-fff qui-fx-ver">
    <div class="u-font-1 u-bold u-mar-b10">任务名称： {{ taskName }}</div>
    <!-- v-if="taskType !== '1'" -->
    <div class="qui-fx-ac u-mar-t10  u-mar-l10 u-mar-b10" >
      <div>{{ taskType === '2' ? '周' : '月' }}计划：</div>
      <a-select v-model="dateNum" @change="showList()" style="width: 200px">
        <a-select-option v-for="(list,index) in planList" :key="index">{{ list }}</a-select-option>
      </a-select>
    </div>
    <div class="qui-fx-ac u-mar-b10">
      <div>任务状态：</div>
      <a-select @change="statusChange" default-value="" style="width: 200px">
        <a-select-option value="">所有任务</a-select-option>
        <a-select-option value="1">未完成</a-select-option>
        <a-select-option value="2">已完成</a-select-option>
        <a-select-option value="3">逾期填报</a-select-option>
        <a-select-option value="4">已打回,未重报</a-select-option>
        <a-select-option value="5">已打回,已重报</a-select-option>
      </a-select>
      <div>（已完成数/总数：{{ compNum }}/{{ sum }}）</div>
    </div>
    <div class="card" >
      <div class="cont u-fx-wp u-mar-t10">
        <div
          class="list-box u-fx-ac-jc u-mar-10"
          :class="v.state === '2' || v.state === '3'|| v.state === '5'? 'green' : 'red'"
          v-for="(v,index2) in dataList"
          :key="index2"
          @click="check(v)"
        >
          <div class="title u-bold u-font-1">{{ v.schoolName }}</div>
          <div class="btn u-fx-ac-jc u-font-01">{{ v.state | safetyTaskStatus }}</div>
        </div>
      </div>
    </div>
    <task-status ref="taskStatus"></task-status>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TaskStatus from '../../component/TaskStatus'
export default {
  name: 'CheckCompletion',
  components: {
    TaskStatus
  },
  data() {
    return {
      taskName: this.$route.query.taskName,
      state: '', // 状态
      status: '', // 任务状态
      dateNum: '', // 计划
      sum: '',
      compNum: '',
      planList: [],
      dataList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.id = this.$route.query.id
    this.taskType = this.$route.query.taskType
    this.taskCode = this.$route.query.taskCode
    this.showList()
    if (this.taskType !== '1') {
      this.taskTimeGet()
    }
  },
  methods: {
    ...mapActions('home', ['eduCompleteStatic', 'getTeachers', 'wechatNotice', 'planLists']),
    async showList() {
      const req = {
        state: this.states,
        'year': 0,
        dateNum: this.dateNum,
        schoolCode: this.userInfo.schoolCode,
        taskTemplateCode: this.taskCode,
        taskType: this.taskType
      }
      const res = await this.eduCompleteStatic(req)
      console.log(res)
      const { compNum, list, sum } = res.data
      this.compNum = compNum
      this.sum = sum
      this.dataList = list
    },
    statusChange(value) {
      if (value === '1') {
        this.state = ['1', '2']
      } else if (value === '2') {
        this.state = ['3']
      } else if (value === '3') {
        this.state = ['4']
      } else if (value === '4') {
        this.state = ['5', '6']
      } else if (value === '5') {
        this.state = ['7', '8']
      }
      this.showList()
    },
    async _planList() {
      const req = {
        taskCode: this.taskCode
      }
      const res = await this.planLists(req)
      this.planList = res.data.list
    },
    check(record) {
      console.log(record)
      if (record.state === '1') {
        this.$tools.delTip('确定要通知该学校相关负责人去处理该任务？', () => {
          // 查微信号
          const req1 = {
            schoolCode: record.schoolCode,
            userCodes: record.userCode.split(',')
          }
          this.getTeachers(req1).then((res) => {
            console.log(res)
            const req2 = {
           	  openId: res.data.map(v => v.openId),
              schoolCode: record.schoolCode,
              taskCode: record.taskCode
            }
            this.wechatNotice(req2).then(result => {
              console.log(result)
              this.$message.success('操作成功')
              this.$tools.goNext(() => {
                this.showList()
              })
            })
          })
        })
      } else {
        this.$refs.taskStatus.id = record.id
        this.$refs.taskStatus.title = record.title
        this.$refs.taskStatus.state = record.state
        this.$refs.taskStatus.showDetail(record)
        this.$refs.taskStatus.visible = true
      }
    }

  }
}
</script>
<style lang="less" scoped>
.check-completion {
  padding: 20px;
  .card {
    cursor: pointer;
    .title-tab {
      border-bottom: 1px solid #dedede;
      height: 30px;
      position: relative;
      display: flex;
      justify-content: space-between;
      .title-tab-pane {
        height: 30px;
        font-size: 14px;
        color: #666;
        margin-right: 40px;
        border-bottom: 1px solid #dedede;
        display: inline-block;
        font-weight: 400;
        cursor: pointer;
        &.on {
          color: #6882da;
          border-bottom: 2px solid #6882da;
          font-weight: bold;
        }
      }
    }
    .list-box {
      width: 250px;
      height: 100px;
      .btn {
        margin-top: 5px;
        color: #fff;
        width: 90px;
        height: 25px;
        border-radius: 15px;
      }
    }
    .green {
      background: url('../../assets/img/wanchengbg.png') no-repeat;
      background-size: 100% 100%;
      .btn {
        background-color: #00a35f;
      }
    }
    .red {
      background: url('../../assets/img/nowangcheng.png') no-repeat;
      background-size: 100% 100%;
      .btn {
        background-color: #ff5454;
      }
    }
  }
}
</style>
