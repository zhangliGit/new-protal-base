<template>
  <div class="subsidy-management page-layout ">
    <!-- <search-form is-reset >
      <div slot="left"> -->
    <div class="padd-l10 padd-t10 padd-b10">
      <a-button type="primary" @click="batchAccount">添加补助</a-button>
    </div>
    <!-- </div>
    </search-form> -->
    <div class="qui-fx-f1 qui-fx">
      <table-list is-zoom :page-list="pageList" :columns="accountColumns" :table-list="accountList">
        <!-- <template v-slot:other1="other1">
          <a-tag color="orange" @click="showDetail(other1.record)">{{ other1.record.userName }}</a-tag>
        </template> -->
        <template v-slot:actions="action">
          <a-tag color="#2db7f5" @click="toDetail(action.record)">详情</a-tag>
          <!-- <a-tag color="#2db7f5" @click="operationRecord(action.record)" v-if="action.record.status === 0">操作记录</a-tag> -->
          <!-- <a-tag color="#2db7f5" @click="handle('补助', action.record)" v-if="action.record.status === 0">补助</a-tag> -->
        </template>
      </table-list>
    </div>
    <page-num v-model="pageList" :total="total"></page-num>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import Tools from '@u/tools'
// import hostEnv from '@config/host-env'
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
    list: [{
      key: '',
      val: '全部'
    }],
    value: 'cardType',
    type: 'select',
    label: '类型'
  }
]
export default {
  name: 'SubsidyManagement',
  components: {
    PageNum,
    SearchForm,
    TableList
  },
  data() {
    return {
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      accountColumns: [
        {
          title: '序号',
          scopedSlots: {
            customRender: 'index'
          },
          width: '6%'
        },
        {
          title: '姓名',
          dataIndex: 'userName',
          width: '9%',
          scopedSlots: {
            customRender: 'other1'
          }
        },
        {
          title: '身份',
          dataIndex: 'userIdentity',
          width: '9%',
          customRender: (text) => {
            return Tools.userType(text)
          }
        },
        {
          title: '学号/工号',
          dataIndex: 'workNo',
          width: '9%'
        }
      ],
      searchLabel,
      accountList: []
    }
  },

  computed: {
    ...mapState('home', ['schoolCode'])
  },
  mounted() {
    // this.getCardList()
  },
  methods: {
    batchAccount() {},
    // async getCardList() {
    //   const res = await this.getCardType()
    //   this.cardList = res.data
    //   const lastCount = this.searchLabel.length - 1
    //   res.data.forEach(ele => {
    //     this.searchLabel[lastCount].list.push({
    //       key: ele.cardType,
    //       val: ele.cardName
    //     })
    //   })
    //   this.nextTick(() => {
    //     this.showList()
    //   })
    // },
    searchForm(values) {
      // console.log(values)
      this.searchObj = values
      this.showList()
    },
    toDetail() {},
    async initMenu() {

    }
  }
}
</script>

<style lang="less" scoed>
.subsidy-management {

}
</style>
