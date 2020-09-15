<template>
  <div class="page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="issuanceSearchLabel">
      <div slot="right">
        <a-button icon="del" class="add-action-btn u-mar-l20" @click="delTaskAll">批量删除</a-button>
        <a-button icon="plus" class="add-action-btn u-mar-l20" @click="add(0)">添加任务</a-button>
      </div>
    </search-form>
    <table-list
      is-check
      is-zoom
      v-model="chooseList"
      @selectAll="selectAll"
      :page-list="pageList"
      :columns="taskColumns"
      :table-list="findList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="复用">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="goDetail(action.record)"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="预览">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="preview(action.record)"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="查看统计">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="viewStatistics(action.record)"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="编辑">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="add(2,action.record)"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="发布">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="release(action.record)"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="查看完成情况">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="checkCompletion(action.record)"></a-button>
        </a-tooltip>
        <a-popconfirm placement="topLeft" ok-text="确定" cancel-text="取消" @confirm="delTask(action.record)">
          <template slot="title">
            确定结束督办该隐患任务吗？
          </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="detail-action-btn" icon="ellipsis" ></a-button>
          </a-tooltip>
        </a-popconfirm>

      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import hostEnv from '@config/host-env'
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import { issuanceSearchLabel } from '../../assets/js/searchLabel.js'
import { taskColumns } from '../../assets/js/tableColumns'

export default {
  name: 'TaskRecord',
  components: {
    TableList,
    PageNum,
    SearchForm
  },
  data() {
    return {
      taskColumns,
      issuanceSearchLabel,
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
    ...mapActions('home', ['getTaskList', 'removeTask', 'removeTaskAll', 'assignDanger', 'transferDanger']),
    async showList() {
      const req = {
        ...this.pageList,
        ...this.searchList,
        // userCode: this.userInfo.userCode
        schoolCode: this.eduCode
      }
      const res = await this.getTaskList(req)
      console.log(res)
      this.findList = res.data.records
      this.total = res.data.total
    },
    searchForm(values) {
      this.searchList = values
      this.showList()
    },
    selectAll() {},
    async delTask(record) {
      console.log(record)
      const res = await this.removeTask(record.id)
      this.showList()
    },
    async delTaskAll() {
      console.log(this.chooseList)
      const res = await this.removeTaskAll(this.chooseList)
      this.showList()
    },
    add(type, record) {
      this.$router.push({
        path: '/taskIssuance/addTask',
        query: {
          id: record ? record.id : '',
          type: type
        }
      })
    },
    // 预览
    preview(record) {
      this.$router.push({
        path: '/taskIssuance/preview',
        query: {
          id: record ? record.id : ''
          // type: type
        }
      })
    },
    // 发布
    release(record) {
      this.$router.push({
        path: '/taskIssuance/postTask',
        query: {
          id: record ? record.id : ''
          // type: type
        }
      })
    },
    // 任务完成情况
    checkCompletion(record) {
      this.$router.push({
        path: '/taskIssuance/checkCompletion',
        query: {
          id: record ? record.id : ''
          // type: type
        }
      })
    },
    // 查看统计
    viewStatistics(record) {
      this.$router.push({
        path: '/taskIssuance/viewStatistics',
        query: {
          id: record ? record.id : ''
          // type: type
        }
      })
    },
    goDetail(record) {
      this.$router.push({
        path: '/specialInspection/views',
        query: {
          code: record.code,
          teamLeaderName: record.teamLeaderName
        }
      })
    },
    goReport(code) {
      this.$router.push({
        path: '/specialInspection/viewsReport',
        query: {
          code: code
        }
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
