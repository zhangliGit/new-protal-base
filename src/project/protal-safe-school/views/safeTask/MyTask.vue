<template>
  <div class="page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="task.taskSearchLabel"></search-form>
    <table-list :page-list="pageList" :columns="task.taskColumns" :table-list="taskList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="预览">
          <a-button
            size="small"
            class="detail-action-btn"
            icon="ellipsis"
            @click="add(action.record)"
          ></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="填报">
          <a-button size="small" class="add-action-btn" icon="plus" @click="add(action.record)"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="修改">
          <a-button size="small" class="edit-action-btn" icon="form" @click="add(action.record)"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消">
          <template slot="title">提交之后不允许再次编辑内容，确定提交么？</template>
          <a-tooltip placement="topLeft" title="提交">
            <a-button size="small" class="play-action-btn" icon="play-circle" @click="submit"></a-button>
          </a-tooltip>
        </a-popconfirm>
        <a-tooltip placement="topLeft" title="补填">
          <a-button size="small" class="copy-action-btn" icon="copy" @click="add(action.record)"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="重报">
          <a-button size="small" class="export-all-btn" icon="export" @click="add(action.record)"></a-button>
        </a-tooltip>
      </template>
      <template v-slot:other1="other1">
        <img class="ewm" :src="img" alt />
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    <!-- <a-modal
      :visible="visible"
      :footer="null"
      centered
      @cancel="visible = false"
      :bodyStyle="bodyStyle"
      width="360px"
      :closable="false"
      :destroyOnClose="true"
    >
      <div class="erm-box qui-fx-ver">
        <div class="logo">
          <img :src="logo" alt />
        </div>
        <div class="qr-code" id="qrCode" ref="qrCodeDiv"></div>
        <div class="area">巡检点：{{ area }}</div>
      </div>
    </a-modal>-->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import $tools from '@u/tools'
import task from '../../assets/js/table/task'
export default {
  name: 'MyTask',
  components: {
    TableList,
    PageNum,
    SearchForm
  },
  data() {
    return {
      task,
      bodyStyle: {
        padding: 0
      },
      visible: false,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      searchList: {},
      taskList: [{ id: '1' }],
      form: this.$form.createForm(this),
      areaList: [],
      disabled: false,
      chooseList: [],
      area: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    // this.showList()
  },
  methods: {
    ...mapActions('home', ['getMySafeTask', 'submitMyTask']),
    async showList() {
      this.searchList.schoolCode = this.userInfo.schoolCode
      this.searchList = Object.assign(this.searchList, this.pageList)
      const res = await this.getMySafeTask(this.searchList)
      this.taskList = res.data.records
      this.total = res.data.total
    },
    searchForm(values) {
      this.searchList = Object.assign(this.searchList, values)
      this.pageList.page = 1
      this.pageList.size = 20
      this.showList()
    },
    add(record) {
      this.$router.push({
        path: '/myTask/fillTask',
        query: {
          id: record ? record.id : ''
        }
      })
    },
    async addApp(type, record) {
      this.$router.push({
        path: '/inspectArea/areaAdd',
        query: {
          id: record ? record.record.id : ''
        }
      })
    },
    async submit() {
      await this.submitMyTask()
      this.$message.success('操作成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
