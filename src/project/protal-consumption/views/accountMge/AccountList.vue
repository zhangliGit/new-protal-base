<template>
  <div class="account-list page-layout qui-fx-ver">
    <open-card v-if="isOpen" v-model="isOpen" ref="cardForm" :user-code="userCode"></open-card>
    <choose-user @submit="chooseUser" title="请选择用户" v-model="userTag"></choose-user>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button type="primary" @click="batchAccount">批量开户</a-button>
        <a-button type="primary" class="u-mar-l" @click="_batchAccountSingle">开户</a-button>
      </div>
    </search-form>
    <div class="qui-fx-f1 qui-fx">
      <table-list is-zoom :page-list="pageList" :columns="accountColumns" :table-list="accountList">
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
    <batch-model ref="modal" :title="'批量开户'" @ok="batchSubmit">
      <a-row :gutter="[20, 20]">
        <a-col :span="10" :gutter="2">1.下载模板，批量填写人员信息</a-col>
        <a-col :span="10">
          <a-button type="primary" @click="downloadTemplate()">下载模板</a-button>
        </a-col>
      </a-row>
      <a-row :gutter="[20, 20]">
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
import ChooseUser from '../../component/ChooseUser'
import ShowDialog from '@c/ShowDialog'
import OpenCard from './OpenCard'
import SearchForm from '@c/SearchForm'
import BatchModel from '../../component/Modal'
import SubmitForm from '../../component/SubmitForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import CountDetail from '../../component/CountDetail'
import accountColumns from '../../assets/table/accountColumns'
import columnList from '../../assets/table/consumeColumns'
import BatchImport from '../../component/BatchImport'
const searchLabel = [
  {
    value: 'workNo',
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
        key: 1,
        val: '学生'
      },
      {
        key: 2,
        val: '教职工'
      },
      {
        key: 3,
        val: '其他'
      }
    ],
    value: 'userType',
    type: 'select',
    label: '身份'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '0',
        val: '未开户'
      },
      {
        key: '1',
        val: '已开户'
      },
      {
        key: '2',
        val: '已冻结'
      },
      {
        key: '3',
        val: '已销户'
      }
    ],
    value: 'status',
    type: 'select',
    label: '状态'
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
    BatchImport,
    ChooseUser,
    OpenCard,
    ShowDialog
  },
  data() {
    return {
      userCode: '',
      isOpen: false,
      accountList: [],
      accountColumns,
      searchLabel,
      searchText: {},
      total: 0,
      title: '',
      userTag: false,
      columnList,
      pageList: {
        page: 1,
        size: 20
      },
      cardList: [],
      importParams: {},
      importUrl: '',
      showDetailTag: false
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this._getAccountList()
  },
  methods: {
    ...mapActions('home', ['getAccountList']),
    /**
     * @description 获取账户列表
     */
    searchForm(values) {
      this.pageList.page = 1
      this.searchText = values
      this._getAccountList()
    },
    async _getAccountList() {
      const res = await this.getAccountList({
        pageNum: this.pageList.page,
        pageSize: this.pageList.size,
        ...this.searchText
      })
      this.accountList = res.rows
      this.total = res.total
    },
    /**
     * @description 账户详情
     */
    toDetail(record) {
      window.localStorage.setItem('accountInfo', JSON.stringify(record))
      this.$router.push({
        path: '/accountList/accountDetails'
      })
    },
    /**
     * @description 选择开户人员
     * @param {user: object} 开户人信息
     */
    chooseUser(user) {
      this.userTag = false
      this.isOpen = true
      this.userCode = user.userCode
    },
    /**
     * @description 单个开户
     */
    _batchAccountSingle() {
      this.userTag = true
    },
    /**
     * @description 批量开户
     */
    batchSubmit() {},
    showDetail(record) {
      this.userId = record.userId
      this.showDetailTag = true
    },
    batchAccount() {
      this.$refs.modal.visible = true
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
.account-list {
  padding: 20px 20px 0;
}
</style>
