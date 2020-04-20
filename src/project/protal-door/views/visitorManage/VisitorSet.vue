<template>
  <div class="page-layout qui-fx-ver">
    <choose-control
      ref="chooseUser"
      is-check
      v-model="userTag"
      :schoolCode="userInfo.schoolCode"
      @submit="chooseUser"
      title="添加控制组"
    ></choose-control>
    <a-tabs v-model="autoKey">
      <a-tab-pane tab="来访事由" key="1" forceRender>
        <div>
          <a-input
            v-model="causeName"
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
            <div v-for="(item, i) in controlList" :key="i" class="control-list">
              <delete-tag @delTag="delControl(item)" :tag-info="item"></delete-tag>
            </div>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-button
        v-if="autoKey === '2'"
        slot="tabBarExtraContent"
        type="primary"
        @click="userTag = true"
      >添加控制组</a-button>
    </a-tabs>
  </div>
</template>

<script>
import NoData from '@c/NoData'
import DeleteTag from '@c/DeleteTag'
import TableList from '@c/TableList'
import ChooseControl from '@c/ChooseControl'
import { mapState, mapActions } from 'vuex'
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
    dataIndex: 'causeName',
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
    NoData,
    ChooseControl
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  data() {
    return {
      autoKey: '1',
      columns,
      causeName: '',
      controlList: [],
      reasonList: [],
      chooseTag: false,
      userTag: false,
      userGroupCode: '',
      pageList: {
        page: 1,
        size: 20
      },
      total: 0
    }
  },
  mounted() {
    this.showReason()
    this.showControl()
  },
  methods: {
    ...mapActions('home', [
      'addcause',
      'delcause',
      'getcauseList',
      'addcontrolgroup',
      'delcontrolgroup',
      'getcontrolgroupList'
    ]),
    async showReason() {
      const req = {
        pageNum: this.pageList.page,
        pageSize: this.pageList.size,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getcauseList(req)
      this.reasonList = res.data.list
      this.total = res.data.total
    },
    async addReason() {
      if (!this.causeName) {
        this.$message.warning('请输入来访事由')
        return
      } else {
        await this.addcause({
          ...this.pageList,
          schoolCode: this.userInfo.schoolCode,
          causeName: this.causeName
        })
        this.$message.success('添加成功')
        this.$tools.goNext(() => {
          this.causeName = ''
          this.showReason()
        })
      }
    },
    async del(record) {
      await this.delcause({
        id: record.id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showReason()
      })
    },
    async showControl() {
      const req = {
        pageNum: this.pageList.page,
        pageSize: this.pageList.size,
        schoolCode: this.userInfo.schoolCode,
        userGroupCode: this.userGroupCode
      }
      const res = await this.getcontrolgroupList(req)
      this.total = res.data.total
      this.controlList = res.data.list.map(item => {
        return {
          name: item.controlGroupName,
          ...item
        }
      })
    },
    async delControl(record) {
      await this.delcontrolgroup({
        id: record.id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showControl()
      })
    },
    async chooseUser(value) {
      console.log(value)
      this.$refs.chooseUser.reset()
      this.userTag = false
      this.controlList  = []
      value.forEach(ele => {
        this.controlList.push({
          controlGroupName: ele.controlGroupName,
          id: ele.id,
          controlGroupCode: ele.controlGroupCode,
          controlGroupType: ele.controlGroupType,
          schoolCode:ele.schoolCode,
          userGroupCode:this.userGroupCode
        })
      })
      await this.addcontrolgroup(this.controlList)
      this.$message.success('添加成功')
      this.$tools.goNext(() => {
        this.showControl()
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
