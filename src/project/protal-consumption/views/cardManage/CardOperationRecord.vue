<template>
  <div class="card-record page-layout qui-fx">
    <div class="qui-fx-f1 qui-fx-ver">
      <search-form isReset @search-form="searchForm" :search-label="searchLabel">
        <div slot="left">
          <a-button @click="handleTplDownload" icon="export" class="export-btn">导出</a-button>
        </div>
      </search-form>
      <table-list :page-list="pageList" :columns="columns" :table-list="recordList">
        <template v-slot:other1="record">
          <a-tag :color="$tools.color(record.record.onState)">{{ record.record.onState | onState }}</a-tag>
        </template>
        <template v-slot:other2="record">
          <a-tag
            :color="$tools.color(record.record.offState)"
          >{{ record.record.offState | onState }}</a-tag>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="_getAccountRecord"></page-num>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import Tools from '@u/tools'
import baseData from '../../assets/js/base'
const columns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '10%'
  },
  {
    title: '学号/工号',
    dataIndex: 'workNo',
    width: '10%'
  },
  {
    title: '班级/部门',
    dataIndex: 'classBoards',
    width: '12%'
  },
  {
    title: '卡号',
    dataIndex: 'cardNo',
    width: '10%'
  },
  {
    title: '操作类型',
    dataIndex: 'operType',
    width: '10%',
    customRender: text => {
      return baseData.getCardActionType(text)
    }
  },
  {
    title: '操作人员',
    dataIndex: 'createBy',
    width: '10%'
  },
  {
    title: '操作时间',
    dataIndex: 'updateTime',
    width: '20%'
  },
  {
    title: '备注',
    width: '10%',
    dataIndex: 'remark'
  }
]
const searchLabel = [
  {
    value: 'cardNo',
    type: 'input',
    label: '卡号',
    placeholder: '请输入卡号'
  },
  {
    value: 'userName',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    value: 'workNo',
    type: 'input',
    label: '学号/工号',
    placeholder: '请输入卡号'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '发卡'
      },
      {
        key: 2,
        val: '挂失'
      },
      {
        key: 3,
        val: '解挂'
      },
      {
        key: 4,
        val: '退卡'
      },
      {
        key: 5,
        val: '换卡'
      }
    ],
    value: 'operType',
    type: 'select',
    label: '操作类型'
  },
  {
    value: 'rangeTime',
    type: 'rangeTime',
    label: '时间'
  }
]
export default {
  name: 'CardOperationRecord',
  components: {
    SearchForm,
    TableList,
    PageNum
  },
  data() {
    return {
      searchLabel,
      searchList: {
        workNo: '',
        operType: '',
        userName: ''
      },
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      columns,
      recordList: [],
      exportTime: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this._getCardRecord()
  },
  methods: {
    ...mapActions('home', ['getCardRecord', 'cardRecordExport']),
    /**
     * @description 导出操作记录
     */
    async handleTplDownload() {
      await this.cardRecordExport(this.searchList)
      this.$message.success('导出成功')
    },
    /**
     * @description 查询账户操作记录
     */
    async _getCardRecord() {
      const res = await this.getCardRecord({
        pageNum: this.pageList.page,
        pageSize: this.pageList.size,
        ...this.searchList
      })
      this.recordList = res.rows
      this.total = res.total
    },
    searchForm(values) {
      this.pageList.page = 1
      const date = values.rangeTime ? { beginTime: values.rangeTime[0], endTime: values.rangeTime[1] } : {}
      this.searchList = {
        ...values,
        ...date
      }
      delete this.searchList.rangeTime
      this._getCardRecord()
    }
  }
}
</script>
<style lang="less" scoped>
.card-record {
  padding: 20px 20px 0;
}
</style>
