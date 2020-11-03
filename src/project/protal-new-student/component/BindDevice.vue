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
    <SelectPanel
      isReset
      isCheck
      isZoom
      :chooseList="chooseList"
      :columns="columns"
      :tableList="userList"
      :pageList="pageList"
      :total="total"
      :searchLabel="searchLabel"
      @searchForm="searchForm"
      @selectAll="selectAll"
      @showList="showList"
    />
  </a-modal>
</template>
<script>
import { mapState } from 'vuex'
import SelectPanel from './SelectPanel'
const searchLabel = [
  {
    value: 'position',
    type: 'input',
    label: '安装位置',
    placeholder: '请输入安装位置'
  },
  {
    value: 'deviceName',
    label: '设备名称',
    type: 'input'
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
    title: '设备名称',
    dataIndex: 'deviceName',
    width: '10%'
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    width: '10%'
  },
  {
    title: '安装位置',
    dataIndex: 'position',
    width: '20%'
  },
  {
    title: '设备IP',
    width: '15%',
    dataIndex: 'ip'
  },
  {
    title: '状态',
    width: '10%',
    dataIndex: 'status'
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
    SelectPanel
  },
  data() {
    return {
      searchLabel,
      columns,
      totalList: [],
      chooseList: [],
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      userList: [
        {
          id: '1',
          deviceName: '人脸识别设备1',
          deviceType: '面板机',
          position: '南校门-左',
          ip: '172.168.1.1',
          status: '运行正常'
        },
        {
          id: '2',
          deviceName: '人脸识别设备1',
          deviceType: '面板机',
          position: '南校门-右',
          ip: '172.168.1.2',
          status: '运行正常'
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
    searchForm() {},
    showList() {}
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
