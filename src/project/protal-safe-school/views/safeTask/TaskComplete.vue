<template>
  <div class="check-completion page-layout bg-fff qui-fx-ver">
    <div class="u-font-1 u-bold u-mar-b10">任务名称 {{ taskName }}</div>
    <div class="qui-fx-ac u-mar-t10 u-mar-b10" v-if="taskType !== '1'">
      <div>{{ taskType === '2' ? '周' : '月' }}计划：</div>
      <a-select default-value="1" style="width: 200px">
        <a-select-option v-for="(list,index) in 10" :key="index">{{ list }}</a-select-option>
      </a-select>
    </div>
    <div class="qui-fx-ac u-mar-b10">
      <div>任务状态：</div>
      <a-select default-value="1" style="width: 200px">
        <a-select-option value="1">所有任务</a-select-option>
        <a-select-option value="2">未完成</a-select-option>
        <a-select-option value="3">已完成</a-select-option>
        <a-select-option value="4">逾期填报</a-select-option>
      </a-select>
      <div>（已完成数/总数：3/9）</div>
    </div>
    <div class="card" v-for="(item,index) in dataList" :key="index">
      <div class="title-tab">
        <span class="title-tab-pane on u-type-primary">{{ item.name }}</span>
      </div>
      <div class="cont u-fx-wp u-mar-t10">
        <div
          class="list-box u-fx-ac-jc u-mar-10"
          :class="v.state === '4' || v.state === '3'? 'green' : 'red'"
          v-for="(v,index2) in item.schoolAndStateList"
          :key="index2"
          @click="check(v)"
        >
          <div class="title u-bold u-font-1">{{ v.name }}</div>
          <div class="btn u-fx-ac-jc u-font-01">{{ v.state | taskStatus }}</div>
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
    this.taskType = this.$route.query.taskType
    this.taskCode = this.$route.query.taskCode
    return {
      dataList: [
        {
          name: '2',
          schoolAndStateList: [
            { name: '云校园', state: '3' },
            { name: '云校园', state: '4' }
          ]
        },
        {
          name: '2',
          schoolAndStateList: [
            { name: '云校园', state: '3' },
            { name: '云校园', state: '4' }
          ]
        }
      ],
      taskName: 'dasd'
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    // this.showList()
  },
  methods: {
    ...mapActions('home', ['TaskCompletedStatus']),
    async showList() {
      const req = {
        schoolCode: this.userInfo.schoolCode,
        status: this.state,
        taskTemplateCode: this.taskCode
      }
      console.log(this.TaskCompletedStatus)
      const res = await this.TaskCompletedStatus(req)
      console.log(res)
      // this.dataList = res.data
    },
    check(record) {
      if (record.state === '0') {
        this.$tools.delTip('确定要通知该学校相关负责人去处理该任务？', () => {
          this.delAlarmList(record.id).then((res) => {
            this.$message.success('操作成功')
            this.$tools.goNext(() => {
              this.showList()
            })
          })
        })
      } else {
        this.$refs.taskStatus.title = record.schoolName
        this.$refs.taskStatus.showDetail(record.id)
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
