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
    @ok="addHandle"
  >
    <div>
      <search-form is-reset @search-form="searchForm" :search-label="searchLabel"> </search-form>
      <div>
        <a-button class="export-btn" @click="checkClick">批量重发</a-button>
      </div>
      <table-list
        isCheck
        isZoom
        v-model="chooseList"
        :page-list="pageList"
        @selectAll="selectAll"
        :columns="columns"
        :table-list="userList"
      >
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="重发">
            <a-button size="small" class="edit-action-btn" icon="edit" @click.stop="checkClick(action)"></a-button>
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
    dataIndex: 'name',
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
    width: '10%'
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
      userList: [
        {
          id: '1',
          name: '张三',
          time: '2020/10/10 12:12:00',
          result: '下发成功',
          reson: ''
        },
        {
          id: '2',
          name: '李四',
          time: '2020/10/10 12:12:00',
          result: '下发失败',
          reson: '网络异常'
        }
      ]
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {},
  methods: {
    cancelSelect() {
      this.$emit('cancel')
    },
    addHandle() {
      const list = this.projectList.filter((item) => {
        return item.checked === true
      })
      this.$emit('submit', list)
    },
    selectProject(id) {
      this.$emit('clickSelect', id)
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
</style>
