<template>
  <div class="page-layout qui-fx-ver">
    <search-form @search-form="searchForm" :search-label="searchLabel"></search-form>
    <table-list :page-list="pageList" :columns="columns" :table-list="userList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="查看健康档案">
          <a-button
            size="small"
            class="detail-action-btn"
            icon="ellipsis"
            @click="detail(action.record)"
          ></a-button>
        </a-tooltip>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
const searchLabel = [
  {
    value: 'name',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  }
]
const columns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '15%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '15%',
    customRender: text => {
      if (text === 1) {
        return '男'
      } else if (text === 2) {
        return '女'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '职位',
    dataIndex: 'position',
    width: '15%',
    customRender: text => {
      if (text === 1) {
        return '班主任'
      } else if (text === 2) {
        return '非班主任'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '工号',
    dataIndex: 'num',
    width: '15%'
  },
  {
    title: '手机号',
    dataIndex: 'tel',
    width: '15%'
  },
  {
    title: '操作',
    width: '15%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'HealthManageTea',
  components: {
    TableList,
    SearchForm,
    PageNum
  },
  data() {
    return {
      columns,
      searchLabel,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      userList: []
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getTeacherList']),
    async showList() {
      const res = await this.getTeacherList()
      this.userList = res.data
      this.total = res.total
    },
    searchForm(values) {
      console.log(values)
    },
   detail(record) {
      console.log(record.id)
      this.$router.push({
      path: '/component/detail',
        query: { id: record.id }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.top {
  margin-bottom: 10px;
}
</style>
