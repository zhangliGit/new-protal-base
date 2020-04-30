<template>
  <div class="page-layout qui-fx-ver">
    <search-form @search-form="searchForm" :search-label="searchLabel"></search-form>
    <table-list :page-list="pageList" :columns="columns" :table-list="userList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="查看健康档案">
          <a-button
            size="small"
            class="detail-action-btn"
            icon="ellipsis"
            @click="detail(action.record)"
          ></a-button>
        </a-tooltip>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import hostEnv from '@/config/host-env'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
const columns = [
  {
    title: '序号',
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '6%'
  },
  {
    title: '人员类型',
    dataIndex: 'userType',
    width: '7%',
    customRender: text => {
      if (text === 2) {
        return '学生'
      } else {
        return '教职工'
      }
    }
  },
  {
    title: '温度',
    dataIndex: 'temperature',
    width: '5%'
  },
  {
    title: '上报区间',
    dataIndex: 'timeInterval',
    width: '8%',
    customRender: text => {
      if (text === 1) {
        return '上午'
      } else {
        return '下午'
      }
    }
  },
  {
    title: '发热状态',
    dataIndex: 'feverMark',
    width: '8%',
    customRender: text => {
      if (text === 1) {
        return '发热'
      } else {
        return '未发热'
      }
    }
  },
  {
    title: '附带症状',
    dataIndex: 'symptoms',
    width: '8%',
    customRender: text => {
     if (text === 'FL001') {
        return '乏力'
      } else if(text === 'YT001') {
        return '咽痛'
      }else if(text === 'KS001'){
        return '咳嗽'
      }
    }
  },
  {
    title: '是否异常 ',
    dataIndex: 'mark02',
    width: '8%',
    customRender: text => {
     if (text === 1) {
        return '异常'
      } else {
        return '正常'
      }
    }
  },
  {
    title: '是否接触疫情人员 ',
    dataIndex: 'mark01',
    width: '8%',
    customRender: text => {
      if (text === 1) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  {
    title: '上报人',
    dataIndex: 'reportPersonName',
    width: '8%'
  },
  {
    title: '上报时间',
    dataIndex: 'reportTime',
    width: '10%',
    customRender: text => {
      return (
        new Date(text).getFullYear() +
        '-' +
        (new Date(text).getMonth() + 1 > 9 ? new Date(text).getMonth() + 1 : '0' + (new Date(text).getMonth() + 1)) +
        '-' +
        (new Date(text).getDate() > 9 ? new Date(text).getDate() : '0' + new Date(text).getDate()) +
        ' ' +
        (new Date(text).getHours() > 9 ? new Date(text).getHours() : '0' + new Date(text).getHours()) +
        ':' +
        (new Date(text).getMinutes() > 9 ? new Date(text).getMinutes() : '0' + new Date(text).getMinutes()) +
        ':' +
        (new Date(text).getSeconds() > 9 ? new Date(text).getSeconds() : '0' + new Date(text).getSeconds())
      )
    }
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
    value: 'userName',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '异常'
      },
      {
        key: 2,
        val: '正常'
      }
    ],
    value: 'mark02',
    type: 'select',
    label: '健康状态'
  },
  {
    value: 'rangeTime',
    type: 'rangeTime',
    label: '上报时间'
  }
]
export default {
  name: 'ReportManageTea',
  components: {
    TableList,
    SearchForm,
    PageNum
  },
  data() {
    return {
      columns,
      searchLabel,
      pageList: {
        page: 1,
        size: 20,
        userType: '1',
        schoolCode: ''
      },
      total: 0,
      userList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getReportInfoList']),
    async showList(searchObj = {}) {
      this.pageList.schoolCode = this.userInfo.orgCode
      const res = await this.getReportInfoList({
        ...this.pageList,
        ...searchObj
      })
      this.userList = res.result.list
      this.total = res.result.totalCount
    },
    searchForm(values) {
      this.pageList.page = 1
      const searchObj = {
        userName: values.userName,
        mark02: values.mark02,
        startTime: values.rangeTime[0],
        endTime: values.rangeTime[1]
      }
      this.showList(searchObj)
    },
    detail(record) {
      this.$router.push({
        path: '/component/detail',
        query: {
          id: record.userCode,
          userType: record.userType,
          userName: record.userName
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  margin-bottom: 10px;
}
</style>
