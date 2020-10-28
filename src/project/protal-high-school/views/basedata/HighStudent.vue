/* eslint-disable space-infix-ops */
<template>
  <div class="students page-layout qui-fx">
    <sub-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="formStatus"
      :form-data="highStudent.formData"
    >
      <div slot="upload" class="qui-fx qui-fx-ac">
        <upload-multi is-check :length="1" v-model="fileList" type="face" :fileInfo="fileInfo"></upload-multi>
        <span style="font-size:12px;margin-left:10px;">大小20到100kB，像素400x400到800x800，格式仅jpg</span>
      </div>
    </sub-form>
    <no-data msg="暂无学生" v-if="false">
      <div slot="btn">
        <a-button type="primary" @click="addStudents(0)">
          <a-icon type="plus" />添加学生
        </a-button>
      </div>
    </no-data>
    <div class="qui-fx qui-fx-jsb" style="width:100%; " v-else>
      <div class="left">
        <grade-tree @select="select"></grade-tree>
      </div>
      <div class="right qui-fx-ver qui-fx-f1" style="padding-right: 10px">
        <search-form isReset @search-form="searchForm" :search-label="highStudent.searchLabel">
          <div slot="left" v-if="isNewYear">
            <a-button icon="plus" class="add-btn" @click="addStudents(0)">添加</a-button>
            <!--             <a-button icon="delete" class="del-btn" @click.stop="deleteList(0)">批量删除</a-button> -->
          </div>
        </search-form>
        <table-list
          is-check
          is-zoom
          @clickRow="clickRow"
          :page-list="pageList"
          v-model="chooseList"
          :columns="highStudent.columns"
          :table-list="studentsList"
        >
          <template v-slot:actions="action" v-if="isNewYear">
            <a-tooltip placement="topLeft" title="详情">
              <a-button
                size="small"
                class="detail-action-btn"
                icon="ellipsis"
                @click.stop="goLead('/basedata/stusentsDetail',action.record)"
              ></a-button>
            </a-tooltip>
            <a-tooltip placement="topLeft" title="编辑">
              <a-button
                size="small"
                class="edit-action-btn"
                icon="form"
                @click.stop="addStudents(1, action.record)"
              ></a-button>
            </a-tooltip>
            <!-- <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="deleteList(action.record)">
              <template slot="title">
                您确定删除吗?
              </template>
              <a-tooltip placement="topLeft" title="删除">
                <a-button size="small" class="del-action-btn" icon="delete"></a-button>
              </a-tooltip>
            </a-popconfirm>-->
          </template>
          <template v-slot:other1="other1">
            <a-tag
              :color="other1.record.hasDorm === '1' ? '#87d068' : other1.record.hasDorm === '0' ? '#2db7f5' : 'purple'"
            >{{ other1.record.hasDorm === '1' ? '住读' : other1.record.hasDorm === '0' ? '走读' : '未知' }}</a-tag>
          </template>
        </table-list>
        <page-num v-model="pageList" :total="total" @change-page="showMore"></page-num>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import GradeTree from '@c/GradeTree'
import NoData from '@c/NoData'
import PageNum from '@c/PageNum'
import SubForm from '../components/SubForm'
import SearchForm from '@c/SearchForm'
import UploadMulti from '@c/UploadFace'
import ShowDialog from '@c/ShowDialog'
import highStudent from '../../assets/js/table/highStudent.js'
export default {
  name: 'Students',
  components: {
    TableList,
    GradeTree,
    PageNum,
    SubForm,
    UploadMulti,
    SearchForm,
    NoData,
    ShowDialog
  },
  data() {
    return {
      highStudent,
      dialogTag: false,
      confirmLoading: false,
      fileInfo: {
        tip: '上传图片',
        h: 120, // 高度
        w: 120 // 宽度
      },
      fileList: [],
      uploadFile: [],
      title: '添加学生',
      formStatus: false,
      gradeList: [],
      classList: [],
      gradeId: '',
      classId: '',
      classChoose: '',
      chooseList: [],
      type: 0,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      studentsList: [],
      schoolYear: '',
      schoolYearId: '',
      gradeCode: '',
      classCode: '',
      isNewYear: true,
      userId: '',
      keyObj: {}
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created() {
    this.getGrade()
    this.highStudent.formData[6].firstChange = this.firstChange
    this.highStudent.formData[6].secondChange = this.secondChange
  },
  mounted() {},
  methods: {
    ...mapActions('home', [
      'getClassList',
      'withoutClassStudent',
      'studentUpdate',
      'getGradeList',
      'studentList',
      'addStudent',
      'detailClassStudent',
      'changeClass',
      'deleteClassStudent'
    ]),
    // 获取年级
    async getGrade() {
      this.highStudent.formData[6].firstList = []
      const req = {
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getGradeList(req)
      if (!res.data) {
        return
      }
      if (res.data.list.length > 0) {
        res.data.list.forEach(ele => {
          this.highStudent.formData[6].firstList.push({ key: ele.code, val: ele.name })
          this.gradeList.push({ key: ele.code, val: ele.name })
        })
      }
    },
    select(item) {
      this.schoolYear = item.title
      this.schoolYearId = item.schoolYearId
      this.gradeCode = item.gradeCode
      this.classCode = item.classCode
      this.isNewYear = item.isNewYear
      const req = {
        ...this.pageList,
        schoolCode: this.userInfo.schoolCode,
        schoolYearId: item.schoolYearId,
        gradeId: item.gradeCode || '',
        classId: item.classCode || '',
        ...this.keyObj
      }
      console.log(req)
      this.showList(req)
      this.highStudent.columns[10] = this.isNewYear
        ? {
          title: '操作',
          width: '10%',
          scopedSlots: {
            customRender: 'action'
          }
        }
        : {}
    },
    submit() {
      this.confirmLoading = true
      setTimeout(() => {
        this.dialogTag = false
        this.confirmLoading = false
      }, 2000)
    },
    searchForm(values) {
      console.log(values)
      this.keywords = values.keyword
      this.keyObj = values
      const req = {
        ...this.pageList,
        schoolCode: this.userInfo.schoolCode,
        schoolYearId: this.schoolYearId,
        gradeId: this.gradeCode || '',
        classId: this.classCode || '',
        ...values
      }
      this.showList(req)
    },
    submitForm(values) {
      values.hasDorm = values.hasDorm === '住读' ? '1' : values.hasDorm === '走读' ? '0' : values.hasDorm
      const req = {
        ...values,
        schoolCode: this.userInfo.schoolCode,
        schoolId: this.userInfo.schoolId,
        admissionTime: values.admissionTime[0] || values.admissionTime,
        photoUrl: this.fileList.length > 0 ? this.fileList[0].url : '',
        gradeId: this.gradeId,
        classId: this.classChoose
      }
      let res = null
      if (this.type === 0) {
        res = this.addStudent(req)
      } else {
        req.userId = this.userId
        res = this.studentUpdate(req)
      }
      res
        .then(() => {
          this.keywords = ''
          this.$message.success(this.type === 0 ? '添加成功' : '编辑成功')
          this.$tools.goNext(() => {
            const data = {
              ...this.pageList,
              schoolCode: this.userInfo.schoolCode,
              schoolYearId: this.schoolYearId,
              gradeId: this.gradeCode || '',
              classId: this.classCode || '',
              ...this.keyObj
            }
            this.showList(data)
            this.$refs.form.reset()
            this.fileList = []
          })
        })
        .catch(() => {
          this.$refs.form.error()
        })
    },
    addStudents(type, record) {
      this.formStatus = true
      if (type) {
        console.log(record)
        this.title = '编辑学生'
        this.highStudent.formData = this.$tools.fillForm(highStudent.formData, record)
        this.fileList = record.photoUrl ? [{ url: record.photoUrl }] : []
        this.userId = record.id
        this.highStudent.formData[3].initValue = record.hasDorm === '1' ? '住读' : '走读'
        this.highStudent.formData[4].initValue = new Date(record.admissionTime).getFullYear()
        this.highStudent.formData[6].disabled = true
        this.highStudent.formData[6].initValue1 = record.gradeName ? [record.gradeName] : ['请选择']
        this.highStudent.formData[6].initValue2 = record.className ? [record.className] : ['请选择']
        console.log(this.highStudent.formData[6].initValue2)
        this.type = 1
      } else {
        this.title = '添加学生'
        this.highStudent.formData = highStudent.formData
        this.fileList = []
        this.highStudent.formData[6].disabled = false
        this.type = 0
      }
    },
    async showList(req) {
      const res = await this.studentList(req)
      if (!res.data.list) {
        this.studentsList = []
        return
      }
      this.studentsList = res.data.list
      this.total = res.data.total
    },
    showMore() {
      const req = {
        ...this.pageList,
        schoolCode: this.userInfo.schoolCode,
        schoolYearId: this.schoolYearId,
        gradeId: this.gradeCode || '',
        classId: this.classCode || '',
        ...this.keyObj
      }
      this.showList(req)
    },
    deleteList(type, record) {
      if (type) {
      } else {
        if (this.chooseList.length === 0) {
          this.$message.warning('请选择删除项')
        }
      }
    },
    clickRow(id) {
      console.log(id)
    },
    goLead(path, record) {
      if (record) {
        this.$router.push({
          path,
          query: { userCode: record.userCode, year: this.schoolYear, yearId: this.schoolYearId }
        })
      } else {
        this.$router.push({ path, query: { type: 'students' } })
      }
    },
    async firstChange(value) {
      this.highStudent.formData[6].secondList = []
      this.classList = []
      console.log(value)
      if (value === undefined) {
        this.gradeId = ''
        this.classChoose = ''
        return
      }
      this.gradeId = this.gradeList[value].key
      const req = {
        schoolCode: this.userInfo.schoolCode,
        gradeCode: this.gradeList[value].key,
        schoolYearId: this.schoolYearId
      }
      const res = await this.getClassList(req)
      if (!res.data) {
        return
      }
      if (res.data.list.length > 0) {
        res.data.list.forEach(ele => {
          this.highStudent.formData[6].secondList.push({ key: ele.id, val: ele.className })
          this.classList.push({ key: ele.id, val: ele.className })
        })
        this.secondChange(0)
      }
    },
    secondChange(value) {
      if (value === undefined) {
        this.secondChange(0)
        return
      }
      this.classChoose = this.classList[value].key
    }
  }
}
</script>
<style lang="less" scoped>
.students {
  background: #fff;
  height: 100%;
  .left {
    padding: 10px;
  }
  .right {
    padding: 0 10px;
    border-left: 1px solid @bor-color;
    .action {
      div {
        cursor: pointer;
        margin: 4px 30px 0 0;
        img {
          width: 20px;
          height: 20px;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }
}
.modal {
  padding: 0 40px;
  .line {
    margin-bottom: 20px;
  }
  .title {
    font-size: 14px;
    font-weight: bold;
    margin-right: 20px;
    min-width: 70px;
  }
  .download {
    color: #6882da;
    cursor: pointer;
  }
  /deep/ .ant-upload-list-item-info {
    padding: 0 22px 0 4px;
  }
}
</style>
