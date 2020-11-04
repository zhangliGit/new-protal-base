<template>
  <a-modal
    width="70%"
    :title="title"
    v-model="status"
    @ok="submitOk"
    :maskClosable="false"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
  >
    <a-row type="flex" justify="end" style="margin-bottom: 15px; margin-right: 215px">
      <a-col>
        <span>安装位置：</span>
        <a-input v-model="address" style="width: 120px; margin-right: 10px" placeholder="请输入安装位置" />
        <span>设备名称：</span>
        <a-input v-model="deviceName" style="width: 120px; margin-right: 10px" placeholder="请输入设备名称" />
        <a-button type="primary" @click="getUserList(chooseType !== '')">查询</a-button>
      </a-col>
    </a-row>
    <div class="choose-user qui-fx">
      <div class="qui-fx-ver qui-fx-f1">
        <table-list
          :is-check="isCheck"
          :is-radio="isRadio"
          :scroll-h="500"
          :page-list="pageList"
          v-model="chooseList"
          :columns="columns"
          @clickRow="clickRow"
          @selectAll="selectAll"
          :table-list="userList"
        ></table-list>
        <page-num
          :jumper="false"
          v-model="pageList"
          :mar-top="20"
          :mar-bot="0"
          size="small"
          :total="total"
          @change-page="changePage"
        ></page-num>
      </div>
      <div class="user-box qui-fx-ver" v-show="isTotal">
        <div class="title qui-fx-jsb">
          <span>已选择</span>
          <span>{{ totalList.length }}个</span>
        </div>
        <div class="qui-fx-f1" style="overflow: auto">
          <ul style="padding-left: 0">
            <li v-for="(item, index) in totalList" :key="item.id" class="qui-fx-jsb">
              <span>{{ item.deviceName }}</span>
              <a-tag @click="delUser(item.id, index)" color="#f50">删除</a-tag>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import PageNum from '@c/PageNum'
import TableList from '@c/TableList'
import GradeTree from '@c/GradeTree'
import $ajax from '@u/ajax-serve'
import { mapState } from 'vuex'
import hostEnv from '@config/host-env'
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
    width: '15%'
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    width: '10%'
  },
  {
    title: '安装位置',
    dataIndex: 'address',
    width: '20%'
  },
  {
    title: '设备IP',
    dataIndex: 'ip',
    width: '10%'
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '8%'
  }
]
export default {
  name: 'BindDevice',
  components: {
    PageNum,
    TableList,
    GradeTree
  },
  props: {
    isTotal: {
      type: Boolean,
      default: true
    },
    bindObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    chooseType: {
      type: String,
      default: ''
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('home', ['schoolCode', 'eduCode']),
    status: {
      get() {
        return this.value
      },
      set() {
        this.$emit('input', false)
      }
    }
  },
  data() {
    return {
      hasPhoto: '',
      address: '',
      deviceName: '',
      confirmLoading: false,
      orgCode: '',
      chooseList: [],
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      columns,
      userList: [
        {
          id: '1',
          deviceName: '设备1',
          deviceType: '面板机',
          address: '校南门',
          ip: '172.169.1.12',
          status: '运行正常'
        },
        {
          id: '2',
          deviceName: '设备2',
          deviceType: '面板机',
          address: '校北门',
          ip: '172.169.1.13',
          status: '运行正常'
        }
      ],
      totalList: []
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    changePage() {
      if (!this.chooseType) {
        this.getUserList(false)
      } else {
        this.getUserList(true)
      }
    },
    async getUserList() {
      // const res = await $ajax.post({
      //   url: `${hostEnv.lz_user_center}/userinfo/teacher/user/queryTeacherInfo`,
      //   params: {
      //     orgCode: this.orgCode,
      //     address: this.address,
      //     deviceName: this.deviceName,
      //     hasPhoto: this.hasPhoto,
      //     schoolCode: this.code,
      //     ...this.pageList
      //   }
      // })
      // this.userList = res.data.list.map((item) => {
      //   let id = item.id
      //   if (type) id = item.userCode
      //   if (type && this.chooseType === 'rule') {
      //     id = item.id
      //   }
      //   return {
      //     ...item,
      //     id
      //   }
      // })
      // this.total = res.data.total
    },
    defaultCode(item) {
      this.orgCode = item.code[0]
    },
    select(item) {
      this.pageList.page = 1
      this.orgCode = item.code
      if (this.chooseType) {
        this.getUserList(true)
      } else {
        this.getUserList()
      }
    },
    reset() {
      this.confirmLoading = false
      this.$emit('input', false)
    },
    error() {
      this.confirmLoading = false
    },
    delUser(id, index) {
      this.totalList.splice(index, 1)
      this.chooseList.splice(this.chooseList.indexOf(id), 1)
    },
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
    // 监听选中或取消
    clickRow(item, type) {
      if (type) {
        if (this.isCheck) {
          this.totalList.push({
            id: item.id,
            userCode: item.userCode,
            deviceName: item.deviceName,
            orgCode: item.orgCode,
            orgName: item.orgName,
            photoUrl: item.photoUrl,
            sex: item.sex,
            mobile: item.mobile
          })
        } else {
          this.totalList = [item]
        }
      } else {
        const index = this.totalList.findIndex((list) => list.id === item.id)
        this.totalList.splice(index, 1)
      }
    },
    submitOk() {
      if (this.totalList.length === 0 && this.bindId === -1) {
        this.$message.warning('请选择人员')
        return
      }
      this.confirmLoading = true
      this.$emit('submit', this.totalList)
    }
  }
}
</script>

<style lang="less" scoped>
.choose-user {
  height: 600px;
  .org-box {
    overflow-x: hidden;
    width: 240px;
  }
  .user-box {
    border: 1px #f5f5f5 solid;
    margin-left: 15px;
    width: 200px;
    .title {
      padding: 0 10px;
      background-color: #f5f5f5;
      height: 41px;
      line-height: 41px;
      border-bottom: 1px #f5f5f5 solid;
    }
    li {
      border-bottom: 1px #f5f5f5 solid;
      padding: 6px 0px 6px 8px;
    }
  }
}
</style>
