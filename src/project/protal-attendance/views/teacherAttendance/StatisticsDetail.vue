<template>
  <div class="page-layout qui-fx-ver">
    <div style="height:130px;background:#fff;">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="基本信息" key="1">
          <a-row class="padd-l10">
            <a-col v-for="(item,index) in baseList" :key="index" :span="12" class="mar-b10">
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
        <a-tab-pane tab="上班缺卡" key="3"></a-tab-pane>
        <a-tab-pane tab="下班缺卡" key="6"></a-tab-pane>
        <a-tab-pane tab="请假次数" key="4"></a-tab-pane>
        <a-tab-pane tab="缺勤次数" key="7"></a-tab-pane>
      </a-tabs>
      <table-list
        is-zoom
        :page-list="pageList"
        :columns="columns"
        :table-list="detailList"
        :rowKey="(record,index) => index">
        <template v-slot:other1="dealTime">
          <div>{{ dealTime.record.onWorkTime | gmtToDate }}</div>
          <div>{{ dealTime.record.offWorkTime | gmtToDate }}</div>
        </template>
        <template v-slot:other2="text">
          <a-popover placement="left">
            <template slot="content">
              <img :src="text.record.onSnacpUrl" style="max-width: 200px; max-height: 220px; display: block;" alt="">
            </template>
            <img :src="text.record.onSnacpUrl" style="width: 60px; height: 60px; display: inline-block;" alt="">
          </a-popover>
          <a-popover placement="left">
            <template slot="content">
              <img :src="text.record.offSnacpUrl" style="max-width: 200px; max-height: 220px; display: block;" alt="">
            </template>
            <img :src="text.record.offSnacpUrl" style="width: 60px; height: 60px; display: inline-block;margin-left:10px;" alt="">
          </a-popover>
          <!-- <img style="width: 60px; height: 60px; display: inline-block;" :src="onSnacpUrl.record.onSnacpUrl" alt="">
          <img style="width: 60px; height: 60px; display: inline-block;margin-left:10px;" :src="onSnacpUrl.record.offSnacpUrl" alt=""> -->
        </template>
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
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '日期',
    dataIndex: 'dayTime',
    width: '15%',
    customRender: (text) => {
      const d = new Date(text)
      return d.getFullYear() + '-' +
             ((d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' +
             (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
    }
  },
  {
    title: '打卡时间',
    dataIndex: 'dealTime',
    width: '35%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '底照',
    dataIndex: 'photoUrl',
    width: '15%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '抓拍照',
    dataIndex: 'onSnacpUrl',
    width: '25%',
    scopedSlots: {
      customRender: 'other2'
    }
  }
]
export default {
  name: 'StatisticsDetail',
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
    this.showList()
  },
  methods: {
    ...mapActions('home', ['teacherDetailStatistics']),
    async showList () {
      this.pageList.userId = this.detailId
      this.pageList.attendanceState = this.attendanceState
      const res = await this.teacherDetailStatistics(this.pageList)
      this.detailList = res.data.pageInfo.list
      this.total = res.data.pageInfo.total
      this.baseList = [
        {
          key: '姓名',
          value: res.data.userName
        },
        {
          key: '工号',
          value: res.data.workNo
        },
        {
          key: '组织机构',
          value: res.data.orgName
        }
      ]
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
