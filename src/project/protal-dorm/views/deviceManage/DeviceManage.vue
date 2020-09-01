<template>
  <div class="device qui-fx">
    <choose-control
      ref="chooseUser"
      is-check
      v-model="userTag"
      v-if="userTag"
      :bind-list="deviceList"
      @submit="chooseUser"
      chooseType="device"
      :schoolCode="userInfo.schoolCode"
      title="添加设备"
    ></choose-control>
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="formStatus"
      :form-data="formData"
    ></submit-form>
    <div class="page-left">
      <org-tree
        :current-tab="0"
        :is-select="true"
        :is-tab="isTab"
        @tree-click="handleTreeClick"
        :is-room="false"
      ></org-tree>
    </div>
    <div class="qui-fx-f1 qui-fx-ver">
      <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
        <div slot="left">
          <a-button icon="plus" class="add-btn" @click="bind">绑定设备</a-button>
          <!-- <a-button icon="export" class="export-all-btn" @click="batchAdd(0)">批量设置</a-button> -->
          <!-- <a-button icon="delete" class="del-btn" @click="batchDelete(0)">批量解绑</a-button> -->
        </div>
      </search-form>
      <a-row id="table" class="table-top qui-fx-f1">
        <table-list
          is-zoom
          @clickRow="clickRow"
          v-model="chooseList"
          :page-list="pageList"
          :columns="columns"
          :table-list="deviceList"
        >
          <template v-slot:actions="action">
            <a-tooltip placement="topLeft" title="设置">
              <a-button
                size="small"
                class="edit-action-btn"
                icon="form"
                @click.stop="batchAdd(action.record)"
              ></a-button>
            </a-tooltip>
            <a-popconfirm
              placement="left"
              okText="确定"
              cancelText="取消"
              @confirm="batchDelete(action.record)"
            >
              <template slot="title">您确定删除吗?</template>
              <a-tooltip placement="topLeft" title="解绑">
                <a-button size="small" class="del-action-btn" icon="delete"></a-button>
              </a-tooltip>
            </a-popconfirm>
          </template>
        </table-list>
      </a-row>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import OrgTree from '../components/orgTree/OrgTree'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm'
import ChooseControl from '@c/ChooseControl'
import mixins from '@u/mixins'
const searchLabel = [
  {
    value: 'snapSite',
    initValue: '',
    type: 'input',
    label: '安装位置',
    placeholder: '请输入安装位置'
  },
  {
    value: 'deviceName',
    initValue: '',
    type: 'input',
    label: '设备名称',
    placeholder: '请输入设备名称'
  },
  {
    list: [
      // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '相机'
      },
      {
        key: 2,
        val: '面板机'
      }
    ],
    value: 'deviceType',
    type: 'select',
    label: '设备类型',
    scopedSlots: {
      customRender: 'other5'
    }
  }
]
const columns = [
  {
    title: '序号',
    width: '14%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '安装位置',
    dataIndex: 'snapSite',
    width: '14%'
  },
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    width: '14%'
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    width: '14%',
    customRender: text => {
      return parseInt(text) === 1 ? '相机' : '面板机'
    }
  },
  {
    title: '控制类型',
    dataIndex: 'inOrOut',
    width: '14%',
    customRender: text => {
      return parseInt(text) === 1 ? '进' : '出'
    }
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const formData = [
  {
    value: 'inOrOut',
    initValue: 1,
    list: [
      {
        key: 1,
        val: '进'
      },
      {
        key: 2,
        val: '出'
      }
    ],
    type: 'radio',
    label: '控制类型',
    placeholder: '请选择控制类型'
  }
]
export default {
  name: 'DeviceManage',
  components: {
    TableList,
    SearchForm,
    PageNum,
    SubmitForm,
    ChooseControl,
    OrgTree
  },
  mixins: [mixins],
  data() {
    return {
      columns,
      searchLabel,
      formData,
      formStatus: false,
      userTag: false,
      title: '设置',
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      deviceList: [],
      chooseList: [],
      type: 0,
      record: {},
      chooseType: 'door',
      searchList: {},
      isTab: false
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  methods: {
    ...mapActions('device', ['getDeviceList', 'addDeviceInfo', 'deleteDeviceInfo', 'updateDeviceInfo']),
    handleTreeClick(item) {
      this.searchList.buildingCode = item.buildingCode
      this.searchList.floorCode = item.floorCode
      this.searchList.buildName = item.buildName
      this.searchList.floorName = item.floorName
      this.showList()
    },
    async showList(searchObj = {}) {
      const req = {
        page: this.pageList.page,
        size: this.pageList.size,
        schoolCode: this.userInfo.schoolCode,
        ...searchObj,
        ...this.searchList
      }
      const res = await this.getDeviceList(req)
      this.deviceList = res.data.list
      this.total = res.data.total
    },
    searchForm(values) {
      this.pageList.page = 1
      const searchObj = {
        snapSite: values.snapSite,
        inOrOut: values.inOrOut,
        deviceType: values.deviceType,
        deviceName: values.deviceName
      }
      this.showList(searchObj)
    },
    batchAdd(record) {
      this.formStatus = true
      this.type = 1
      this.record = record
      this.formData = this.$tools.fillForm(formData, record)
    },
    clickRow(id) {},
    async batchDelete(record) {
      const req = [record.id]
      await this.deleteDeviceInfo(req)
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.chooseList = []
        this.showList(this.keyword)
      })
    },
    submitForm(values) {
      const req = {
        deviceSn: this.record.deviceSn,
        inOrOut: values.inOrOut
      }
      this.updateDeviceInfo(req)
        .then(() => {
          this.$message.success('设置成功')
          this.$tools.goNext(() => {
            this.showList()
            this.$refs.form.reset()
          })
        })
        .catch(() => {
          this.$refs.form.error()
        })
    },
    bind() {
      this.userTag = true
    },
    // 添加设备
    chooseUser(value) {
      const req = {
        list: value,
        schoolCode: this.userInfo.schoolCode,
        ...this.searchList
      }
      try {
        this.addDeviceInfo(req)
          .then(() => {
            this.$message.success('添加成功')
            this.$tools.goNext(() => {
              this.$refs.chooseUser.reset()
              this.showList(this.keyword)
            })
          })
          .catch(() => {
            this.$refs.chooseUser.error()
          })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.device {
  flex: 1;
  overflow: hidden;
  background: #fff;
}
.search-form {
  margin-top: 0px;
  height: auto;
}
.page-left {
  background: #fff;
  margin-right: 10px;
  width: 250px;
}
.page-right {
  width: calc(100% - 270px);
}
</style>
