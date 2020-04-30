<template>
  <div class="set-up page-layout qui-fx-ver">
    <a-form :form="form" :style="{ maxHeight: maxHeight }">
      <div>
        <div class="title-box" style="margin-bottom:10px;">
          <span class="title-icon"></span>
          <span class="title-text">温度设置</span>
        </div>
        <a-row :gutter="24" v-for="item in tempList" :key="item.id">
          <a-col :span="11">
            <a-form-item :label="item.bodyPartsName" :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
              <a-input-number
                @blur="tempChange"
                v-decorator="[
                  `${item.bodyPartsCode}+${item.bodyPartsName}=${item.id}-${item.temperature}`,
                  { initialValue: item.temperature, rules: [{ required: true, message: '请填写发热温度值' }] }
                ]"
              />
            </a-form-item>
          </a-col>
          <!--<a-col :span="13">（腋下、颈部等测温采用该值，同时未知的测温位置测温默认采用该值）</a-col>-->
        </a-row>
      </div>
      <div>
        <div class="title-box" style="margin-bottom:10px;">
          <span class="title-icon"></span>
          <span class="title-text">校医人员设置</span>
        </div>
        <a-form-item label="校医人员" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-tag closable v-for="item in appForm.teacher" @close="del(item.id)" :key="item.id">
            {{ item.userName }}
          </a-tag>
          <a-tag @click="chooseDoctor" style="background: #fff; borderStyle: dashed;">
            <a-icon type="plus" /> 添加
          </a-tag>
          <!-- <a-input
            readOnly
            v-decorator="[
              'teacher',
              {initialValue: appForm.teacher, rules: [{ required: true, message: '请选择校医人员' }]}
            ]"
            @click="chooseDoctor"
          /> -->
        </a-form-item>
      </div>
      <div>
        <div class="title-box" style="margin-bottom:10px;">
          <span class="title-icon"></span>
          <span class="title-text">发热通知设置</span>
        </div>
        <a-form-item v-bind="formItemLayout" label="教职工发热通知" required>
          <a-checkbox-group @change="teacherSelfChange" v-model="teacherSelf">
            <a-checkbox value="PERSON01">本人</a-checkbox>
          </a-checkbox-group>
          <a-checkbox-group @change="teacherDocChange" v-model="teacherDoc">
            <a-checkbox value="PERSON02">校医</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="学生发热通知" required>
          <a-checkbox-group @change="studentSelfChange" v-model="studentSelf">
            <a-checkbox value="PERSON03">家长</a-checkbox>
          </a-checkbox-group>
          <a-checkbox-group @change="studentTeacherChange" v-model="studentTeacher">
            <a-checkbox value="PERSON04">班主任</a-checkbox>
          </a-checkbox-group>
          <a-checkbox-group @change="studentDocChange" v-model="studentDoc">
            <a-checkbox value="PERSON02">校医</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="通知方式" required>
          <a-checkbox-group @change="weChatChange" v-model="weChat">
            <a-checkbox value="MSG01">公众号</a-checkbox>
          </a-checkbox-group>
          <a-checkbox-group @change="messageChange" v-model="messageDoc">
            <a-checkbox value="MSG02">短信</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </div>
      <!-- <div style="height:30px;">
          <div class="title-box" style="margin-bottom:10px;">
          <span class="title-icon"></span>
          <span class="title-text">上报提醒</span>
        </div>
        <a-row :gutter="24">
          <a-col :span="11">
            <a-form-item
              label="开启上报提醒"
              :label-col="{ span: 18 }"
              :wrapper-col="{ span: 6 }"
              required
            >
              <a-switch
                v-decorator="['switch', { initialValue: appForm.switch,valuePropName: 'checked' }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="13">（开启后教职工和家长微信公众号将定时收到上报提醒消息）</a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="11">
            <a-form-item
              label="发送提醒时间"
              :label-col="{ span: 16 }"
              :wrapper-col="{ span: 8 }"
              required
            >
              <div
                class="qui-fx"
                style="margin-top:10px"
                v-for="(item,index) in timeList"
                :key="index"
              >
                <a-time-picker :defaultValue="moment('12:08', 'HH:mm')" format="HH:mm" />
                <a-button
                  size="small"
                  class="del-action-btn"
                  icon="delete"
                  style="margin-left:10px;"
                  @click="del(index)"
                ></a-button>
              </div>
              <a-button size="small" class="add-action-btn" icon="plus" @click="add"></a-button>
            </a-form-item>
          </a-col>
          <a-col :span="13">（截止时间为发送时间2小时后）</a-col>
        </a-row>-->
      <!-- <a-row>
          <a-col :span="24" :style="{ textAlign: 'center',marginBottom:'10px'}">
            <a-button type="primary" html-type="submit">保存</a-button>
            <a-button :style="{ marginLeft: '20px' }">取消</a-button>
          </a-col>
        </a-row>
      </div>-->
    </a-form>
    <choose-doctor ref="chooseUser" v-model="userTag" @submit="choose" title="选择校医"></choose-doctor>
  </div>
</template>

<script>
import ChooseDoctor from './ChooseDoctor'
import moment from 'moment'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'SetUp',
  components: {
    ChooseDoctor
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      teacherOptions: [
        { label: '本人', value: 'PERSON01' },
        { label: '校医', value: 'PERSON02' }
      ],
      studentOptions: [
        { label: '家长', value: 'PERSON03' },
        { label: '班主任', value: 'PERSON04' },
        { label: '校医', value: 'PERSON02' }
      ],
      infoOptions: [
        { label: '公众号', value: 'MSG01' },
        { label: '短信', value: 'MSG02' }
      ],
      maxHeight: 0,
      timeList: [1, 2],
      userTag: false,
      appForm: {
        armpit: '',
        mouth: '',
        head: '',
        teacher: '',
        switch: ''
      },
      tempList: {},
      userList: [],
      infoCheck: [],
      teacherCheck: [],
      studentCheck: [],
      teacherSelfCheck: 'PERSON01',
      teacherDocCheck: 'PERSON02',
      studentSelfCheck: 'PERSON03',
      studentTeacherCheck: 'PERSON04',
      studentDocCheck: 'PERSON02',
      weChatCheck: 'MSG01',
      messageDocCheck: 'MSG02',
      teacherSelf: [],
      teacherDoc: [],
      studentSelf: [],
      studentTeacher: [],
      studentDoc: [],
      weChat: [],
      messageDoc: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.tmpListGet()
    this.informUserGet()
    this.doctorList()
    this.informWayGet()
  },
  methods: {
    moment,
    ...mapActions('home', [
      'gettmpList',
      'getInformUser',
      'addDoctor',
      'getInfoDoctor',
      'getInformWay',
      'updateTmpList',
      'updateInformWay',
      'updateInformUser',
      'unBindDoc'
    ]),
    // 温度设置列表
    async tmpListGet() {
      const res = await this.gettmpList({
        schoolCode: this.userInfo.orgCode
      })
      this.tempList = res.result
    },
    // 通知方式：微信、短信
    async informWayGet() {
      const res = await this.getInformWay({
        schoolCode: this.userInfo.orgCode
      })
      this.infoCheck = res.result.filter(item => {
        if (item.informState === '1') {
          return item.informWayCode
        }
      })
      if (this.infoCheck.length > 0) {
        this.weChat = this.infoCheck.some(v => v.informWayCode === this.weChatCheck) ? ['MSG01'] : []
        this.messageDoc = this.infoCheck.some(v => v.informWayCode === this.messageDocCheck) ? ['MSG02'] : []
      }
    },
    // 通知人员
    async informUserGet() {
      const res = await this.getInformUser({
        schoolCode: this.userInfo.orgCode
      })
      this.teacherCheck = res.result.filter(item => {
        if (item.userType === '1' && item.informState === '1') {
          return item.informPersonType
        }
      })
      if (this.teacherCheck.length > 0) {
        this.teacherSelf = this.teacherCheck.some(v => v.informPersonType === this.teacherSelfCheck) ? ['PERSON01'] : []
        this.teacherDoc = this.teacherCheck.some(v => v.informPersonType === this.teacherDocCheck) ? ['PERSON02'] : []
      }
      this.studentCheck = res.result.filter(item => {
        if (item.userType === '2' && item.informState === '1') {
          return item.informPersonType
        }
      })
      if (this.studentCheck.length > 0) {
        this.studentSelf = this.studentCheck.some(v => v.informPersonType === this.studentSelfCheck) ? ['PERSON03'] : []
        this.studentTeacher = this.studentCheck.some(v => v.informPersonType === this.studentTeacherCheck)
          ? ['PERSON04']
          : []
        this.studentDoc = this.studentCheck.some(v => v.informPersonType === this.studentDocCheck) ? ['PERSON02'] : []
      }
    },
    // 已选校医
    async doctorList() {
      const userData = await this.getInfoDoctor({
        schoolCode: this.userInfo.orgCode
      })
      this.userList = userData.result
      this.appForm.teacher = this.userList
      // this.appForm.teacher = this.userList.map(el => el.userName).join(',')
    },
    // 选择校医
    chooseDoctor() {
      this.userTag = true
      this.$refs.chooseUser.showList()
    },
    async choose(item) {
      await this.addDoctor(item)
      this.userTag = false
      this.$refs.confirmLoading = false
      this.$message.success('操作成功')
      this.$tools.goNext(() => {
        this.$refs.chooseUser.reset()
        this.$refs.chooseUser.totalList = []
        this.$refs.chooseUser.chooseList = []
      })
      this.doctorList()
    },
    // 删除校医
    del(e) {
      this.unBindDoc({ id: e }).then(() => {
        this.$message.success('操作成功')
      })
    },
    tempChange(e) {
      const temp = e.target.offsetParent.id
        .split('+')[1]
        .split('=')[1]
        .split('-')[1]
      if (temp !== e.target.value) {
        const req = {
          schoolCode: this.userInfo.orgCode,
          bodyPartsCode: e.target.offsetParent.id.split('+')[0],
          bodyPartsName: e.target.offsetParent.id.split('+')[1].split('=')[0],
          id: e.target.offsetParent.id
            .split('+')[1]
            .split('=')[1]
            .split('-')[0],
          temperature: e.target.value
        }
        this.updateTmpList(req).then(res => {
          this.$message.success('操作成功')
        })
      }
    },
    // 通知人员更新
    infoChange(code, type, checked) {
      const req = {
        informPersonType: code,
        userType: type,
        schoolCode: this.userInfo.orgCode,
        informState: checked ? '1' : '2'
      }
      req.userType = type
      this.updateInformUser(req).then(res => {
        this.$message.success('操作成功')
      })
    },
    // 通知方式更新
    wayChange(code, checked) {
      const req = {
        informWayCode: code,
        schoolCode: this.userInfo.orgCode,
        informState: checked ? '1' : '2'
      }
      this.updateInformWay(req).then(res => {
        this.$message.success('操作成功')
      })
    },
    teacherSelfChange(e) {
      this.infoChange('PERSON01', '1', e.length > 0 ? 1 : 0)
    },
    teacherDocChange(e) {
      this.infoChange('PERSON02', '1', e.length > 0 ? 1 : 0)
    },
    studentSelfChange(e) {
      this.infoChange('PERSON03', '2', e.length > 0 ? 1 : 0)
    },
    studentTeacherChange(e) {
      this.infoChange('PERSON04', '2', e.length > 0 ? 1 : 0)
    },
    studentDocChange(e) {
      this.infoChange('PERSON02', '2', e.length > 0 ? 1 : 0)
    },
    weChatChange(e) {
      this.wayChange('MSG01', e.length > 0 ? 1 : 0)
    },
    messageChange(e) {
      this.wayChange('MSG02', e.length > 0 ? 1 : 0)
    }
  }
}
</script>
<style lang="less" scoped>
.set-up {
  background: #fff;
  padding: 10px 40px;
  overflow: auto;
  .title-box {
    height: 28px;
    border-bottom: 1px solid #ccc;
    position: relative;
    .title-icon {
      display: inline-block;
      height: 20px;
      width: 6px;
      background-color: #0086ff;
      position: absolute;
      top: 0%;
      left: 0;
    }
    .title-text {
      margin-left: 12px;
    }
  }
}
.ant-input-number {
  width: 100%;
}
</style>
