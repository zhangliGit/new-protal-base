<template>
  <div class="class-detail page-layout qui-fx-ver">
    <choose-student
      ref="chooseUser"
      is-check
      v-model="userTag"
      @submit="chooseUser"
      title="添加学生">
    </choose-student>
    <sub-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </sub-form>
    <detail-show :detail-info="detailInfo" :title="infoTitle"></detail-show>
    <div class="tit qui-fx-jsb qui-fx-ac">
      <p>班级学生</p>
      <search-form isReset @search-form="searchForm" :search-label="searchLabel">
        <div slot="right" v-if="isNewYear">
          <a-button icon="plus" class="add-btn mar-l10" @click="addStudent">添加学生</a-button>
          <a-button icon="export" class="export-all-btn" @click.stop="goAdd">批量导入</a-button>
        </div>
      </search-form>
    </div>
    <div class="content qui-fx-ver qui-fx-f1">
      <div class="table qui-fx-ver qui-fx-f1">
        <table-list
          is-zoom
          :columns="columns"
          :table-list="studentsList">
          <template v-slot:actions="action" v-if="isNewYear">
            <!--             <a-tooltip placement="topLeft" title="详情">
              <a-button size="small" class="detail-action-btn" icon="ellipsis" @click.stop="goLead('/basedata/stusents/detail',action.record)"></a-button>
            </a-tooltip> -->
            <a-tooltip placement="topLeft" title="转班">
              <a-button size="small" class="edit-action-btn" icon="form" @click.stop="moveClass(action.record)"></a-button>
            </a-tooltip>
            <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="deleteList(action.record)">
              <template slot="title">
                您确定移除吗?
              </template>
              <a-tooltip placement="topLeft" title="移除">
                <a-button size="small" class="del-action-btn" icon="delete"></a-button>
              </a-tooltip>
            </a-popconfirm>
          </template>
        </table-list>
        <page-num v-model="pageList" :total="total" @change-page="showList(keywords)"></page-num>
      </div>
    </div>
  </div>
</template>

<script>
import DetailShow from '@c/DetailShow'
import moveClassImg from '../../assets/img/database/role/moveClass.png'
import editImg from '../../assets/img/database/role/edit.png'
import deleteImg from '../../assets/img/database/role/delete.png'
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import SubForm from '../components/SubForm'
import PageNum from '@c/PageNum'
import ChooseStudent from '@c/ChooseStudent'
import Tools from '@u/tools'

const columns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '学生姓名',
    dataIndex: 'userName',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '10%',
    customRender: (text) => {
      return Tools.getSex(text)
    }
  },
  {
    title: '学号',
    dataIndex: 'workNo',
    width: '10%'
  },
  {
    title: '入学年份',
    dataIndex: 'admissionTime',
    width: '15%',
    customRender: (text) => {
      return new Date(text).getFullYear()
    }
  },
  {
    title: '人脸照片',
    dataIndex: 'photoUrl',
    width: '10%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '加入班级时间',
    dataIndex: 'createTime',
    width: '15%',
    customRender: (text) => {
      return Tools.getDate(text).substring(0, 10)
    }
  }
]
const searchLabel = [
  {
    value: 'keywords',
    initValue: '',
    type: 'selectInput',
    selectType: [
      {
        key: 1,
        val: '姓名'
      },
      {
        key: 2,
        val: '学号'
      }
    ],
    placeholder: '请输入'
  }
]
const formData = [
  {
    value: 'grade',
    initValue: [],
    type: 'linkSelect',
    required: false,
    label: '转至班级',
    placeholder1: '年级',
    placeholder2: '班级',
    firstList: [],
    secondList: []
  }
]
export default {
  name: 'StudentDetail',
  components: {
    TableList,
    SearchForm,
    SubForm,
    PageNum,
    ChooseStudent,
    DetailShow
  },
  data () {
    return {
      moveClassImg,
      editImg,
      deleteImg,
      title: '转班',
      formStatus: false,
      formData,
      searchLabel,
      studentsList: [],
      columns,
      confirmLoading: false,
      dialogTag: false,
      keywords: '',
      userTag: false,
      total: 100,
      pageList: {
        page: 1,
        size: 20
      },
      gradeList: [],
      classList: [],
      gradeId: '',
      classId: '',
      classInfo: {},
      schoolYear: '',
      record: null,
      detailInfo: [
        {
          key: '学年',
          val: ''
        },
        {
          key: '年级',
          val: ''
        },
        {
          key: '班级名称',
          val: ''
        },
        {
          key: '班级教室',
          val: ''
        },
        {
          key: '班级学生人数',
          val: ''
        },
        {
          key: '班主任',
          val: ''
        },
        {
          key: '备注',
          val: ''
        }
      ],
      infoTitle: '基础信息',
      isNewYear: true
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created () {
    this.formData[0].firstChange = this.firstChange
    this.formData[0].secondChange = this.secondChange
    this.schoolYear = this.$route.query.schoolYear
    this.isNewYear = this.$route.query.isNewYear === '1'
    this.columns[7] = this.isNewYear ? {
      title: '操作',
      width: '20%',
      scopedSlots: {
        customRender: 'action'
      }
    } : {}
  },
  mounted () {
    this.showList()
    this.showClassDetail()
    this.getGrade()
  },
  methods: {
    ...mapActions('home', [
      'detailClass', 'getClassList', 'getGradeList', 'changeClass', 'getClassStudentList', 'addClassStudent', 'detailClassStudent', 'changeClass', 'deleteClassStudent'
    ]),
    // 获取年级
    async getGrade () {
      this.formData[0].firstList = []
      const req = {
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getGradeList(req)
      if (res.data.list.length > 0) {
        res.data.list.forEach(ele => {
          this.formData[0].firstList.push({ key: ele.code, val: ele.name })
          this.gradeList.push({ key: ele.code, val: ele.name })
        })
      }
    },
    async showClassDetail () {
      const res = await this.detailClass(this.$route.query.id)
      this.detailInfo[0].val = this.schoolYear
      this.detailInfo[1].val = res.data.gradeName
      this.detailInfo[2].val = res.data.className
      this.detailInfo[3].val = res.data.placeName
      this.detailInfo[4].val = res.data.count || 0
      this.detailInfo[5].val = res.data.teacherName
      this.detailInfo[6].val = res.data.remark
    },
    async showList (keyword = '') {
      const req = {
        classCode: this.$route.query.classCode,
        gradeCode: this.$route.query.gradeCode,
        schoolYearId: this.$route.query.schoolYearId,
        ...this.pageList,
        schoolCode: this.userInfo.schoolCode,
        keyword: keyword
      }
      const res = await this.getClassStudentList(req)
      this.studentsList = res.data.list
      this.total = res.data.total
    },
    addStudent () {
      this.userTag = true
    },
    chooseUser (value) {
      if (value.length > 0) {
        const req = {
          classId: this.$route.query.id,
          schoolCode: this.userInfo.schoolCode,
          userIds: value.map(ele => {
            return ele.id
          })
        }
        this.addClassStudent(req).then(res => {
          this.$message.success('添加成功')
          this.$tools.goNext(() => {
            this.showList(this.keywords)
            this.showClassDetail()
            this.$refs.chooseUser.reset()
          })
        }).catch(() => {
          this.$refs.chooseUser.error()
        })
      }
    },
    submit () {
      this.confirmLoading = true
      setTimeout(() => {
        this.dialogTag = false
        this.confirmLoading = false
      }, 1000)
    },
    moveClass (record) {
      this.formStatus = true
      this.record = record
    },
    searchForm (value) {
      this.keywords = value.keywords
      this.showList(value.keywords)
    },
    async deleteList (record) {
      await this.deleteClassStudent(record.id)
      this.$message.success('移除成功')
      this.$tools.goNext(() => {
        this.showList()
        this.showClassDetail()
        this.$refs.form.reset()
      })
    },
    goLead (path, record) {
      this.$router.push({ path, query: { id: record.id } })
    },
    async firstChange (value) {
      this.classList = []
      this.formData[0].secondList = []
      if (value === undefined) {
        return
      }
      this.gradeId = this.gradeList[value].key
      const req = {
        schoolCode: this.userInfo.schoolCode,
        gradeCode: this.gradeList[value].key
      }
      const res = await this.getClassList(req)
      if (res.data.list.length > 0) {
        res.data.list.forEach(ele => {
          this.formData[0].secondList.push({ key: ele.id, val: ele.className })
          this.classList.push({ key: ele.id, val: ele.className })
        })
        this.classId = this.classList[0].key
      }
    },
    secondChange (value) {
      this.classId = this.classList[value].key
    },
    submitForm (values) {
      if (!this.classId) {
        return
      }
      const req = {
        classId: this.classId,
        schoolCode: this.userInfo.schoolCode,
        id: this.record.id,
        userId: this.record.userId
      }
      this.changeClass(req).then(res => {
        this.$message.success('转班成功')
        this.$tools.goNext(() => {
          this.showList()
          this.showClassDetail()
          this.$refs.form.reset()
        })
      }).catch(() => {
        this.$refs.form.error()
      })
    },
    goAdd () {
      this.$router.push({ path: '/basedata/bulkImport',
        query: { id: this.$route.query.id,
          type: 'students' } })
    }
  }
}
</script>
<style lang="less" scoped>
.class-detail{
  height:100%;
  .tit{
    margin:10px 0 0 0;
    p{
      border-left: 3px solid @main-color;
      padding-left: 10px;
      font-weight: bold;
      margin: 0 0 0 10px;
      line-height: 16px;
      height: 16px;
      font-size: 16px;
    }
  }
   .top{
    background: #fff;
    border:1px solid #ddd;
    padding: 20px;
    margin-top: 10px;
    font-weight: bold;
    .info{
      margin-bottom: 20px;
      span{
        margin-right: 50px;
      }
    }
    .phone{
      margin-bottom: 20px;
      img{
        width: 50px;
        height: 50px;
        margin-right: 20px;
        border-radius: 4px;
      }
    }
  }
  .content{
    background: #fff;
    padding:20px 20px 0 20px;
    .add{
      margin:10px 0;
    }
  }
  .action{
      div{
        cursor: pointer;
        margin: 4px 30px 0 0;
        img{
          width: 20px;
          height: 20px;
        }
        span{
          font-size:12px;
        }
      }
    }
}
.modal{
  padding: 0 40px;
  .line{
    margin-bottom: 20px;
  }
  .title{
    font-size: 14px;
    font-weight: bold;
    margin-right: 20px;
    min-width: 70px;
  }
  .download{
    color:#6882da;
    cursor: pointer;
  }
  /deep/ .ant-upload-list-item-info{
    padding: 0 22px 0 4px;
  }
}
</style>
