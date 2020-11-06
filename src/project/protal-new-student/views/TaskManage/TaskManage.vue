<template>
  <div class="home page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button icon="plus" class="add-btn" @click.stop="addTask">添加</a-button>
      </div>
    </search-form>
    <table-list isZoom :page-list="pageList" :columns="columns" :table-list="taskList">
      <template v-slot:other1="other1">
        <span> {{ other1.record.gradeNum }} </span>
      </template>
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="查看">
          <a-button
            size="small"
            class="detail-action-btn"
            icon="ellipsis"
            @click.stop="goDetail(action.record)"
          ></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="deleteList(action.record)">
          <template slot="title"> 确定删除吗? </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import Tools from '@u/tools'
const columns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    width: '20%'
  },
  {
    title: '年级',
    dataIndex: 'gradeNum',
    width: '10%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '招生专业',
    dataIndex: 'majorNum',
    width: '15%'
  },
  {
    title: '招生人数',
    dataIndex: 'studentNum',
    width: '10%'
  },
  {
    title: '截止时间',
    dataIndex: 'closingDate',
    width: '20%',
    customRender: (text) => {
      return Tools.getDate(text)
    }
  },
  {
    title: '二维码',
    dataIndex: 'taskCode',
    width: '15%',
    scopedSlots: {
      customRender: 'codePic'
    }
  },
  {
    title: '操作',
    width: '10%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const searchLabel = [
  {
    value: 'taskName',
    type: 'input',
    label: '任务名称',
    placeholder: '请输入任务名称'
  }
]
export default {
  name: 'TaskManage',
  components: {
    SearchForm,
    PageNum,
    TableList
  },
  data() {
    return {
      title: '添加任务',
      columns,
      searchLabel,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      taskList: [],
      searchObj: {}
    }
  },
  computed: {
    ...mapState('home', ['userInfo', 'gradeList'])
  },
  mounted() {
    const list = this.gradeList
    this.searchLabel = [
      ...this.searchLabel,
      {
        list: list.map((item) => {
          return {
            key: item.id,
            val: item.gradeName
          }
        }),
        value: 'grade',
        type: 'select',
        label: '年级'
      }
    ]
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getTaskList', 'delTask']),
    // 查询列表
    async showList() {
      const req = {
        ...this.searchObj,
        ...this.pageList,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getTaskList(req)
      this.taskList = res.data.records
      this.total = res.data.total
    },
    // 点击搜搜-查询招生任务列表
    searchForm(values) {
      this.searchObj = {
        taskName: values.taskName || '',
        gradeNum: values.grade || ''
      }
      this.showList()
    },
    // 点击添加 按钮
    addTask() {
      this.$router.push({ path: '/taskManage/addTask' })
    },
    // 点击列表详情按钮
    goDetail(record) {
      const { id } = record
      if (!id) {
        return
      }
      this.$router.push({
        path: `taskManage/taskDetails`,
        query: {
          id
        }
      })
    },
    // 删除招生任务
    async deleteList(record) {
      if (!record.id) {
        return
      }
      const res = await this.delTask(record.id)
      if (res && res.code === 200) {
        this.$message.success('删除成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      } else {
        this.$message.error('删除失败')
      }
    },
    // 获取年级
    getGradeName(id) {
      return Tools.getGradeName(id, this.gradeList)
    }
  }
}
</script>
<style lang="less" scoped></style>
