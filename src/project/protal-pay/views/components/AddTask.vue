<template>
  <div class=" addTask page-layout qui-fx-ver">
    <a-form :form="form">
      <a-form-item label="任务名称：" :label-col="{ span: 2 }" :wrapper-col="{ span: 10}">
        <a-input
          v-decorator="[
            'title',
            { initialValue: appForm.title, rules: [{ required: true, message: '请填写任务名称', whitespace: true }] }
          ]"
          placeholder="请输入任务名称"
        />
      </a-form-item>
          <a-form-item label="收费截止日期"  :label-col="{ span: 2 }" :wrapper-col="{ span: 10}">
        <a-date-picker
          format="YYYY-MM-DD"
          v-decorator="[
            'endTime',
            {
              initialValue: appForm.endTime,
              rules: [{ required: true, message: '请选择截止日期' }]
            }
          ]"
        />
      </a-form-item>
             <a-form-item label="收费项"  :label-col="{ span: 2 }" :wrapper-col="{ span: 10}" required>
            <a-button  icon="plus" class="add-btn"  @click="add">添加</a-button>
      <table-list isZoom :columns="columns" :table-list="recordList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="查看详情">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="detail(action.record.id)"></a-button>
        </a-tooltip>
      </template>
    </table-list>
      </a-form-item>
        <a-form-item label="收费对象"  :label-col="{ span: 2 }" :wrapper-col="{ span: 10}" required>
          <div class="choose-input" @click="teacherSelect">
            <div class="p" v-if="chooseTeachersDeatil.length === 0">请点击选择收费对象</div>
            <template v-for="tag in chooseTeachersDeatil">
              <a-tag
                color="purple"
                @click.stop.prevent
                :key="tag.userCode"
                :closable="true"
                @close.stop="() => userClose(tag)">{{ tag.userName }}</a-tag>
            </template>
          </div>
        </a-form-item>
      <a-form-item>
            <a-form-item :wrapper-col="{ span: 10, offset: 2 }">
        <a-button style="margin-right:50px;" @click="cancle">取消</a-button>
        <a-button type="primary" @click="handleSubmit" :loading="state.loginBtn" :disabled="state.loginBtn">保存</a-button>
      </a-form-item>
      </a-form-item>
    </a-form>
     <choose-user
      is-check
      ref="form"
      :teacherList="chooseTeachersDeatil"
      v-if="userTag"
      v-model="userTag"
      @submit="submit"
      title="选择物品管理员"
    >
    </choose-user>
        <add-charges ref="addcharges" :title="title" ></add-charges>
  </div>
</template>
<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import ChooseUser from '@c/choose/ChooseUser'
import TableList from '@c/TableList'
import Addcharges from './Addcharges'
const columns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '收费项',
    dataIndex: 'applicantName',
    width: '15%'
  },
  {
    title: '收费标准',
    dataIndex: 'applicantName1',
    width: '15%'
  },
  {
    title: '数量',
    dataIndex: 'applicantName2',
    width: '15%'
  },
  {
    title: '总金额',
    dataIndex: 'applicantName3',
    width: '15%'
  },
  {
    title: '创建人',
    dataIndex: 'applicantName4',
    width: '15%'
  },
  {
    title: '操作',
    width: '15%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'AddTask',
  components: {
    ChooseUser,
    TableList,
    Addcharges
  },
  data() {
    return {
      moment,
      form: this.$form.createForm(this),
      appForm: {
        schoolCode: '',
        title: '',
        endTime: ''
      },
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0,
        smsSendBtn: false
      },
      loading: false,
      userTag: false,
      chooseTeachersDeatil: [],
      recordList: [],
      columns
    }
  },
  props: {
    refBuildList: {
      type: Object,
      default: function() {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  created() {},
  watch: {},
  computed: {
    ...mapState('home', ['userInfo'])
  },
  methods: {
    ...mapActions('home', ['addNotice', 'updateNotice', 'getNoticeDetail', 'getTeaList', 'getStuList']),
    teacherSelect() {
      this.userTag = true
    },
    userClose(removedTag) {
      this.chooseTeachersDeatil = this.chooseTeachersDeatil.filter((tag) => tag !== removedTag)
    },
    async submit(values) {
      this.$refs.form.reset()
      this.chooseTeachersDeatil = []
      values.forEach((ele) => {
        this.chooseTeachersDeatil.push({
          userName: ele.userName,
          userCode: ele.userCode
        })
      })
    },
    add() {
      this.$refs.addCharges.addVisible = true
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const adType = this.$route.query.type
          if (this.teacherList.length === 0 && this.classList.length === 0) {
            this.$message.warning('请选择发布对象')
            return
          }
          if (this.classList.length !== 0) {
            this.schoolYearId = this.classList[0].schoolYearId
          }
          this.classCodeList = []
          this.classList.forEach((el) => {
            this.classCodeList.push(el.classCode)
          })
          this.userList = []
          this.teacherList.forEach((el) => {
            this.userList.push(el.userCode)
          })
          const req = {
            schoolCode: this.userInfo.schoolCode,
            createBy: this.userInfo.userName,
            content: values.content,
            title: values.title,
            userCodes: this.userList,
            classCodes: this.classCodeList,
            schoolYearId: this.schoolYearId,
            showFull: this.appForm.showFull === true ? 1 : 2,
            fullEnd: this.appForm.endTime,
            fullStart: this.appForm.startTime,
            creatorCode: this.userInfo.userCode
          }
          this.addNotice(req).then((res) => {
            this.$message.success('添加成功')
            this.$tools.goNext(() => {
              this.$router.push({
                path: '/SchoolNotice'
              })
            })
          })
        }
      })
    },
    cancle() {
      this.$router.push({
        path: '/SchoolNotice'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.choose-input {
  border: 1px solid @bor-color;
  border-radius: @radius;
  width: 100%;
  min-height: 32px;
  line-height: 32px;
  padding: 0 10px;
  .p {
    height: 30px;
    line-height: 30px;
    color: @dark-color;
  }
}
.addTask {
  background: #fff;
  padding-top: 20px;
  overflow: auto;
}
</style>
