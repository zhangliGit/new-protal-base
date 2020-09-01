<template>
  <div class="role page-layout qui-fx-ver">
    <choose-user
      chooseType="school"
      :bind-obj="bindObj"
      is-check
      ref="form"
      v-if="userTag"
      v-model="userTag"
      @submit="submit"
      title="添加用户"
    >
    </choose-user>
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
    <div class="qui-fx qui-fx-ver qui-fx-f1">
      <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
        <div slot="left">
          <a-button icon="export" class="export-btn" @click="exportClick">导出</a-button>
          <a-button type="primary" @click="addJob(0)"> <a-icon type="plus" />上传账单</a-button>
        </div>
      </search-form>
      <table-list :page-list="pageList" :columns="columns" :table-list="roleList">
        <template v-slot:totalNums="totalNum">
          <div class="qui-fx qui-fx-ac">
            {{ totalNum.record.employeesNum }}
            <a-button
              size="small"
              type="primary"
              icon="plus"
              style="margin-left:10px;"
              @click="addCrew(totalNum.record)"
            ></a-button>
          </div>
        </template>
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="编辑" v-if="action.record.defaultState !== '0'">
            <a-button
              size="small"
              class="edit-action-btn"
              icon="form"
              @click.stop="addJob(1, action.record)"
            ></a-button>
          </a-tooltip>
          <a-popconfirm
            placement="left"
            okText="确定"
            cancelText="取消"
            @confirm="deleteJob(action.record.id)"
            v-if="action.record.defaultState !== '0'"
          >
            <template slot="title">
              您确定删除吗?
            </template>
            <a-tooltip placement="topLeft" title="删除">
              <a-button size="small" class="del-action-btn" icon="delete"></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm'
import NoData from '@c/NoData'
import Tools from '@u/tools'
import ChooseUser from '@c/ChooseUser'
import SearchForm from '@c/SearchForm'
const columns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '账单名称',
    dataIndex: 'userName',
    width: '10%'
  },
  {
    title: '账单号',
    dataIndex: 'orgName',
    width: '10%'
  },
  {
    title: '学生姓名',
    dataIndex: 'mobile',
    width: '8%'
  },
  {
    title: '班级名称',
    dataIndex: 'sex',
    width: '8%'
  },
  {
    title: '家长手机',
    dataIndex: 'remark',
    width: '8%'
  },
  {
    title: '账单金额(元)',
    dataIndex: 'remark',
    width: '8%'
  },
  {
    title: '实缴金额(元)',
    dataIndex: 'remark',
    width: '8%'
  },
  {
    title: '账单状态',
    dataIndex: 'remark',
    width: '8%'
  },
  {
    title: '支付方式',
    dataIndex: 'remark',
    width: '8%'
  },
  {
    title: '创建时间',
    dataIndex: 'remark',
    width: '8%'
  },
  {
    title: '操作',
    width: '8%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const formData = [
  {
    value: 'jobName',
    initValue: '',
    type: 'input',
    label: '批次名称',
    placeholder: '请输入批次名称'
  },
  {
    value: 'jobName',
    initValue: '',
    type: 'input',
    label: '账单Excel',
    placeholder: '请输入账单Excel'
  },
  {
    value: 'birthday',
    type: 'singleTime',
    label: '截止日期',
    initValue: '',
    placeholder: '请选择截止日期'
  },
   {
    value: 'isPlatform',
    initValue: 0,
    list: [
      {
        key: 0,
        val: '立即发送'
      },
      {
        key: 1,
        val: '定时发送'
      }
    ],
    type: 'radio',
    label: '发送方式',
  },
]
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
      }
    ],
    placeholder: '请输入'
  },
  {
    value: 'date',
    type: 'singleTime',
    label: '时间'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '0',
        val: '待缴费'
      },
      {
        key: '1',
        val: '已缴费'
      },
      {
        key: '3',
        val: '账单关闭'
      },
      {
        key: '3',
        val: '逾时'
      }
    ],
    value: 'state',
    type: 'select',
    label: '订单状态'
  }
]
export default {
  name: 'Post',
  components: {
    NoData,
    TableList,
    PageNum,
    SubmitForm,
    ChooseUser,
    SearchForm
  },
  data() {
    return {
      title: '上传账单',
      formStatus: false,
      formData,
      columns,
      type: 0,
      id: '',
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      roleList: [],
      userTag: false,
      jobName: '',
      jobCode: '',
      bindObj: {},
      searchLabel
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created() {
    this.init()
  },
  mounted() {
    this.showList()
  },

  methods: {
    ...mapActions('home', [
      'getJobList',
      'addEduJob',
      'updateJob',
      'delJob',
      'addUserjob',
      'addDefaultJob',
      'getQueryjob'
    ]),
    // 初始预设职位
    async init() {
      const req = {
        eduCode: this.userInfo.schoolCode,
        category: '03'
      }
      const res = await this.getQueryjob(req)
      if (!res.data) {
        return
      }
      if (res.data.length === 0) {
        const req = {
          eduCode: this.userInfo.schoolCode,
          eduName: this.userInfo.schoolName,
          category: '03'
        }
        const con = await this.addDefaultJob(req)
        this.showList()
      }
    },
    searchForm(values) {
      this.keyWord = values.keyWord
      this.showList(values.keyWord)
    },
    async submitForm(values) {
      const req = {
        ...values,
        eduCode: this.userInfo.schoolCode,
        eduName: this.userInfo.schoolName,
        category: '03',
        defaultState: '1'
      }
      let res
      if (this.type) {
        req.id = this.id
        res = this.updateJob(req)
      } else {
        res = this.addEduJob(req)
      }
      res
        .then(() => {
          const msg = this.type ? '编辑成功' : '添加成功'
          this.$message.success(msg)
          this.$tools.goNext(() => {
            this.showList()
            this.$refs.form.reset()
          })
        })
        .catch(() => {
          this.$refs.form.error()
        })
    },
    addJob(type, record) {
      this.formStatus = true
      if (type === 1) {
        this.title = '编辑职务'
        this.type = 1
        this.id = record.id
        this.formData = this.$tools.fillForm(formData, record)
      } else {
        this.type = 0
        this.title = '上传账单'
        this.formData = formData
      }
    },
    async deleteJob(id) {
      await this.delJob({ id })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    },
    async showList() {
      const req = {
        eduCode: this.userInfo.schoolCode,
        pageNum: this.pageList.page,
        pageSize: this.pageList.size,
        category: '03'
      }
      const res = await this.getJobList(req)
      if (!res.data) {
        this.roleList = []
        return
      }
      this.roleList = res.data.list
      this.total = res.data.total
    },
    addCrew(item) {
      this.jobName = item.jobName
      this.jobCode = item.jobCode
      this.bindObj = {
        schoolCode: this.userInfo.schoolCode,
        jobCode: this.jobCode
      }
      this.userTag = true
    },
    async submit(values) {
      const userCodeList = []
      values.forEach(ele => {
        userCodeList.push(ele.userCode)
      })
      const req = {
        schoolCode: this.userInfo.schoolCode,
        jobCode: this.jobCode,
        jobName: this.jobName,
        userCodeList
      }
      try {
        await this.addUserjob(req)
        this.$message.success('添加成功')
        this.$tools.goNext(() => {
          this.$refs.form.reset()
          this.showList()
        })
      } catch (e) {
        this.$refs.form.error()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.role {
  background: #fff;
  height: 100%;
  .top-btn-group {
    background: #f0f2f5;
  }
  .table-total-num {
    cursor: pointer;
  }
  .action {
    div {
      cursor: pointer;
      margin: 4px 20px 0 0;
      img {
        width: 20px;
        height: 20px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
