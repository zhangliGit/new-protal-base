<template>
  <div class="cardReader page-layout qui-fx-ver">
    <a-row class="pad qui-fx-je">
      <a-col :span="10" :gutter="20" class="height-50" >请将卡放置在发卡器上</a-col>
    </a-row>
    <a-row :gutter="[0,0]" >
      <a-col :span="10" >
        <a-input v-model="cardNumber" class="height-50" placeholder="请输入设备名称" />
      </a-col>
    </a-row>
    <a-row class="qui-fx-je" :gutter="[0,0]">
      充值记录
      <a-divider />
    </a-row>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">

    </search-form>
    <div class="qui-fx-ver qui-fx-f1">
      <table-list
        :scroll-h="500"
        :page-list="pageList"
        :columns="columns"
        :table-list="userList"
      >
      </table-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
// import tools from '@u/tools'
// import baseData from '../../assets/js/base'
import TableList from '@c/TableList'
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
  // {
  //   list: tools.deepClone(baseData.cardStatus),
  //   value: 'status',
  //   type: 'select',
  //   label: '状态'
  // },
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
  name: 'Demo',
  components: {
    SearchForm,
    TableList
  },
  data() {
    return {
      id: '',
      searchLabel,
      cardNumber: '',
      isShow: false,
      dataList: [
        {
          id: 1,
          name: 'hello'
        }
      ]
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    // this.getCardList()
  },
  methods: {
    ...mapActions('home', ['getCardType', 'getUserInfoList', 'recharge', 'charge', 'subsidy']),
    /**
     * @des 获取id值
     */
    setId(id) {
      this.id = id
    },
    /**
     * @des 界面跳转
     */
    goDetail() {
      this.$router.push({
        path: '/detal',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoed>
.cardReader{
  padding: 20px;
  .pad{
    font-size: 20px;
    line-height: 100px;
    font-weight: 500;
  }
}
</style>
