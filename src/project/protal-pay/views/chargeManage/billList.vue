<template>
  <div class="page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel"> 
       <div slot="left">
        <a-button icon="export" class="export-btn">导出</a-button>
      </div>
    </search-form>
    <table-list isZoom :page-list="pageList" :columns="columns" :table-list="recordList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="查看详情">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="detail(action.record.id)"></a-button>
        </a-tooltip>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import PageNum from '@c/PageNum'
import $tools from '@u/tools'
const columns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '账单号',
    dataIndex: 'applicantName',
    width: '8%'
  },
  {
    title: '账单名称',
    dataIndex: 'applicantName',
    width: '8%'
  },{
    title: '学生姓名',
    dataIndex: 'applicantName',
    width: '8%'
  },{
    title: '班级',
    dataIndex: 'applicantName',
    width: '8%'
  },{
    title: '学年',
    dataIndex: 'applicantName',
    width: '8%'
  },{
    title: '账单金额',
    dataIndex: 'applicantName',
    width: '8%'
  },{
    title: '优惠金额',
    dataIndex: 'applicantName',
    width: '8%'
  },{
    title: '应收金额',
    dataIndex: 'applicantName',
    width: '8%'
  },{
    title: '创建时间',
    dataIndex: 'applicantName',
    width: '8%'
  },{
    title: '截止时间',
    dataIndex: 'applicantName',
    width: '8%'
  },
  {
    title: '账单状态',
    dataIndex: 'applicantName',
    width: '8%'
  },
  {
    title: '操作',
    width: '8%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const searchLabel = [
  {
    value: 'name',
    type: 'input',
    label: '账单名称',
    placeholder: '请输入账单名称'
  },
    {
    value: 'name',
    type: 'input',
    label: '学生姓名',
    placeholder: '请输入学生姓名'
  },
  {
    value: 'date',
    type: 'rangeTime',
    label: '创建时间'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '0',
        val: '已支付'
      },
      {
        key: '1',
        val: '待支付'
      },
      {
        key: '2',
        val: '已逾期'
      },
      {
        key: '3',
        val: '已关闭'
      }
    ],
    value: 'state',
    type: 'select',
    label: '账单状态'
  }
]
export default {
  name: 'BillList',
  components: {
    TableList,
    SearchForm,
    PageNum
  },
  data() {
    return {
      columns,
      searchLabel,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      recordList: [],
      searchList: {
        schoolCode: ''
      },
      previewVisible: false,
      detailList: {}
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getcollectionList', 'getcollectionDetail', 'addCollection', 'updateState']),
    async showList(searchObj = {}) {
      this.searchList.page = this.pageList.page
      this.searchList.size = this.pageList.size
      this.searchList.schoolCode = this.userInfo.schoolCode
      this.searchList = Object.assign(this.searchList, searchObj)
      const res = await this.getcollectionList(this.searchList)
      this.recordList = res.data.list
      this.total = res.data.total
    },
    searchForm(values) {
      this.pageList.page = 1
      this.date = values.date
      this.state = values.state
      const searchObj = {
        state: this.state,
        date: this.date
      }
      this.showList(searchObj)
    },
    async detail(id) {
      this.previewVisible = true
      const res = await this.getcollectionDetail(id)
      this.detailList = res.data
    },
    async change() {
      const req = {
        userCode: this.userInfo.userCode,
        userName: this.userInfo.userName,
        formId: this.detailList.id,
        remark: '',
        state: '3'
      }
      await this.updateState(req)
      this.$message.success('发放成功')
      this.previewVisible = false
      this.$tools.goNext(() => {
        this.showList()
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
