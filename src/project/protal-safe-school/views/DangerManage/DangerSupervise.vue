<template>
  <div class="page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button icon="export" class="export-btn" @click="exportClick(0)">导出</a-button>
      </div>
    </search-form>
    <table-list
      is-check
      :page-list="pageList"
      :columns="columns"
      :table-list="findList"
      v-model="chooseList"
      @clickRow="clickRow"
      @selectAll="selectAll">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button size="small" class="edit-action-btn" icon="form" @click.stop="add(1, action)"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action)">
          <template slot="title"> 确定删除该隐患分类吗? </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData"></submit-form>
  </div>
</template>

<script>
import hostEnv from '@config/host-env'
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm'
import SearchForm from '@c/SearchForm'
const columns = [
  {
    title: '序号',
    scopedSlots: {
      customRender: 'index'
    },
    width: '5%'
  },
  {
    title: '隐患图片',
    dataIndex: 'name',
    width: '8%'
  },
  {
    title: '整改图片',
    dataIndex: 'type',
    width: '8=8%'
  },
  {
    title: '隐患描述',
    dataIndex: 'type1',
    width: '8%'
  },
  {
    title: '隐患来源',
    dataIndex: 'type2',
    width: '8%'
  },
  {
    title: '隐患类型',
    dataIndex: 'type3',
    width: '8%'
  },
  {
    title: '上报人',
    dataIndex: 'type4',
    width: '8%'
  },
  {
    title: '隐患状态',
    dataIndex: 'type5',
    width: '8%'
  },
  {
    title: '隐患等级',
    dataIndex: 'type6',
    width: '8%'
  },
  {
    title: '处理人',
    dataIndex: 'type7',
    width: '8%'
  },
  {
    title: '最近操作时间',
    dataIndex: 'type8',
    width: '8%'
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
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '已巡查'
      },
      {
        key: '0',
        val: '未巡查'
      }
    ],
    value: 'state',
    type: 'select',
    label: '隐患状态'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '已巡查'
      },
      {
        key: '0',
        val: '未巡查'
      }
    ],
    value: 'state1',
    type: 'select',
    label: '隐患来源'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '已巡查'
      },
      {
        key: '0',
        val: '未巡查'
      }
    ],
    value: 'state4',
    type: 'select',
    label: '隐患等级'
  },
  {
    value: 'rangeTime', // 日期区间
    type: 'rangeTime',
    label: '操作时间'
  },
  {
    value: 'userName',
    type: 'input',
    label: '姓名',
    placeholder: '请输入'
  }
]
const formData = [
  {
    value: 'userName',
    initValue: '',
    type: 'input',
    label: '分类名称',
    placeholder: '请输入分类名称'
  }
]
export default {
  name: 'DangerSupervise',
  components: {
    TableList,
    PageNum,
    SubmitForm,
    SearchForm
  },
  data() {
    return {
      columns,
      searchLabel,
      formData,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      findList: [],
      form: this.$form.createForm(this),
      chooseList: [],
      formStatus: false,
      title: '新增分类'
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getTaskList', 'delTask', 'delTasks', 'getSubNodes',
      'inspectDetail', 'changeTask', 'changeTasks', 'getTaskRecord', 'exportUser', 'exportTask']),
    async showList() {
      this.taskSearch.schoolCode = this.userInfo.schoolCode
      this.taskSearch = Object.assign(this.taskSearch, this.pageList)
      const res = await this.getTaskList(this.taskSearch)
      this.findList = res.data.records
      this.total = res.data.total
    },
    changePage() {
      this.pageList.page = 1
      this.pageList.size = 20
      this.showList()
    },
    searchForm(values) {
      this.recordPage.page = 1
      this.recordPage.size = 20
      this.searchList.startTime = values.rangeTime ? `${values.rangeTime[0]} 00:00:00` : ''
      this.searchList.endTime = values.rangeTime ? `${values.rangeTime[1]} 23:59:59` : ''
      this.searchList = Object.assign(this.searchList, values)
      this.showList()
    },
    async add(type, record) {
      if (type) {
        this.title = '编辑分类'
      } else {
        this.title = '新增分类'
      }
      this.formStatus = true
    },
    del(record) {
      this.delTask(record.record.id).then(res => {
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.showList()
          this.chooseList = []
        })
      })
    },
    dels() {
      if (this.chooseList.length === 0) {
        this.$message.warning('请选择要删除的隐患分类')
        return false
      }
      this.$tools.delTip('确定删除选中的隐患分类吗？', () => {
        this.delTasks(this.chooseList).then(res => {
          this.$message.success('操作成功')
          this.$tools.goNext(() => {
            this.showList()
            this.chooseList = []
          })
        })
      })
    },
    selectAll(item, type) {
      if (type) {
        this.totalList = this.totalList.concat(item)
      } else {
        item.forEach(item => {
          const index = this.totalList.findIndex(list => {
            return list.id === item.id
          })
          this.totalList.splice(index, 1)
        })
      }
    },
    // 监听选中或取消
    clickRow(item, type) {
      if (type) {
        if (this.isCheck) {
          this.totalList.push(item)
        } else {
          this.totalList = [item]
        }
      } else {
        const index = this.totalList.findIndex(list => list.id === item.id)
        this.totalList.splice(index, 1)
      }
    },
    async submitForm (values) {
      try {
        if (this.title === '编辑员工') {
          values.userId = this.staffId
          await this.updateStaff(values)
        } else {
          await this.addStaff(values)
        }
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.$refs.form.reset()
          this.showList()
        })
      } catch (err) {
        this.$refs.form.error()
      }
    },
    // 导出
    exportClick(type) {
      let url = ''
      if (type) {
        url = `${hostEnv.lz_safe}/userTask/export/user/task/static`
      } else {
        url = `${hostEnv.lz_safe}/userTask/export/user/static`
      }
      var xhr = new XMLHttpRequest()
      xhr.open('POST', url, true) // 也可以使用POST方式，根据接口
      xhr.responseType = 'blob'
      xhr.onload = function () {
        if (this.status === 200) {
          var content = this.response
          var aTag = document.createElement('a')
          var blob = new Blob([content])
          var headerName = xhr.getResponseHeader('Content-disposition')
          var fileName = decodeURIComponent(headerName).substring(20)
          aTag.download = fileName
          aTag.href = URL.createObjectURL(blob)
          aTag.click()
          URL.revokeObjectURL(blob)
        }
      }
      xhr.send(JSON.stringify(this.searchList))
    }
  }
}
</script>
<style lang="less" scoped></style>
