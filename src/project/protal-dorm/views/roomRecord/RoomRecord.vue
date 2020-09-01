<template>
  <div class="total-table page-layout qui-fx-ver">
    <a-row type="flex">
      <a-col class="tab-tree">
        <org-tree :current-tab="0" :is-select="true" :is-tab="isTab" @tree-click="handleTreeClick"></org-tree>
      </a-col>
      <a-col class="right-content qui-fx-ver">
        <search-form @search-form="search" :search-label="searchLabel"></search-form>
        <a-row id="table" class="table-top qui-fx-f1">
          <a-table
            :pagination="false"
            :rowKey="record => record.id"
            :columns="columns"
            :dataSource="historyList"
            :scroll="{ y: tableHeight }"
          >
            <template slot="number" slot-scope="text, record, index">
              <span>{{ (pageList.page - 1) * pageList.size + (index + 1) }}</span>
            </template>
            <template slot="inDateTime" slot-scope="inDateTime">
              <span>{{ getDateTime(inDateTime, 1) }}</span>
            </template>
            <template slot="leaveDateTime" slot-scope="leaveDateTime">
              <span>{{ getDateTime(leaveDateTime, 1) }}</span>
            </template>
            <!-- <template slot="action" slot-scope="text, record">
              <a-tag color="#108ee9" @click="addHandle(1, record)">操作记录</a-tag>
            </template> -->
          </a-table>
        </a-row>
        <page-num v-model="pageList" :total="total" @change-page="showTableList"></page-num>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import mixins from '@u/mixins'
import historyTable from '../../assets/js/table/dormRecord'
import OrgTree from '../components/orgTree/OrgTree'
import SearchForm from '../components/common/SearchForm'
import PageNum from '../components/common/PageNum'
const searchLabel = [
  {
    value: 'keyWord',
    type: 'input',
    label: '学号/姓名',
    placeholder: '请输入学号/姓名'
  },
  {
    value: 'rangeTime',
    type: 'rangeTime',
    label: '起始时间'
  }
]
export default {
  name: 'InoutRecord',
  mixins: [mixins],
  components: {
    OrgTree,
    SearchForm,
    PageNum
  },
  data() {
    return {
      searchLabel,
      columns: historyTable,
      pageList: {
        page: 1,
        size: 20
      },
      searchList: {
        schoolCode: '',
        buildingCode: '',
        classCode: '',
        floorCode: '',
        gradeCode: '',
        roomCode: '',
        keyWord: '',
        status: '',
        stageCode: null,
        startDate: '',
        endDate: ''
      },
      total: 0,
      historyList: [],
      isTab: true
    }
  },
  computed: {
    ...mapState('home', 'userInfo')
  },
  mounted() {},
  methods: {
    ...mapActions('dormRecord', ['getHistoryList']),
    async showTableList() {
      this.searchList.schoolCode = sessionStorage.getItem('schoolScheme')
      const res = await this.getHistoryList({
        ...this.searchList,
        ...this.pageList
      })
      this.total = res.data.total
      this.historyList = res.data.list
    },
    search(values) {
      this.pageList.page = 1
      this.searchList.keyWord = values.keyWord
      this.searchList.startDate = values.rangeTime ? values.rangeTime[0] : ''
      this.searchList.endDate = values.rangeTime ? values.rangeTime[1] : ''
      this.showTableList(this.searchList)
    },
    handleTreeClick(item) {
      this.searchList.buildingCode = item.buildingCode
      this.searchList.classCode = item.classCode
      this.searchList.floorCode = item.floorCode
      this.searchList.gradeCode = item.gradeCode
      this.searchList.roomCode = item.roomCode
      this.searchList.stageCode = item.stageCode ? item.stageCode : ''
      this.showTableList()
    }
  }
}
</script>

<style lang="less" scoped></style>
