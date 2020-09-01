<template>
  <div class="account-details page-layout qui-fx-ver ">
    <recharge></recharge>
    <div class="qui-fx-end">
      <a-button v-if="cardStatus==-1" type="primary mar-r10" @click="openAccount()">开户 </a-button>
      <a-button v-if="cardStatus==0" type="primary mar-r10" @click="handle('充值')">充值</a-button>
      <a-button v-if="cardStatus==0" type="primary mar-r10" @click="handle()">补助</a-button>
      <a-button v-if="cardStatus==0" type="primary mar-r10" @click="handle()">冻结</a-button>
      <a-button v-if="cardStatus==0" type="primary mar-r10" @click="handle()">余额清零</a-button>
      <a-button v-if="cardStatus==0 || cardStatus==1" type="primary mar-r10" @click="handle()">销户</a-button>
    </div>
    <crad class="crad">
      <div slot="title">基本信息</div>
      <div slot="content">
        <a-row class="qui-fx-jsa page-layout qui-fx-ac padd-t10">
          <a-col :span="6" class="padd-t10">
            <img src="" alt="">
          </a-col>
          <a-col :span="18" class="padd-t10">
            <div class="qui-fx-ver">
              <a-row class="padd-l10">
                <a-col class="mar-b10" :span="12">姓名 : </a-col>
                <a-col class="mar-b10" :span="12">班级/部门 : </a-col>
                <a-col class="mar-b10" :span="12">学号/工号 : </a-col>
                <a-col class="mar-b10" :span="12" >身份 : </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
    </crad >
    <crad class="crad">
      <div slot="title">账户信息</div>
      <div slot="content">
        <a-row class="qui-fx-jsa page-layout qui-fx-ac padd-t10">
          <a-col :span="20" class="padd-t10">
            <div class="qui-fx-ver">
              <a-row class="padd-l10">
                <a-col class="mar-b10 qui-fx-jc" :span="8" >账户余额 : </a-col>
                <a-col class="mar-b10 qui-fx-jc" :span="8">状态 : </a-col>
                <a-col class="mar-b10 qui-fx-jc" :span="8">开户时间 : </a-col>
                <a-col class="mar-b10 qui-fx-jc" :span="8" >押金 : </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
    </crad>
    <crad class="crad">
      <div slot="title">消费规则</div>
      <div slot="content">
        <a-row class="qui-fx-jsa page-layout qui-fx-ac padd-t10">
          <a-col :span="24" class="padd-t10">
            <div class="qui-fx-ver">
              <a-row class="padd-l10">
                <a-col class="mar-b10" :span="8">每日消费限额 : </a-col>
                <a-col class="mar-b10" :span="8">单次消费限额 : </a-col>
                <a-col class="mar-b10" :span="8">优惠 : </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
    </crad>
    <crad class="crad">
      <div slot="title">家长信息</div>
      <div slot="content" class="table-content">
        <table-list
          :page-list="pageList"
          :columns="columns"
          :table-list="recordList">
          <!-- <template v-slot:other1="record">
            <a-tag :color="$tools.color(record.record.onState)" >{{ record.record.onState | onState }}</a-tag>
          </template>
          <template v-slot:other2="record">
            <a-tag :color="$tools.color(record.record.offState)" >{{ record.record.offState | onState }}</a-tag>
          </template> -->
        </table-list>
      </div>
    </crad>
    <!-- <page-num v-model="pageList" :total="total"></page-num> -->
  </div>
</template>
<script>
import recharge from './detailsFrame/recharge'
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import crad from '../../component/card'
import SubmitForm from '../../component/SubmitForm'
import TableList from '@c/TableList'
import CountDetail from '../../component/CountDetail'
import PageNum from '@c/PageNum'
import AccountOperation from './AccountOperation'
import baseData from '../../assets/js/base'
import tools from '@u/tools'
import accountColumns from '../../assets/table/accountColumns'
import columnList from '../../assets/table/consumeColumns'
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
    list: [{
      key: '',
      val: '全部'
    }],
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
    disabled: true,
    required: false
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
const columns = [
  {
    title: '序号',
    width: '100',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName'
  },
  {
    title: '手机号',
    dataIndex: 'workNo'
  },
  {
    title: '家属关系',
    dataIndex: 'orgName'
  }
]
export default {
  name: 'AccountList',
  components: {
    SearchForm,
    TableList,
    PageNum,
    AccountOperation,
    CountDetail,
    SubmitForm,
    crad,
    recharge
  },
  data() {
    return {
      userId: this.$route.query.userId || '',
      cardStatus: this.$route.query.cardStatus || '',
      recordList: [
        {
          userName: '张妈妈',
          workNo: '158825862',
          orgName: '妈妈'
        },
        {
          userName: '张妈妈',
          workNo: '158825862',
          orgName: '妈妈'
        }
      ],
      columns,
      title: '绑卡',
      confirmLoading: false,
      visible: false,
      showDetailTag: false,
      showTag: false,
      total: 0,
      frameData: {
        actionTitle: '',
        showFrame: false
      },
      actionTitle: '',
      searchLabel,
      dealSearchLabel,
      accountColumns,
      columnList,
      formData,
      pageList: {
        page: 1,
        size: 20
      },
      accountList: [],
      userId: '',
      rangeTime: [],
      searchObj: {},
      type: '',
      cardList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    console.log(this.$route.query)
  },
  methods: {
    ...mapActions('home', ['getCardType', 'getUserInfoList', 'recharge', 'charge', 'subsidy']),
    handle(title, record) {
      this.frameData.actionTitle = title
      // this.id = record.userId
      // if (title === '充值') {
      //   this.type = '0'
      //   this.formData.splice(-2, 1)
      // } else if (title === '扣款') {
      //   this.type = '1'
      //   this.formData[8].label = '扣款金额'
      //   this.formData[8].placeholder = '请输入扣款金额'
      //   this.formData[10].text = '* 请确认核对扣款金额'
      // } else if (title === '补助') {
      //   this.type = '2'
      //   this.formData[8].label = '补助金额'
      //   this.formData[8].placeholder = '请输入补助金额'
      //   this.formData[10].text = '* 补助金额将直接发放到用户账户中，请核实操作'
      // }
      this.showFrame = true
    },
    async submitForm (values) {
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

    }
  }
}
</script>

<style lang="less" scoped>
.account-details{
  padding: 40px;
  .crad{
    width: 100%;
    // /deep/ .table-content{
    // //  padding: 20px;
    // }
  }
}
</style>
