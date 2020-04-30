<template>
  <div class="leave-detail qui-fx-f1 qui-fx-ver">
    <div class="pos-box" style="overflow-y: scroll">
      <submit-form
        ref="form"
        @submit-form="submitForm"
        :title="title"
        v-model="formStatus"
        :form-data="formData"
      ></submit-form>
      <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
        <a-menu-item key="title">基本信息</a-menu-item>
      </a-menu>
      <div class="process qui-fx-jsb qui-fx-ac">
        <div class="qui-fx-jsa qui-fx-ac">
          <img :src="detailInfo[0].profilePhoto" alt />
          <div class="qui-fx-ver">
            <a-row class="padd-l10">
              <a-col class="mar-b10" :span="12">姓名 : {{ detailInfo[0].userName }}</a-col>
              <a-col
                class="mar-b10"
                :span="12"
              >性别 : {{ (detailInfo[0].gender=='2' ? '女' : (detailInfo[0].gender=='1'?'男':'未知'))}}</a-col>
              <a-col class="mar-b10" :span="12">工号 : {{ detailInfo[0].workNo }}</a-col>
              <a-col class="mar-b10" :span="12">生日 : {{ detailInfo[0].birthday }}</a-col>
              <a-col
                class="mar-b10"
                :span="12"
              >人员类型 : {{ detailInfo[0].userType =='1'?'教职工' : '学生' }}</a-col>
              <a-col class="mar-b10" :span="12">风险时间 : {{ detailInfo[0].riskTime }}</a-col>
            </a-row>
          </div>
        </div>
      </div>
      <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
        <a-menu-item key="title">体检数据</a-menu-item>
        <a-button
          class="add-btn"
          style="float: right;margin-top: 5px"
          @click="updateReport()"
        >{{ msg }}</a-button>
      </a-menu>
      <no-data v-if="noData" msg="暂无体检信息~"></no-data>
      <div class="process qui-fx-jsb qui-fx-ac" v-if="reportShow">
        <div class="qui-fx-jsa qui-fx-ac">
          <div class="qui-fx-ver">
            <a-row class="padd-l10">
              <a-col class="mar-b10" :span="12">身高 :{{ detailData.userHeight }}</a-col>
              <a-col class="mar-b10" :span="12">体重 :{{ detailData.userWeight }}</a-col>
              <a-col
                class="mar-b10"
                :span="12"
              >是否有重大病史 :{{ detailData.majorDiseaseMark ? '是' : '否' }}</a-col>
              <a-col
                class="mar-b10"
                :span="12"
              >是否有家族病史 :{{ detailData.geneticDiseaseMark ? '是' : '否' }}</a-col>
              <a-col class="mar-b10" :span="12">创建时间 :{{ detailData.createTime }}</a-col>
            </a-row>
          </div>
        </div>
      </div>
      <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
        <a-menu-item key="title">体温走势</a-menu-item>
      </a-menu>
      <div style="margin-top:10px;">
        <chart-component :style="{ height: chartHeight }" :id="unReportId" :option="unReportOption"></chart-component>
      </div>
      <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
        <a-menu-item key="title">疫情上报记录</a-menu-item>
      </a-menu>
      <div class="qui-fx-f1 qui-fx-ver">
        <table-list is-zoom :page-list="pageList" :columns="columns" :table-list="detailList"></table-list>
        <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
      </div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import ChartComponent from '../component/ChartComponent'
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm'
import NoData from '@c/NoData'

const formData = [
  {
    value: 'userHeight',
    initValue: '',
    type: 'input',
    label: '身高',
    placeholder: '请输入身高'
  },
  {
    value: 'userWeight',
    initValue: '',
    type: 'input',
    label: '体重',
    placeholder: '请输入体重'
  },
  {
    value: 'createTime',
    type: 'singleTime',
    label: '创建时间',
    required: false,
    initValue: '',
    placeholder: '请选择时间'
  },
  {
    value: 'majorDiseaseMark',
    initValue: 1,
    required: false,
    list: [
      {
        key: 1,
        val: '是'
      },
      {
        key: 2,
        val: '否'
      }
    ],
    type: 'radio',
    label: '重大病史',
    placeholder: '请选择'
  },
  {
    value: 'geneticDiseaseMark',
    initValue: 1,
    required: false,
    list: [
      {
        key: 1,
        val: '是'
      },
      {
        key: 2,
        val: '否'
      }
    ],
    type: 'radio',
    label: '家族遗传病',
    placeholder: '请选择'
  }
]
const columns = [
  {
    title: '序号',
    width: '7%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '7%'
  },
  {
    title: '人员类型',
    dataIndex: 'userType',
    width: '8%',
    customRender: text => {
      if (text === 1) {
        return '教职工'
      } else {
        return '学生'
      }
    }
  },
  {
    title: '温度',
    dataIndex: 'temperature',
    width: '7%'
  },
  {
    title: '上报区间',
    dataIndex: 'timeInterval',
    width: '10%',
    customRender: text => {
      if (text === 1) {
        return '上午'
      } else {
        return '下午'
      }
    }
  },
  {
    title: '发热状态',
    dataIndex: 'feverMark',
    width: '10%',
    customRender: text => {
      if (text === 1) {
        return '发热'
      } else {
        return '未发热'
      }
    }
  },
  {
    title: '附带症状',
    dataIndex: 'symptoms',
    width: '8%',
    customRender: text => {
     if (text === 'FL001') {
        return '乏力'
      } else if(text === 'YT001') {
        return '咽痛'
      }else if(text === 'KS001'){
        return '咳嗽'
      }
    }
  },
  {
    title: '是否异常 ',
    dataIndex: 'mark02',
    width: '8%',
    customRender: text => {
      if (text === 1) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  {
    title: '是否接触疫情人员 ',
    dataIndex: 'mark01',
    width: '8%',
    customRender: text => {
      if (text === 1) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  {
    title: '上报人',
    dataIndex: 'reportPersonName',
    width: '10%'
  },
  {
    title: '上报时间',
    dataIndex: 'reportTime',
    width: '12%',
    customRender: text => {
      return (
        new Date(text).getFullYear() +
        '-' +
        (new Date(text).getMonth() + 1 > 9 ? new Date(text).getMonth() + 1 : '0' + (new Date(text).getMonth() + 1)) +
        '-' +
        (new Date(text).getDate() > 9 ? new Date(text).getDate() : '0' + new Date(text).getDate()) +
        ' ' +
        (new Date(text).getHours() > 9 ? new Date(text).getHours() : '0' + new Date(text).getHours()) +
        ':' +
        (new Date(text).getMinutes() > 9 ? new Date(text).getMinutes() : '0' + new Date(text).getMinutes()) +
        ':' +
        (new Date(text).getSeconds() > 9 ? new Date(text).getSeconds() : '0' + new Date(text).getSeconds())
      )
    }
  }
]
export default {
  name: 'PersonalDetail',
  components: {
    TableList,
    PageNum,
    ChartComponent,
    SubmitForm,
    NoData
  },
  data() {
    return {
      msg: '',
      noData: false,
      reportShow: false,
      formData,
      title: '更新体检数据',
      formStatus: false,
      pageList: {
        page: 1,
        size: 20,
        userCode: ''
      },
      unReportId: 'unReportId',
      unReportOption: {},
      total: 0,
      columns,
      detailList: [],
      detailInfo: [],
      detailData: {
        userHeight: '',
        userWeight: '',
        majorDiseaseMark: '',
        geneticDiseaseMark: '',
        createTime: ''
      },
      reportTime: [],
      temperature: [],
      infoList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.getTemperature()
    this.showList()
    this.getReportList()
  },
  created() {
    this.chartHeight = document.body.clientHeight * 0.35 + 'px'
  },
  methods: {
    ...mapActions('home', [
      'getLatestMedicalInfo',
      'updateInfo',
      'getTemperatureData',
      'getReportInfoList',
      'getreportList'
    ]),
    getDateTime(date) {
      if (date === '' || date === null) {
        return '--'
      }
      const d = new Date(date)
      return (
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
        '-' +
        (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
        ' ' +
        (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
        ':' +
        (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
        ':' +
        (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
      )
    },
    //更新体检数据
    updateReport() {
      this.formStatus = true
      this.formData = formData
    },
    async submitForm(values) {
      const req = {
        ...values,
        schoolCode: this.userInfo.orgCode,
        userCode: this.$route.query.id,
        userType: this.detailInfo[0].userType,
        userName: this.$route.query.userName
      }
      try {
        await this.updateInfo(req)
      } catch (e) {
        this.$refs.form.error()
      }
      this.$message.success('添加成功')
      setTimeout(() => {
        this.showList()
        this.$refs.form.reset()
      }, 2000)
    },
    //获取体检数据加个人信息
    async showList() {
    const userCode = this.$route.query.id
      const userType = this.$route.query.userType
      const userName = this.$route.query.userName
      const schoolCode = this.userInfo.orgCode
      const res = await this.getreportList({
        userCode,
        schoolCode,
        userType,
        userName,
        ...this.pageList
      })
      this.detailInfo = res.result.list
      const req = await this.getLatestMedicalInfo({
        userCode,
        schoolCode
      })
      if (req.result) {
        this.msg = '更新体检数据'
        this.detailData = req.result
        this.detailData.createTime = this.getDateTime(new Date(req.result.createTime))
        this.reportShow = true
        this.noData = false
      } else {
        this.msg = '新增体检数据'
        this.noData = true
        this.reportShow = false
      }
    },
    //获取个人体温数据
    async getTemperature() {
      const res = await this.getTemperatureData({
        schoolCode: this.userInfo.orgCode,
        userCode: this.$route.query.id,
        startTime: this.getDateTime(new Date().setMonth(new Date().getMonth() - 1)),
        endTime: this.getDateTime(new Date())
      })
      this.reportTime = []
      this.temperature = []
      res.result.forEach(item => {
        this.reportTime.push(item.reportTime)
        this.temperature.push(parseInt(item.temperature))
      })
      this.initUnReportChart()
    },
    //获取上报信息记录
    async getReportList() {
      this.pageList.userCode = this.$route.query.id
      const res = await this.getReportInfoList(this.pageList)
      this.detailList = res.result.list
      this.total = res.result.totalCount
    },
    initUnReportChart() {
      this.unReportOption = {
        chart: {
          type: 'areaspline'
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
          type: 'datetime',
          categories: this.reportTime
        },
        credits: {
          enabled: false
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        tooltip: {
          pointFormat: '{series.name} <b>{point.y}</b>℃'
        },
        plotOptions: {
          area: {
            pointStart: 2,
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
            name: '体温',
            color: 'rgb(105, 167, 254)',
            data: this.temperature
          }
        ]
      }
      this.unReportChart = new Highcharts.Chart(this.unReportId, this.unReportOption)
    }
  }
}
</script>
<style lang="less" scoped>
.leave-detail {
  overflow-y: scroll !important;
  overflow-x: hidden;
}
.leave-detail {
  background: #fff;
  .info,
  .pic {
    margin-top: 20px;
    padding: 0 20px;
    p {
      margin-right: 50px;
      span {
        margin: 0 5px;
      }
    }
  }
  .pic {
    margin-top: 0;
  }
  .title {
    margin: 10px;
    p {
      margin: 0;
      font-weight: bold;
    }
  }
  .process {
    width: 600px;
    margin: 20px;
    img {
      width: 60px;
      height: 60px;
      background: #ddd;
      margin-right: 10px;
    }
  }
}
</style>
