<template>
  <div class="home page-layout qui-fx-ver">
    <IssueRecord :visible="issueVisible" :title="title" :deviceId="deviceId" @cancel="issueVisible = false" />
    <bind-student
      type="edu"
      chooseType="organize"
      :bind-obj="bindStudent"
      is-check
      ref="form"
      v-if="studentTag"
      v-model="studentTag"
      @submit="submitUser"
      title="绑定学生"
    >
    </bind-student>
    <bind-device
      type="edu"
      chooseType="organize"
      :bind-obj="bindDevice"
      is-check
      ref="form"
      v-if="deviceTag"
      v-model="deviceTag"
      @submit="submitDevice"
      title="绑定设备"
    >
    </bind-device>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button icon="plus" class="add-btn" @click.stop="bindDevClick">绑定设备</a-button>
      </div>
    </search-form>
    <table-list isBorder isZoom :page-list="pageList" :columns="columns" :table-list="taskList">
      <template v-slot:other1="other1">
        <span>{{ other1.record.id }}</span>
        <a-button
          size="small"
          type="primary"
          icon="plus"
          style="margin-left: 10px"
          @click="bindStuClick(other1.record)"
        ></a-button>
      </template>
      <template v-slot:actions="action">
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="deleteDevice(action.record)">
          <template slot="title"> 确定解绑设备吗? </template>
          <a-tooltip placement="topLeft" title="解绑设备">
            <a-button size="small" class="del-action-btn" icon="unlock"></a-button>
          </a-tooltip>
        </a-popconfirm>
        <a-tooltip placement="topLeft" title="下发记录">
          <a-button
            size="small"
            class="export-btn"
            icon="file"
            @click.stop="handelIssue(action.record.id)"
          ></a-button>
        </a-tooltip>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import IssueRecord from '../../component/IssueRecord.vue'
import BindStudent from '../../component/BindStudent.vue'
import BindDevice from '../../component/BindDevice.vue'
// import Tools from '@u/tools'
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
    width: '20%'
  },
  {
    title: '绑定学生',
    dataIndex: 'bindStudent',
    width: '10%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    width: '10%'
  },
  {
    title: 'SN码',
    dataIndex: 'snCode',
    width: '10%'
  },
  {
    title: '安装位置',
    dataIndex: 'address',
    width: '20%'
  },
  {
    title: '操作',
    width: '10%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const searchLabel = [
  {
    value: 'deviceName',
    type: 'input',
    label: '设备名称',
    placeholder: '请输入设备名称'
  },
  {
    value: 'snCode',
    type: 'input',
    label: 'SN码',
    placeholder: '请输入SN码'
  },
  {
    list: [
      {
        key: '1',
        val: '面板机'
      }
    ],
    value: 'deviceType',
    type: 'select',
    label: '设备类型'
  }
]
export default {
  name: 'DeviceManage',
  components: {
    SearchForm,
    PageNum,
    TableList,
    IssueRecord,
    BindStudent,
    BindDevice
  },
  data() {
    return {
      title: '下发记录',
      issueVisible: false,
      studentTag: false,
      bindStudent: {},
      deviceTag: false,
      bindDevice: {},
      columns,
      searchLabel,
      searchList: {},
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      taskList: [],
      signTag: false,
      searchObj: {},
      deviceId: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getReserveList', 'delReserve']),
    async showList() {
      // const req = {
      //   ...this.searchObj,
      //   ...this.pageList,
      //   schoolCode: this.userInfo.schoolCode,
      //   type: '1'
      // }
      // const res = await this.getReserveList(req)
      // console.log(res)
      this.taskList = [
        {
          id: '1',
          deviceName: '面板机1',
          bindStudent: 2222,
          deviceType: '面板机',
          snCode: '6231300',
          address: '学校南门-左'
        }
      ]
      // this.taskList = res.data.list
      // this.taskList.map(el => {
      //   el.placeName = el.placeName.replace(/,/g, '-')
      // })
      // this.total = res.data.total
    },
    searchForm(values) {
      console.log(values)
      this.searchObj = {
        startDate: values.rangeTime ? values.rangeTime[0] : undefined,
        endDate: values.rangeTime ? values.rangeTime[1] : undefined,
        status: values.status,
        description: values.description
      }
      this.showList()
    },
    addTask() {
      this.$router.push({ path: '/taskManage/addTask' })
    },
    handelIssue(id) {
      this.deviceId = id
      this.issueVisible = true
    },
    // 解绑设备
    async deleteDevice(record) {
      await this.delReserve(record.id)
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    },
    showRecord(record) {
      this.signTag = true
      this.id = record.id
    },
    submitForm(values) {
      console.log(values)
    },
    bindStuClick() {
      this.bindStudent = {}
      this.studentTag = true
    },
    // 表头绑定设备按钮
    bindDevClick() {
      this.deviceTag = true
    },
    submitUser() {},
    submitDevice() {}
  }
}
</script>
<style lang="less" scoped></style>
