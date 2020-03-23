<template>
  <div class="page-layout qui-fx">
    <grade-tree @select="select"></grade-tree>
    <div class="qui-fx-f1 qui-fx-ver">
      <search-form isReset @search-form="searchForm" :search-label="searchLabel"></search-form>
      <table-list :page-list="pageList" :columns="columns" :table-list="recordList">
        <template v-slot:actions="action">
          <a-tag color="#ccc" @click.stop="changeDetial(action.record)">变更状态</a-tag>
          <a-tag @click.stop="checkDetial(action.record)">操作记录</a-tag>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
    <record-detail ref="recordDetail"></record-detail>
    <record-change ref="recordChange" @update="showList"></record-change>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import GradeTree from '@c/GradeTree'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import RecordDetail from './RecordDetail'
import RecordChange from './RecordChange'
import columns from '../../assets/js/table/studentRecord'
const searchLabel = [
  {
    value: 'name', // 表单属性
    type: 'input', // 表单类型
    label: '姓名', // 表单label值
    placeholder: '请输入姓名' // 表单默认值(非必选字段)
  },
  {
    value: 'rangeTime', // 日期区间
    type: 'rangeTime',
    label: '日期'
  },
  {
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '正常'
      },
      {
        key: 2,
        val: '迟到'
      },
      {
        key: 3,
        val: '缺卡'
      },
      {
        key: 4,
        val: '请假'
      }
    ],
    value: 'startStatus',
    type: 'select',
    label: '上学状态'
  },
  {
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '正常'
      },
      {
        key: 2,
        val: '早退'
      },
      {
        key: 3,
        val: '缺卡'
      },
      {
        key: 4,
        val: '请假'
      }
    ],
    value: 'endStatus',
    type: 'select',
    label: '放学状态'
  }
]
export default {
  name: 'StudentRecord',
  components: {
    GradeTree,
    SearchForm,
    TableList,
    PageNum,
    RecordDetail,
    RecordChange
  },
  data () {
    return {
      searchLabel,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      columns,
      recordList: []
    }
  },
  async mounted () {
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getStudentRecord'
    ]),
    async showList () {
      const res = await this.getStudentRecord(this.pageList)
      this.recordList = res.data
      this.total = res.total
    },
    select (item) {
      console.log(item) // { name: '', code: ''}
    },
    searchForm (values) {
      this.pageList = Object.assign(values, this.pageList)
      this.showList()
    },
    checkDetial (record) {
      console.log('checkDetial+++', record)
      this.$refs.recordDetail.recordId = record.id
      this.$refs.recordDetail.showList()
      this.$refs.recordDetail.dialogTag = true
    },
    changeDetial (record) {
      console.log('changeDetial+++', record)
      this.$refs.recordChange.dialogTag = true
    }
  }
}
</script>
<style lang="less" scoped>
</style>
