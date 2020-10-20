<template>
  <div class="page-layout classResources qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="resourcesPageSearchLabel">
      <div slot="right">
        <a-button icon="plus" class="add-action-btn mar-l10" @click="add(0)">添加资源</a-button>
      </div>
    </search-form>
    <table-list
      is-check
      is-zoom
      v-model="chooseList"
      @selectAll="selectAll"
      :page-list="pageList"
      :columns="resourcesPageListColumns"
      :table-list="findList">
      <template v-slot:actions="action">
        <a-tooltip v-if="action.record.state==='0'" placement="topLeft" title="编辑">
          <a-button size="small" class="edit-action-btn" icon="form" @click="add(1,action.record)"></a-button>
        </a-tooltip>
        <a-popconfirm
          v-if="action.record.state==='0'"
          placement="topLeft"
          ok-text="确定"
          cancel-text="取消"
          @confirm="delTask(action.record)">
          <template slot="title">
            确定删除该任务吗？
          </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete" ></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>
<script>
// import hostEnv from '@config/host-env'
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import { resourcesPageSearchLabel } from '../../../assets/js/searchLabel.js'
import { resourcesPageListColumns } from '../../../assets/js/tableColumns'
export default {
  name: 'SafetyExercises',
  components: {
    TableList,
    PageNum,
    SearchForm
  },
  data() {
    return {
      resourcesPageListColumns,
      resourcesPageSearchLabel,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      findList: [],
      chooseList: [], // 当有选择项时，被选中的项，返回每项的唯一id
      searchList: {}
    }
  },
  computed: {
    ...mapState('home', ['userInfo', 'eduCode'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['pageResource', 'removeTask', 'removeTaskAll']),
    async showList() {
      const req = {
        source: '1',
        ...this.pageList,
        ...this.searchList,
        userCode: this.userInfo.userCode,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.pageResource(req)
      this.findList = res.data.records
      this.total = res.data.total
    },
    searchForm(values) {
      this.searchList = values
      this.showList()
    },
    selectAll() {},
    async delTask(record) {
      await this.removeTask(record.id)
      this.showList()
    },
    async delTaskAll() {
      this.chooseList.filter(v => v === '1')
      if (this.chooseList.length <= 0) return
      const that = this
      this.$confirm({
        title: '提示',
        content: '确定删除该任务吗?',
        onOk () {
          that.removeTaskAll(that.chooseList).then(res => {
            that.$message.success('操作成功')
            that.showList()
          })
        },
        onCancel () {
        }
      })
    },
    add(type, record) {
      this.$router.push({
        path: '/safeClass/addResources',
        query: {
          id: record ? record.id : '',
          type: type
        }
      })
    }

  }
}
</script>
<style lang="less" scoped>
.classResources{
  height: 100%;
  width: 100%;

}
</style>
