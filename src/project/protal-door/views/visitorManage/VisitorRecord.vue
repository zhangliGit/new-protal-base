<template>
  <div class="page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel"></search-form>
    <a-drawer
      width="400"
      title="详情"
      placement="right"
      :closable="true"
      @close="detailTag = false"
      :visible="detailTag"
    >
      <p>访客姓名：{{ recordDetail.visitorName }}</p>
      <p>访客电话：{{ recordDetail.visitorMobile }}</p>
      <p>来访事由：{{ recordDetail.causeName }}</p>
      <p v-if="recordDetail.inTime!=null">进入时间：{{new Date(recordDetail.inTime).toLocaleString()}}</p>
      <p v-else>进入时间：{{recordDetail.accessStartTime}}</p>
      <p>预计离开时间：{{ recordDetail.accessEndTime}}</p>
      <p v-if="recordDetail.outTime!=null">签离时间：{{ new Date(recordDetail.outTime).toLocaleString()}}</p>
      <p v-else>签离时间：{{recordDetail.accessEndTime}}</p>
      <p>来访时长：{{ recordDetail.duration }}</p>
      <p>进入地点：{{ recordDetail.inPlace }}</p>
      <p>签离地点：{{ recordDetail.outPlace }}</p>
      <p>被访人姓名：{{ recordDetail.respondentName }}</p>
      <p>被访人类型：{{ recordDetail.respondentType =='1'?'学生' : '教职工' }}</p>
      <p>被访人手机号：{{ recordDetail.resMobile }}</p>
      <p>组织机构：教务处</p>
      <p>审批状态：{{ recordDetail.state}}</p>
      <p>访问状态：{{(recordDetail.visitState=='0' ? '待访问' : (recordDetail.visitState=='1'?'在访':'签离'))}}</p>
    </a-drawer>
    <table-list :page-list="pageList" :columns="columns" :table-list="recordList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="详情">
          <a-button
            size="small"
            class="detail-action-btn"
            icon="ellipsis"
            @click="goDetail(action.record)"
          ></a-button>
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
const searchLabel = [
  {
    value: 'keyword',
    type: 'selectInput',
    label: '访客姓名',
    selectType: [
      {
        key: 'visitorName',
        val: '访客姓名'
      },
      {
        key: 'visitorMobile',
        val: '访客电话'
      }
    ],
    placeholder: '请输入'
  },
  {
    list: [
      // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: 0,
        val: '待审批'
      },
      {
        key: 1,
        val: '同意'
      },
      {
        key: 2,
        val: '不同意'
      },
      {
        key: 3,
        val: '撤销'
      },
      {
        key: 4,
        val: '失效'
      }
    ],
    value: 'state',
    type: 'select',
    label: '审批状态'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: 0,
        val: '待访问'
      },
      {
        key: 1,
        val: '在访'
      },
      {
        key: 2,
        val: '签离'
      }
    ],
    value: 'visitState',
    type: 'select',
    label: '访问状态'
  },
  {
    value: 'rangeTime',
    type: 'rangeTime',
    label: '日期'
  }
]
const columns = [
  {
    title: '序号',
    width: '6%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '访客姓名',
    dataIndex: 'visitorName',
    width: '8%'
  },
  {
    title: '访客电话',
    dataIndex: 'visitorMobile',
    width: '10%'
  },
  {
    title: '底照',
    dataIndex: 'registPhoto',
    width: '10%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '来访事由',
    dataIndex: 'causeName',
    width: '8%'
  },
  {
    title: '进入时间',
    dataIndex: 'inTime',
    width: '8%',
    customRender: text => {
      return new Date(text).toLocaleString()
    }
  },
  {
    title: '进入地点',
    dataIndex: 'inPlace',
    width: '8%'
  },
  {
    title: '被访人姓名',
    dataIndex: 'respondentName',
    width: '10%'
  },
  {
    title: '被访人类型',
    dataIndex: 'respondentType',
    width: '10%',
    customRender: text => {
      if (text === 1) {
        return '学生'
      } else {
        return '教职工'
      }
    }
  },
  {
    title: '审批状态',
    dataIndex: 'state',
    width: '8%',
    customRender: text => {
      if (text === 0) {
        return '待审批'
      } else if (text === 1) {
        return '同意'
      } else if (text === 2) {
        return '不同意'
      } else if (text === 3) {
        return '撤销'
      } else {
        return '失效'
      }
    }
  },
  {
    title: '访问状态',
    dataIndex: 'visitState',
    width: '8%',
    customRender: text => {
      if (text === 0) {
        return '待访问'
      } else if (text === 1) {
        return '在访'
      } else {
        return '签离'
      }
    }
  },
  {
    title: '详情',
    key: 'action',
    width: '8%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'VisitorRecord',
  components: {
    TableList,
    SearchForm,
    PageNum
  },
  data() {
    return {
      detailTag: false,
      searchLabel,
      columns,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      recordList: [],
      recordDetail: {}
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getappointList', 'getappointDetail']),
    async showList(searchObj = {}) {
      const req = {
        pageNum: this.pageList.page,
        pageSize: this.pageList.size,
        schoolCode: this.userInfo.schoolCode,
        ...searchObj
      }
      const res = await this.getappointList(req)
      this.recordList = res.data.list
      this.total = res.data.total
    },
    async goDetail(record) {
      this.detailTag = true
      const req = {
        id: record.id
      }
      const res = await this.getappointDetail(req)
      this.recordDetail = res.data
      this.recordDetail.accessEndTime = new Date(res.data.accessEndTime).toLocaleString()
      if (this.recordDetail.state === 0) {
        this.recordDetail.state = '待审批'
      } else if (this.recordDetail.state === 1) {
        this.recordDetail.state = '同意'
      } else if (this.recordDetail.state === 2) {
        this.recordDetail.state = '不同意'
      } else if (this.recordDetail.state === 3) {
        this.recordDetail.state = '撤销'
      } else {
        this.recordDetail.state = '失效'
      }
    },
    searchForm(values) {
      this.pageList.page = 1
      const searchObj = {
        keyword: values.keyword,
        state: values.state,
        visitState: values.visitState,
        accessType: values.accessType,
        inStartTime: values.rangeTime[0],
        inEndTime: values.rangeTime[1]
      }
      this.showList(searchObj)
    }
  }
}
</script>
<style lang="less" scoped></style>
