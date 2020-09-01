<template>
  <div class="home page-layout qui-fx">
    <div class="qui-fx qui-fx-jsb" style="width:100%">
      <div class="left">
        <left-tab></left-tab>
      </div>
      <div class="right qui-fx-ver qui-fx-f1">
        <search-form isReset @search-form="searchForm" :search-label="searchLabel">> </search-form>
        <table-list :page-list="pageList" :columns="columns" :table-list="recordList">
          <template v-slot:actions="action">
            <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="_delbillInfo(action.record.id)">
              <template slot="title">您确定关闭吗?</template>
              <a-tooltip placement="topLeft" title="关闭">
                <a-button size="small" class="del-action-btn" icon="delete"></a-button>
              </a-tooltip>
            </a-popconfirm>
            <a-tooltip placement="topLeft" title="查看详情">
              <a-button
                size="small"
                class="detail-action-btn"
                icon="ellipsis"
                @click="detail(action.record.id)"
              ></a-button>
            </a-tooltip>
          </template>
        </table-list>
        <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
        <a-modal v-model="previewVisible" width="900px" :footer="null">
          <p style="text-align:center;margin-top:10px;text-indent:30px;">
            账单详细
          </p>
          <div style="text-align:center">
            <div style="background-color:#EBEEF5;height:1px;border:none;"></div>
            <div style="min-height:300px;">
              <p style="text-align:left;margin-top:10px;text-indent:30px;">账单编码：{{ detailList.applicantName }}</p>
              <p style="text-align:left;margin-top:10px;text-indent:30px;">账单名称：{{ detailList.applicantName }}</p>
              <p style="text-align:left;margin-top:10px;text-indent:30px;">班级名称：{{ detailList.applicantName }}</p>
              <p style="text-align:left;margin-top:10px;text-indent:30px;">账单名称：{{ detailList.applicantName }}</p>
              <p style="text-align:left;margin-top:10px;text-indent:30px;">账单名称：{{ detailList.applicantName }}</p>
              <template> </template>
            </div>
          </div>
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import NoData from '@c/NoData'
import PageNum from '@c/PageNum'
import LeftTab from './components/leftTab'
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
    title: '账单名称',
    dataIndex: 'billName',
    width: '10%'
  },
  {
    title: '账单号',
    dataIndex: 'billNumber',
    width: '12%'
  },
  {
    title: '学生姓名',
    dataIndex: 'userName',
    width: '10%'
  },
  {
    title: '班级名称',
    dataIndex: 'className',
    width: '10%'
  },
  {
    title: '家长手机',
    dataIndex: 'parentPhone',
    width: '10%'
  },
  {
    title: '账单金额(元)',
    dataIndex: 'billMoney',
    width: '10%'
  },
  {
    title: '实缴金额(元)',
    dataIndex: 'paidMoney',
    width: '10%'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: '10%',
    customRender: text => {
      return Tools.getDate(text)
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
      }
    ],
    value: 'state',
    type: 'select',
    label: '订单状态'
  }
]
export default {
  name: 'Home',
  components: {
    TableList,
    PageNum,
    LeftTab,
    SearchForm,
    NoData
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
      previewVisible: false,
      detailList: {}
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getList', 'getbillDetail', 'delbillInfo']),
    searchForm(values) {
      this.keyword = values.keyword
      this.showList(values.keyword)
    },
    async showList() {
      const req = {
        pageNum: this.pageList.page,
        pageSize: this.pageList.size
      }
      const res = await this.getList(req)
      if (!res.data) {
        return
      }
      this.recordList = res.data.records
      this.total = res.data.total
    },
    async detail(id) {
      this.previewVisible = true
      const res = await this.getbillDetail(id)
      this.detailList = res.data
    },
    _delbillInfo(id) {
        const req = {
        id: id,
      }
      this.delbillInfo(req).then(res => {
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  background: #fff;
  .left {
    padding: 10px;
    width: 300px;
    background-color: #fff;
    overflow-y: scroll;
  }
  .right {
    padding: 0 10px;
    border-left: 1px solid @bor-color;
  }
}
</style>
