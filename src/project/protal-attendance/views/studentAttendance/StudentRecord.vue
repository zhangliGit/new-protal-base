<template>
  <div class="page-layout qui-fx">
    <grade-tree @select="select"></grade-tree>
    <div class="qui-fx-f1 qui-fx-ver">
      <search-form
        isReset
        @search-form="searchForm"
        :search-label="searchLabel">
        <div slot="left">
          <a-button icon="export" class="export-btn" @click="exportClick">导出</a-button>
        </div>
      </search-form>
      <table-list
        :page-list="pageList"
        :columns="columns"
        :table-list="recordList">
        <template v-slot:other1="record">
          <a-tag :color="$tools.color(record.record.onState)" >{{ record.record.onState | onState }}</a-tag>
        </template>
        <template v-slot:other2="record">
          <a-tag :color="$tools.color(record.record.offState)" >{{ record.record.offState | onState }}</a-tag>
        </template>
        <template v-slot:actions="action">
          <a-tag
            color="#ccc"
            @click.stop="changeDetail(action.record)">变更状态</a-tag>
          <a-tag @click.stop="checkDetail(action.record)">操作记录</a-tag>
        </template>
      </table-list>
      <page-num
        v-model="pageList"
        :total="total"
        @change-page="showList"></page-num>
    </div>
    <record-detail ref="recordDetail"></record-detail>
    <record-change ref="recordChange" @update="showList"></record-change>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GradeTree from '@c/GradeTree'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import RecordDetail from './RecordDetail'
import RecordChange from './RecordChange'
import columns from '../../assets/js/table/studentRecord'
import hostEnv from '@config/host-env'
const searchLabel = [
  {
    value: 'searchKey', // 表单属性
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
        key: '5',
        val: '正常'
      },
      {
        key: '1',
        val: '迟到'
      },
      {
        key: '3',
        val: '缺卡'
      },
      {
        key: '4',
        val: '请假'
      }
    ],
    value: 'onStatue',
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
        key: '5',
        val: '正常'
      },
      {
        key: '2',
        val: '早退'
      },
      {
        key: '6',
        val: '缺卡'
      },
      {
        key: '4',
        val: '请假'
      }
    ],
    value: 'offStatue',
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
      searchList: {
        classCode: '',
        endDay: '',
        gradeCode: '',
        offStatue: '',
        onStatue: '',
        schoolCode: '',
        searchKey: '',
        startDay: ''
      },
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      columns,
      recordList: []
    }
  },
  computed: {
    ...mapState('home', [
      'userInfo'
    ])
  },
  mounted () {
    this.searchList.schoolCode = this.userInfo.schoolCode
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getStudentRecord', 'exportStuAttRec'
    ]),
    exportClick() {
      const url = `${hostEnv.ljj_attendance}/student/static/record/list/export?schoolCode=${this.userInfo.schoolCode}&startDay=${this.searchList.startDay}&endDay=${this.searchList.endDay}&searchKey=${this.searchList.searchKey}&schoolYearId=${this.searchList.schoolYearId}&gradeCode=${this.searchList.gradeCode}&classCode=${this.searchList.classCode}&onStatue=${this.searchList.onStatue}&offStatue=${this.searchList.offStatue}`
      console.log(url)
      window.open(url)
      /* this.exportStuAttRec({
        ...this.searchList,
        ...this.pageList,
        name: '学生考勤-考勤记录'
      }) */
    },
    async showList () {
      this.searchList = Object.assign(this.searchList, this.pageList)
      const res = await this.getStudentRecord(this.searchList)
      this.recordList = res.data.list
      this.total = res.data.total
    },
    select (item) {
      this.pageList.page = 1
      this.pageList.size = 20
      this.searchList.schoolYearId = item.schoolYearId
      this.searchList.gradeCode = item.gradeCode
      this.searchList.classCode = item.classCode
      this.showList()
    },
    searchForm (values) {
      this.pageList.page = 1
      this.pageList.size = 20
      this.searchList.startDay = values.rangeTime[0]
      this.searchList.endDay = values.rangeTime[1]
      this.searchList = Object.assign(this.searchList, values)
      this.showList()
    },
    checkDetail (record) {
      this.$refs.recordDetail.recordId = record.id
      this.$refs.recordDetail.showList()
      this.$refs.recordDetail.dialogTag = true
    },
    changeDetail (record) {
      this.$refs.recordChange.recordId = record.id
      this.$refs.recordChange.dialogTag = true
    }
  }
}
</script>
<style lang="less" scoped>
</style>
