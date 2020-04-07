<template>
  <div class="page-layout qui-fx-ver">
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="formStatus"
      :form-data="formData"
    ></submit-form>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button type="primary" @click="addRecord(false, {}, '新增')" icon="plus">新增</a-button>
      </div>
      <div slot="right"></div>
    </search-form>
    <table-list :page-list="pageList" :columns="columns" :table-list="recordList"></table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList(searchObj)"></page-num>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm'
const searchLabel = [
  {
    value: 'userName', // 表单属性
    type: 'selectInput', // 表单类型
    label: '姓名', // 表单label值
    selectType: [
      {
        key: 1,
        val: '姓名'
      },
      {
        key: 2,
        val: '学号/工号'
      },
      {
        key: 3,
        val: '手机号'
      }
    ],
    placeholder: '请输入' // 表单默认值(非必选字段)
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
        val: '学生'
      },
      {
        key: 2,
        val: '教职工'
      }
    ],
    value: 'userType',
    type: 'select',
    label: '人员类型'
  },
  // {
  //   list: [ // 选择列表项，select控件必传
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
  //       val: '后门'
  //     }
  //   ],
  //   value: 'inoutArea',
  //   type: 'select',
  //   label: '出入地点'
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
        val: '出'
      },
      {
        key: 2,
        val: '入'
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
const formData = [
  {
    value: 'userName',
    initValue: '',
    type: 'input',
    label: '姓名',
    placeholder: '请输入人员姓名',
    required: false
  },
  {
    value: 'accessPlace',
    initValue: '',
    type: 'input',
    label: '性别',
    placeholder: '请输入性别',
    required: false
  },
  {
    value: 'accessTime',
    initValue: '',
    type: 'input',
    label: '人员类型',
    placeholder: '请输入人员类型',
    required: false
  },
  {
    value: 'remark',
    initValue: '',
    type: 'input',
    label: '学号/工号',
    placeholder: '请输入学号/工号',
    required: false
  },
  {
    value: 'remark',
    initValue: '',
    type: 'input',
    label: '手机号',
    placeholder: '请输入手机号',
    required: false
  },
  {
    value: 'remark',
    initValue: '',
    type: 'input',
    label: '出入地点',
    placeholder: '请输入出入地点',
    required: false
  },{
    value: 'remark',
    initValue: '',
    type: 'input',
    label: '出入类型',
    placeholder: '请输入出入类型',
    required: false
  },{
    value: 'remark',
    initValue: '',
    type: 'input',
    label: '出入时间',
    placeholder: '请输入出入时间',
    required: false
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
      return parseInt(text) === false ? '男' : '女'
    }
  },
  {
    title: '人员类型',
    dataIndex: 'userType',
    width: '10%',
    customRender: text => {
      return parseInt(text) === false ? '学生' : '教职工'
    }
  },
  {
    title: '学号/工号',
    dataIndex: 'userNo',
    width: '10%'
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: '10%'
  },
  {
    title: '出入地点',
    dataIndex: 'accessPlace',
    width: '10%'
  },
  {
    title: '出入类型',
    dataIndex: 'accessType',
    width: '10%',
    customRender: text => {
      return parseInt(text) === false ? '进' : '出'
    }
  },
  {
    title: '出入时间',
    dataIndex: 'accessTime',
    width: '12%',
    customRender: text => {
      return new Date(text).toLocaleString()
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
    PageNum,
    SubmitForm
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
      recordList: [],
      searchObj: {
        startTime: '',
        endTime: '',
        userName: '',
        userType: '',
        accessType: ''
      },
      formStatus: false,
      title: '新增出入记录'
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getrecordList','addrecordList']),
    async showList(searchObj = this.searchObj) {
      const req = {
        ...this.pageList,
        // schoolCode: this.userInfo.schoolCode,
        schoolCode: 'QPZX'
        // ...searchObj
      }
      const res = await this.getrecordList(req)
      this.recordList = res.data.list
      this.total = res.data.total
    },
    searchForm(values) {
      console.log(values)
      this.searchObj.userName = values.userName
      this.searchObj.startTime = values.rangeTime ? this.$tools.getDateTime(values.rangeTime[0]) : ''
      this.searchObj.endTime = values.rangeTime ? this.$tools.getDateTime(values.rangeTime[1]) : ''
      this.searchObj.userType = values.userType
      this.searchObj.accessType = values.accessType
      this.showList(this.searchObj)
    },
      async submitForm (values) {
      try {
        await this.addrecordList(values)
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.$refs.form.reset()
          this.showList()
        })
      } catch (err) {
        this.$refs.form.error()
      }
    },
    addRecord () {
      this.formStatus = true
        this.title = '新增出入记录'
        this.formData = formData
    },
  }
}
</script>
<style lang="less" scoped></style>
