<template>
  <div class="page-layout qui-fx goods">
    <assign-student
      type="edu"
      chooseType="organize"
      :assign-obj="assignStudent"
      :classId="classId"
      is-check
      ref="form"
      v-if="studentTag"
      v-model="studentTag"
      @submit="submitUser"
      title="分配学生"
    ></assign-student>
    <div class="page-left">
      <grade-tree @select="select"></grade-tree>
    </div>
    <div class="qui-fx-f1 qui-fx-ver">
      <table-list isZoom v-model="chooseList" :page-list="pageList" :columns="columns" :table-list="userList">
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="分配学生">
            <a-button
              size="small"
              class="edit-action-btn"
              icon="form"
              @click.stop="assignStuClick(action.record.id)"
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
import GradeTree from '@c/HighGradeTree'
import AssignStudent from '../../component/AssignStudent.vue'

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
    dataIndex: 'gradeName'
  },
  {
    title: '专业',
    dataIndex: 'subjectName',
    width: '10%'
  },
  {
    title: '班级',
    dataIndex: 'className',
    width: '10%'
  },
  {
    title: '辅导员',
    dataIndex: 'teacherName',
    width: '10%'
  },
  {
    title: '教室',
    dataIndex: 'placeName',
    width: '15%'
  },
  {
    title: '班级学生',
    dataIndex: 'count',
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
    GradeTree,
    AssignStudent
  },
  data() {
    return {
      issueVisible: false,
      studentTag: false,
      assignStudent: {},
      columns,
      pageList: {
        page: 1,
        size: 20
      },
      searchList: {
        schoolCode: ''
      },
      classId: '',
      total: 0,
      userList: [],
      chooseList: [],
      totalList: [],
      detailList: {},
      grade: '',
      majorCode: '',
      majorName: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    // this.showList()
  },
  methods: {
    ...mapActions('home', ['getHighClass', 'recordDetail', 'downRecord']),
    async showList(searchObj = {}) {
      this.searchList.schoolCode = this.userInfo.schoolCode
      this.searchList = Object.assign(this.searchList, this.pageList, searchObj)
      this.searchList.gradeName = this.grade
      this.searchList.subjectCode = this.majorCode
      const res = await this.getHighClass(this.searchList)
      console.log(res)
      this.userList = res.data || []
      this.total = res.data.length
    },
    searchForm(values) {
      this.pageList.page = 1
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
    // 选择树形列表
    select(item) {
      console.log(item)
      this.pageList.page = 1
      this.pageList.size = 20
      const { gradeCode, title, schoolYearName } = item
      this.majorCode = gradeCode
      this.majorName = title
      this.grade = Number(schoolYearName)
      this.$nextTick(() => {
        this.showList()
      })
    },
    submitForm() {
      if (this.totalList.length === 0) {
        this.$message.warning('请选择学生')
        return
      }
      console.log(this.totalList)
    },
    assignStuClick(id) {
      this.classId = id
      this.studentTag = true
    },
    submitUser() {}
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
