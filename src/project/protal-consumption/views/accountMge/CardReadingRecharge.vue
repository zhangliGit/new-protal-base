<template>
  <div class="cardReader page-layout qui-fx-ver">
    <show-dialog
      ref="form"
      v-if="isShow"
      @submit="submitForm"
      title="充值"
      v-model="isShow"
      width="800px"
    >
      <div class="recharge-item">
        <a-row class="u-padd-10">
          <a-col :span="4" class="u-tx-r">姓名：</a-col>
          <a-col :span="20">{{ cardInfo.userName }}</a-col>
        </a-row>
        <a-row class="u-padd-10">
          <a-col :span="4" class="u-tx-r">班级/部门：</a-col>
          <a-col :span="20">{{ cardInfo.classBoards }}</a-col>
        </a-row>
        <a-row class="u-padd-10">
          <a-col :span="4" class="u-tx-r">身份：</a-col>
          <a-col :span="20">{{ cardInfo.userType === '2' ? '教职工' : '学生' }}</a-col>
        </a-row>
        <a-row class="u-padd-10">
          <a-col :span="4" class="u-tx-r">学号/工号：</a-col>
          <a-col :span="20">{{ cardInfo.workNo }}</a-col>
        </a-row>
        <a-row class="u-padd-10">
          <a-col :span="4" class="u-tx-r">账户状态：</a-col>
          <a-col :span="20">{{ cardInfo.status === '0' ? '未开户' : '已开户' }}</a-col>
        </a-row>
        <a-row class="u-padd-10">
          <a-col :span="4" class="u-tx-r">账户余额：</a-col>
          <a-col :span="20">{{ cardInfo.balance }}</a-col>
        </a-row>
        <a-row type="flex" align="middle" class="u-padd-10">
          <a-col :span="4" class="u-tx-r">充值金额：</a-col>
          <a-col :span="20">
            <a-input
              @focus="current = -1"
              v-model="cardInfo.rechargeAmount"
              style="width: 300px"
              placeholder="请输入充值金额"
            />
            <span class="u-mar-l">到账：{{ cardInfo.rechargeAmount }}元</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" class="u-tx-r"></a-col>
          <a-col :span="20">
            <ul class="money-num u-fx">
              <li
                @click="changeMoney(item, index)"
                :class="{'act': current === index}"
                v-for="(item, index) in moneyTotal"
                :key="index"
              >{{ item }}</li>
            </ul>
          </a-col>
        </a-row>
        <a-row type="flex" align="middle" class="u-padd-10">
          <a-col :span="4" class="u-tx-r">备注：</a-col>
          <a-col :span="20">
            <a-input v-model="cardInfo.remark" style="width: 300px" placeholder="请输入备注" />
          </a-col>
        </a-row>
        <a-alert message="请确认核对收到一致的现金金额" banner />
      </div>
    </show-dialog>
    <div class="qui-fx-ac">
      <div @click="showDialog">请将卡放置在发卡器上识别</div>
      <a-input
        v-model="cardNumber"
        style="width: 300px; margin-left: 10px"
        placeholder="您也可以输入卡号按Enter键进行充值"
      />
    </div>
    <a-row class="title">充值记录</a-row>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel"></search-form>
    <div class="qui-fx-ver qui-fx-f1">
      <table-list :scroll-h="500" :page-list="pageList" :columns="columns" :table-list="userList"></table-list>
    </div>
    <page-num v-model="pageList" :total="total" @change-page="_getRechargeList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import ShowDialog from '@c/ShowDialog'
const searchLabel = [
  {
    value: 'rangeTime', // 日期区间
    type: 'rangeTime',
    label: '起始时间'
  }
]
const columns = [
  {
    title: '序号',
    scopedSlots: {
      customRender: 'index'
    },
    width: '5%'
  },
  {
    title: '账单号',
    dataIndex: 'billNo',
    width: '15%'
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '10%'
  },
  {
    title: '学号/工号',
    dataIndex: 'workNo',
    width: '10%'
  },
  {
    title: '班级/部门',
    dataIndex: 'classBoards',
    width: '10%'
  },
  {
    title: '充值金额',
    dataIndex: 'rechargeAmount',
    width: '10%'
  },
  {
    title: '优惠金额',
    dataIndex: 'discountAmount',
    width: '10%'
  },
  {
    title: '到账金额',
    dataIndex: 'arriveAmount',
    width: '10%'
  },
  {
    title: '操作人',
    dataIndex: 'createBy',
    width: '10%'
  },
  {
    title: '充值时间',
    dataIndex: 'createTime',
    width: '10%',
    customRender: text => {
      return text
    }
  }
]
export default {
  name: 'CardReadingRecharge',
  components: {
    SearchForm,
    TableList,
    PageNum,
    ShowDialog
  },
  data() {
    return {
      cardInfo: { rechargeAmount: 0 },
      columns,
      userList: [],
      current: -1,
      moneyTotal: [50, 100, 200, 500],
      totalMoney: 0,
      isShow: false,
      searchLabel,
      searchText: {},
      cardNumber: '',
      dataList: [
        {
          id: 1,
          name: 'hello'
        }
      ],
      pageList: {
        page: 1,
        size: 20
      },
      total: 0
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this._getRechargeList()
  },
  methods: {
    ...mapActions('home', ['getRechargeList', 'getUserInfoByCard', 'addRecharge']),
    showDialog() {
      this._getUserInfoByCard()
      this.isShow = true
    },
    searchForm(value) {
      this.pageList.page = 1
      this.searchText = value.rangeTime ? { beginTime: value.rangeTime[0], endTime: value.rangeTime[1] } : {}
      this._getRechargeList()
    },
    /**
     * @description 手动切换金额
     */
    changeMoney(money, index) {
      this.cardInfo.rechargeAmount = money
      this.current = index
    },
    /**
     * @description 通过卡号查询人员信息
     */
    async _getUserInfoByCard() {
      const res = await this.getUserInfoByCard(this.cardNumber)
      this.cardInfo = res.data
    },
    /**
     * @description 查询充值记录
     */
    async _getRechargeList() {
      const res = await this.getRechargeList({
        pageNum: this.pageList.page,
        pageSize: this.pageList.size,
        ...this.searchText
      })
      this.total = res.total
      this.userList = res.rows
    },
    /**
     * @description 提交充值记录
     */
    async submitForm() {
      if (!this.cardInfo.rechargeAmount || this.cardInfo.rechargeAmount === 0) {
        this.$message.warning('请输入充值金额')
        return
      }
      try {
        this.$refs.form.loading = true
        const { id, remark, rechargeAmount } = this.cardInfo
        await this.addRecharge({
          id,
          isReturnBalance: '',
          isReturnDeposit: '',
          rechargeAmount,
          remark,
          returnBalance: 0,
          returnDeposit: 0,
          subsidyAmount: 0
        })
        this.$message.success('充值成功')
        this.isShow = false
        this.$tools.goNext(() => {
          this._getRechargeList()
        })
      } catch (err) {
        this.$refs.form.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.money-num {
  li {
    cursor: pointer;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #666;
    margin-left: 8px;
    border: 1px #eee solid;
    &.act {
      background: @u-type-primary;
      color: #fff;
    }
  }
}
.cardReader {
  padding: 20px 20px 0;
  .title {
    font-size: 16px;
    padding: 15px 0 10px 0;
    border-bottom: 1px #f5f5f5 solid;
  }
}
</style>
