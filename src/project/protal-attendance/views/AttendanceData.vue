<template>
  <div class="page-layout qui-fx-ver attend-data">
    <a-tabs v-model="autoKey">
      <a-tab-pane tab="教职工上下班考勤" key="1" forceRender>
        <div id="container" style="height: 340px; margin-top: 20px" v-show="tearcherType !== '1'"></div>
        <div v-show="tearcherType === '1'">
          <div class="attend-card qui-fx-ver" v-for="(teacher, index) in teacherData" :key="index">
            <ul>
              <li class="tip">{{ teacher.title }}</li>
              <li class="total">{{ teacher.total }}</li>
              <li>{{ teacher.tip }}</li>
            </ul>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="学生上下学考勤" key="2" forceRender>
        <div id="container1" style="height: 340px; margin-top: 20px" v-show="studentType !== '1'"></div>
        <div v-show="studentType === '1'">
          <div class="attend-card qui-fx-ver" v-for="(student, index) in studentData" :key="index">
            <ul>
              <li class="tip">{{ student.title }}</li>
              <li class="total">{{ student.total }}</li>
              <li>{{ student.tip }}</li>
            </ul>
          </div>
        </div>
      </a-tab-pane>
      <div slot="tabBarExtraContent">
        <a-radio-group v-show="autoKey === '1'" v-model="tearcherType" buttonStyle="solid">
          <a-radio-button value="1">昨天</a-radio-button>
          <a-radio-button value="7">近7天</a-radio-button>
          <a-radio-button value="30">一个月</a-radio-button>
        </a-radio-group>
        <a-radio-group v-show="autoKey === '2'" v-model="studentType" buttonStyle="solid">
          <a-radio-button value="1">昨天</a-radio-button>
          <a-radio-button value="7">近7天</a-radio-button>
          <a-radio-button value="30">一个月</a-radio-button>
        </a-radio-group>
      </div>
    </a-tabs>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
export default {
  name: 'AttendanceData',
  components: {},
  watch: {},
  data() {
    return {
      autoKey: '1',
      studentType: '1',
      tearcherType: '1',
      teacherData: [
        {
          title: '正常',
          total: '300',
          tip: 'Check in to work normally'
        },
        {
          title: '迟到',
          total: '20',
          tip: 'Check in to work normally'
        },
        {
          title: '上班缺卡',
          total: '28',
          tip: 'Check in to work normally'
        },
        {
          title: '早退',
          total: '4',
          tip: 'Check in to work normally'
        },
        {
          title: '下班缺卡',
          total: '6',
          tip: 'Check in to work normally'
        },
        {
          title: '缺勤',
          total: '8',
          tip: 'Check in to work normally'
        },
        {
          title: '请假',
          total: '10',
          tip: 'Check in to work normally'
        }
      ],
      studentData: [
        {
          title: '正常',
          total: '200',
          tip: 'Check in to work normally'
        },
        {
          title: '迟到',
          total: '28',
          tip: 'Check in to work normally'
        },
        {
          title: '上学缺卡',
          total: '18',
          tip: 'Check in to work normally'
        },
        {
          title: '早退',
          total: '14',
          tip: 'Check in to work normally'
        },
        {
          title: '放学缺卡',
          total: '16',
          tip: 'Check in to work normally'
        },
        {
          title: '缺勤',
          total: '23',
          tip: 'Check in to work normally'
        },
        {
          title: '请假',
          total: '12',
          tip: 'Check in to work normally'
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.showBI('container')
      this.showBI('container1')
    }, 1500)
  },
  methods: {
    showBI(id) {
      Highcharts.chart(id, {
        title: {
          text: ''
        },
        xAxis: {
          categories: ['0201', '0202', '0203', '0204', '0205', '0206', '0207']
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
            data: [4, 7, 6, 9, 14, 18, 21]
          },
          {
            name: '迟到',
            marker: {
              symbol: 'diamond'
            },
            data: [2, 4, 5, 8, 11, 15, 17]
          },
          {
            name: '上班缺卡',
            marker: {
              symbol: 'diamond'
            },
            data: [5, 3, 5, 8, 11, 15, 17]
          },
          {
            name: '早退',
            marker: {
              symbol: 'diamond'
            },
            data: [7, 3, 8, 12, 16, 12, 15]
          },
          {
            name: '下班缺卡',
            marker: {
              symbol: 'diamond'
            },
            data: [15, 13, 15, 18, 12, 16, 11]
          },
          {
            name: '缺勤',
            marker: {
              symbol: 'diamond'
            },
            data: [8, 11, 5, 4, 10, 12, 8]
          },
          {
            name: '下班缺卡',
            marker: {
              symbol: '请假'
            },
            data: [10, 4, 6, 8, 10, 12, 14]
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
    width: 22.5%;
    float: left;
    margin-left: 2%;
    height: 120px;
    .tip {
      font-size: 16px;
    }
    .total {
      padding: 10px 0;
      font-size: 24px;
      font-weight: bold;
    }
    &:nth-child(1) {
      background: url('../assets/img/zc.png') no-repeat center;
      background-size: 100% 100%;
    }
    &:nth-child(2) {
      background: url('../assets/img/cd.png') no-repeat center;
      background-size: 100% 100%;
    }
    &:nth-child(3) {
      background: url('../assets/img/zt.png') no-repeat center;
      background-size: 100% 100%;
    }
    &:nth-child(4) {
      background: url('../assets/img/qj.png') no-repeat center;
      background-size: 100% 100%;
    }
    &:nth-child(5) {
      background: url('../assets/img/qk.png') no-repeat center;
      background-size: 100% 100%;
    }
    &:nth-child(6) {
      background: url('../assets/img/qk.png') no-repeat center;
      background-size: 100% 100%;
    }
    &:nth-child(7) {
      background: url('../assets/img/qq.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
}
</style>
