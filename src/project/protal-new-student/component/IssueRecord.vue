<template>
  <a-modal
    class="list-modal"
    :title="title"
    :visible="visible"
    @cancel="cancelSelect"
    :maskClosable="false"
    :destroyOnClose="true"
    :width="width"
    :footer="null"
  >
    <div>
      <search-form is-reset @search-form="searchForm" :search-label="searchLabel"> </search-form>
      <div class="btn">
        <a-button class="export-btn" @click="batchClick">批量重发</a-button>
      </div>
      <table-list
        isCheck
        isZoom
        v-model="chooseList"
        :page-list="pageList"
        @selectAll="selectAll"
        :columns="columns"
        :table-list="issueList"
      >
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="重发" v-if="!action.record.result">
            <a-button
              size="small"
              class="edit-action-btn"
              icon="edit"
              @click.stop="resetDevice('single', action.record.id)"
            ></a-button>
          </a-tooltip>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </a-modal>
</template>
<script>
import { mapState } from 'vuex'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const searchLabel = [
  {
    value: 'name',
    type: 'input',
    label: '人员',
    placeholder: '请输入姓名'
  },
  {
    value: 'time',
    label: '下发时间',
    type: 'rangeTime'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '0',
        val: '成功'
      },
      {
        key: '1',
        val: '失败'
      }
    ],
    value: 'result',
    type: 'select',
    label: '下发结果'
  }
]
const columns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '人员',
    dataIndex: 'studentName',
    width: '10%'
  },
  {
    title: '下发时间',
    dataIndex: 'time',
    width: '15%'
  },
  {
    title: '下发结果',
    dataIndex: 'result',
    width: '10%',
    customRender: (text) => {
      return text ? '下发成功' : '下发失败'
    }
  },
  {
    title: '失败原因',
    dataIndex: 'reson'
  },
  {
    title: '操作',
    width: '8%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '80%'
    },
    projectList: {
      type: Array,
      default: () => []
    },
    deviceId: {
      type: [String, Number],
      default: ''
    },
    issueList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    SearchForm,
    TableList,
    PageNum
  },
  data() {
    return {
      searchLabel,
      columns,
      totalList: [],
      chooseList: [],
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      userList: [
        {
          id: '1',
          name: '张三',
          time: '2020/10/10 12:12:00',
          result: 1,
          reson: '',
          disabled: true
        },
        {
          id: '2',
          name: '李四',
          time: '2020/10/10 12:12:00',
          result: 0,
          reson: '网络异常'
        }
      ]
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    console.log('1111')
  },
  watch: {
    deviceId(newval, oldval) {
      console.log(newval, oldval)
    }
  },
  methods: {
    cancelSelect() {
      this.$emit('cancel')
    },
    selectProject(id) {
      this.$emit('clickSelect', id)
    },
    // 获取列表
    showList() {},
    // 批量重发
    batchClick() {
      if (this.totalList.length === 0) {
        this.$message.error('请选择设备')
        return
      }
      const ids = this.totalList.join(',')
      this.resetDevice('batch', ids)
    },
    // 重发
    resetDevice(type, id) {
      this.$confirm({
        title: '重新下发',
        content: '确定重新下发吗？',
        onOk: () => {
          if (type === 'single') {
            // 单个重发
            console.log(id)
          } else {
            // 批量重发
            console.log(this.chooseList)
          }
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 2000)
          }).catch(() => console.log('Oops errors!'))
        }
      })
    },
    // 表格全选
    selectAll(item, type) {
      if (type) {
        this.totalList = this.totalList.concat(item)
      } else {
        item.forEach((item) => {
          const index = this.totalList.findIndex((list) => {
            return list.id === item.id
          })
          this.totalList.splice(index, 1)
        })
      }
    },
    searchForm() {}
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-col .checkbox-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  .checkbox-item {
    width: 100px;
  }
}
/deep/ .btn {
  margin-bottom: 10px;
}
</style>
