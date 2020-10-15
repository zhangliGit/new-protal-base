<template>
  <div class="home page-layout">
    <div style="height: 10%;">
      <div class="daily-card u-bd-1px" v-for="item in baseList" :key="item.id">
        <div class="tip" :style="`color:${item.color}`">{{ item.tip }}</div>
        <div class="num">￥{{ item.num }}</div>
        <div class="qui-fx-je">
          <img :src="item.icon" alt />
        </div>
      </div>
    </div>
    <div style="height: 40%;">
      <div class="middle-card task-list u-bd-1px">
        <div><span class="line"></span><span class="u-font-3">近期收费任务</span></div>
        <div class="u-bd-b u-mar-t10"></div>
        <div v-for="item in recordList" :key="item.id">
          <div class=" u-mar-t10 u-fx-jsb">
            <div class="set-width">{{ item.taskName }}</div>
            <a-progress :percent="GetPercent(item.paidSum, item.billSum)" />
            <div></div>
          </div>
          <div class="u-bd-b u-mar-t10"></div>
        </div>
      </div>
      <div class="middle-card charge-list u-bd-1px">
        <div><span class="line"></span><span class="u-font-3">收费基本统计</span></div>
        <div class="u-bd-b u-mar-t10"></div>
        <div class=" u-mar-t10 u-fx-jsb">
          所有收费任务
          <div>{{ this.middleData.chargeTaskCount }}</div>
        </div>
        <div class="u-bd-b u-mar-t10"></div>
        <div class=" u-mar-t10 u-fx-jsb">
          所有账单
          <div>{{ this.middleData.billCount }}</div>
        </div>
        <div class="u-bd-b u-mar-t10"></div>
        <div class=" u-mar-t10 u-fx-jsb">
          待缴费账单
          <div>{{ this.middleData.unPaidBillCount }}</div>
        </div>
        <div class="u-bd-b u-mar-t10"></div>
        <div class=" u-mar-t10 u-fx-jsb">
          即将过期账单
          <div>{{ this.middleData.willOverdueBillCount }}</div>
        </div>
        <div class="u-bd-b u-mar-t10"></div>
        <div class=" u-mar-t10 u-fx-jsb">
          缴费逾期账单
          <div>{{ this.middleData.overdueBillCount }}</div>
        </div>
        <div class="u-bd-b u-mar-t10"></div>
      </div>
    </div>
    <div style="height: 50%;">
      <div class=" chart-list">
        <div><span class="line"></span><span class="u-font-3"> 每日收费态势图</span></div>
        <div id="heatId" :style="{ height: chartHeight }"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Tools from '@u/tools'
import moment from 'moment'
import billImg from '../assets/img/illu_1.png'
import discountImg from '../assets/img/illu_2.png'
import retImg from '../assets/img/illu_3.png'
import overtImg from '../assets/img/illu_4.png'
import paidImg from '../assets/img/illu_5.png'
import Highcharts from 'highcharts/highstock'
export default {
  name: 'Home',
  components: { Highcharts },
  data() {
    return {
      moment,
      baseList: [],
      searchList: {
        schoolCode: '',
        dateTime: moment(moment(new Date())).format('YYYY-MM-DD')
      },
      dailyData: {},
      middleData: {},
      pageList: {
        page: 1,
        size: 20
      },
      recordList: [],
      chartHeight: '',
      xDate: [],
      feverData: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created() {
    this.chartHeight = document.body.clientHeight * 0.38 + 'px'
  },
  mounted() {
    this.searchList.schoolCode = this.userInfo.schoolCode
    this.showList()
    this.init()
    this.getChargeCurveList()
    for (var i = 0; i < 14; i++) {
      this.xDate.unshift(moment(new Date(new Date().setDate(new Date().getDate() - i))).format('MM-DD'))
      this.feverData.unshift(0)
    }
  },
  methods: {
    ...mapActions('home', ['getChargeBasic', 'getChargeCurve', 'getChargeMoney', 'getchargeTaskList']),
    async showList() {
      this.searchList = Object.assign(this.searchList)
      const res = await this.getChargeMoney(this.searchList)
      this.dailyData = res.data
      this.baseList = [
        {
          id: 1,
          icon: billImg,
          num: res.data.billMoneySum,
          tip: '账单总金额',
          color: '#FF7122'
        },
        {
          id: 2,
          icon: discountImg,
          num: res.data.preMoneySum,
          tip: '优惠总金额',
          color: '#228AE5'
        },
        {
          id: 3,
          icon: retImg,
          num: res.data.recMoneySum,
          tip: '应收总金额',
          color: '#08B7A3'
        },
        {
          id: 4,
          icon: overtImg,
          num: res.data.overdueMoneySum,
          tip: '逾期总金额',
          color: '#ffdedf',
          color: '#EB4343'
        },
        {
          id: 5,
          icon: paidImg,
          num: res.data.paidMoneySum,
          tip: '实收总金额',
          color: '#8819FD'
        }
      ]
    },
    async init() {
      const res = await this.getChargeBasic(this.userInfo.schoolCode)
      this.middleData = res.data
      this.searchList.pageNum = this.pageList.page
      this.searchList.pageSize = this.pageList.size
      this.searchList.schoolCode = this.userInfo.schoolCode
      this.searchList = Object.assign(this.searchList)
      const tas = await this.getchargeTaskList(this.searchList)
      this.recordList = tas.data.records
    },
    async getChargeCurveList() {
      const res = await this.getChargeCurve(this.userInfo.schoolCode)
      if (res.data) {
        let i
        res.data.forEach((ele) => {
          this.xDate.filter((item, index) => {
            if (item === moment(ele.statDate).format('YYYY-MM-DD')) {
              i = index
            }
          })
          this.feverData[i] = ele.paidSum
        })
      }
      this.initHeatChart('heatId', this.feverData, this.xDate)
    },
    initHeatChart(id, feverData, xDate) {
      Highcharts.chart(id, {
        chart: {
          type: 'area'
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        legend: {
          verticalAlign: 'top',
          margin: 5,
          align: 'right'
        },
        xAxis: {
          allowDecimals: false,
          categories: xDate
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          },
          allowDecimals: false,
          labels: {
            formatter: function() {
              return this.value
            }
          }
        },
        tooltip: {
          pointFormat: '{series.name} <b>{point.y:,.0f}</b>元'
        },
        plotOptions: {
          area: {
            pointStart: 0,
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        series: [
          {
            name: '缴费金额',
            color: '#4E4CAC',
            data: feverData
          }
        ]
      })
    },
    GetPercent(num, total) {
      num = parseFloat(num)
      total = parseFloat(total)
      if (isNaN(num) || isNaN(total)) {
        return '-'
      }
      return total <= 0 ? '0' : Math.round((num / total) * 10000) / 100.0
    }
  }
}
</script>
<style lang="less" scoped>
.daily-card {
  padding: 10px 10px;
  width: 17.6%;
  float: left;
  margin-left: 2%;
  height: 110px;
  border-radius: 5px;
  margin-top: 10px;
  .num {
    font-size: 24px;
    font-weight: bold;
  }
  .tip {
    font-size: 16px;
  }
}
.middle-card {
  padding: 10px 10px;
  float: left;
  margin-left: 2%;
  border-radius: 5px;
  margin-top: 10px;
  .line {
    border: 2px solid #9698d6;
    margin-right: 10px;
  }
  .num {
    font-size: 24px;
    font-weight: bold;
  }
  .tip {
    font-size: 16px;
  }
}
.task-list {
  width: 52%;
  .set-width {
    width: 15%;
  }
}
.charge-list {
  width: 42%;
}
.chart-list {
  height: 50%;
  width: 96%;
  padding: 10px 10px;
  margin-top: 10px;
  margin-left: 2%;

  .line {
    border: 2px solid #9698d6;
    margin-right: 10px;
  }
}
</style>
