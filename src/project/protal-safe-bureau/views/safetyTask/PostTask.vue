<template>
  <div class="post-task page-layout bg-fff qui-fx-ver">
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout" label="任务名称" required>
        <a-input
          placeholder="请输入任务名称"
          :disabled="true"
          v-decorator="[
            'name',
            { initialValue: appForm.address, rules: [{max: 20,required: true, message: '临时任务' } ]}
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
          v-decorator="[
            'leaderName',
            { initialValue: appForm.leaderName, rules: [{ required: true, message: '请选择负责人' }] },
          ]"
          placeholder="请选择您要限定的职务，可多选"
        >
          <a-select-option v-for="list in jobList" :key="`${list.name}+${list.code}`">
            {{ list.name }}
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
      is-radio
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
      SchoolAll: [
        {
          id: '1',
          index: 0,
          name: 'eerhu'
        },
        {
          id: '2',
          index: 0,
          name: 'eerhu'
        },
        {
          id: '3',
          index: 0,
          name: 'eerhu'
        }
      ],
      jobList: [], // 职务集合
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
    ...mapState('home', ['userInfo'])
  },
  async mounted() {
    this._getQueryjob()
  },
  methods: {
    ...mapActions('home', ['taskPublish', 'addSpecialTask', 'getQueryjob']),
    // 选择学校，负责人
    scoloolChange(value) {
      this.schoolTag = true
    },
    // 获取职务基础数据
    async _getQueryjob() {
      const req = {
        eduCode: this.userInfo.eduCode,
        category: '04' // 平台03-校端 04-局端
      }
      const res = await this.getQueryjob(req)
      this.jobList = res.data
    },
    async submitSchool(values) {
      this.schoolCode = values[0].schoolCode
      this.schoolName = values[0].schoolName
      this.appForm.schoolName = this.schoolName
      // this.getUserList(values[0].schoolCode)
      this.$refs.ChooseSchool.reset()
    },

    submitOk(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        this.isLoad = false
        if (!error) {
          const req1 = {
            publisherCode: this.userInfo.schoolCode,
            publisherName: this.userInfo.userName,
            taskId: this.taskId,
            users: [
              {
                orgCode: '',
                orgName: '',
                schoolCode: '',
                userCode: '',
                userName: ''
              }
            ]
          }
          // const req = {
          //  	beginTime: this.beginTime,
          //   endTime: this.endTime,
          //   itemIdList: this.selectItem,
          //   name: values.name,
          //   schoolCode: this.userInfo.schoolCode
          // }
          this.isLoad = true
          this.taskPublish(req)
            .then(res => {
              // console.log(res)
              this.$message.success('操作成功')
              this.$tools.goNext(() => {
                this.$router.go(-1)
              })
            })
            .catch(res => {
              this.isLoad = false
            })
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
