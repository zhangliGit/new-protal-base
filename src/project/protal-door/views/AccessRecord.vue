<template>
  <div class="page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel"></search-form>
    <table-list :page-list="pageList" :columns="columns" :table-list="recordList"></table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import PageNum from '@c/PageNum'
import Tools from '@u/tools'
const searchLabel = [
  {
    value: 'keyword',
    initValue: '',
    type: 'selectInput',
    selectType: [
      {
        key: 'userName',
        val: '姓名'
      },
      {
        key: 'mobile',
        val: '手机号'
      },
      {
        key: 'userNo',
        val: '学号/工号'
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
        key: 1,
        val: '超级管理员'
      },
      {
        key: 2,
        val: '管理员'
      },
      {
        key: 4,
        val: '教职工'
      },
      {
        key: 8,
        val: '学生'
      },
      {
        key: 16,
        val: '家长'
      },
      {
        key: 32,
        val: '访客'
      }
    ],
    value: 'userType',
    type: 'select',
    label: '人员类型',
    scopedSlots: {
      customRender: 'other5'
    }
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
        val: '进'
      },
      {
        key: 2,
        val: '出'
      }
    ],
    value: 'accessType',
    type: 'select',
    label: '出入类型'
  },
  {
    value: 'rangeTime', // 日期区间
    type: 'rangeTime',
    label: '起始时间'
  }
]
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
    width: '8%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '5%',
    customRender: text => {
      return Tools.getSex(text)
    }
  },
  {
    title: '人员类型',
    dataIndex: 'userType',
    width: '10%',
    customRender: text => {
      let arr = text.split(',')
      arr = arr.map(el => {
        if (el === '1') {
          return '超级管理员'
        } else if (el === '2') {
          return '管理员'
        } else if (el === '4') {
          return '教职工'
        } else if (el === '8') {
          return '学生'
        } else if (el === '16') {
          return '家长'
        } else if (el === '32') {
          return '访客'
        }
      })
      return arr.join(',')
    }
  },
  {
    title: '学号/工号',
    dataIndex: 'userNo',
    width: '8%'
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: '10%'
  },
  {
    title: '温度',
    dataIndex: 'temperature',
    width: '8%'
  },
  {
    title: '出入地点',
    dataIndex: 'accessPlace',
    width: '8%'
  },
  {
    title: '出入类型',
    dataIndex: 'accessType',
    width: '8%',
    customRender: text => {
      return parseInt(text) === 1 ? '进' : '出'
    }
  },
  {
    title: '出入时间',
    dataIndex: 'accessTime',
    width: '10%',
    customRender: text => {
      return Tools.getDate(text)
    }
  },
  {
    title: '底照',
    dataIndex: 'userPhoto',
    width: '10%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '抓拍照',
    dataIndex: 'snapPhoto',
    width: '10%',
    scopedSlots: {
      customRender: 'snapPic'
    }
  }
]
export default {
  name: 'AccessRecord',
  components: {
    TableList,
    SearchForm,
    PageNum
  },
  data() {
    return {
      columns,
      searchLabel,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      recordList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getrecordList']),
    async showList(searchObj = {}) {
      const req = {
        pageNum: this.pageList.page,
        pageSize: this.pageList.size,
        schoolCode: this.userInfo.schoolCode,
        ...searchObj
      }
      const res = await this.getrecordList(req)
      this.recordList = res.data.list
      this.total = res.data.total
    },
    searchForm(values) {
      this.pageList.pageNum = 1
      const searchObj = {
        keyword: values.keyword,
        userType: values.userType,
        accessType: values.accessType,
        startTime: values.rangeTime[0],
        endTime: values.rangeTime[1]
      }
      this.showList(searchObj)
    }
  }
}
</script>
<style lang="less" scoped></style>
