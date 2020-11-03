<template>
  <div class="page-layout qui-fx goods">
    <div class="page-left">
      <grade-tree @select="select"></grade-tree>
    </div>
    <div class="qui-fx-f1 qui-fx-ver">
      <table-list
        isZoom
        v-model="chooseList"
        :page-list="pageList"
        :columns="columns"
        :table-list="userList"
      >
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="分配学生">
            <a-button
              size="small"
              class="edit-action-btn"
              icon="form"
              @click.stop="checkClick(action.record.id)"
            ></a-button>
          </a-tooltip>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import GradeTree from '@c/GradeTree'

const columns = [
  {
    title: '序号',
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '年级',
    width: '8%',
    dataIndex: 'grade'
  },
  {
    title: '专业',
    dataIndex: 'project',
    width: '10%'
  },
  {
    title: '班级',
    dataIndex: 'class',
    width: '10%'
  },
  {
    title: '辅导员',
    dataIndex: 'teacher',
    width: '10%'
  },
  {
    title: '教室',
    dataIndex: 'classRoom',
    width: '15%'
  },
  {
    title: '班级学生',
    dataIndex: 'studentCount',
    width: '10%'
  },
  {
    title: '操作',
    width: '5%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'StudentClasses',
  components: {
    TableList,
    PageNum,
    GradeTree
  },
  data() {
    return {
      issueVisible: false,
      columns,
      pageList: {
        page: 1,
        size: 20
      },
      searchList: {
        schoolCode: ''
      },
      total: 0,
      userList: [],
      chooseList: [],
      totalList: [],
      detailList: {},
      dateTime: '',
      state: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    // this.showList()
    this.userList = [
      {
        id: 1,
        name: '张学良',
        grade: '2020',
        project: '软件工程',
        class: '1班',
        teacher: '李老师',
        classRoom: '教学楼1楼101',
        studentCount: 45
      },
      {
        id: 2,
        name: '张学良',
        grade: '2020',
        project: '软件工程',
        class: '1班',
        teacher: '李老师',
        classRoom: '教学楼1楼101',
        studentCount: 45
      }
    ]
  },
  methods: {
    ...mapActions('home', ['getPageList', 'recordDetail', 'downRecord']),
    async showList(searchObj = {}) {
      this.searchList.schoolCode = this.userInfo.schoolCode
      this.searchList = Object.assign(this.searchList, this.pageList, searchObj)
      const res = await this.getPageList(this.searchList)
      this.userList = res.data.list
      this.total = res.data.total
    },
    searchForm(values) {
      this.pageList.page = 1
      this.dateTime = values.date
      this.state = values.state
      const searchObj = {
        date: values.date,
        state: values.state
      }
      this.showList(searchObj)
    },
    // 去详情
    detail(id) {
      console.log(id)
      this.$router.push({
        path: `/studentManage/studentDetails`,
        query: {
          id
        }
      })
    },
    select(item) {
      this.pageList.page = 1
      this.pageList.size = 20
      if (typeof item.materialTypeId === 'number') {
        this.searchList.materialTypeId = item.materialTypeId
        this.searchList.materialId = ''
      } else {
        this.searchList.materialId = item.materialTypeId.split('^')[1]
        this.searchList.materialTypeId = ''
      }
      this.showList()
    },
    submitForm() {
      if (this.totalList.length === 0) {
        this.$message.warning('请选择学生')
        return
      }
      console.log(this.totalList)
    },
    // 报到按钮
    checkClick() {
      this.checkVisible = true
    },
    // 打开报到弹框
    handleCheckOpen() {
      this.checkVisible = true
    },
    // 报到确认
    handleCheckOk() {
      console.log(this.checkResult)
      this.checkVisible = false
    },
    // 取消报到 关闭弹框
    handleCheckCancel() {
      this.checkVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.goods {
  .page-left {
    background: #fff;
    margin-right: 10px;
    width: 150px;
  }
}
</style>
