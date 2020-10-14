<template>
  <div class="page-layout u-fx-ver card-home">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel"></search-form>
    <div class="u-auto">
      <div class="view-card qui-fx-ver" v-for="(view, index) in viewList" :key="index">
        <ul class="box">
          <li class="tip">{{ view.title }}</li>
          <li class="total">￥{{ view.total }}</li>
          <li class="count">{{ view.tip }}笔</li>
        </ul>
      </div>
    </div>
    <div class="u-fx-f1 u-fx-ver show-bi">
      <div class="title">每日消费动态</div>
      <div class="u-fx-f1 u-mar-t">
        <money-show :categories="categories" :series="series"></money-show>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from '@c/SearchForm'
import MoneyShow from './MoneyShow'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
const searchLabel = [
  {
    value: 'rangeTime',
    type: 'rangeTime',
    label: '日期',
    initValue: [moment(new Date(), 'YYYY-MM-DD'), moment(new Date(), 'YYYY-MM-DD')]
  }
]
export default {
  name: 'AttendanceData',
  components: {
    SearchForm,
    MoneyShow
  },
  data() {
    return {
      categories: ['10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07', '10/08'],
      series: [
        {
          name: '每日消费态势图',
          color: '#8988E2',
          data: [100, 200, 123, 456, 1234, 982, 345, 456]
        }
      ],
      searchLabel,
      viewList: [
        {
          title: '消费',
          total: '100',
          tip: '200'
        },
        {
          title: '充值',
          total: '100',
          tip: '200'
        },
        {
          title: '补助',
          total: '100',
          tip: '200'
        },
        {
          title: '退款',
          total: '100',
          tip: '200'
        },
        {
          title: '余额清零',
          total: '100',
          tip: '200'
        }
      ]
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {},
  methods: {
    ...mapActions('home', ['getCount']),
    searchForm(values) {
      this.rangeTime = values.rangeTime
      this._showCount()
    },
    async _showCount() {
      const req = {
        createTime: this.rangeTime[0] ? `${this.rangeTime[0]} 00:00:00` : '',
        endTime: this.rangeTime[1] ? `${this.rangeTime[1]} 00:00:00` : ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.card-home {
  padding-top: 20px;
  .show-bi {
    margin: 20px 20px 0;
    .title {
      height: 18px;
      line-height: 18px;
      font-weight: bold;
      border-left: 3px #9698d6 solid;
      padding-left: 10px;
    }
  }

  .view-card {
    padding: 10px 20px;
    margin-top: 20px;
    width: 18%;
    float: left;
    margin-left: 1.66%;
    height: 180px;
    .box {
      margin: auto 0;
    }
    .tip {
      font-size: 18px;
      color: #fff;
    }
    .total {
      font-size: 32px;
      padding: 10px 0;
      font-weight: bold;
      color: #fff;
    }
    .count {
      width: 85px;
      height: 25px;
      line-height: 25px;
      background-color: #fff;
      border-radius: 10px;
      text-align: center;
    }
    &:nth-child(1) {
      color: #44cc61;
      background: url(../assets/img/xf-bg.png) no-repeat center;
      background-size: 100% 100%;
    }
    &:nth-child(2) {
      color: #6176fe;
      background: url('../assets/img/cz-bg.png') no-repeat center;
      background-size: 100% 100%;
    }
    &:nth-child(3) {
      color: #398fe2;
      background: url('../assets/img/bz-bg.png') no-repeat center;
      background-size: 100% 100%;
    }
    &:nth-child(4) {
      color: #dc9b5b;
      background: url('../assets/img/tk-bg.png') no-repeat center;
      background-size: 100% 100%;
    }
    &:nth-child(5) {
      color: #d45e5e;
      background: url('../assets/img/ye-bg.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
}
</style>
