<template>
  <div class="page-layout qui-fx-ver">
    <div style="height:130px;background:#fff;">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="基本信息" key="1">
          <a-row class="padd-l10">
            <a-col v-for="(item,index) in baseList" :key="index" :span="8" class="mar-b10">
              {{ item.key }} : {{ item.value }}
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="qui-fx-f1 qui-fx-ver">
      <a-tabs defaultActiveKey="5" @change="callback" style="height:50px;">
        <a-tab-pane tab="正常次数" key="5"></a-tab-pane>
        <a-tab-pane tab="迟到次数" key="1"></a-tab-pane>
        <a-tab-pane tab="早退次数" key="2"></a-tab-pane>
        <a-tab-pane tab="上学缺卡次数" key="3"></a-tab-pane>
        <a-tab-pane tab="放学缺卡次数" key="6"></a-tab-pane>
        <a-tab-pane tab="请假次数" key="4"></a-tab-pane>
        <a-tab-pane tab="缺勤次数" key="7"></a-tab-pane>
      </a-tabs>
      <table-list
        is-zoom
        :page-list="pageList"
        :columns="columns"
        :table-list="detailList">
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const columns = [
  {
    title: '序号',
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '日期',
    dataIndex: 'date',
    width: '15%'
  },
  {
    title: '打卡时间',
    dataIndex: 'dealTime',
    width: '30%'
  },
  {
    title: '底照',
    dataIndex: 'photoPic',
    width: '15%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '抓拍照',
    dataIndex: 'snapPic',
    width: '30%',
    scopedSlots: {
      customRender: 'snapPic'
    }
  }
]
export default {
  name: 'StudentStatisticsDetail',
  components: {
    TableList,
    PageNum
  },
  data () {
    return {
      baseList: [],
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      columns,
      detailList: [],
      detailId: '',
      attendanceState: '5'
    }
  },
  async mounted () {
    this.detailId = this.$route.query.id
    this.infoGet()
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getStudentStatistics', 'getStudentDetail', 'studentStatisticsDetail'
    ]),
    async infoGet() {
      // const res = await this.getStudentDetail({ id: this.detailId })
      const res = {
        data: {
          name: '123',
          num: '1',
          grade: '1',
          class: '1',
          account: '1'
        }
      }
      this.baseList = [
        {
          key: '姓名',
          value: res.data.name
        },
        {
          key: '学号',
          value: res.data.num
        },
        {
          key: '年级',
          value: res.data.grade
        },
        {
          key: '班级',
          value: res.data.class
        },
        {
          key: '考勤次数',
          value: res.data.account
        }
      ]
    },
    async showList () {
      this.pageList.userId = this.detailId
      this.pageList.attendanceState = this.attendanceState
      console.log('this.pageList', this.pageList)
      const res = await this.studentStatisticsDetail(this.pageList)
      this.detailList = res.data.list
      this.total = res.total
    },
    callback (key) {
      setTimeout(() => {
        this.pageList.size = 20
        this.pageList.page = 1
        this.attendanceState = key
        this.showList()
      }, 300)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
