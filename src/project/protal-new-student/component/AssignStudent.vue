<template>
  <a-modal
    width="90%"
    :title="title"
    v-model="status"
    @ok="submitOk"
    :maskClosable="false"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
  >
    <a-row type="flex" justify="end" style="margin-bottom: 15px; margin-right: 215px">
      <a-col>
        <span>申请专业：</span>
        <a-input v-model="address" style="width: 120px; margin-right: 10px" placeholder="请输入专业名称" />
        <span>学生姓名：</span>
        <a-input v-model="deviceName" style="width: 120px; margin-right: 10px" placeholder="请输入学生姓名" />
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
          <span>{{ totalList.length }}人</span>
        </div>
        <div class="qui-fx-f1" style="overflow: auto">
          <ul style="padding-left: 0">
            <li v-for="(item, index) in totalList" :key="item.id" class="qui-fx-jsb">
              <span>{{ item.studentName }}</span>
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
    title: '学生姓名',
    dataIndex: 'studentName',
    width: '8%'
  },
  {
    title: '身份证号码',
    dataIndex: 'idCard',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '8%'
  },
  {
    title: '年级',
    dataIndex: 'grade',
    width: '10%'
  },
  {
    title: '申请专业',
    dataIndex: 'project',
    width: '15%'
  },
  {
    title: '人脸照片',
    dataIndex: 'photo',
    width: '10%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  }
]
export default {
  name: 'AssignStudent',
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
    },
    classId: {
      type: String,
      default: ''
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
          studentName: '学生1',
          idCard: '423324199563251020',
          sex: '男',
          grade: '2020级',
          project: '软件技术',
          photo:
            'http://canpoint-photo.oss-cn-beijing.aliyuncs.com/47801/2020/10/19/base/76b5c10347bf4e5185331bb917b762cb.jpg'
        },
        {
          id: '2',
          studentName: '学生2',
          idCard: '423324199563251020',
          sex: '男',
          grade: '2020级',
          project: '软件技术',
          photo:
            'http://canpoint-photo.oss-cn-beijing.aliyuncs.com/47801/2020/10/19/base/76b5c10347bf4e5185331bb917b762cb.jpg'
        }
      ],
      totalList: [],
      code: ''
    }
  },
  mounted() {
    if (!this.classId) {
      return
    }
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
    async getUserList(type = false) {
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
            studentName: item.studentName,
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
      console.log(this.totalList)
      if (this.totalList.length === 0) {
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
