<template>
  <div class="page-layout qui-fx-ver">
    <a-tabs v-model="autoKey">
      <a-tab-pane tab="来访事由" key="1" forceRender>
        <div>
          <a-input
            v-model="reason"
            style="width: 300px; margin-right: 10px;"
            placeholder="请输入来访事由进行录入"
          />
          <a-button type="primary" @click="addReason">添加事由</a-button>
        </div>
        <div style="width: 600px; margin-top: 20px">
          <table-list :columns="columns" :table-list="reasonList">
            <template v-slot:actions="action">
              <div>
                <a-popconfirm
                  placement="left"
                  okText="确定"
                  cancelText="取消"
                  @confirm="del(action.record)"
                >
                  <template slot="title">您确定删除吗?</template>
                  <a-tooltip placement="topLeft" title="删除">
                    <a-button size="small" class="del-action-btn" icon="delete"></a-button>
                  </a-tooltip>
                </a-popconfirm>
              </div>
            </template>
          </table-list>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="通行权限" key="2" forceRender>
        <a-row>
          <a-col style="font-size: 14px; font-weight: bold; margin-bottom: 20px">可通行门禁：</a-col>
          <a-col>
            <no-data msg="暂未设置可通行门禁" v-if="controlList.length === 0"></no-data>
            <div class="control-list" v-for="control in controlList" :key="control.id">
              <delete-tag @delTag="delControl" :tag-info="control"></delete-tag>
            </div>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-button
        v-if="autoKey === '2'"
        slot="tabBarExtraContent"
        type="primary"
        @click="addControl"
      >添加控制组</a-button>
    </a-tabs>
  </div>
</template>

<script>
import NoData from '@c/NoData'
import DeleteTag from '@c/DeleteTag'
import TableList from '@c/TableList'
import { mapActions } from 'vuex'
const columns = [
  {
    title: '序号',
    width: '30%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '来访事由',
    dataIndex: 'reason',
    width: '50%'
  },
  {
    title: '操作',
    key: 'action',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'VisitorSet',
  components: {
    TableList,
    DeleteTag,
    NoData
  },
  data() {
    return {
      autoKey: '1',
      columns,
      reason: '',
      controlList: [],
      reasonList: [],
      chooseTag: false
    }
  },
  mounted() {
    this.showReason()
    this.showControl()
  },
  methods: {
    ...mapActions('home', ['getReasonList', 'getFkControl']),
    async showControl() {
      const res = await this.getFkControl()
      this.controlList = res.data.map(item => {
        return {
          name: item.controlName,
          ...item
        }
      })
    },
    async showReason() {
      const res = await this.getReasonList()
      this.reasonList = res.data
    },
    addReason() {
      if (!this.reason) {
        this.$message.warning('请输入来访事由')
        return
      }
      this.showReason()
    },
    del(record) {
      this.showReason()
    },
    delControl(id) {
      this.controlList.splice(
        this.controlList.findIndex(item => item.id === id),
        1
      )
    },
    addControl() {
      this.controlList.push({
        id: Math.random() * 100000,
        name: '校门口控制组'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.control-list {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
