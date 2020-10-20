<template>
  <a-modal width="1000px" title="课堂习题列表" :footer="null" @cancel="close">
    <div class="qui-fx-ver statistic" >
      <search-form is-reset @search-form="searchForm" :search-label="exerciseSearchLabel">
        <div slot="left">
          <a-button icon="del" class="add-action-btn u-mar-l20" @click="delBatchAll">批量添加</a-button>
        </div>
      </search-form>
      <table-list
        is-check
        is-zoom
        v-model="chooseList"
        @selectAll="selectAll"
        :page-list="pageList"
        :columns="exerciseListColumns"
        :table-list="tableList">
        <template v-slot:actions="action">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="add(action.record)">添加</a-button>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="_pageStatistics"></page-num>
    </div>
  </a-modal>
</template>
<script>
import { exerciseListColumns } from '../../../../assets/js/tableColumns'
import { exerciseSearchLabel } from '../../../../assets/js/searchLabel'
import PageNum from '@c/PageNum'
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
export default {
  name: 'exerciseList',
  components: {
    TableList,
    SearchForm,
    PageNum
  },
  data() {
    return {
      chooseList: [], // 当有选择项时，被选中的项，返回每项的唯一id
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      visible: true,
      isLoad: true,
      exerciseListColumns,
      exerciseSearchLabel,
      findList: [],
      tableList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  watch: {
  },
  async mounted() {
    // this.showList()
  },
  methods: {
    ...mapActions('home', [
      'ecsPage'
    ]),
    close() {},
    delBatchAll() {},
    async showList() {
      const req = {
        ...this.pageList,
        ...this.searchList
      }
      const res = await this.ecsPage(req)
      this.tableList = res.data.records
      this.total = res.data.total
    },
    // 提交
    submitOk(e) {},
    selectAll(){},
    // 弹框方法
    searchForm(values) {
      this.searchList = values
      this.showList()
    },
    async  _pageStatistics() {
      const req = {
        ...this.statisticsPageList,
        'id': this.StatisticsId,
        'schoolCode': this.userInfo.schoolCode,
        'source': '1'
      }
      const res = await this.pageStatistics(req)
      this.statisticsData = Object.assign({}, this.statisticsData, res.data)
    }
  }
}
</script>
<style lang="less" scoped>
.task-add {
  background-color: #f5f5fb;
  .content {
    height: calc(100% - 10px);
    overflow-y: scroll;
    .input {
      width: 90%;
      border: 1px dashed #cfcfcf;
    }
   }
}
</style>
