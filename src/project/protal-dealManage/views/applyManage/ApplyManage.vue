<template>
  <div class="card-account page-layout qui-fx-ver">
    <submit-form
      ref="form"
      @submit-form="submitForm"
      title="编辑应用"
      v-model="formStatus"
      :form-data="formData"
    ></submit-form>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel"></search-form>
    <div class="qui-fx-f1 qui-fx">
      <table-list :page-list="pageList" :columns="columns" :table-list="orderList">
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="编辑">
            <a-button size="small" class="edit-action-btn" icon="form" @click.stop="edit(action.record)"></a-button>
          </a-tooltip>
          <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action.record)">
            <template slot="title">您确定删除吗?</template>
            <a-tooltip placement="topLeft" title="删除">
              <a-button size="small" class="del-action-btn" icon="delete"></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </table-list>
    </div>
    <page-num v-model="pageList" :total="total" @change-page="_getOrderList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import SubmitForm from '@c/SubmitForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import Tools from '@u/tools'
const formData = [
  {
    value: 'everydayConsume',
    initValue: '',
    type: 'input',
    label: '应用名称',
    placeholder: '请输入应用名称'
  },
  {
    value: 'AppKey',
    initValue: '',
    type: 'input',
    label: 'AppKey',
    disabled: true
  },
  {
    value: 'AppSecret',
    initValue: '',
    type: 'input-button',
    label: 'AppSecret',
    disabled: true,
    buttonText: '重置',
    onSearch: function() {}
  }
]
const searchLabel = [
  {
    value: 'orderId',
    type: 'input',
    label: '应用名称',
    placeholder: '请输入应用名称'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '已启用'
      },
      {
        key: '2',
        val: '已禁用'
      }
    ],
    value: 'source',
    type: 'select',
    label: '启用状态'
  }
]
const columns = [
  {
    title: '序号',
    scopedSlots: {
      customRender: 'index'
    },
    width: '12%'
  },
  {
    title: '应用名称',
    dataIndex: 'orderId',
    width: '12%'
  },
  {
    title: 'AppKey',
    dataIndex: 'orderSuccTime',
    width: '12%'
  },
  {
    title: 'AppSecret',
    dataIndex: 'remark',
    width: '12%'
  },
  {
    title: '添加人',
    dataIndex: 'userCode',
    width: '12%'
  },
  {
    title: '添加时间',
    dataIndex: 'orderAmount',
    width: '12%',
    customRender: (text) => {
      return Tools.getDate(text)
    }
  },
  {
    title: '启用状态',
    dataIndex: 'discountAmount',
    width: '12%'
  },
  {
    title: '操作',
    key: 'action',
    width: '12%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'ApplyManage',
  components: {
    SearchForm,
    TableList,
    PageNum,
    SubmitForm
  },
  data() {
    return {
      formData,
      formStatus: false,
      searchLabel,
      searchObj: {},
      columns,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      orderList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this._getOrderList()
  },
  methods: {
    ...mapActions('home', ['getOrderList']),
    /**
     * @description 获取列表
     */
    async _getOrderList() {
      const res = await this.getOrderList({
        page: this.pageList.page,
        size: this.pageList.size,
        status: this.searchObj.status || '',
        orderId: this.searchObj.orderId || '',
        source: this.searchObj.source || ''
      })
      this.orderList = res.data.records
      this.total = res.data.total
    },
    /**
     * @description 搜索列表
     */
    searchForm(values) {
      this.pageList.page = 1
      this.searchObj = values
      this._getOrderList()
    },
    edit(record) {
      this.formStatus = true
      this.formData = this.$tools.fillForm(formData, record)
      this.record = record
    },
    del(record) {
      this.delRule(record.id).then((res) => {
        this.$message.success('删除成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      })
    },
    submitForm(values) {
    }
  }
}
</script>

<style lang="less" scoped>
.card-account {
  padding: 20px 20px 0;
}
</style>
