<template>
  <div class="account-details page-layout qui-fx-ver">
    <detail-show :photo-src="detail.photoUrl" :detail-info="detailInfo" :title="detailTitle"></detail-show>
    <crad class="crad">
      <div slot="title">账户信息</div>
      <div slot="content">
        <a-row class="qui-fx-jsa page-layout qui-fx-ac padd-t10">
          <a-col :span="2" class="padd-t10"></a-col>
          <a-col :span="20" class="padd-t10">
            <div class="qui-fx-ver">
              <a-row class="padd-l10">
                <a-col class="mar-b10 qui-fx-jc" :span="8">账户余额 : {{ detail.balance }}</a-col>
                <a-col
                  class="mar-b10 qui-fx-jc"
                  :span="8"
                >状态 : {{ baseData.getAccountType(detail.status) }}</a-col>
                <a-col class="mar-b10 qui-fx-jc" :span="8">开户时间 : {{ detail.createTime }}</a-col>
                <a-col class="mar-b10 qui-fx-jc" :span="8">押金 : {{ detail.deposit }}</a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
    </crad>
    <crad class="crad">
      <div slot="title">家长信息</div>
      <div slot="content">
        <table-list :columns="columns" :table-list="detail.parentList || []"></table-list>
      </div>
    </crad>
  </div>
</template>
<script>
import DetailShow from '@c/DetailShow'
import { mapState, mapActions } from 'vuex'
import crad from '../../component/card'
import TableList from '@c/TableList'
import baseData from '../../assets/js/base'
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
    dataIndex: 'phone'
  },
  {
    title: '家属关系',
    dataIndex: 'orgName'
  }
]
export default {
  name: 'AccountDetails',
  components: {
    TableList,
    crad,
    DetailShow
  },
  data() {
    return {
      baseData,
      detailTitle: '基本信息',
      detailInfo: [],
      detail: {},
      columns
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.detail = JSON.parse(window.localStorage.getItem('accountInfo'))
    this.detailInfo = [
      {
        key: '姓名',
        val: this.detail.userName
      },
      {
        key: '班级/部门',
        val: this.detail.classBoards
      },
      {
        key: '学号/工号',
        val: this.detail.workNo
      },
      {
        key: '身份',
        val: this.baseData.userType(this.detail.userType)
      }
    ]
  },
  methods: {
    ...mapActions('home', [''])
  }
}
</script>

<style lang="less" scoped>
/deep/ #card {
  border: 1px #f5f5f5 solid;
}
.account-details {
  padding: 20px;
  .crad {
    width: 100%;
    .border {
      border: 1px #f5f5f5 solid;
    }
  }
}
</style>
