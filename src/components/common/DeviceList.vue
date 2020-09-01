<template>
  <div id="tableList">
    <choose-control
      ref="chooseUser"
      is-check
      v-model="userTag"
      @submit="chooseUser"
      :bind-code="bindCode"
      :group-code="groupCode"
      :chooseType="chooseType"
      :schoolCode="schoolCode"
      title="添加设备"
    ></choose-control>
    <a-button icon="plus" class="add-btn" @click="userTag = true">绑定设备</a-button>
    <a-table
      style="height: 280px; margin-top:10px"
      :bordered="true"
      :scroll="{ y: scrollH || this.$tools.setScroll('tableList') }"
      :rowKey="record => record.id"
      :columns="columns"
      :data-source="tableList"
      :pagination="false"
    >
      <template slot="action" slot-scope="text, record">
        <a-tag @click="getRecordList(record)" color="#87d068">下发记录</a-tag>
      </template>
      <template slot="index" slot-scope="text, record, index">{{ index | getPageIndex(pageList) }}</template>
    </a-table>
  </div>
</template>

<script>
import ChooseControl from '@c/ChooseControl'
import $ajax from '@u/ajax-serve'
import hostEnv from '@config/host-env'
export default {
  name: 'TableList',
  components: {
    ChooseControl
  },
  props: {
    scrollH: {
      type: Number,
      required: false,
      default: 0
    },
    schoolCode: {
      type: String,
      default: ''
    },
    groupCode: {
      type: String,
      default: ''
    },
    chooseType: {
      type: String,
      default: ''
    },
    tableList: {
      type: Array,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    bindCode: {
      type: String,
      default: ''
    },
    pageList: {
      type: Object,
      default: () => {
        return {
          page: 1,
          size: 200
        }
      }
    }
  },
  filters: {
    // 获取表格索引
    getPageIndex: (val, obj) => {
      if (JSON.stringify(obj) === '{}') {
        return val + 1
      } else {
        return (obj.page - 1) * obj.size + val + 1
      }
    }
  },
  data() {
    return {
      userTag: false
    }
  },
  async created() {
    if (this.bindCode || this.groupCode) {
      this.showData()
    }
  },
  methods: {
    getRecordList(record) {
      this.$emit('getRecordList', record)
    },
    // 表单回填
    async showData() {
      if (this.chooseType === 'ncov') {
        const res = await $ajax.get({
          url: `${hostEnv.lz_ncov}/epidemic/group/detail`,
          params: {
            groupId: this.bindCode
          }
        })
        if (!res.data) {
          return
        }
        this.$emit('showData', res.data)
      } else if (this.chooseType === 'attendance') {
        const res = await $ajax.get({
          url: `${hostEnv.lz_attendance}/attendance/group/detail`,
          params: {
            groupId: this.bindCode
          }
        })
        if (!res.data) {
          return
        }
        this.$emit('showData', res.data)
      } else if (this.chooseType === 'doorGroup') {
        const res = await $ajax.get({
          url: `${hostEnv.zx_door}/setting/rule/group/detail`,
          params: {
            schoolCode: this.schoolCode,
            ruleGroupCode: this.groupCode
          }
        })
        if (!res.data) {
          return
        }
        this.$emit('showData', res.data)
      }
    },
    // 添加设备
    chooseUser(value) {
      this.userTag = false
      this.$refs.chooseUser.reset()
      this.$emit('groupList', value)
    }
  }
}
</script>

<style lang="less" scoped>
#tableList {
  max-height: calc(100vh - 300px);
}
</style>
