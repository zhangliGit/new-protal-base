<template>
  <div class="teacher-leave page-layout qui-fx">
    <div class="page-left">
      <org-tree @select="select"></org-tree>
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
            <a-tooltip placement="topLeft" title="详情">
              <a-button
                size="small"
                style="margin-right: 5px; background: #909399; color:#fff"
                icon="ellipsis"
                @click="detail(action.record)"
              ></a-button>
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
import OrgTree from '@c/OrgTree'
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
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '审批单号',
    dataIndex: 'num',
    width: '8%'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '8%'
  },
  {
    title: '组织机构',
    dataIndex: 'org',
    width: '8%'
  },
  {
    title: '事由',
    dataIndex: 'cause',
    width: '8%'
  },
  {
    title: '是否出校',
    dataIndex: 'isOut',
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
    title: '发起时间',
    dataIndex: 'startTime',
    width: '8%'
  },
  {
    title: '开始时间',
    dataIndex: 'beginTime',
    width: '8%'
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    width: '8%'
  },
  {
    title: '时长',
    dataIndex: 'durationTime',
    width: '8%',
    customRender: text => {
      return text + '小时'
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '8%',
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
    width: '8%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'TeacherLeave',
  components: {
    OrgTree,
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
    ...mapActions('home', ['getTeachersLeave']),
    async showList() {
      const res = await this.getTeachersLeave()
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
        path: '/teacherLeave/detail',
        query: { id: record.id }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.teacher-leave {
  .page-left {
    margin-right: 10px;
    background: #fff;
  }
}
</style>
