<template>
  <div class="page-layout attend-data qui-fx-ver">
    <div class="box">
      <div class="teacher-box">
        <div class="qui-fx-jsb qui-fx-ac u-padd-t20 u-padd-l20 u-padd-r20">
          <div class="qui-fx-ac">
            <img class="u-font-02" :src="kaoqin" alt="">
            <span class="u-mar-l10">教职工考勤数据统计</span>
          </div>
          <div>
            日期：<a-date-picker :allowClear="false"/>
          </div>
        </div>
        <div class="u-padd-l20 u-padd-r20">
          <div class="list" v-for="(item,index) in teacherList" :key="index">
            <div class="item qui-fx-ac">
              <div class="item-title u-tx-r">{{ item.title }}</div>
              <div class="attend-card qui-fx-ver" v-for="(teacher, i) in teacherData" :key="i">
                <ul>
                  <li class="tip">{{ teacher.title }}</li>
                  <li :class="['total',teacher.key === '1' ? 'u-type-success' : teacher.key === '2' ? 'u-type-error' : 'u-type-warning' ]">{{ teacher.total }}</li>
                  <li>{{ teacher.tip }}</li>
                </ul>
                <div class="list-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="student-box">
        <div class="qui-fx-jsb qui-fx-ac u-padd-t20 u-padd-l20 u-padd-r20">
          <div class="qui-fx-ac">
            <img class="u-font-02" :src="kaoqin" alt="">
            <span class="u-mar-l10">学生考勤数据统计</span>
          </div>
          <div>
            日期：<a-date-picker :allowClear="false"/>
          </div>
        </div>
        <div class="u-padd-l20 u-padd-r20">
          <div class="list" v-for="item in studentList" :key="item.key">
            <div class="item qui-fx-ac">
              <div class="item-title u-tx-r">{{ item.title }}</div>
              <div class="attend-card qui-fx-ver" v-for="(student, index) in teacherData" :key="index">
                <ul>
                  <li class="tip">{{ student.title }}</li>
                  <li :class="['total',student.key === '1' ? 'u-type-success' : student.key === '2' ? 'u-type-error' : 'u-type-warning' ]">{{ student.total }}</li>
                  <li>{{ student.tip }}</li>
                </ul>
                <div class="list-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import 'moment/locale/zh-cn'
import kaoqin from '../assets/img/kaoqin.png'
import iconChidao from '../assets/img/icon_chidao.png'
export default {
  name: 'AttendanceData',
  components: {},
  data() {
    return {
      iconChidao,
      kaoqin,
      moment,
      autoKey: '1',
      studentType: '1',
      tearcherType: '1',
      pageList: {
        page: 1,
        size: 20
      },
      teacherData: [
        {
          key: '1',
          title: '正常(人)',
          total: '0',
          tip: ''
        },
        {
          key: '2',
          title: '迟到(人)',
          total: '0',
          tip: ''
        },
        {
          key: '3',
          title: '缺卡(人)',
          total: '0',
          tip: ''
        }
      ],
      studentData: [
        {
          title: '正常(人)',
          total: '0',
          tip: ''
        },
        {
          title: '迟到(人)',
          total: '0',
          tip: ''
        },
        {
          title: '缺卡(人)',
          total: '0',
          tip: ''
        }
      ],
      xDate: [],
      teaDate: [[], [], [], [], [], [], []],
      stuDate: [[], [], [], [], [], [], []],
      normalList: [],
      lateList: [],
      onNoRecordList: [],
      earlyList: [],
      offNoRecordList: [],
      noRecordList: [],
      leaveList: [],
      teacherList: [
        {
          title: '上午上班'
        },
        {
          key: '2',
          title: '上午下班'
        },
        {
          key: '3',
          title: '下午上班'
        },
        {
          key: '4',
          title: '下午下班'
        }
      ],
      studentList: [
        {
          title: '上学'
        },
        {
          title: '放学'
        }
      ],
      startDay: new Date()
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  watch: {
    autoKey: {
      handler (newVal, oldVal) {
        if (newVal === '1') {
          this.showTeaData()
        } else if (newVal === '2') {
          this.showStuData()
        }
      },
      deep: true
    },
    tearcherType: {
      handler (newVal, oldVal) {
        if (this.autoKey === '1' && this.tearcherType !== '0' && this.studentType !== '0') {
          this.showTeaData()
        } else if (this.autoKey === '2' && this.tearcherType !== '0' && this.studentType !== '0') {
          this.showStuData()
        }
      },
      deep: true
    },
    studentType: {
      handler (newVal, oldVal) {
        if (this.autoKey === '1' && this.tearcherType !== '0' && this.studentType !== '0') {
          this.showTeaData()
        } else if (this.autoKey === '2' && this.tearcherType !== '0' && this.studentType !== '0') {
          this.showStuData()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.showTeaData()
  },
  methods: {
    ...mapActions('home', [
      'getTeaRecordStatic', 'getStuRecordStatic'
    ]),
    async showTeaData() {
      const req = {
        date: this.startDay,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getTeaRecordStatic(req)
      // day (string, optional),
      // morningOffEarlyCount (integer, optional): 上午下班早退 ,
      // morningOffNoRecordCount (integer, optional): 上午下班缺卡 ,
      // morningOffNormalCount (integer, optional): 上午下班正常 ,
      // morningOnLateCount (integer, optional): 上午上班迟到 ,
      // morningOnNoRecordCount (integer, optional): 上午上班缺卡 ,
      // morningOnNormalCount (integer, optional): 上午上班正常 ,
      // noonOffEarlyCount (integer, optional): 下午下班早退 ,
      // noonOffNoRecordCount (integer, optional): 下午下班缺卡 ,
      // noonOffNormalCount (integer, optional): 下午下班正常 ,
      // noonOnLateCount (integer, optional): 下午上班迟到 ,
      // noonOnNoRecordCount (integer, optional): 下午上班缺卡 ,
      // noonOnNormalCount (integer, optional): 下午上班正常
      if (res.data.length === 0) {
        return
      }
      if (this.tearcherType === '1') {
        this.teacherData[0].total = res.data[0].morningOnNormalCount || 0
        this.teacherData[1].total = res.data[0].morningOnLateCount || 0
        this.teacherData[2].total = res.data[0].morningOnNoRecordCount || 0
        this.teacherData[3].total = res.data[0].morningOffNormalCount || 0
        this.teacherData[4].total = res.data[0].morningOffEarlyCount || 0
        this.teacherData[5].total = res.data[0].morningOffNoRecordCount || 0
        // this.teacherData[6].total = res.data[0].leaveCount || 0
      } else {
        res.data.forEach(ele => {
          const day = (new Date(ele.day).getMonth() + 1 > 9 ? new Date(ele.day).getMonth() + 1 : '0' + (new Date(ele.day).getMonth() + 1)) +
      '-' + (new Date(ele.day).getDate() > 9 ? new Date(ele.day).getDate() : '0' + new Date(ele.day).getDate())
          this.xDate.forEach((item, i) => {
            if (item === day) {
              this.teaDate[0][i] = ele.normalCount
              this.teaDate[1][i] = ele.lateCount
              this.teaDate[2][i] = ele.onNoRecordCount
              this.teaDate[3][i] = ele.earlyCount
              this.teaDate[4][i] = ele.offNoRecordCount
              this.teaDate[5][i] = ele.noRecord
              this.teaDate[6][i] = ele.leaveCount
            }
          })
        })
      }
    },
    async showStuData() {
      const req = {
        endDay: this.endDay,
        startDay: this.startDay,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getStuRecordStatic(req)
      if (res.data.length === 0) {
        return
      }
      if (this.studentType === '1') {
        this.studentData[0].total = res.data[0].normalCount || 0
        this.studentData[1].total = res.data[0].lateCount || 0
        this.studentData[2].total = res.data[0].onNoRecordCount || 0
        this.studentData[3].total = res.data[0].earlyCount || 0
        this.studentData[4].total = res.data[0].offNoRecordCount || 0
        this.studentData[5].total = res.data[0].noRecord || 0
        this.studentData[6].total = res.data[0].leaveCount || 0
      } else {
        res.data.forEach(ele => {
          const day = (new Date(ele.day).getMonth() + 1 > 9 ? new Date(ele.day).getMonth() + 1 : '0' + (new Date(ele.day).getMonth() + 1)) +
      '-' + (new Date(ele.day).getDate() > 9 ? new Date(ele.day).getDate() : '0' + new Date(ele.day).getDate())
          this.xDate.forEach((item, i) => {
            if (item === day) {
              this.stuDate[0][i] = ele.normalCount
              this.stuDate[1][i] = ele.lateCount
              this.stuDate[2][i] = ele.onNoRecordCount
              this.stuDate[3][i] = ele.earlyCount
              this.stuDate[4][i] = ele.offNoRecordCount
              this.stuDate[5][i] = ele.noRecord
              this.stuDate[6][i] = ele.leaveCount
            }
          })
        })
      }
    },
    disabledEndDate (current) {
      return current && current > moment().endOf('day')
    },
    /* disabledEndDate (time) {
      const lastMonthTime = new Date().setMonth(new Date().getMonth() - 1)
      return time > Date.now() || time < lastMonthTime
    }, */
    // 时间转换
    getDate(date, type) {
      const day = type === '1' ? 1 : type === '2' ? 7 : 30
      return moment(date - day * 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
    },
    // 获取两个日期之间的每一天
    formatEveryDay(start, end) {
      const dateList = []
      var startTime = this.getNewDate(start)
      var endTime = this.getNewDate(end)
      while ((endTime.getTime() - startTime.getTime()) >= 0) {
        var month = startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() + 1
        var day = startTime.getDate().toString().length === 1 ? '0' + startTime.getDate() : startTime.getDate()
        dateList.push(month + '-' + day)
        startTime.setDate(startTime.getDate() + 1)
      }
      return dateList
    },
    getNewDate(datestr) {
      var temp = datestr.split('-')
      var date = new Date(temp[0], temp[1] - 1, temp[2])
      return date
    },
    onChange(date, dateString) {
      console.log(date, dateString)
      const length = parseInt((moment(date[1]).valueOf() - moment(date[0]).valueOf()) / (1000 * 60 * 60 * 24))
      console.log(length)
      if (length > 31) {
        this.$message.warning('日期区间不能大于1一个月')
        return
      }
      this.xDate = []
      this.teaDate = [[], [], [], [], [], [], []]
      this.stuDate = [[], [], [], [], [], [], []]
      this.startDay = dateString[0]
      this.endDay = dateString[1]
      this.xDate = this.formatEveryDay(dateString[0], dateString[1])
      for (var i = 0; i < (length + 1); i++) {
        this.teaDate.forEach(ele => {
          ele.unshift(0)
        })
        this.stuDate.forEach(ele => {
          ele.unshift(0)
        })
      }
      console.log(this.teaDate)
      if (this.autoKey === '1') {
        this.showTeaData()
      } else if (this.autoKey === '2') {
        this.showStuData()
      }
    },
    showBI(id, xDate, yDate) {
      Highcharts.chart(id, {
        title: {
          text: ''
        },
        xAxis: {
          categories: xDate
        },
        yAxis: {
          title: {
            text: '人数'
          },
          labels: {
            formatter: function() {
              return this.value
            }
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
            }
          }
        },
        credits: {
          enabled: false // 不显示LOGO
        },
        series: [
          {
            name: '正常',
            marker: {
              symbol: 'square'
            },
            data: yDate[0]
          },
          {
            name: '迟到',
            marker: {
              symbol: 'diamond'
            },
            data: yDate[1]
          },
          {
            name: this.autoKey === '1' ? '上班缺卡' : '上学缺卡',
            marker: {
              symbol: 'diamond'
            },
            data: yDate[2]
          },
          {
            name: '早退',
            marker: {
              symbol: 'diamond'
            },
            data: yDate[3]
          },
          {
            name: this.autoKey === '1' ? '下班缺卡' : '放学缺卡',
            marker: {
              symbol: 'diamond'
            },
            data: yDate[4]
          },
          {
            name: '缺勤',
            marker: {
              symbol: 'diamond'
            },
            data: yDate[5]
          },
          {
            name: '请假',
            marker: {
              symbol: 'leave'
            },
            data: yDate[6]
          }
        ]
      })
    }
  }
}
</script>
<style lang="less" scoped>
.attend-data {
  background-color: #fff;
  .title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .attend-card {
    padding: 10px 20px;
    margin-top: 20px;
    width: 28%;
    float: left;
    margin-left: 2%;
    height: 120px;
    background-color: #f1f6ff;
    position: relative;
    .tip {
      font-size: 16px;
    }
    .total {
      padding: 10px 0;
      font-size: 24px;
      font-weight: bold;
    }
    .list-icon {
      width: 60px;
      height: 60px;
      position: absolute;
      right: 0;
      bottom: 0;
      background-size: 100% 100%;
    }
    &:nth-child(2) .list-icon {
      background: url('../assets/img/icon_chidao.png') no-repeat center;
    }
    &:nth-child(3) .list-icon{
      background: url('../assets/img/icon_queka.png') no-repeat center;
    }
    &:nth-child(4) .list-icon{
      background: url('../assets/img/icon_zaotui.png') no-repeat center;
    }
  }
}

.list {
  .item {
    float: left;
    width: 50%;
  }
}
.bottom {
  position: fixed;
  bottom: 10px;
  height: 258px;
  width: calc(100% - 272px);
  background: url('../assets/img/dbct.png') no-repeat center;
  background-size: 100% 100%;
}
.box {
  max-height: 550px;
  overflow-y: scroll;
}
.item-title {
  width: 60px;
}
</style>
