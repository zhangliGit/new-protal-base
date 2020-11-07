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
    <div class="qui-fx qui-fx-jsb" style="width:100%;">
      <div class="left">
        <major-tree @select="select"></major-tree>
      </div>
      <div class="right qui-fx-ver qui-fx-f1" style="padding-right: 10px">
        <search-form isReset @search-form="searchForm" :search-label="highStudent.searchLabel">
          <div slot="left">
            <a-button icon="plus" class="add-btn" @click="addClick(0)">添加</a-button>
            <a-button icon="export" class="export-all-btn" @click.stop="addClick(2)">批量导入</a-button>
            <!--             <a-button icon="delete" class="del-btn" @click.stop="deleteList(0)">批量删除</a-button> -->
          </div>
        </search-form>
        <table-list
          is-check
          is-zoom
          :page-list="pageList"
          v-model="chooseList"
          :columns="highStudent.columns"
          :table-list="studentsList"
        >
          <template v-slot:actions="action">
            <a-tooltip placement="topLeft" title="详情">
              <a-button
                size="small"
                class="detail-action-btn"
                icon="ellipsis"
                @click.stop="goLead('/basedata/HighStuDetail',action.record)"
              ></a-button>
            </a-tooltip>
            <a-tooltip placement="topLeft" title="编辑">
              <a-button
                size="small"
                class="edit-action-btn"
                icon="form"
                @click.stop="addClick(1, action.record)"
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
        <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import NoData from '@c/NoData'
import PageNum from '@c/PageNum'
import SubForm from '../components/SubForm'
import SearchForm from '@c/SearchForm'
import UploadMulti from '@c/UploadFace'
import ShowDialog from '@c/ShowDialog'
import highStudent from '../../assets/js/table/highStudent.js'
import MajorTree from '@c/MajorTree'
export default {
  name: 'Students',
  components: {
    TableList,
    PageNum,
    SubForm,
    UploadMulti,
    SearchForm,
    NoData,
    ShowDialog,
    MajorTree
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
      chooseList: [],
      type: 0,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      studentsList: [],
      userId: '',
      highSubTerm: [],
      highClass: [],
      searchList: {},
      userDetail: {},
      gradeName: ''
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
      'getHighTerm', 'getHighGradeSub', 'getHighClass', 'addHighStu',
      'getHighStu', 'updateHighStu', 'getHighGrade'
    ]),
    // 获取列表
    async showList() {
      this.searchList.schoolCode = this.userInfo.schoolCode
      this.searchList = Object.assign(this.searchList, this.pageList)
      const res = await this.getHighStu(this.searchList)
      if (!res.data.list) {
        this.studentsList = []
        return
      }
      this.studentsList = res.data.list
      this.total = res.data.total
    },
    // tree选择
    select(item) {
      this.searchList.gradeCode = item.gradeCode
      this.searchList.gradeName = item.gradeName
      this.searchList.grade = item.gradeName
      this.searchList.subjectCode = item.subjectCode || ''
      this.searchList.classCode = item.classCode || ''
      this.showList()
    },
    // 获取年级
    async getGrade() {
      this.highStudent.formData[6].firstList = []
      const res = await this.getHighGrade({ schoolCode: this.userInfo.schoolCode })
      this.highSubTerm = res.data
      if (res.data.length === 0) {
        this.highStudent.formData[6].initValue1 = []
        this.highStudent.formData[6].initValue2 = []
        this.highStudent.formData[6].initValue3 = []
        return
      }
      res.data.forEach(ele => {
        this.highStudent.formData[6].firstList.push({ key: ele.gradeCode, val: `${ele.gradeName}级` })
      })
      this.gradeName = res.data[0].gradeName
      this._getSubjectList()
    },
    firstChange(value) {
      if (value || value === 0) {
        this.gradeName = this.highSubTerm[value].gradeName
        this._getSubjectList()
      }
    },
    // 获取专业
    async _getSubjectList() {
      this.highStudent.formData[6].secondList = []
      const req = {
        gradeName: this.gradeName,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getHighGradeSub(req)
      this.highSubList = res.data
      if (res.data.length === 0) {
        this.highStudent.formData[6].initValue2 = []
        this.highStudent.formData[6].initValue3 = []
        return
      }
      res.data.forEach(ele => {
        this.highStudent.formData[6].secondList.push({ key: ele.subjectCode, val: ele.subjectName })
      })
      this.highStudent.formData[6].initValue2 = [0]
      this._getHighClass(this.highSubList[0].subjectCode)
    },
    // 点击专业获取班级
    secondChange(value) {
      if (value || value === 0) {
        this._getHighClass(this.highSubList[value].subjectCode)
      }
    },
    // 查询班级列表
    async _getHighClass(subjectCode) {
      this.highStudent.formData[6].threeList = []
      const req = {
        schoolCode: this.userInfo.schoolCode,
        page: 1,
        size: 99999,
        subjectCode: subjectCode,
        gradeName: this.gradeName
      }
      const res = await this.getHighClass(req)
      this.highClass = res.data.records
      if (res.data.records.length === 0) {
        this.highStudent.formData[6].initValue3 = []
        return
      }
      res.data.records.forEach(ele => {
        this.highStudent.formData[6].threeList.push({ key: ele.id, val: ele.className })
      })
      this.highStudent.formData[6].initValue3 = [0]
    },
    // 搜索
    searchForm(values) {
      this.pageList.page = 1
      this.pageList.size = 20
      this.searchList = Object.assign(this.searchList, values)
      this.showList()
    },
    addClick(type, record) {
      this.type = type
      if (type === 1) {
        this.title = '编辑学生'
        this.userDetail = record
        this.highStudent.formData = this.$tools.fillForm(highStudent.formData, record)
        this.fileList = record.photoUrl ? [{ url: record.photoUrl }] : []
        this.userId = record.id
        this.highStudent.formData[3].initValue = record.hasDorm === '1' ? '住读' : '走读'
        this.highStudent.formData[4].initValue = new Date(record.admissionTime).getFullYear()
        this.highStudent.formData[6].disabled = true
        this.highStudent.formData[6].initValue1 = record.grade ? `${[record.grade]}级` : ['请选择']
        this.highStudent.formData[6].initValue2 = record.subjectName ? [record.subjectName] : ['请选择']
        this.highStudent.formData[6].initValue3 = record.className ? [record.className] : ['请选择']
        this.formStatus = true
      } else if (type === 2) {
        const path = '/basedata/bulkImport'
        this.$router.push({
          path,
          query: {
            type: 'students',
            state: 1
          }
        })
      } else {
        this.title = '添加学生'
        this.highStudent.formData = this.$tools.fillForm(highStudent.formData, {})
        this.fileList = []
        this.highStudent.formData[1].initValue = []
        this.highStudent.formData[3].initValue = []
        this.highStudent.formData[4].initValue = []
        this.highStudent.formData[6].disabled = false
        this.highStudent.formData[6].initValue1 = []
        this.highStudent.formData[6].initValue2 = []
        this.highStudent.formData[6].initValue3 = []
        this.formStatus = true
      }
    },
    submitForm(values) {
      values.hasDorm = values.hasDorm === '住读' ? '1' : values.hasDorm === '走读' ? '0' : values.hasDorm
      values.schoolCode = this.userInfo.schoolCode
      values.schoolId = this.userInfo.schoolId
      const req = {
        ...values,
        admissionTime: values.admissionTime[0] || values.admissionTime,
        photoUrl: this.fileList.length > 0 ? this.fileList[0].url : ''
      }
      let res = null
      if (this.type === 0) {
        req.grade = values.gradeCode.length !== 0 ? this.highSubTerm[values.gradeCode].gradeName : ''
        req.className = values.class.length !== 0 ? this.highClass[values.class].className : ''
        req.classCode = values.class.length !== 0 ? this.highClass[values.class].classCode : ''
        req.subjectName = values.subject.length !== 0 ? this.highSubList[values.subject].subjectName : ''
        req.subjectCode = values.subject.length !== 0 ? this.highSubList[values.subject].subjectCode : ''
        res = this.addHighStu(req)
      } else {
        req.grade = values.gradeCode.substring(0, 4)
        req.id = this.userId
        res = this.updateHighStu({ ...this.userDetail, ...req })
      }
      res
        .then(() => {
          this.keywords = ''
          this.$message.success(this.type === 0 ? '添加成功' : '编辑成功')
          this.$tools.goNext(() => {
            this.showList()
            this.$refs.form.reset()
            this.fileList = []
          })
        })
        .catch(() => {
          this.$refs.form.error()
        })
    },
    deleteList(type, record) {
      if (type) {
      } else {
        if (this.chooseList.length === 0) {
          this.$message.warning('请选择删除项')
        }
      }
    },
    goLead(path, record) {
      if (record) {
        this.$router.push({
          path,
          query: { userCode: record.userCode, id: record.id }
        })
      } else {
        this.$router.push({ path, query: { type: 'students' } })
      }
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
</style>
