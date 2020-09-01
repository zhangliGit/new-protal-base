<template>
  <div class="score-detail page-layout u-fx">
    <div class="u-mar score-tree">
      <class-tree @select="select"></class-tree>
    </div>
    <div class="u-fx-f1 u-fx-ver">
      <search-form @search-form="searchForm" :search-label="searchLabel"></search-form>
      <table-list :page-list="pageList" :columns="columns" :table-list="scoreList"></table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchForm from '@c/SearchForm'
import ClassTree from '@c/ClassTree'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const searchLabel = [
  {
    value: 'userName', // 表单属性
    type: 'input', // 表单类型
    label: '学生姓名', // 表单label值
    placeholder: '请输入姓名' // 表单默认值(非必选字段)
  },
  {
    value: 'stundentNo', // 表单属性
    type: 'input', // 表单类型
    label: '学号', // 表单label值
    placeholder: '请输入学号' // 表单默认值(非必选字段)
  }
]
const columns = [
  {
    title: '序号',
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '班级',
    dataIndex: 'className',
    width: '10%'
  },
  {
    title: '学生姓名',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '学号',
    dataIndex: 'xuehao',
    width: '15%'
  },
  {
    title: '语文',
    dataIndex: 'yuwen'
  },
  {
    title: '数学',
    dataIndex: 'shuxue'
  },
  {
    title: '总分',
    dataIndex: 'score'
  }
]
export default {
  name: 'ScoreDetail',
  components: { ClassTree, SearchForm, TableList, PageNum },
  props: {},
  data() {
    return {
      total: 0,
      columns,
      scoreList: [],
      pageList: {
        page: 1,
        size: 20
      },
      searchLabel
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState('home', ['userInfo'])
  },
  methods: {
    select() {},
    searchForm() {},
    showList() {}
  }
}
</script>
<style lang="less" scoped>
.score-detail {
  .score-tree {
    overflow: hidden;
    width: 160px;
  }
}
</style>
