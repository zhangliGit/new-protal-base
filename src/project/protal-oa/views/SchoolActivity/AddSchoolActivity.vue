<template>
  <div class="add-booking page-layout qui-fx-ver">
    <choose-control
      ref="chooseControl"
      is-check
      v-model="controlTag"
      v-if="controlTag"
      @submit="chooseDevice"
      :controlList="controlList"
      :schoolCode="userInfo.schoolCode"
      chooseType="common"
      title="添加设备"
    ></choose-control>
    <a-form :form="form" :style="{ maxHeight: maxHeight,overflow: 'auto' }">
      <a-form-item label="活动主题" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }">
        <a-input
          placeholder="请输入活动主题"
          :maxLength="20"
          :disabled="type === '1'"
          v-decorator="['remark', { initialValue: formData.remark, rules: [{ required: true, message: '请输入活动主题' }] }]"
        />
      </a-form-item>
      <a-form-item
        label="活动时间"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 18 }"
        :required="true"
      >
        <ul>
          <li class="qui-fx-f1" v-for="(time, index) in timeList" :key="index">
            <div class="qui-fx-ac mar-b10">
              <a-date-picker
                :allowClear="false"
                :value="time.date"
                :disabled="type === '1'"
                :default-value="defaultDate"
                :disabled-date="disabledDate"
                style="margin-right: 10px"
                @change="(val,dateStrings)=>changeDate(val,dateStrings, index)"
              />
              <a-time-picker
                :allowClear="false"
                :disabled="type === '1'"
                :value="time.startTime"
                @change="(val,dateStrings)=>changeTime(val,dateStrings,'startTime', index)"
                format="HH:mm"
                :disabledMinutes="(val)=>getStartMinutes(val,index)"
                :disabledHours="(val)=>getStartHours(val,index)"
              />
              <span style="padding: 0 8px">至</span>
              <a-time-picker
                :allowClear="false"
                :disabled="type === '1'"
                style="margin-right: 10px"
                :value="time.endTime"
                format="HH:mm"
                :disabledMinutes="(val)=>getDisabledMinutes(val, index)"
                :disabledHours="(val)=>getDisabledHours(val, index)"
                @change="(val,dateStrings)=>changeTime(val,dateStrings,'endTime', index)"
              ></a-time-picker>
            </div>
          </li>
        </ul>
      </a-form-item>
      <a-form-item
        label="活动地点"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 15 }"
        :required="true"
      >
        <a-input
          :maxLength="10"
          placeholder="请输入活动地点"
          :disabled="type !== '0'"
          v-decorator="['placeName', { initialValue: formData.placeName, rules: [{ required: true, message: '请输入活动地点' }] }]"
        />
      </a-form-item>
      <a-form-item label="活动内容" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }">
        <a-textarea
          placeholder="请输入活动内容"
          :autoSize="{ minRows: 2, maxRows: 5 }"
          :maxLength="100"
          :disabled="type === '1'"
          v-decorator="['content', { initialValue: formData.content, rules: [{ required: false, message: '请输入活动内容' }] }]"
        />
      </a-form-item>
      <a-form-item
        label="活动发布"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 15 }"
        :required="true"
      >
        <div>
          <a-tag
            v-if="type !== '1'"
            @click="controlSelect"
            style="background: #fff; borderStyle: dashed;"
          >
            <a-icon type="plus" />添加设备
          </a-tag>
          <template v-for="tag in controlList">
            <a-tag
              color="orange"
              :key="tag.deviceSn"
              :closable="type !== '1'"
              @close="() => controlClose(tag)"
            >{{ tag.deviceName }}</a-tag>
          </template>
        </div>
      </a-form-item>
      <a-form-item
        label="开启学生报名"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 15 }"
      >
        <a-switch
          :disabled="type === '1'"
          @click="switchChange"
          v-model="formData.switch"
          v-decorator="['switch', { initialValue: formData.switch }]"
        />
      </a-form-item>
      <a-form-item
        v-if="formData.switch"
        label="报名截止时间"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 18 }"
        :required="true"
      >
        <div class="qui-fx-ac mar-b10">
          <a-date-picker
            show-time
            v-model="formData.applyEnddate"
            :disabled="type === '1'"
            default-value=""
            :disabled-date="disabledDate"
          />
        </div>
      </a-form-item>
      <a-form-item v-if="type !== '1'" :wrapper-col="{ span: 15, offset: 3 }">
        <a-button style="margin-right:50px;" @click="cancle">取消</a-button>
        <a-button type="primary" @click="handleSubmit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChooseControl from '@c/choose/ChooseControl'
import { Switch } from 'ant-design-vue'
import moment from 'moment'
export default {
  name: 'AddSchoolActivity',
  components: {
    moment,
    ASwitch: Switch,
    ChooseControl
  },
  data() {
    return {
      defaultDate: moment(new Date(), 'YYYY-MM-DD'),
      formData: {
        remark: '',
        content: '',
        placeName: '',
        switch: false,
        applyEnddate: ''
      },
      controlTag: false,
      switchTag: false,
      form: this.$form.createForm(this),
      maxHeight: 0,
      id: 0,
      type: 0, // 0新增 1查看 2编辑
      timeList: [],
      controlList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.maxHeight = window.screen.height - 280 + 'px'
    this.type = this.$route.query.type
    if (this.type !== '0') {
      this.showData()
    } else {
      this.timeList = [
        {
          date: moment(new Date(), 'YYYY-MM-DD'),
          startTime: moment(new Date(), 'HH:mm'),
          endTime: moment('23:59', 'HH:mm')
        }
      ]
    }
  },
  methods: {
    ...mapActions('home', [
      'addReserve',
      'reserveDetail'
    ]),
    switchChange(val) {
      if (!val) {
        this.controlList = []
      }
    },
    // 表单回填
    async showData() {
      const res = await this.reserveDetail(this.$route.query.id)
      console.log(res.data)
      this.formData.placeName = res.data.placeName
      this.timeList = [
        {
          date: moment(new Date(res.data.reserveDate), 'YYYY/MM/DD'),
          startTime: moment(res.data.startTime, 'HH:mm'),
          endTime: moment(res.data.endTime, 'HH:mm')
        }
      ]
      this.formData.remark = res.data.description
      this.formData.content = res.data.content
      this.formData.switch = res.data.openSign === '1'
      this.controlList = res.data.placeReserveDeviceList
    },
    // 提交权限组
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.controlList.length === 0) {
            this.$message.error('请选择活动发布设备')
            return
          }
          if (values.switch && !this.formData.applyEnddate) {
            this.$message.error('请选择报名截止时间')
            return
          }
          const req = {
            schoolCode: this.userInfo.schoolCode,
            createName: this.userInfo.userName,
            createCode: this.userInfo.userCode,
            description: values.remark,
            content: values.content,
            placeReserveDateDtoList: [
              {
                reserveDate: this.timeList[0].date.format('YYYY-MM-DD'),
                startTime: this.timeList[0].startTime.format('HH:mm'),
                endTime: this.timeList[0].endTime.format('HH:mm')
              }
            ],
            openSign: values.switch ? '1' : '2',
            placeName: values.placeName,
            placeReserveDeviceList: this.controlList.map(el => {
              return {
                deviceName: el.deviceName,
                deviceSn: el.deviceSn
              }
            }),
            type: '3'
          }
          if (values.switch) {
            req.applyEnddate = this.formData.applyEnddate.format('YYYY-MM-DD HH:mm:ss')
          }
          if (this.type === '2') {
            req.id = this.$route.query.id
            req.placeReserveDateDtoList = undefined
            req.reserveDate = this.timeList[0].date.format('YYYY-MM-DD')
            req.startTime = this.timeList[0].startTime.format('HH:mm')
            req.endTime = this.timeList[0].endTime.format('HH:mm')
          }
          console.log(req)
          /* this.addReserve(req).then(res => {
            this.$message.success('添加成功')
            this.$tools.goNext(() => {
              this.$router.push({ path: '/activityBooking' })
            })
          }) */
        }
      })
    },
    // 添加签到设备
    chooseDevice(value) {
      this.controlList = value
      this.$refs.chooseControl.reset()
    },
    controlClose(removedTag) {
      this.controlList = this.controlList.filter(tag => tag !== removedTag)
    },
    controlSelect() {
      this.controlTag = true
    },
    cancle() {
      this.$router.push({ path: '/schoolActivity' })
    },
    disabledDate(current) {
      return current && current < moment().startOf('day')
    },
    changeTime(val, dateStrings, type, index) {
      console.log()
      if (
        this.timeList[index].date.format('YYYY/MM/DD') === moment(new Date()).format('YYYY/MM/DD') &&
        val.valueOf() < moment(new Date()).valueOf()
      ) {
        val = moment(new Date(), 'HH:mm')
      }
      if (type === 'startTime') {
        this.timeList[index].startTime = val
      } else {
        this.timeList[index].endTime = val
      }
    },
    changeDate(val, dateStrings, index) {
      this.timeList[index].date = val
      if (dateStrings !== moment(new Date()).format('YYYY-MM-DD')) {
        this.timeList[index].startTime = moment('00:00', 'HH:mm')
      } else {
        this.timeList[index].startTime = moment(new Date(), 'HH:mm')
      }
    },
    getStartHours(val, index) {
    },
    getDisabledHours(val, index) {
      const hours = []
      const time = moment(this.timeList[index].startTime).format('HH:mm')
      const timeArr = time.split(':')
      for (var i = 0; i < parseInt(timeArr[0]); i++) {
        hours.push(i)
      }
      return hours
    },
    getStartMinutes(selectedHour, index) {
      if (index === 0) {
        return
      }
      const time = moment(this.timeList[index].endTime).format('HH:mm')
      const timeArr = time.split(':')
      const minutes = []
      if (selectedHour === parseInt(timeArr[0])) {
        for (var i = 0; i < parseInt(timeArr[1]); i++) {
          minutes.push(i)
        }
      }
      return minutes
    },
    getDisabledMinutes(selectedHour, index) {
      const time = moment(this.timeList[index].startTime).format('HH:mm')
      const timeArr = time.split(':')
      const minutes = []
      if (selectedHour === parseInt(timeArr[0])) {
        for (var i = 0; i <= parseInt(timeArr[1]); i++) {
          minutes.push(i)
        }
      }
      return minutes
    }
  }
}
</script>

<style lang="less" scoped>
.add-booking {
  padding-top: 30px;
  /deep/ .ant-form-item {
    margin-bottom: 14px;
  }
}
</style>
