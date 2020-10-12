<template>
  <div class="account-list page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button type="primary" @click="batchAccount">批量开户</a-button>
      </div>
    </search-form>
    <div class="qui-fx-f1 qui-fx">
      <table-list is-zoom :page-list="pageList" :columns="accountColumns" :table-list="accountList">
        <template v-slot:other1="other1">
          <a-tag color="orange" @click="showDetail(other1.record)">{{ other1.record.userName }}</a-tag>
        </template>
        <template v-slot:actions="action">
          <a-tag color="#2db7f5" @click="toDetail(action.record)">详情</a-tag>
          <!-- v-if="action.record.status === 0" -->
          <a-tag color="#2db7f5" @click="operationRecord(action.record)">操作记录</a-tag>
          <!-- <a-tag color="#2db7f5" @click="handle('补助', action.record)" v-if="action.record.status === 0">补助</a-tag> -->
        </template>
      </table-list>
    </div>
    <page-num v-model="pageList" :total="total"></page-num>
    <count-detail
      ref="countDetail"
      isSearch
      v-if="showDetailTag"
      v-model="showDetailTag"
      :columns="columnList.dealColumn"
      :searchLabel="dealSearchLabel"
      chooseType="6"
      :userId="userId"
      title="交易记录"
    ></count-detail>
    <batch-model ref="modal" :title="'批量开户'" @ok="submit">
      <a-row :gutter="[20,20]">
        <a-col :span="10" :gutter="2">1.下载模板，批量填写人员信息</a-col>
        <a-col :span="10">
          <a-button type="primary" @click="downloadTemplate()">下载模板</a-button>
        </a-col>
      </a-row>
      <a-row :gutter="[20,20]">
        <a-col :span="10" :gutter="2">2.上传填写好的开户信息Excel文件</a-col>
        <a-col :span="10">
          <a-button type="primary" @click="uploadFiles()">上传文件</a-button>&nbsp; &nbsp; 未选择任何文件
        </a-col>
      </a-row>
    </batch-model>
    <batch-import
      ref="batchImport"
      :title="title"
      :url="importUrl"
      :params="importParams"
      @upload-success="handleUploadSuccess"
    ></batch-import>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import BatchModel from '../../component/Modal'
import SubmitForm from '../../component/SubmitForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import baseData from '../../assets/js/base'
import tools from '@u/tools'
import CountDetail from '../../component/CountDetail'
import accountColumns from '../../assets/table/accountColumns'
import columnList from '../../assets/table/consumeColumns'
import BatchImport from '../../component/BatchImport'
const searchLabel = [
  {
    value: 'card',
    type: 'input',
    label: '学号/工号',
    placeholder: '学号/工号'
  },
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
        key: 8,
        val: '学生'
      },
      {
        key: 4,
        val: '教职工'
      },
      {
        key: 5,
        val: '其他'
      }
    ],
    value: 'userIdentity',
    type: 'select',
    label: '身份'
  },
  {
    list: tools.deepClone(baseData.cardStatus),
    value: 'status',
    type: 'select',
    label: '状态'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      }
    ],
    value: 'cardType',
    type: 'select',
    label: '类型'
  }
]
const dealSearchLabel = [
  {
    value: 'rangeTime', // 日期区间
    type: 'rangeTime',
    label: '交易时间'
  },
  {
    list: tools.deepClone(baseData.daelType),
    value: 'status',
    type: 'select',
    label: '交易类型'
  }
]
const formData = [
  {
    value: 'userName',
    initValue: '',
    type: 'input',
    label: '姓名',
    disabled: false,
    required: true
  },
  {
    value: 'orgName',
    initValue: '',
    type: 'input',
    label: '班级/部门',
    disabled: true,
    required: false
  },
  {
    value: 'userIdentity',
    initValue: '',
    type: 'input',
    label: '身份',
    disabled: true,
    required: false
  },
  {
    value: 'workNo',
    initValue: '',
    type: 'input',
    label: '学号/工号',
    disabled: true,
    required: false
  },
  {
    value: 'card',
    initValue: '',
    type: 'input',
    label: '卡号',
    disabled: true,
    required: false
  },
  {
    value: 'status',
    initValue: '',
    type: 'input',
    label: '状态',
    disabled: true,
    required: false
  },
  {
    value: 'cardName',
    initValue: '',
    type: 'input',
    label: '卡类型',
    disabled: true,
    required: false
  },
  {
    value: 'balance',
    initValue: '',
    type: 'input',
    label: '账户余额',
    disabled: true,
    required: false
  },
  {
    value: 'consumeBalance',
    initValue: '',
    type: 'input',
    label: '充值金额',
    placeholder: '请输入充值金额'
  },
  {
    value: 'remark',
    initValue: '',
    type: 'input',
    label: '备注',
    placeholder: '请输入备注'
  },
  {
    type: 'text',
    label: '',
    text: '* 请确认核对收到一致的现金金额',
    style: {
      color: 'red'
    }
  }
]
export default {
  name: 'AccountList',
  components: {
    CountDetail,
    SearchForm,
    TableList,
    PageNum,
    SubmitForm,
    BatchModel,
    BatchImport
  },
  data() {
    return {
      title: '绑卡',
      importUrl: '',
      confirmLoading: false,
      visible: false,
      showTag: false,
      total: 0,
      actionTitle: '',
      searchLabel,
      dealSearchLabel,
      accountColumns,
      showDetailTag: false,
      columnList,
      formData,
      pageList: {
        page: 1,
        size: 20
      },
      importParams: {},
      accountList: [
        {
          index: '1',
          userName: '1',
          userIdentity: '1',
          workNo: '1',
          classBoards: '1',
          status: '1',
          action: '1',
          photoUrl: '1'
        }
      ],
      userId: '',
      rangeTime: [],
      searchObj: {},
      type: '',
      id: '',
      cardList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    // this.getCardList()
  },
  methods: {
    ...mapActions('home', ['getCardType', 'getUserInfoList', 'recharge', 'charge', 'subsidy']),
    async getCardList() {
      const res = await this.getCardType()
      this.cardList = res.data
      const lastCount = this.searchLabel.length - 1
      res.data.forEach(ele => {
        this.searchLabel[lastCount].list.push({
          key: ele.cardType,
          val: ele.cardName
        })
      })
      this.$nextTick(() => {
        this.showList()
      })
    },
    showDetail(record) {
      this.userId = record.userId
      this.showDetailTag = true
    },
    submit() {},
    async showList() {
      const req = {
        ...this.pageList,
        ...this.searchObj
      }
      const res = await this.getUserInfoList(req)
      // console.log(res)
      this.accountList = res.data.list.map(el => {
        return {
          ...el,
          id: el.userId
        }
      })
      this.accountList.map(ele => {
        const index = this.cardList.findIndex(list => {
          return list.id === ele.cardType
        })
        if (index !== -1) {
          ele.cardType = this.cardList[index].cardName
        }
      })
      this.total = res.data.total
    },
    searchForm(values) {
      // console.log(values)
      this.searchObj = values
      this.showList()
    },

    handle(title, record) {
      this.actionTitle = title
      this.id = record.userId
      this.formData = this.$tools.fillForm(formData, {
        ...record,
        userIdentity: this.$tools.userType(record.userIdentity),
        status: this.$tools.getCardStatus(record.status)
      })
      if (title === '充值') {
        this.type = '0'
        this.formData.splice(-2, 1)
      } else if (title === '扣款') {
        this.type = '1'
        this.formData[8].label = '扣款金额'
        this.formData[8].placeholder = '请输入扣款金额'
        this.formData[10].text = '* 请确认核对扣款金额'
      } else if (title === '补助') {
        this.type = '2'
        this.formData[8].label = '补助金额'
        this.formData[8].placeholder = '请输入补助金额'
        this.formData[10].text = '* 补助金额将直接发放到用户账户中，请核实操作'
      }
      this.showTag = true
    },
    async submitForm(values) {
      // console.log('values', values)
      // return false
      const req = {
        ...values,
        userCode: this.userInfo.userCode,
        userId: this.id,
        card: values.card,
        consumeBalance: values.consumeBalance,
        remark: values.remark,
        balance: values.balance
      }
      if (this.type === '0') {
        await this.recharge(req)
        this.$message.success('充值成功')
      } else if (this.type === '1') {
        await this.charge(req)
        this.$message.success('扣款成功')
      } else if (this.type === '2') {
        await this.subsidy(req)
        this.$message.success('补助成功')
      }
      this.$tools.goNext(() => {
        this.showList()
        this.$refs.form.reset()
      })
    },
    batchAccount() {
      this.$refs.modal.visible = true
    },
    toDetail(record) {
      this.$router.push({
        path: '/accountList/accountDetails',
        props: true,
        query: {
          userId: record.userId,
          cardStatus: record.status
        }
      })
    },
    operationRecord(record) {
      this.$router.push({
        path: '/accountOperationRecord',
        props: true,
        query: {
          userId: record.userId,
          cardStatus: record.status
        }
      })
    },
    downloadTemplate() {
      const a = document.createElement('a')
      a.href = '/ljj_dorm/dorm/in/record/download/excel'
      a.click()
    },
    // 上传文件
    uploadFiles() {
      this.$refs.batchImport.addVisible = true
      this.title = '导入文件'
      this.importParams = {
        schoolCode: sessionStorage.getItem('schoolScheme'),
        schoolName: sessionStorage.getItem('schoolName')
      }
      this.importUrl = '/ljj_dorm/dorm/in/record/import/excel'
    },
    // 导入成功
    handleUploadSuccess() {
      this.$refs.batchImport.addVisible = false
      this.showRoom(this.floorCode)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
