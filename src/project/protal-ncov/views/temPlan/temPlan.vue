<template>
  <div class="set-up page-layout qui-fx-ver">
    <div class="time-right">
      <div class="tips_con">
        <div class="tips-title">使用指南</div>
        <div class="tips-body">
          <p>
            1、测温计划全校通用。没有勾选的工作日，测温数据不计入测温计划统计（疫情日报）。
          </p>
          <p>
            2、测温计划时间必须首尾衔接，第一个计划从00:00开始，最后一个计划23:59结束。下一个计划的开始时间，默认是上一个计划的结束时间加一分钟，不可修改。
          </p>
          <p>
            3、测温计划名称用户可编辑。
          </p>
          <p>4、测温计划可增删，最多4个测温计划，至少保留1个。</p>
        </div>
      </div>
    </div>
    <a-form>
      <div class="set_plan">
        <a-form-item v-bind="formItemLayout" label="测温工作日">
          <a-checkbox-group v-model="teacherNoticer">
            <a-checkbox value="1">星期一</a-checkbox>
            <a-checkbox value="2">星期二</a-checkbox>
            <a-checkbox value="3">星期三</a-checkbox>
            <a-checkbox value="4">星期四</a-checkbox>
            <a-checkbox value="5">星期五</a-checkbox>
            <a-checkbox value="6">星期六</a-checkbox>
            <a-checkbox value="7">星期日</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="测温时段" v-bind="formItemLayout">
          <ul>
            <li class="qui-fx-f1" v-for="(time, index) in timeList" :key="index">
              <div class="qui-fx">
                <a-input v-model="time.planName" placeholder="测温计划名称" @change="change(time.planName)" />
                <a-time-picker disabled v-model="time.startTime" format="HH:mm" />
                <span style="padding: 0 8px">至</span>
                <a-time-picker
                  v-model="time.endTime"
                  format="HH:mm"
                  @change="changeTime([...arguments, index])"
                  :disabled="index === timeList.length - 1 && index === 3"
                ></a-time-picker>
                <a-button @click="add(false)" v-if="index === timeList.length - 1 && index > 0">删除</a-button>
              </div>
            </li>
          </ul>
        </a-form-item>
        <a-row>
          <a-col :span="4" :offset="10">
            <a-form-item>
              <div style="margin-top:50px;">
                <!-- <a-button style="margin-right:10px; background-color: #ccc; color:#fff" @click="cancle">取消</a-button> -->
                <a-button class="add-btn" @click="handleSubmit">确定</a-button>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
    </a-form>
  </div>
</template>
<script>
import moment from 'moment'
import $tools from '@u/tools'
import { mapActions, mapState } from 'vuex'
const columns = [
  {
    dataIndex: 'accessTime',
    align: 'center',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'temPlan',
  components: {},
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 14 }
      },
      teacherNoticer: [],
      columns,
      name: '',
      isShow: false,
      timeList: [],
      inVal: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created() {
    this.showData()
  },
  methods: {
    moment,
    ...mapActions('home', ['saveorUpdate', 'getplanList', 'gettimeList']),
    changeTime([a, b, index]) {
      if (index === 3) {
        this.timeList[index].endTime = '23:59'
        return
      }
      if (b !== '23:59') {
        if (index === this.timeList.length - 1) {
          this.add(true, this.timeList[index].endTime, '23:59')
        } else {
          this.modifyTime(b, index)
        }
      }
    },
    modifyTime(b, index) {
      let time = b
      let tempTime = '2020-01-01 ' + time + ':00'
      let date = this.$tools.getDateTime(tempTime)
      let newDate = new Date(date.getTime() + 60000)
      let startDate = this.$tools.getDate(newDate, 2)
      this.timeList[index + 1].startTime = moment(startDate, 'HH:mm')
    },
    add(tag, sTime, eTime) {
      let time = moment(sTime).format('HH:mm')
      let tempTime = '2020-01-01 ' + time + ':00'
      let date = this.$tools.getDateTime(tempTime)
      let newDate = new Date(date.getTime() + 60000)
      let startDate = this.$tools.getDate(newDate, 2)
      if (tag) {
        this.timeList.push({
          startTime: startDate,
          endTime: eTime
        })
      } else {
        this.timeList.splice(this.timeList.length - 1)
        this.timeList[this.timeList.length - 1].endTime = '23:59'
      }
      this.editTag()
    },
    editTag() {
      this.timeList = this.timeList.map(item => {
        return {
          ...item,
          startTime: moment(item.startTime, 'HH:mm'),
          endTime: moment(item.endTime, 'HH:mm')
        }
      })
      console.log(this.timeList)
    },
    async showData() {
      const res = await this.getplanList({ schoolCode: this.userInfo.schoolCode })
      if (!res.data) {
        this.timeList = [
          { startTime: moment('0:00', 'HH:mm'), endTime: moment('12:00', 'HH:mm'), planName: '晨检' },
          { startTime: moment('12:01', 'HH:mm'), endTime: moment('23:59', 'HH:mm'), planName: '午检' }
        ]
        this.teacherNoticer = [1, 2, 3, 4, 5].toString()
        this.handleSubmit()
      } else {
        this.teacherNoticer = res.data.weekday.split(',')
        res.data.timeSlot.forEach((item, index) => {
          this.timeList.push({
            startTime: moment(item.startTime ? this.$tools.getDate(item.startTime) : '', 'HH:mm' / 1000),
            endTime: moment(item.endTime ? this.$tools.getDate(item.endTime) : '', 'HH:mm' / 1000),
            planName: item.planName
          })
        })
      }
    },
    change(name) {
      this.inVal = name
      if (this.inVal == '') {
        this.$message.warning('请输入测温计划名称!')
        return
      }
    },
    handleSubmit() {
      const timeSlot = []
      this.timeList.forEach(item => {
        timeSlot.push({
          startTime: moment(item.startTime).format('HH:mm'),
          endTime: moment(item.endTime).format('HH:mm'),
          planName: item.planName
        })
      })
      for (let i = 0; i < timeSlot.length; i++) {
        if (timeSlot[i].planName == undefined) {
          this.$message.warning('请输入测温计划名称!')
          return
        }
      }
      const req = {
        schoolCode: this.userInfo.schoolCode,
        schoolName: this.userInfo.schoolName,
        weekday: this.teacherNoticer.toString(),
        timeSlot
      }
      this.saveorUpdate(req).then(res => {
        const timeSlot = []
        this.timeList = []
        this.showData()
        this.$message.success('保存成功!')
      })
    }
    // cancle() {
    //   this.timeList.splice(this.timeList.length - 1)
    //   this.timeList[this.timeList.length - 1].endTime = '23:59'
    //   this.editTag()
    // }
  }
}
</script>
<style lang="less" scoped>
.set-up {
  background: #fff;
  padding: 10px 40px;
  overflow: auto;
}
.ant-input-number {
  width: 100%;
}
.time-right {
  height: 274px;
  background: url(../../assets/img/plan_bg.png) no-repeat;
  background-size: 100% 100%;
  .tips_con {
    padding: 30px;
    margin-top: 50px;
  }
  .tips-title {
    color: #f08080;
    font-size: 18px;
    margin-bottom: 10px;
  }
}
.set_plan {
  margin-top: 20px;
  ul li input {
    width: 200px;
    margin-right: 30px;
  }
}
</style>
