<template>
  <div class="post-task page-layout bg-fff qui-fx-ver">
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout" label="任务名称" required>
        <a-input
          placeholder="请输入任务名称"
          :disabled="true"
          v-decorator="[
            'name',
            { initialValue: appForm.address, rules: [{max: 20,required: false, message: '临时任务' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item label="接受学校：" v-bind="formItemLayout" required>
        <a-input
          @click="scoloolChange"
          placeholder="请选择接受学校"
          v-decorator="[
            'specificIndicators',
            { initialValue: appForm.schoolName, rules: [ {required: true, message: '请选择专项指标' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="限定职务：" required>
        <a-select
          mode="multiple"
          v-decorator="[
            'checkJobList',
            { initialValue: appForm.leaderName, rules: [{ required: true, message: '请选择负责人' }] },
          ]"
          placeholder="请选择您要限定的职务，可多选"
        >
          <a-select-option v-for="list in jobList" :key="`${list.jobName}`">
            {{ list.jobName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" :style="{ textAlign: 'center' }">
        <a-button @click="cancel">取消</a-button>
        <a-button class="mar-l10" type="primary" @click="submitOk" :disabled="isLoad">确定</a-button>
      </a-form-item>
    </a-form>
    <!-- 选择接受学校 -->
    <choose-school
      type="edu"
      is-check
      :teacherList="chooseTeachersDeatil"
      ref="ChooseSchool"
      v-if="schoolTag"
      v-model="schoolTag"
      @submit="submitSchool"
      title="选择学校"
    >
    </choose-school>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChooseSchool from '@c/choose/ChooseSchool'
export default {
  name: 'PostTask',
  components: {
    ChooseSchool
  },
  data() {
    this.groupList = []
    return {
      taskId: this.$route.query.id,
      form: this.$form.createForm(this),
      SchoolAll: [],
      jobList: [
        // {
        //   'id': 100,
        //   'jobCode': 'J14x1qwxj8izeq',
        //   'jobName': '局领导',
        //   'remark': '系统预设',
        //   'createTime': 1599554672000,
        //   'employeesNum': null,
        //   'eduCode': 'QPJYJ',
        //   'eduName': '全品教育局',
        //   'userCodes': '',
        //   'userNames': '',
        //   'defaultState': '0'
        // },
        // {
        //   'id': 101,
        //   'jobCode': 'J14x1qwxj8izer',
        //   'jobName': '安保科科长',
        //   'remark': '系统预设',
        //   'createTime': 1599554672000,
        //   'employeesNum': null,
        //   'eduCode': 'QPJYJ',
        //   'eduName': '全品教育局',
        //   'userCodes': '',
        //   'userNames': '',
        //   'defaultState': '0'
        // },
        // {
        //   'id': 102,
        //   'jobCode': 'J14x1qwxj8izes',
        //   'jobName': '安保科科长',
        //   'remark': '系统预设',
        //   'createTime': 1599554672000,
        //   'employeesNum': null,
        //   'eduCode': 'QPJYJ',
        //   'eduName': '全品教育局',
        //   'userCodes': '',
        //   'userNames': '',
        //   'defaultState': '0'
        // },
        // {
        //   'id': 103,
        //   'jobCode': 'J14x1qwxj8izet',
        //   'jobName': '督察员',
        //   'remark': '系统预设',
        //   'createTime': 1599554672000,
        //   'employeesNum': null,
        //   'eduCode': 'QPJYJ',
        //   'eduName': '全品教育局',
        //   'userCodes': 'U14omcc5vig05s,',
        //   'userNames': '刘老师,',
        //   'defaultState': '0'
        // },
        // {
        //   'id': 104,
        //   'jobCode': 'J14x1qwxj8izeu',
        //   'jobName': '局职员',
        //   'remark': '系统预设',
        //   'createTime': 1599554672000,
        //   'employeesNum': null,
        //   'eduCode': 'QPJYJ',
        //   'eduName': '全品教育局',
        //   'userCodes': '',
        //   'userNames': '',
        //   'defaultState': '0'
        // }
      ], // 职务集合
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      // 选择学校，指定人
      schoolCode: '', // 指定学校
      schoolName: '', // 指定学校
      schoolTag: false,
      chooseTeachersDeatil: [],
      // xiaozuData,
      isLoad: false,
      appForm: {
        supervisionTeam: '',
        specificIndicators: ''
      },
      count: 0
    }
  },
  computed: {
    ...mapState('home', ['userInfo', 'eduCode'])
  },
  async created() {
  },
  async mounted() {
  },
  methods: {
    ...mapActions('home', ['taskPublish', 'getQueryjob']),
    // 选择学校，负责人
    scoloolChange(value) {
      this.schoolTag = true
    },
    async submitSchool(values) {
      this.appForm.schoolName = values.map(v => v.schoolName) + ''
      this.SchoolAll = values
      this.$refs.ChooseSchool.reset()
      if (values.length === 0) return
      this._getJobAll(values[0].schoolCode) // 用第一个学校差所有的学校预设职务
    },
    // 获取职务基础数据
    async _getJobAll(schoolCode) {
      const req = {
        eduCode: schoolCode,
        category: '03' // 平台03-校端 04-局端
      }
      const res = await this.getQueryjob(req)
      this.jobList = res.data
    },
    // 根据选中的学校
    submitOk(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        this.isLoad = false
        console.log(values)
        this.searchPeople(values.checkJobList, this.SchoolAll)
        if (!error) {
          // const req1 = {
          //   publisherCode: this.userInfo.userCode,
          //   publisherName: this.userInfo.userName,
          //   taskId: this.taskId,
          //   users: [
          //     {
          //       orgCode: '',
          //       orgName: '',
          //       schoolCode: '',
          //       userCode: '',
          //       userName: ''
          //     }
          //   ]
          // }
          // this.isLoad = true
          // this.taskPublish(req)
          //   .then(res => {
          //     // console.log(res)
          //     this.$message.success('操作成功')
          //     this.$tools.goNext(() => {
          //       this.$router.go(-1)
          //     })
          //   })
          //   .catch(res => {
          //     this.isLoad = false
          //   })
        }
      })
    },
    onOk(value) {
      // console.log('onOk: ', value)
    },
    cancel() {
      this.$router.go(-1)
    }

  }
}
</script>
<style lang="less" scoped>
.post-task {
  padding: 20px;
}
</style>
