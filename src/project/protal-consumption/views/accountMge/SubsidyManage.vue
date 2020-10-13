<template>
  <div class="account-list page-layout qui-fx-ver">
    <div class="top-btn-group">
      <a-button icon="plus" class="add-btn" @click="addSubsidy('add')">新增补助</a-button>
    </div>
    <div class="qui-fx-f1 qui-fx">
      <table-list :page-list="pageList" :columns="subsidyColumns" :table-list="subsidyList">
        <template v-slot:other1="other1">
          <a-tag color="green" @click="detail(other1.record)">{{ other1.record.grantNumber || 0 }}</a-tag>
        </template>

        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="编辑">
            <a-button
              size="small"
              class="edit-action-btn"
              icon="form"
              @click="addSubsidy('edit', action.record)"
            ></a-button>
          </a-tooltip>
          <a-popconfirm
            placement="left"
            okText="确定"
            cancelText="取消"
            @confirm="_deleteSubsidy(action.record.id)"
          >
            <template slot="title">您确定删除吗?</template>
            <a-tooltip placement="topLeft" title="删除">
              <a-button size="small" class="del-action-btn" icon="delete"></a-button>
            </a-tooltip>
          </a-popconfirm>
          <a-popconfirm
            v-if="action.record.grantStatus === '0'"
            placement="left"
            okText="确定"
            cancelText="取消"
            @confirm="_immedGrantSubsidy(action.record.id)"
          >
            <template slot="title">您确定立即发放吗?</template>
            <a-tooltip placement="topLeft" title="立即发放">
              <a-tag color="green">立即发放</a-tag>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </table-list>
    </div>
    <page-num v-model="pageList" :total="total"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import AddSubsidy from '../../component/AddSubsidy'
import SubsidyPerson from '../../component/SubsidyPerson'
import subsidyColumns from '../../assets/table/subsidyColumns'
export default {
  name: 'SubsidyManage',
  components: {
    SearchForm,
    TableList,
    PageNum,
    AddSubsidy,
    SubsidyPerson
  },
  data() {
    return {
      total: 0,
      subsidyColumns,
      pageList: {
        page: 1,
        size: 20
      },
      subsidyList: []
    }
  },
  computed: {
    ...mapState('home', ['schoolCode'])
  },
  mounted() {
    this._getSubsidyList()
  },
  methods: {
    ...mapActions('home', ['getSubsidyList', 'deleteSubsidy', 'immedGrantSubsidy']),
    /**
     * @description 新增和编辑补助
     * @params {tag: number} 1：编辑 0：新增
     */
    addSubsidy(tag, detail) {
      this.$router.push({
        path: '/subsidyManage/addSubsidy',
        query: {
          type: tag,
          detail
        }
      })
    },
    /**
     * @description 获取补助列表
     */
    async _getSubsidyList() {
      const res = await this.getSubsidyList({
        pageNum: this.pageList.page,
        pageSize: this.pageList.size
      })
      this.subsidyList = res.rows
      this.total = res.total
    },
    /**
     * @description 删除补助
     */
    async _deleteSubsidy(id) {
      try {
        await this.deleteSubsidy(id)
        this.$message.success('删除成功')
        this.$tools.goNext(() => {
          this._getSubsidyList()
        })
      } catch (err) {}
    },
    /**
     * @description 立即发放补助
     */
    async _immedGrantSubsidy(id) {
      try {
        await this.immedGrantSubsidy({
          query: id
        })
        this.$message.success('发放成功')
        this.$tools.goNext(() => {
          this._getSubsidyList()
        })
      } catch (err) {}
    },
    detail(record) {
      this.$refs.subsidyPerson.dialogTag = true
      this.$refs.subsidyPerson.showList(record.id)
    },
    add() {
      this.$refs.addSubsidy.visible = true
      this.$refs.addSubsidy.classList = []
      this.$refs.addSubsidy.value = []
    }
  }
}
</script>

<style lang="less" scoped>
.account-list {
  padding: 20px 20px 0;
}
</style>
