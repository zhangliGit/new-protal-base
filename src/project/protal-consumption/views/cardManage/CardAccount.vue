<template>
  <div class="card-account page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel"></search-form>
    <div class="qui-fx-f1 qui-fx">
      <table-list is-zoom :page-list="pageList" :columns="cardColumns" :table-list="cardList">
        <template v-slot:other1="other1">
          <a-tag color="orange" @click="showDetail(other1.record)">{{ other1.record.userName }}</a-tag>
        </template>
        <template v-slot:actions="action">
          <a-tag color="#2db7f5" @click="toDetail(action.record)">详情</a-tag>
          <a-tag color="#2db7f5" @click="operationRecord(action.record)">操作记录</a-tag>
        </template>
      </table-list>
    </div>
    <page-num v-model="pageList" :total="total"></page-num>
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
import cardColumns from '../../assets/table/cardColumns'
import BatchImport from '../../component/BatchImport'
const searchLabel = [
  {
    value: 'cardNo',
    type: 'input',
    label: '卡号',
    placeholder: '请输入卡号或读卡'
  },
  {
    value: 'userName',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    value: 'workNo',
    type: 'input',
    label: '学号/工号',
    placeholder: '学号/工号'
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
    list: tools.deepClone(baseData.cardStatus),
    value: 'cardStatus',
    type: 'select',
    label: '卡状态'
  }
]
export default {
  name: 'AccountList',
  components: {
    SearchForm,
    TableList,
    PageNum,
    SubmitForm,
    BatchModel,
    BatchImport
  },
  data() {
    return {
      searchLabel,
      searchText: {},
      cardColumns,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      cardList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this._getCardList()
  },
  methods: {
    ...mapActions('home', ['getCardList']),
    /**
     * @description 获取卡片信息列表
     */
    async _getCardList() {
      const res = await this.getCardList({
        pageNum: this.pageList.page,
        pageSize: this.pageList.size,
        ...this.searchText
      })
      this.cardList = res.rows
      this.total = res.total
    },
    /**
     * @description 搜索列表
     */
    searchForm(values) {
      this.pageList.page = 1
      this.searchText = values
      this._getCardList()
    },
    batchAccount() {
      this.$refs.modal.visible = true
    },
    toDetail(record) {
      window.localStorage.setItem('cardInfo', JSON.stringify(record))
      this.$router.push({
        name: 'cardDetails'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.card-account {
  padding: 20px 20px 0;
}
</style>
