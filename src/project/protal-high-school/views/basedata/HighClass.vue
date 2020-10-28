<template>
  <div class="class page-layout qui-fx">
    <choose-user
      is-radio
      ref="chooseForm"
      v-if="userTag"
      v-model="userTag"
      @submit="chooseTeacher"
      title="添加班主任"
    ></choose-user>
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="formStatus"
      :form-data="type === 2 ? highClass.formDatas : type === 3 ? highClass.roomData : highClass.formData"
      @classRoom="addClassRoom"
    ></submit-form>
    <div class="qui-fx qui-fx-jsb" style="width:100%">
      <div class="left">
        <major-tree @select="select"></major-tree>
      </div>
      <div class="right qui-fx-ver qui-fx-f1" style="padding-right: 10px">
        <search-form is-reset @search-form="searchForm" :search-label="highClass.searchLabel">
          <div slot="left">
            <a-button icon="plus" class="add-btn" @click="addClass(0)">添加</a-button>
            <a-button icon="export" class="export-all-btn" @click.stop="addClass(2)">批量添加</a-button>
            <a-button icon="delete" class="del-btn" @click.stop="deleteList(0)">批量删除</a-button>
            <a-button icon="delete" class="power-action-btn" @click.stop="deleteList(0)">批量解绑辅导员</a-button>
            <a-button icon="delete" class="del-action-btn" @click.stop="deleteList(0)">批量解绑教室</a-button>
          </div>
        </search-form>
        <class-table
          is-check
          is-zoom
          @clickRow="clickRow"
          :page-list="pageList"
          v-model="chooseList"
          :columns="highClass.columns"
          :table-list="classList"
        >
          <template v-slot:editClassRooms="editClassRoom">
            <div class="qui-fx">
              <span
                class="tab-add"
                v-if="editClassRoom.record.placeName === ''"
                @click.stop="addClass(3, editClassRoom.record)"
              >
                <a-tag color="green">添加</a-tag>
              </span>
              <span v-else>
                {{ editClassRoom.record.placeName }}
                <a-popconfirm
                  placement="left"
                  okText="确定"
                  cancelText="取消"
                  @confirm.stop="untie(0, editClassRoom.record)"
                >
                  <template slot="title">您确定解绑吗?</template>
                  <a-tooltip placement="topLeft" title="解绑">
                    <a-icon class="mouse mar-l10" type="unlock" />
                  </a-tooltip>
                </a-popconfirm>
              </span>
            </div>
          </template>
          <!-- <template
            v-slot:editClassRooms="editClassRoom"
          >{{ editClassRoom.record.placeName }}</template> -->
          <template v-slot:editClassTeachers="editClassTeacher">
            <div class="qui-fx">
              <span
                class="tab-add"
                v-if="editClassTeacher.record.teacherName === ''"
                @click.stop="addClass(4, editClassTeacher.record)"
              >
                <a-tag color="green">添加</a-tag>
              </span>
              <span v-else>
                {{ editClassTeacher.record.teacherName }}
                <a-popconfirm
                  placement="left"
                  okText="确定"
                  cancelText="取消"
                  @confirm.stop="untie(1, editClassTeacher.record)"
                >
                  <template slot="title">您确定解绑吗?</template>
                  <a-tooltip placement="topLeft" title="解绑">
                    <a-icon class="mouse mar-l10" type="unlock" />
                  </a-tooltip>
                </a-popconfirm>
              </span>
            </div>
          </template>
          <!-- <template v-slot:editClassTeachers="editClassTeacher" >{{ editClassTeacher.record.teacherName }}</template> -->
          <template v-slot:totalNum1s="totalNum1">
            <div
              class="table-total-num"
              @click.stop="goDetail('/basedata/highDetail', totalNum1.record, '1')"
            >{{ totalNum1.record.count }}</div>
          </template>
          <template v-slot:totalNum2s="totalNum2">
            <div
              class="table-total-num"
              @click.stop="goDetail('/basedata/highDetail', totalNum2.record, '2')"
            >{{ totalNum2.record.teacherTotal ? totalNum2.record.teacherTotal : 0 }}</div>
          </template>
          <template v-slot:actions="action">
            <a-tooltip placement="topLeft" title="详情">
              <a-button
                size="small"
                class="detail-action-btn"
                icon="ellipsis"
                @click.stop="goDetail('/basedata/highDetail', action.record)"
              ></a-button>
            </a-tooltip>
            <a-tooltip placement="topLeft" title="编辑">
              <a-button
                size="small"
                class="edit-action-btn"
                icon="form"
                @click.stop="addClass(1, action.record)"
              ></a-button>
            </a-tooltip>
            <a-popconfirm
              placement="left"
              okText="确定"
              cancelText="取消"
              @confirm.stop="deleteList(1, action.record)"
            >
              <template slot="title">您确定删除吗?</template>
              <a-tooltip placement="topLeft" title="删除">
                <a-button size="small" class="del-action-btn" icon="delete"></a-button>
              </a-tooltip>
            </a-popconfirm>
          </template>
        </class-table>
        <page-num v-model="pageList" :total="total" @change-page="showMore"></page-num>
      </div>
    </div>
  </div>
</template>

<script>
import highClass from '../../assets/js/table/highClass.js'
import { mapState, mapActions } from 'vuex'
import ClassTable from '../components/ClassTable'
import MajorTree from '../components/MajorTree'
import GradeTree from '@c/GradeTree'
import PageNum from '@c/PageNum'
import SubmitForm from '../components/SubForm'
import SearchForm from '@c/SearchForm'
import ChooseUser from '@c/ChooseUser'

export default {
  name: 'HighClass',
  components: {
    ClassTable,
    GradeTree,
    PageNum,
    SubmitForm,
    SearchForm,
    ChooseUser,
    MajorTree
  },
  data() {
    return {
      highClass,
      title: '添加班级',
      formStatus: false,
      schoolYearId: '',
      gradeCode: '',
      classCode: '',
      gradeId: '',
      gradeName: '',
      chooseList: [],
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      classList: [],
      gradeList: [],
      type: 0,
      yearList: [],
      isNewYear: true,
      teacherName: '',
      placeName: '',
      record: null,
      userTag: false,
      schoolYear: '',
      highSubList: [],
      highSubTerm: [],
      searchList: {}
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created() {
    this.getGrade()
    this._getSubjectList()
  },
  methods: {
    ...mapActions('home', [
      'getHighClass', 'getGradeList', 'addHighClass', 'addClassList', 'addHighClasses',
      'deleteTheClass', 'editTheClass', 'addPlace', 'getHighTerm', 'getHighSub'
    ]),
    // 获取学年
    async getGrade() {
      this.highClass.formData[0].list = []
      this.highClass.formDatas[0].list = []
      this.gradeList = []
      const req = {
        schoolCode: this.userInfo.schoolCode,
        page: 1,
        size: 99999
      }
      const res = await this.getHighTerm(req)
      if (res.data.records.length === 0) {
        return
      }
      this.highSubTerm = res.data.records
      res.data.records.forEach(ele => {
        this.highClass.formData[0].list.push({ key: ele.schoolYearCode, val: ele.schoolYearName })
        this.highClass.formDatas[0].list.push({ key: ele.schoolYearCode, val: ele.schoolYearName })
        // this.gradeList.push({ key: ele.schoolYearCode, val: ele.schoolYearName })
      })
    },
    // 获取专业
    async _getSubjectList() {
      this.highClass.formData[1].list = []
      this.highClass.formDatas[1].list = []
      const req = {
        page: 1,
        size: 99999
      }
      const res = await this.getHighSub(req)
      if (res.data.records.length === 0) {
        return
      }
      this.highSubList = res.data.records
      res.data.records.forEach(ele => {
        this.highClass.formData[1].list.push({ key: ele.subjectCode, val: ele.subjectName })
        this.highClass.formDatas[1].list.push({ key: ele.subjectCode, val: ele.subjectName })
        // this.gradeList.push({ key: ele.subjectCode, val: ele.subjectName })
      })
    },
    // 添加场地
    addClassRoom(val) {
      this.placeName = val
    },
    // 选中年级
    select(item) {
      this.searchList.gradeName = item.gradeName
      this.searchList.subjectCode = item.subjectCode || ''
      this.searchList.classCode = item.classCode || ''
      this.showList()
    },
    // 模糊查询
    searchForm(values) {
      this.teacherName = values.teacherName
      const req = {
        ...this.pageList,
        ...this.userInfo,
        schoolYearId: this.schoolYearId,
        gradeCode: this.gradeCode,
        classCode: this.classCode,
        teacherName: values.teacherName
      }
      this.showList(req)
    },
    // 翻页
    showMore() {
      const req = {
        ...this.pageList,
        ...this.userInfo,
        schoolYearId: this.schoolYearId,
        gradeCode: this.gradeCode,
        classCode: this.classCode,
        teacherName: this.teacherName
      }
      this.showList(req)
    },
    // 提交
    submitForm(values) {
      values.schoolCode = this.userInfo.schoolCode
      values.gradeName = this.highSubTerm.filter(el => el.schoolYearCode === values.gradeCode)[0].schoolYearName
      values.subjectName = this.highSubList.filter(el => el.subjectCode === values.subjectCode)[0].subjectName
      if (this.type === 0) {
        this.addHighClass(values)
          .then(res => {
            this.$message.success('添加成功')
            this.$tools.goNext(() => {
              const data = {
                ...this.pageList,
                ...this.userInfo,
                schoolYearId: this.schoolYearId,
                gradeCode: this.gradeCode,
                classCode: this.classCode
              }
              this.showList(data)
              this.$refs.form.reset()
            })
          })
          .catch(() => {
            this.$refs.form.error()
          })
      } else if (this.type === 1) {
        const req = {
          ...this.userInfo,
          schoolYearId: this.schoolYearId,
          gradeCode: this.record.gradeCode,
          className: values.className,
          id: this.record.id,
          remark: values.remark,
          placeName: this.record.placeName,
          placeId: this.record.placeId
        }
        this.editTheClass(req)
          .then(res => {
            this.$message.success('编辑成功')
            this.$tools.goNext(() => {
              const data = {
                ...this.pageList,
                ...this.userInfo,
                schoolYearId: this.schoolYearId,
                gradeCode: this.gradeCode,
                classCode: this.classCode
              }
              this.showList(data)
              this.$refs.form.reset()
            })
          })
          .catch(() => {
            this.$refs.form.error()
          })
      } else if (this.type === 2) {
        this.addHighClasses(values)
          .then(res => {
            this.$message.success('添加成功')
            this.$tools.goNext(() => {
              this.showList()
              this.$refs.form.reset()
            })
          })
          .catch(() => {
            this.$refs.form.error()
          })
      } else if (this.type === 3) {
        const req = {
          id: this.record.id,
          placeId: values.placeName.join(','),
          teacherId: this.record.teacherId,
          schoolYearId: this.schoolYearId
        }
        this.addPlace(req)
          .then(res => {
            this.$message.success('绑定成功')
            this.$tools.goNext(() => {
              const data = {
                ...this.pageList,
                ...this.userInfo,
                schoolYearId: this.schoolYearId,
                gradeCode: this.gradeCode,
                classCode: this.classCode
              }
              this.showList(data)
              this.$refs.form.reset()
            })
          })
          .catch(() => {
            this.$refs.form.error()
          })
      }
    },
    // 编辑添加
    addClass(type, record) {
      this.formStatus = true
      this.type = type
      if (type === 1) {
        this.title = '编辑班级'
        this.highClass.formData = this.$tools.fillForm(highClass.formData, record)
        this.record = record
        this.highClass.formData[0].disabled = true
      } else if (type === 2) {
        this.title = '批量添加班级'
        this.highClass.formDatas[0].disabled = false
      } else if (type === 0) {
        this.title = '添加班级'
        this.highClass.formData[0].disabled = false
      } else if (type === 3) {
        this.title = '添加教室'
        this.record = record
      } else if (type === 4) {
        this.formStatus = false
        this.title = '添加班主任'
        this.userTag = true
        this.record = record
      }
    },
    // 解绑
    untie(type, record) {
      const req = {
        ...this.userInfo,
        id: record.id,
        placeName: type === 0 ? '' : record.placeName,
        placeId: type === 0 ? '' : record.placeId,
        teacherName: type === 1 ? '' : record.teacherName,
        teacherId: type === 1 ? '' : record.teacherId,
        schoolYearId: this.schoolYearId
      }
      this.addPlace(req)
        .then(res => {
          this.$message.success('解绑成功')
          this.$tools.goNext(() => {
            const data = {
              ...this.pageList,
              ...this.userInfo,
              schoolYearId: this.schoolYearId,
              gradeCode: this.gradeCode,
              classCode: this.classCode
            }
            this.showList(data)
            this.$refs.form.reset()
          })
        })
        .catch(() => {
          this.$refs.form.error()
        })
    },
    // 绑定班主任
    chooseTeacher(value) {
      const req = {
        schoolCode: this.userInfo.schoolCode,
        schoolId: this.userInfo.schoolId,
        id: this.record.id,
        teacherName: value[0].userName,
        teacherId: value[0].id,
        placeId: this.record.placeId,
        schoolYearId: this.schoolYearId
      }
      this.addPlace(req)
        .then(res => {
          this.$message.success('绑定成功')
          this.$tools.goNext(() => {
            const data = {
              ...this.pageList,
              ...this.userInfo,
              schoolYearId: this.schoolYearId,
              gradeCode: this.gradeCode,
              classCode: this.classCode
            }
            this.showList(data)
            this.$refs.chooseForm.reset()
          })
        })
        .catch(() => {
          this.$refs.chooseForm.error()
        })
    },
    // 查询班级列表
    async showList() {
      this.searchList.schoolCode = this.userInfo.schoolCode
      this.searchList = Object.assign(this.searchList, this.pageList)
      const res = await this.getHighClass(this.searchList)
      if (!res.data.records) {
        this.classList = []
        return
      }
      this.classList = res.data.records
      this.total = res.data.total
    },
    // 删除班级
    async deleteList(type, record) {
      let ids = []
      if (type) {
        ids = [record.id]
        await this.deleteTheClass(ids)
        this.$message.success('删除成功')
        this.$tools.goNext(() => {
          const data = {
            ...this.pageList,
            ...this.userInfo,
            schoolYearId: this.schoolYearId,
            gradeCode: this.gradeCode,
            classCode: this.classCode
          }
          this.showList(data)
        })
      } else {
        if (this.chooseList.length === 0) {
          this.$message.warning('请选择删除项')
          return
        }
        ids = this.chooseList
        this.$tools.delTip('您确定删除吗?', () => {
          this.deleteTheClass(ids).then(res => {
            this.$message.success('删除成功')
            this.$tools.goNext(() => {
              const data = {
                ...this.pageList,
                ...this.userInfo,
                schoolYearId: this.schoolYearId,
                gradeCode: this.gradeCode,
                classCode: this.classCode
              }
              this.showList(data)
            })
          })
        })
      }
    },
    // 选中列表项
    clickRow(id) {
      
    },
    // 详情
    goDetail(path, record, type = '1') {
      this.$router.push({
        path,
        query: {
          id: record.id,
          schoolYear: this.schoolYear,
          schoolYearId: record.schoolYearId,
          classCode: record.classCode,
          gradeCode: record.gradeCode,
          isNewYear: this.isNewYear ? '1' : '0',
          type
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.class {
  height: 100%;
  background: #fff;
  .left {
    padding: 10px;
  }
  .table-total-num {
    cursor: pointer;
  }
  .right {
    border-left: 1px solid @bor-color;
    padding: 0 0 0 10px;
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
.tab-add {
  cursor: pointer;
  color: #6882da;
}
</style>
