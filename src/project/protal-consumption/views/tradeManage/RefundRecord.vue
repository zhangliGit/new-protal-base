<template>
  <div class="account-list page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button icon="export" class="export-btn" @click="exportClick">导出</a-button>
      </div>
    </search-form>
    <div class="qui-fx-f1 qui-fx">
      <table-list :page-list="pageList" :columns="columnList.refundColumns" :table-list="refundList">
      </table-list>
    </div>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import columnList from '../../assets/table/consumeColumns'
const searchLabel = [
  {
    value: 'rangeTime',
    type: 'rangeTime',
    label: '时间'
  },
  {
    value: 'userName',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    value: 'origBillNo',
    type: 'input',
    label: '原账单号',
    placeholder: '请输入原账单'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '退款已提交'
      },
      {
        key: '2',
        val: '退款处理中'
      },
      {
        key: '3',
        val: '退款成功'
      },
      {
        key: '4',
        val: '退款失败'
      }
    ],
    value: 'returnStatus',
    type: 'select',
    label: '状态'
  }
]
export default {
  name: 'RefundRecord',
  components: {
    SearchForm,
    TableList,
    PageNum
  },
  data() {
    return {
      total: 0,
      searchLabel,
      columnList,
      pageList: {
        page: 1,
        size: 20
      },
      rangeTime: [],
      searchObj: {},
      refundList: [],
      searchList: {}
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getRefundList', 'exportRefundList']),
    exportClick() {
      this.exportRefundList({
        name: '退款记录',
        ...this.searchList
      })
    },
    async showList() {
      const req = {
        pageNum: this.pageList.page,
        pageSize: this.pageList.size,
        userName: this.searchObj.userName,
        origBillNo: this.searchObj.origBillNo,
        returnStatus: this.searchObj.returnStatus,
        beginTime: this.rangeTime[0] || '',
        endTime: this.rangeTime[1] || ''
      }
      this.searchList = req
      const res = await this.getRefundList(req)
      this.refundList = res.rows
      this.total = res.total
    },
    searchForm(values) {
      this.searchObj = values
      this.rangeTime = values.rangeTime
      this.showList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
