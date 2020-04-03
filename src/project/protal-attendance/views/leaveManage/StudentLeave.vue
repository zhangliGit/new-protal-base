<template>
  <div class="student-leave page-layout qui-fx">
    <div class="page-left">
      <grade-tree @select="select"></grade-tree>
    </div>
    <div class="page-right qui-fx-ver">
      <search-form is-reset @search-form="searchForm" :search-label="searchLabel"></search-form>
      <no-data msg="暂无应用列表" v-if="false">
        <div slot="btn">
          <a-button type="primary">添加应用</a-button>
        </div>
      </no-data>
      <table-list :page-list="pageList" :columns="columns" :table-list="userList">
        <template v-slot:actions="action">
          <div>
            <a-tooltip placement="topLeft" title="详情" @click="detail(action.record)">
              <a-button size="small" class="detail-action-btn" icon="form"></a-button>
            </a-tooltip>
          </div>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import GradeTree from '@c/GradeTree'
import PageNum from '@c/PageNum'
const searchLabel = [
  {
    value: 'name', // 表单属性
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
        key: 1,
        val: '待审批'
      },
      {
        key: 2,
        val: '审批通过'
      },
      {
        key: 3,
        val: '审批不通过'
      }
    ],
    value: 'status',
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
        key: 1,
        val: '是'
      },
      {
        key: 2,
        val: '否'
      }
    ],
    value: 'isOut',
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
    title: '审批单号',
    dataIndex: 'num',
    width: '7%'
  },
  {
    title: '请假人姓名',
    dataIndex: 'name',
    width: '7%'
  },
  {
    title: '年级',
    dataIndex: 'grade',
    width: '7%'
  },
  {
    title: '班级',
    dataIndex: 'class',
    width: '7%'
  },
  {
    title: '事由',
    dataIndex: 'cause',
    width: '7%'
  },
  {
    title: '是否出校',
    dataIndex: 'isOut',
    width: '7%',
    customRender: text => {
      if (text === 1) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  {
    title: '申请人姓名',
    dataIndex: 'toName',
    width: '7%'
  },
  {
    title: '发起时间',
    dataIndex: 'startTime',
    width: '7%'
  },
  {
    title: '开始时间',
    dataIndex: 'beginTime',
    width: '7%'
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    width: '7%'
  },
  {
    title: '时长',
    dataIndex: 'durationTime',
    width: '7%',
    customRender: text => {
      return text + '小时'
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '7%',
    customRender: text => {
      if (text === 1) {
        return '待审批'
      } else if (text === 2) {
        return '审批通过'
      } else if (text === 3) {
        return '审批不通过'
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
      total: 100,
      pageList: {
        page: 1,
        size: 20
      },
      userList: []
    }
  },
  async mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getStudentsLeave']),
    async showList() {
      const res = await this.getStudentsLeave()
      this.userList = res.data
      this.total = res.total
    },
    select(item) {
      console.log(item)
    },
    searchForm(values) {
      console.log(values)
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
  }
}
</style>
