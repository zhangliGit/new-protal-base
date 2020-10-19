<template>
  <div class="bill-detail page-layout qui-fx-ver">
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="formStatus"
      :form-data="formData"
    ></submit-form>
    <div slot="tabBarExtraContent" class="mar-r10 detail-show">
      <div class="qui-fx">
        <detail-show :detail-info="detailInfo" :title="infoTitle" style="width: 74%;"></detail-show>
        <div class="mar-top">
          <!-- <a-button icon="plus" class="add-btn mar-l10">编辑重发</a-button> -->
          <a-button icon="export" class="export-btn">打印收据</a-button>
          <a-button icon="export" class="export-btn" @click="changeTime">确认收款</a-button>
          <a-button icon="export" class="export-all-btn" @click.stop="deleteList(0)">催缴</a-button>
          <a-button icon="delete" class="del-btn" @click.stop="deleteList(1)">关闭账单</a-button>
        </div>
      </div>
    </div>
    <div slot="tabBarExtraContent" class=" detail-show">
        <div class="title top-title mar-b10 mar-t10">
          收费项信息
        </div>
    </div>
    <div style="height: 200px;">
      <table-list is-zoom :page-list="pageList" :columns="columns" :table-list="recordList"> </table-list>
    </div>
    <div slot="tabBarExtraContent" class=" detail-show">
        <div class="title top-title mar-b10 mar-t10">
          操作信息
        </div>
        <template>
          <div class="u-padd-20">
            <a-timeline >
              <a-timeline-item v-for="(item, index) in OpeList" :key="index"
                >{{ item.opeTime | getDate(1) }}
                <div>{{ $tools.opeType(item.opeType) }}</div>
              </a-timeline-item>
            </a-timeline>
          </div>
        </template>
    </div>
    <sub-form
      ref="subForm"
      :title="title"
      :popTaskCode="popTaskCode"
      :popTaskId="popTaskId"
      @update="showList"
    ></sub-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm'
import Tools from '@u/tools'
import SubForm from '../components/SubForm'
import DetailShow from '../components/DetailShow'
const formData = [
  {
    value: 'payTime',
    type: 'singleTime',
    label: '收款时间'
  },
  {
    value: 'payWay',
    initValue: [],
    list: [
      {
        key: 1,
        val: '现金'
      },
      {
        key: 2,
        val: 'pos机'
      },
      {
        key: 3,
        val: '银行汇款转账'
      },
      {
        key: 4,
        val: '微信转账'
      },
      {
        key: 5,
        val: '支付宝'
      },
      {
        key: 6,
        val: '其他'
      }
    ],
    type: 'select',
    label: '收款方式',
    placeholder: '请选择收款方式'
  }
]
const columns = [
  {
    title: '序号',
    width: '20%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '收费项名称',
    dataIndex: 'itemName',
    width: '20%'
  },
  {
    title: '收费标准',
    dataIndex: 'itemPrice',
    width: '20%'
  },
  {
    title: '数量',
    dataIndex: 'itemNum',
    width: '20%'
  },
  {
    title: '总金额',
    dataIndex: 'moneySum',
    width: '20%'
  }
]
export default {
  name: 'BillDetail',
  components: {
    TableList,
    PageNum,
    SubmitForm,
    SubForm,
    DetailShow
  },
  data() {
    return {
      columns,
      total: 100,
      pageList: {
        page: 1,
        size: 20
      },
      id: '',
      detailList: {},
      percent: '',
      recordList: [],
      searchList: {
        schoolCode: '',
        taskCode: ''
      },
      formData,
      formStatus: false,
      title: '确认收款',
      popTaskCode: this.$route.query.taskCode,
      popTaskId: this.$route.query.id,
      detailInfo: [
        {
          key: '账单号 ',
          val: ''
        },
        {
          key: '账单名称',
          val: ''
        },
        {
          key: '账单状态',
          val: ''
        },
        {
          key: '账单金额',
          val: ''
        },
        {
          key: '优惠金额',
          val: ''
        },
        {
          key: '应收金额',
          val: ''
        },
        {
          key: '学生姓名',
          val: ''
        },
        {
          key: '学号',
          val: ''
        },
        {
          key: '班级',
          val: ''
        },
        {
          key: '学年',
          val: ''
        },
        {
          key: '创建时间',
          val: ''
        },
        {
          key: '截止时间',
          val: ''
        }
      ],
      infoTitle: '基础信息',
      OpeList: [],
      payMoney: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created() {},
  mounted() {
    this.showClassDetail()
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getbillDetail',
      'getCharge',
      'getOpeListByBillNum',
      'callBill',
      'shutDownBill',
      'confirmPayBill'
    ]),
    async showClassDetail() {
      const res = await this.getbillDetail(this.$route.query.id)
      this.detailInfo[0].val = res.data.billNum
      this.detailInfo[1].val = res.data.billName
      this.detailInfo[2].val = res.data.billStatus
      this.detailInfo[3].val = res.data.billMoney
      this.detailInfo[4].val = res.data.preMoney
      this.detailInfo[5].val = res.data.recMoney
      this.detailInfo[6].val = res.data.studentName
      this.detailInfo[7].val = res.data.studentCode
      this.detailInfo[8].val = res.data.className
      this.detailInfo[9].val = res.data.schoolYearName
      this.detailInfo[10].val = res.data.createTime
      this.detailInfo[11].val = res.data.cutOffTime
      this.payMoney = res.data.recMoney
    },

    async showList() {
      const res = await this.getCharge(this.$route.query.taskCode)
      const ope = await this.getOpeListByBillNum(this.$route.query.billNum)
      this.recordList = res.data
      this.OpeList = ope.data
    },
    //任务延期
    changeTime() {
      this.formData = this.formData
      this.formStatus = true
    },
    submitForm(values) {
      const req = {
        ...values,
        schoolCode: this.userInfo.schoolCode,
        taskCode: this.$route.query.taskCode,
        userCode: this.userInfo.userCode,
        payMoney: this.payMoney,
        billNum: this.$route.query.billNum
      }
      this.confirmPayBill(req)
        .then((res) => {
          this.formStatus = false
          this.$message.success('收款成功')
          this.$tools.goNext(() => {
            this.showList()
          })
        })
        .catch(() => {
          this.$refs.form.error()
        })
    },
    //账单批量关闭，催缴
    async deleteList(type) {
      if (type) {
        await this.shutDownBill([this.$route.query.id])
        this.$message.success('关闭成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      } else {
        await this.callBill([this.$route.query.id])
        this.$message.success('催缴成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      }
    },
    modify() {
      this.title = '新增账单'
      this.$refs.subForm.addVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.bill-detail {
  height: 100%;
      padding: 20px;

}
.detail-show {
  background-color: #fff;
  margin-bottom: 10px;
  .title {
    font-size: 18px;
    color: @main-color;
    padding: 10px;
  }
   .top-title{
    background-color: #ececec;
  }
  .mar-top {
    padding-top: 10px;
  }
  .u-padd-20 {
    padding-left: 20px;
  }
  .detail-row {
    padding: 10px;
    span {
      padding-left: 20px;
    }
  }
}
</style>
