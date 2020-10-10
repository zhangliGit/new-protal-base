<template>
  <div class="account-list page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button icon="export" class="export-btn" @click="exportClick">导出</a-button>
      </div>
    </search-form>
    <div class="qui-fx-f1 qui-fx">
      <table-list
        :page-list="pageList"
        :columns="columnList.clearColumns"
        :table-list="consumeList"
      >
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
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '余额清零已提交'
      },
      {
        key: '2',
        val: '余额清零处理中'
      },
      {
        key: '3',
        val: '余额清零成功'
      },
      {
        key: '4',
        val: '余额清零失败'
      }
    ],
    value: 'clearStatus',
    type: 'select',
    label: '状态'
  }
]
export default {
  name: 'BalanceResetRecord',
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
      consumeList: [],
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
    ...mapActions('home', ['getClearList', 'exportClearList']),
    exportClick() {
      this.exportClearList({
        name: '余额清零记录',
        ...this.searchList
      })
    },
    async showList() {
      const req = {
        pageNum: this.pageList.page,
        pageSize: this.pageList.size,
        userName: this.searchObj.userName,
        clearStatus: this.searchObj.clearStatus,
        beginTime: this.rangeTime[0] || '',
        endTime: this.rangeTime[1] || ''
      }
      this.searchList = req
      const res = await this.getClearList(req)
      this.consumeList = res.rows
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
