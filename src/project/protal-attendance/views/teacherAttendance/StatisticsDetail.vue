<template>
  <div class="page-layout qui-fx-ver">
    <!-- <detail-show :detail-info="detailInfo" :title="title"></detail-show> -->
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
      <a-tabs defaultActiveKey="1" @change="callback" style="height:50px;">
        <a-tab-pane tab="正常次数" key="1"></a-tab-pane>
        <a-tab-pane tab="迟到次数" key="2"></a-tab-pane>
        <a-tab-pane tab="早退次数" key="3"></a-tab-pane>
        <a-tab-pane tab="上班缺卡次数" key="4"></a-tab-pane>
        <a-tab-pane tab="下班缺卡次数" key="5"></a-tab-pane>
        <a-tab-pane tab="请假次数" key="6"></a-tab-pane>
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
// import DetailShow from '@c/DetailShow'
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
  name: 'StatisticsDetail',
  components: {
    // DetailShow,
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
      baseInfo: {}
    }
  },
  async mounted () {
    this.detailId = this.$route.query.id
    console.log('this.detailId', this.detailId)
    this.infoGet()
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getTeacherDetail', 'getTeacherInfo'
    ]),
    async infoGet() {
      const res = await this.getTeacherInfo({ id: this.detailId })
      this.baseInfo = res.data
      console.log('+++', res.data)
      this.baseList = [
        {
          key: '姓名',
          value: res.data.name
        },
        {
          key: '工号',
          value: res.data.num
        },
        {
          key: '组织机构',
          value: res.data.org
        },
        {
          key: '考勤次数',
          value: res.data.acount
        }
      ]
    },
    async showList () {
      const res = await this.getTeacherDetail(this.pageList)
      this.detailList = res.data
      this.total = res.total
    },
    callback (key) {
      console.log(key)
      setTimeout(() => {
        this.showList()
      }, 300)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
