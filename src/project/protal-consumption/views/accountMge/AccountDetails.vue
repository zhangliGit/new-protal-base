<template>
  <div class="account-details page-layout qui-fx-ver">
    <recharge></recharge>
    <div class="qui-fx-end">
      <!-- v-if="cardStatus==-1" -->
      <a-button type="primary mar-r10" @click="handle('开户','确认开户',0)">开户</a-button>
      <a-button type="primary mar-r10" @click="handle('充值','确认充值',1)">充值</a-button>
      <a-button type="primary mar-r10" @click="handle('发放补助','确认发放',2)">补助</a-button>
      <a-button type="primary mar-r10" @click="handle('冻结','确认冻结',3)">冻结</a-button>
      <a-button type="primary mar-r10" @click="handle('解冻','确认解冻',4)">解冻</a-button>
      <a-button type="primary mar-r10" @click="handle('余额清零','确认',5)">余额清零</a-button>
      <!-- v-if="cardStatus==0 || cardStatus==1" -->
      <a-button type="primary mar-r10" @click="handle('销户','确认销户',6)">销户</a-button>
    </div>
    <crad class="crad">
      <div slot="title">基本信息</div>
      <div slot="content">
        <a-col :span="4" class="padd-t10"></a-col>
        <a-row class="qui-fx-jsa page-layout qui-fx-ac padd-t10">
          <a-col :span="6" class="padd-t10">
            <img src alt />
          </a-col>
          <a-col :span="15" class="padd-t10">
            <div class="qui-fx-ver">
              <a-row class="padd-l10">
                <a-col class="mar-b10" :span="12">姓名 :</a-col>
                <a-col class="mar-b10" :span="12">班级/部门 :</a-col>
                <a-col class="mar-b10" :span="12">学号/工号 :</a-col>
                <a-col class="mar-b10" :span="12">身份 :</a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
    </crad>
    <crad class="crad">
      <div slot="title">账户信息</div>
      <div slot="content">
        <a-row class="qui-fx-jsa page-layout qui-fx-ac padd-t10">
          <a-col :span="2" class="padd-t10"></a-col>
          <a-col :span="20" class="padd-t10">
            <div class="qui-fx-ver">
              <a-row class="padd-l10" :gutter="[50,100]">
                <!-- <a-col class="mar-b10 qui-fx-jc" :span="8" >账户余额 : </a-col> -->
                <a-col class="mar-b10 qui-fx-jc" :span="8">状态 :</a-col>
                <a-col class="mar-b10 qui-fx-jc" :span="8">开户时间 :</a-col>
                <a-col class="mar-b10 qui-fx-jc" :span="8">押金 :</a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
    </crad>
    <crad class="crad">
      <div slot="title">
        <a-row :gutter="[0,0]" type="flex" align="middle" justify="space-between">
          <a-col>消费规则</a-col>
          <a-col>
            <a-button type="primary mar-r10" @click="handle('编辑消费规则','保存',7)">编辑</a-button>
          </a-col>
        </a-row>
      </div>
      <div slot="content">
        <a-row class="qui-fx-jsa page-layout qui-fx-ac padd-t10">
          <a-col :span="2" class="padd-t10"></a-col>
          <a-col :span="20" class="padd-t10">
            <div class="qui-fx-ver">
              <a-row class="padd-l10">
                <a-col class="mar-b10" :span="8">每日消费限额 :</a-col>
                <a-col class="mar-b10" :span="8">单次消费限额 :</a-col>
                <a-col class="mar-b10" :span="8">优惠 :</a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
    </crad>
    <crad class="crad">
      <div slot="title">家长信息</div>
      <div slot="content">
        <a-row type="flex" justify="center">
          <a-col :span="20" class="u-bd-1px">
            <table-list :page-list="pageList" :columns="columns" :table-list="recordList">
              <!-- <template v-slot:other1="record">
                    <a-tag :color="$tools.color(record.record.onState)" >{{ record.record.onState | onState }}</a-tag>
                  </template>
                  <template v-slot:other2="record">
                    <a-tag :color="$tools.color(record.record.offState)" >{{ record.record.offState | onState }}</a-tag>
              </template>-->
            </table-list>
          </a-col>
        </a-row>
      </div>
    </crad>
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      :okText="frameData.okText"
      v-model="frameData.showFrame"
      :form-data="formData"
    >
      <!-- <div slot="upload">
        <upload-multi :length="1" v-model="fileList" :fileInfo="fileInfo"></upload-multi>
      </div>-->
    </submit-form>
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
import { openActFrom, editConsumpFrom, freezeFrom } from './submitForm'
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
  name: 'AccountDetails',
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
      formStatus: false,
      columns,
      confirmLoading: false,
      visible: false,
      showDetailTag: false,
      showTag: false,
      total: 0,
      title: '开户',
      frameData: {
        okText: '',
        showFrame: false,
        formData: ''
      },
      actionTitle: '',
      accountColumns,
      columnList,
      formData: [],
      pageList: {
        page: 1,
        size: 20
      },
      accountList: [],
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
    // console.log(this.$route.query)
  },
  methods: {
    ...mapActions('home', ['getCardType', 'getUserInfoList', 'recharge', 'charge', 'subsidy']),
    handle(title, okText, record) {
      this.frameData.showFrame = true
      this.frameData.okText = okText
      this.title = title
      if (record === 0) {
        this.formData = openActFrom()
      } else if (record === 1) {
      } else if (record === 2) {
      } else if (record === 3) {
        this.formData = freezeFrom()
      } else if (record === 4) {
      } else if (record === 5) {
      } else if (record === 6) {
      } else {
        // 编辑修改
        this.formData = editConsumpFrom()
      }
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
    batchAccount() {}
  }
}
</script>

<style lang="less" scoped>
.account-details {
  padding: 40px;
  .crad {
    width: 100%;
    // /deep/ .table-content{
    // //  padding: 20px;
    // }
    .border {
      border: 1px solid;
    }
  }
}
</style>
