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
      <p>访客姓名：{{ recordDetail.name }}</p>
      <p>访客电话：{{ recordDetail.phone }}</p>
      <p>来访事由：{{ recordDetail.reason }}</p>
      <p>进入时间：{{ recordDetail.entryTime }}</p>
      <p>预计离开时间：{{ recordDetail.entryTime }}</p>
      <p>签离时间：{{ recordDetail.entryTime }}</p>
      <p>来访时长：3小时</p>
      <p>进入地点：{{ recordDetail.entryArea }}</p>
      <p>签离地点：{{ recordDetail.entryArea }}</p>
      <p>被访人姓名：{{ recordDetail.fwName }}</p>
      <p>被访人类型：{{ recordDetail.fwType }}</p>
      <p>被访人手机号：{{ recordDetail.phone }}</p>
      <p>组织机构：教务处</p>
      <p>审批状态：{{ recordDetail.spStatus }}</p>
      <p>访问状态：{{ recordDetail.fwStatus }}</p>
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
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import PageNum from '@c/PageNum'
const searchLabel = [
  {
    value: 'name',
    type: 'selectInput',
    label: '访客姓名',
    selectType: [
      {
        key: 1,
        val: '访客姓名'
      },
      {
        key: 2,
        val: '访客电话'
      }
    ],
    placeholder: '请输入'
  },
  // {
  //   value: 'name',
  //   type: 'input',
  //   label: '被访人姓名',
  //   placeholder: '请输入'
  // },
  // {
  //   list: [
  //     // 选择列表项，select控件必传
  //     {
  //       key: '',
  //       val: '全部'
  //     },
  //     {
  //       key: 1,
  //       val: '学术交流'
  //     },
  //     {
  //       key: 2,
  //       val: '探问孩子'
  //     },
  //     {
  //       key: 3,
  //       val: '家长会'
  //     },
  //     {
  //       key: 4,
  //       val: '其他'
  //     }
  //   ],
  //   value: 'reason',
  //   type: 'select',
  //   label: '来访事由'
  // },
  {
    list: [
      // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '同意'
      },
      {
        key: 2,
        val: '拒绝'
      }
    ],
    value: 'spStatus',
    type: 'select',
    label: '审批状态'
  },
  {
    list: [
      // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
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
    value: 'fwStatus',
    type: 'select',
    label: '访问状态'
  },
  // {
  //   list: [
  //     // 选择列表项，select控件必传
  //     {
  //       key: '',
  //       val: '全部'
  //     },
  //     {
  //       key: 1,
  //       val: '校大门'
  //     },
  //     {
  //       key: 2,
  //       val: '西小门'
  //     },
  //     {
  //       key: 3,
  //       val: '南一门'
  //     },
  //     {
  //       key: 4,
  //       val: '南二门'
  //     }
  //   ],
  //   value: 'area',
  //   type: 'select',
  //   label: '进入地点'
  // },
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
    dataIndex: 'name',
    width: '8%'
  },
  {
    title: '访客电话',
    dataIndex: 'phone',
    width: '10%'
  },
  {
    title: '底照',
    dataIndex: 'pic',
    width: '10%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '来访事由',
    dataIndex: 'reason',
    width: '8%'
  },
  {
    title: '进入时间',
    dataIndex: 'entryTime',
    width: '8%'
  },
  {
    title: '进入地点',
    dataIndex: 'entryArea',
    width: '8%'
  },
  {
    title: '被访人姓名',
    dataIndex: 'fwName',
    width: '10%'
  },
  {
    title: '被访人类型',
    dataIndex: 'fwType',
    width: '10%'
  },
  {
    title: '审批状态',
    dataIndex: 'spStatus',
    width: '8%'
  },
  {
    title: '访问状态',
    dataIndex: 'fwStatus',
    width: '8%'
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
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getFkRecord']),
    async showList() {
      const res = await this.getFkRecord()
      this.recordList = res.data
      this.total = res.total
    },
    goDetail(record) {
      this.recordDetail = record
      this.detailTag = true
    },
    searchForm(values) {}
  }
}
</script>
<style lang="less" scoped></style>
