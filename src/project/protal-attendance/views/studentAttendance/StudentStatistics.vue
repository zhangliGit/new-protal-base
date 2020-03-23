<template>
  <div class="page-layout qui-fx">
    <grade-tree @select="select"></grade-tree>
    <div class="qui-fx-f1 qui-fx-ver">
      <search-form isReset @search-form="searchForm" :search-label="searchLabel"></search-form>
      <table-list :page-list="pageList" :columns="columns" :table-list="recordList">
        <template v-slot:actions="action">
          <div>
            <a-tooltip placement="topLeft" title="详情">
              <a-button
                size="small"
                style="margin-right: 5px; background: #909399; color:#fff"
                icon="ellipsis"
                @click="detail(action.record)"
              ></a-button>
            </a-tooltip>
          </div>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import GradeTree from '@c/GradeTree'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import columns from '../../assets/js/table/studentStatistics'
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
  }
]
export default {
  name: 'StudentStatistics',
  components: {
    GradeTree,
    SearchForm,
    TableList,
    PageNum
  },
  data() {
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
  async mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getStudentStatistics']),
    async showList() {
      const res = await this.getStudentStatistics(this.pageList)
      this.recordList = res.data
      this.total = res.total
    },
    select(item) {
      console.log(item) // { name: '', code: ''}
    },
    searchForm(values) {
      this.pageList = Object.assign(values, this.pageList)
      this.showList()
    },
    detail(record) {
      console.log('checkDetial+++', record)
      this.$router.push({
        path: '/studentStatistics/detail',
        query: {
          id: record.id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
