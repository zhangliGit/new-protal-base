<template>
  <div class="subject page-layout qui-fx">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
    <no-data msg="暂无学科" v-if="false">
      <div slot="btn">
        <a-button type="primary" @click="addSubject(0)"> <a-icon type="plus" />添加学科</a-button>
      </div>
    </no-data>
    <div class="qui-fx qui-fx-jsb" style="width:100%" v-else>
      <div class="left">
        <div class="grade-tree">
          <a-skeleton v-if="treeData.length === 0" active :paragraph="{rows: 10}" />
          <a-tree
            v-if="treeData.length > 0"
            @select="gradeSelect"
            :treeData="treeData"
            :defaultExpandAll="true"
            :defaultSelectedKeys="['all']"
          >
          </a-tree>
        </div>
      </div>
      <div class="right qui-fx-ver qui-fx-f1">
        <div class="add qui-fx qui-fx-je">
          <a-button type="primary" @click="addSubject(0)"> <a-icon type="plus" />添加学科</a-button>
        </div>
        <table-list
          :page-list="pageList"
          :columns="columns"
          :table-list="subjectList">
          <template v-slot:actions="action">
            <a-tooltip placement="topLeft" title="编辑">
              <a-button size="small" class="edit-action-btn" icon="form" @click.stop="addSubject(1, action.record)"></a-button>
            </a-tooltip>
            <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="deleteList(action.record)">
              <template slot="title">
                您确定删除吗?
              </template>
              <a-tooltip placement="topLeft" title="删除">
                <a-button size="small" class="del-action-btn" icon="delete"></a-button>
              </a-tooltip>
            </a-popconfirm>
          </template>
        </table-list>
        <page-num v-model="pageList" :total="total" @change-page="getMoreSubject"></page-num>
      </div>
    </div>
  </div></template>

<script>
import editImg from '../../assets/img/database/role/edit.png'
import deleteImg from '../../assets/img/database/role/delete.png'
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import NoData from '@c/NoData'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm'
const columns = [
  {
    title: '序号',
    width: '20%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '年级',
    dataIndex: 'gradeName',
    width: '20%'
  },
  {
    title: '学科名称',
    dataIndex: 'subjectName',
    width: '20%'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '20%'
  },
  {
    title: '操作',
    width: '30%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const formData = [
  {
    value: 'subjectName',
    initValue: '',
    type: 'input',
    label: '学科名称',
    placeholder: '请输入学科名称'
  },
  {
    value: 'gradeCode',
    initValue: [],
    list: [],
    type: 'select',
    label: '所属年级',
    placeholder: '请选择所属年级'
  },
  {
    value: 'remark',
    initValue: '',
    type: 'input',
    label: '备注',
    required: false,
    placeholder: '请输入备注'
  }
]

export default {
  name: 'Subject',
  components: {
    TableList,
    NoData,
    PageNum,
    SubmitForm
  },
  data () {
    return {
      editImg,
      deleteImg,
      columns,
      formData,
      treeData: [
        {
          title: '全部',
          key: 'all',
          children: []
        }
      ],
      formStatus: false,
      total: 0,
      title: '添加学科',
      pageList: {
        page: 1,
        size: 20
      },
      gradeCode: '',
      gradeName: '',
      gradeId: '',
      subjectList: [],
      type: 0,
      id: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted () {
    this.getGrade()
    this.getSubjectList()
  },
  methods: {
    ...mapActions('home', [
      'getGradeList', 'addSub', 'editSub', 'getSubById', 'getSubList', 'deleteSub'
    ]),
    async getGrade () {
      this.formData[1].list = []
      const req = {
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getGradeList(req)
      if (res.data.list.length > 0) {
        res.data.list.forEach(ele => {
          this.treeData[0].children.push({ title: ele.name, key: ele.code })
          this.formData[1].list.push({ key: ele.code, val: ele.name, id: ele.id })
        })
      }
    },
    gradeSelect (selectedKeys, info) {
      this.gradeCode = selectedKeys[0] === 'all' ? '' : selectedKeys[0]
      this.getSubjectList(this.gradeCode)
      this.formData[1].initValue = selectedKeys[0] === 'all' ? [] : selectedKeys[0]
    },
    getMoreSubject () {
      this.getSubjectList(this.gradeCode)
    },
    async getSubjectList (gradeCode = '') {
      const req = {
        ...this.userInfo,
        ...this.pageList,
        gradeCode
      }
      const res = await this.getSubList(req)
      this.subjectList = res.data.list
      console.log(this.subjectList)
      this.total = res.data.total
    },
    addSubject (type, record) {
      this.formStatus = true
      if (type) {
        this.title = '编辑学科'
        this.formData = this.$tools.fillForm(formData, record)
        this.type = 1
        this.id = record.id
      } else {
        this.title = '添加学科'
        this.formData = formData
        this.type = 0
      }
    },
    submitForm (values) {
      this.gradeName = this.formData[1].list.filter(ele => ele.key === values.gradeCode)[0].val
      const req = {
        ...this.userInfo,
        ...values,
        gradeName: this.gradeName,
        gradeId: this.formData[1].list.filter(ele => ele.key === values.gradeCode)[0].id
      }
      if (!this.type) {
        this.addSub(req).then(res => {
          this.$message.success('添加成功')
          this.$tools.goNext(() => {
            this.gradeSelect([this.gradeCode])
            this.$refs.form.reset()
          })
        }).catch(() => {
          this.$refs.form.error()
        })
      } else {
        req.id = this.id
        this.editSub(req).then(res => {
          this.$message.success('编辑成功')
          this.$tools.goNext(() => {
            this.gradeSelect([this.gradeCode])
            this.$refs.form.reset()
          })
        }).catch(() => {
          this.$refs.form.error()
        })
      }
    },
    deleteList (record) {
      this.deleteSub(record.id).then(res => {
        this.$message.success('删除成功')
        this.$tools.goNext(() => {
          this.getSubjectList(this.gradeCode)
        })
      }).catch(() => {
        this.$refs.form.error()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.subject{
  height: 100%;
  background: #fff;
  .left{
    padding: 10px;
    .grade-tree {
      width: 200px;
      min-height: 400px;
      max-height: 800px;
      overflow-y: auto
    }
  }
  .right{
    padding: 0 10px;
    border-left: 1px solid @bor-color;
    .add{
      margin:10px 0;
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
}
</style>
