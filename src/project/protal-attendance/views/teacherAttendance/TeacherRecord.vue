<template>
  <div class="page-layout qui-fx">
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
      <search-form isReset @search-form="searchForm" :search-label="searchLabel">
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
          :scroll="{ y: '400px' || this.$tools.setScroll('tableList') }"
          :columns="columns"
          :data-source="dataSource"
          bordered
          size="middle"
          :pagination="false"
        >
          <template
            slot="index"
            slot-scope="text, record, index">{{
              index | getPageIndex(pageList)
            }}</template>
          <template v-slot:other1="other1">
            <a-tag
              :color="other1.riskLevel === '1' ? '#ff5454'
                : other1.riskLevel === '2' ? '#f5772d'
                  : other1.riskLevel === '3' ? '#f5b111'
                    :other1.riskLevel === '4' ? '#0084ff' :
                      ''">{{ other1.riskLevel | levelType }}</a-tag>
          </template>
          <template v-slot:other3="other3">
            <a-tag
              :color="other3.riskLevel === '1' ? '#ff5454'
                : other3.riskLevel === '2' ? '#f5772d'
                  : other3.riskLevel === '3' ? '#f5b111'
                    :other3.riskLevel === '4' ? '#0084ff' :
                      ''">{{ other3.riskLevel | getDangerLevel }}</a-tag>
          </template>
          <template v-slot:other4="other4">
            {{ other4.controlLevel | controlType }}
          </template>
          <template v-slot:other2="other2">
            <div v-if="other2.show" class="qui-fx">
              <div>{{ other2.frequency }}次/{{ other2.frequencyUnit === '1' ? '天' : other2.frequencyUnit === '2' ? '周' : '月' }}</div>
              <a-button size="small" class="edit-action-btn u-mar-l10" icon="form" @click="modify(0,other2)"></a-button>
            </div>
            <div v-else class="qui-fx-ac">
              <a-input-number style="width:40%" v-model="other2.frequency"/>
              <a-select
                v-model="other2.frequencyUnit"
                style="width:60%;margin-left:5px">
                <a-select-option v-for="work in numList" :value="work.key" :key="work.key">
                  {{ work.val }}
                </a-select-option>
              </a-select>
              <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="save(other2)" @cancel="modify(1,other2)">
                <template slot="title">
                  您确定修改吗?
                </template>
                <a-tooltip placement="topLeft" title="保存">
                  <a-button size="small" class="add-action-btn u-mar-l10" icon="save"></a-button>
                </a-tooltip>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
      </div>
      <!-- <table-list :page-list="pageList" :columns="columns" :table-list="recordList">
        <template v-slot:other1="record">
          <a-tag :color="$tools.color(record.record.onState)" >{{ record.record.onState | onState }}</a-tag>
        </template>
        <template v-slot:other2="record">
          <a-tag :color="$tools.color(record.record.offState)" >{{ record.record.offState | onState }}</a-tag>
        </template>
        <template v-slot:actions="action">
          <a-tag color="#ccc" @click.stop="changeDetail(action.record)">变更状态</a-tag>
          <a-tag @click.stop="checkDetial(action.record)">操作记录</a-tag>
        </template>
      </table-list> -->
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
import columns from '../../assets/js/table/teacherRecord'
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
    label: '上午上班'
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
        val: '早退'
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
    label: '上午下班'
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
    label: '下午上班'
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
        val: '早退'
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
    label: '下午下班'
  }
]
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
      searchLabel,
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
      columns,
      recordList: []
    }
  },
  computed: {
    ...mapState('home', [
      'userInfo'
    ])
  },
  async mounted () {
    this.searchList.schoolCode = this.userInfo.schoolCode
    // this.searchList.orgCode = this.userInfo.schoolCode
    this.searchList.orgCode = ''
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getTeacherRecord'
    ]),
    onChange (date, dateString) {
      this.exportTime = dateString
    },
    exportClick() {
      const url = `${hostEnv.ljj_attendance}/teacher/static/record/list/download?schoolCode=${this.userInfo.schoolCode}&startDay=${this.searchList.startDay}&endDay=${this.searchList.endDay}&onStatue=${this.searchList.onStatue}&offStatue=${this.searchList.offStatue}&orgCode=${this.searchList.orgCode}&searchKey=${this.searchList.searchKey}`
      console.log(url)
      window.open(url)
    },
    exportFile () {
      if (!this.exportTime) {
        this.$message.warning('请选择导出日期')
        return
      }
      this.exportTag = false
      const time = new Date().getTime()
      const startDay = this.$tools.getDate(time - 1000 * 60 * 60 * 24 * 30).substr(0, 10)
      const endDay = this.$tools.getDate(time).substr(0, 10)
      const url = `${hostEnv.lz_attendance}/teacher/static/record/list/download?schoolCode=${this.userInfo.schoolCode}&startDay=${this.exportTime[0]}&endDay=${this.exportTime[1]}`
      window.open(url)
    },
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
    }
  }
}
</script>
<style lang="less" scoped>
</style>
