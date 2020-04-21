<template>
  <div class="student-leave page-layout qui-fx">
    <div class="page-left">
      <grade-tree @select="select"></grade-tree>
    </div>
    <div class="qui-fx-f1 qui-fx-ver">
      <search-form is-reset @search-form="searchForm" :search-label="searchLabel"></search-form>
      <no-data msg="暂无应用列表" v-if="false">
        <div slot="btn">
          <a-button type="primary">添加应用</a-button>
        </div>
      </no-data>
      <table-list :page-list="pageList" :columns="columns" :table-list="userList">
        <template v-slot:actions="action">
          <div>
            <a-tooltip placement="topLeft" title="" @click="detail(action.record)">
              <a-button size="small" class="detail-action-btn" icon="form"></a-button>
            </a-tooltip>
          </div>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList(searchObj)"></page-num>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import GradeTree from '@c/GradeTree'
import PageNum from '@c/PageNum'
import 'moment/locale/zh-cn'

const searchLabel = [
  {
    value: 'userName', // 表单属性
    type: 'input', // 表单类型
    label: '姓名', // 表单label值
    placeholder: '请输入姓名' // 表单默认值(非必选字段)
  },
  {
    value: 'rangeTime', // 日期区间
    type: 'rangeTime',
    label: '请假时间'
  },
  {
    list: [
      // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: '0',
        val: '待审批'
      },
      {
        key: '1',
        val: '审批通过'
      },
      {
        key: '2',
        val: '审批不通过'
      },
      {
        key: '3',
        val: '撤回'
      }
    ],
    value: 'state',
    type: 'select',
    label: '状态'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: 'Y',
        val: '是'
      },
      {
        key: 'N',
        val: '否'
      }
    ],
    value: 'outSchool',
    type: 'select',
    label: '是否出校'
  }
]
const columns = [
  {
    title: '序号',
    width: '7%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '7%'
  },
  {
    title: '年级',
    dataIndex: 'gradeName',
    width: '7%'
  },
  {
    title: '班级',
    dataIndex: 'className',
    width: '7%'
  },
  {
    title: '事由',
    dataIndex: 'reason',
    width: '7%'
  },
  {
    title: '是否出校',
    dataIndex: 'outSchool',
    width: '7%',
    customRender: text => {
      if (text === 'Y') {
        return '是'
      } else if (text === 'N') {
        return '否'
      }
    }
  },
  {
    title: '申请人',
    dataIndex: 'applyUserName',
    width: '7%'
  },
  {
    title: '发起时间',
    dataIndex: 'initiationTime',
    width: '7%',
    customRender: text => {
      return new Date(text).toLocaleString()
    }
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    width: '10%',
    customRender: text => {
      return new Date(text).toLocaleString()
    }
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    width: '10%',
    customRender: text => {
      return new Date(text).toLocaleString()
    }
  },
  {
    title: '时长',
    dataIndex: 'duration',
    width: '7%',
    customRender: text => {
      return text + '小时'
    }
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: '7%',
    customRender: text => {
      if (text === '0') {
        return '待审批'
      } else if (text === '1') {
        return '审批通过'
      } else if (text === '2') {
        return '审批不通过'
      } else if (text === '3') {
        return '撤销'
      }
    }
  },
  {
    title: '操作',
    width: '7%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'StudentLeave',
  components: {
    GradeTree,
    TableList,
    SearchForm,
    PageNum
  },
  data() {
    return {
      searchLabel,
      columns,
      total: 1,
      pageList: {
        page: 1,
        size: 20
      },
      userList: [],
      searchObj: {
        startTime: '',
        endTime: '',
        userName: '',
        state: ''
      },
      schoolYearId: '',
      gradeCode: '',
      classCode: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  async mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getStudentsLeave']),
    async showList(searchObj = this.searchObj) {
      const req = {
        ...this.pageList,
        schoolCode: this.userInfo.schoolCode,
        classId: this.classCode,
        gradeId: this.gradeCode,
        ...searchObj
      }
      const res = await this.getStudentsLeave(req)
      if (!res.data) {
        return
      }
      this.userList = res.data.list
      this.total = res.data.total
    },
    select(item) {
      console.log(item)
      this.schoolYearId = item.schoolYearId
      this.gradeCode = item.gradeCode
      this.classCode = item.classCode
      this.showList()
    },
    searchForm(values) {
      console.log(values)
      this.searchObj.userName = values.userName
      this.searchObj.startTime = values.rangeTime ? this.$tools.getDateTime(values.rangeTime[0]) : ''
      this.searchObj.endTime = values.rangeTime ? this.$tools.getDateTime(values.rangeTime[1]) : ''
      this.searchObj.state = values.state
      this.searchObj.outSchool = values.outSchool
      this.showList(this.searchObj)
    },
    detail(record) {
      console.log(record.id)
      this.$router.push({
        path: '/studentLeave/detail',
        query: { id: record.id }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.student-leave {
  .page-left {
    background: #fff;
    margin-right: 10px;
    width: 200px;
  }
  .page-right{
    width: calc(100% - 210px);
  }
}
</style>
