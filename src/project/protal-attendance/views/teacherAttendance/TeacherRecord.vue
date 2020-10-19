<template>
  <div class="page-layout qui-fx u-padd-r20">
    <!-- <a-modal
      title="批量导出数据"
      :visible="exportTag"
      @cancel="exportTag = false"
      @ok="exportFile"
    >
      <p>请选择日期：<a-range-picker @change="onChange" /></p>
    </a-modal> -->
    <org-tree @select="select"></org-tree>
    <div class="qui-fx-f1 qui-fx-ver">
      <search-form isReset @search-form="searchForm" :search-label="teacherRecord.searchLabel">
        <!-- <div slot="left">
          <a-button icon="export" class="export-all-btn" @click="exportTag = true">批量导出</a-button>
        </div> -->
        <div slot="left">
          <a-button icon="export" class="export-btn" @click="exportClick">导出</a-button>
        </div>
      </search-form>
      <div class="qui-fx-f1" id="tableList">
        <a-table
          style="height: 400px"
          :scroll="{ x: 100, y: this.$tools.setScroll('tableList') - 40 }"
          :columns="teacherRecord.columns"
          :data-source="recordList"
          bordered
          :pagination="false"
        >
          <template
            slot="index"
            slot-scope="text, record, index">{{
              index | getPageIndex(pageList)
            }}</template>
          <template v-slot:other1="other1">
            <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="change('morningOnState',other1.id)">
              <template slot="title">
                确定要将该状态修改为正常吗?
              </template>
              <a-tooltip placement="topLeft" title="修改">
                <a-tag
                  :color="other1.morningOnState === '1' ? '#f5b111'
                    : other1.morningOnState === '3' ? '#f50'
                      : other1.morningOnState === '4' ? '#2db7f5'
                        :other1.morningOnState === '5' ? '#87d068' :
                          ''">{{ other1.morningOnState | onState }}</a-tag>
              </a-tooltip>
            </a-popconfirm>
          </template>
          <template v-slot:other2="other2">
            <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="change('morningOffState',other2.id)">
              <template slot="title">
                确定要将该状态修改为正常吗?
              </template>
              <a-tooltip placement="topLeft" title="修改">
                <a-tag
                  :color="other2.morningOffState === '2' ? '#f5b111'
                    : other2.morningOffState === '3' ? '#f50'
                      : other2.morningOffState === '4' ? '#2db7f5'
                        :other2.morningOffState === '5' ? '#87d068' :
                          ''">{{ other2.morningOffState | onState }}</a-tag>
              </a-tooltip>
            </a-popconfirm>
          </template>
          <template v-slot:other3="other3">
            <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="change('noonOnState',other3.id)">
              <template slot="title">
                确定要将该状态修改为正常吗?
              </template>
              <a-tooltip placement="topLeft" title="修改">
                <a-tag
                  :color="other3.noonOnState === '1' ? '#f5b111'
                    : other3.noonOnState === '4' ? '#2db7f5'
                      : other3.noonOnState === '5' ? '#87d068'
                        :other3.noonOnState === '6' ? '#f50' :
                          ''">{{ other3.noonOnState | onState }}</a-tag>
              </a-tooltip>
            </a-popconfirm>
          </template>
          <template v-slot:other4="other4">
            <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="change('noonOffState',other4.id)">
              <template slot="title">
                确定要将该状态修改为正常吗?
              </template>
              <a-tooltip placement="topLeft" title="修改">
                <a-tag
                  :color="other4.noonOffState === '2' ? '#f5b111'
                    : other4.noonOffState === '4' ? '#2db7f5'
                      : other4.noonOffState === '5' ? '#87d068'
                        :other4.noonOffState === '6' ? '#f50' :
                          ''">{{ other4.noonOffState | onState }}</a-tag>
              </a-tooltip>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
    <record-detail ref="recordDetail"></record-detail>
    <record-change ref="recordChange" @update="showList"></record-change>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import hostEnv from '@config/host-env'
import OrgTree from '@c/OrgTree'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import RecordDetail from './RecordDetail'
import RecordChange from './RecordChange'
import teacherRecord from '../../assets/js/table/teacherRecord'
import moment from 'moment'
export default {
  name: 'TeacherRecord',
  components: {
    OrgTree,
    SearchForm,
    TableList,
    PageNum,
    RecordDetail,
    RecordChange
  },
  data () {
    return {
      exportTag: false,
      exportTime: '',
      teacherRecord,
      searchList: {
        orgCode: '',
        searchKey: '',
        startDay: '',
        endDay: '',
        onStatue: '',
        offStatue: '',
        schoolCode: ''
      },
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      recordList: []
    }
  },
  computed: {
    ...mapState('home', [
      'userInfo'
    ])
  },
  filters: {
    // 获取表格索引
    getPageIndex: (val, obj) => {
      if (JSON.stringify(obj) === '{}') {
        return val + 1
      } else {
        return (obj.page - 1) * obj.size + val + 1
      }
    }
  },
  async mounted () {
    console.log('this.$route.query.type',this.$route.query.type)
    if (this.$route.query.type) {
      this.teacherRecord.searchLabel[1].initValue = [moment(this.$route.query.date).format('YYYY-MM-DD'), moment(this.$route.query.date).format('YYYY-MM-DD')]
      const type = parseInt(this.$route.query.type) + 1
      const state = this.$tools.attendanceState(this.$route.query.state, type)
      this.teacherRecord.searchLabel[type].initValue = state
      this.searchList.startDay = moment(this.$route.query.date).format('YYYY-MM-DD')
      this.searchList.endDay = moment(this.$route.query.date).format('YYYY-MM-DD')
      console.log(parseInt(this.$route.query.type))
      if (parseInt(this.$route.query.type) === 1) {
        this.searchList.morningOnState = state
        this.teacherRecord.searchLabel[3].initValue = ''
        this.teacherRecord.searchLabel[4].initValue = ''
        this.teacherRecord.searchLabel[5].initValue = ''
      } else if (parseInt(this.$route.query.type) === 2) {
        this.searchList.morningOffState = state
        this.teacherRecord.searchLabel[2].initValue = ''
        this.teacherRecord.searchLabel[4].initValue = ''
        this.teacherRecord.searchLabel[5].initValue = ''
      } else if (parseInt(this.$route.query.type) === 3) {
        this.searchList.noonOnState = state
        this.teacherRecord.searchLabel[3].initValue = ''
        this.teacherRecord.searchLabel[2].initValue = ''
        this.teacherRecord.searchLabel[5].initValue = ''
      } else if (parseInt(this.$route.query.type) === 4) {
        this.searchList.noonOffState = state
        this.teacherRecord.searchLabel[4].initValue = ''
        this.teacherRecord.searchLabel[3].initValue = ''
        this.teacherRecord.searchLabel[2].initValue = ''
      }
    }
    this.searchList.schoolCode = this.userInfo.schoolCode
    this.searchList.orgCode = ''
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getTeacherRecord', 'changeAttendanceRecord'
    ]),
    onChange (date, dateString) {
      this.exportTime = dateString
    },
    exportClick() {
      const url = `${hostEnv.ljj_attendance}/teacher/static/record/list/download?schoolCode=${this.userInfo.schoolCode}&startDay=${this.searchList.startDay}&endDay=${this.searchList.endDay}&onStatue=${this.searchList.onStatue}&offStatue=${this.searchList.offStatue}&orgCode=${this.searchList.orgCode}&searchKey=${this.searchList.searchKey}`
      console.log(url)
      window.open(url)
    },
    // exportFile () {
    //   if (!this.exportTime) {
    //     this.$message.warning('请选择导出日期')
    //     return
    //   }
    //   this.exportTag = false
    //   const time = new Date().getTime()
    //   const startDay = this.$tools.getDate(time - 1000 * 60 * 60 * 24 * 30).substr(0, 10)
    //   const endDay = this.$tools.getDate(time).substr(0, 10)
    //   const url = `${hostEnv.lz_attendance}/teacher/static/record/list/download?schoolCode=${this.userInfo.schoolCode}&startDay=${this.exportTime[0]}&endDay=${this.exportTime[1]}`
    //   window.open(url)
    // },
    async showList () {
      this.searchList = Object.assign(this.searchList, this.pageList)
      const res = await this.getTeacherRecord(this.searchList)
      this.recordList = res.data.list
      this.total = res.data.total
    },
    select (item) {
      this.pageList.page = 1
      this.pageList.size = 20
      this.searchList.orgCode = item.code
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
    checkDetial (record) {
      this.$refs.recordDetail.recordId = record.id
      this.$refs.recordDetail.showList()
      this.$refs.recordDetail.dialogTag = true
    },
    changeDetail (record) {
      this.$refs.recordChange.recordId = record.id
      this.$refs.recordChange.dialogTag = true
    },
    change(string, id) {
      const req = {
        optName: this.userInfo.userName,
        recordId: id,
        remark: '',
        userType: '1'
      }
      req[string] = '5'
      this.changeAttendanceRecord(req).then(res => {
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
