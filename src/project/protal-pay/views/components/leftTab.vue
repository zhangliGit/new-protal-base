<template>
  <div class="service-list">
    <div>
      <a-tabs v-model="tabActive" @change="callback">
        <a-tab-pane key="0" tab="账单发送"> </a-tab-pane>
        <a-tab-pane key="1" tab="当面收款"> </a-tab-pane>
      </a-tabs>
      <div>
        <div class="title qui-fx-ac"><div class="qui-fx-f1 qui-fx-jc">收费单</div></div>
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout" label="项目名称" required>
            <a-select
              v-decorator="[
                'projectName',
                { initialValue: appForm.projectName, rules: [{ required: true, message: '请选择项目名称' }] }
              ]"
              placeholder="请选择项目名称"
            >
              <a-select-option v-for="list in userList" :key="`${list.projectName}+${list.projectCode}`">
                {{ list.projectName }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="账单名称" v-bind="formItemLayout">
            <a-input
              v-decorator="[
                'billName',
                {
                  initialValue: appForm.billName,
                  rules: [{ required: true, message: '请填写账单名称' }]
                }
              ]"
              placeholder="请填写账单名称"
            />
          </a-form-item>
          <a-form-item label="学生姓名" v-bind="formItemLayout">
            <a-input
              @click="teacherSelect"
              placeholder="请点击选择人员"
              v-decorator="[
                'userName',
                {
                  initialValue: userName,
                  rules: [{ required: true, message: '请填写学生姓名' }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="班级名称" v-bind="formItemLayout">
            <a-input
              :disabled="disabled"
              v-decorator="['gradeName', { initialValue: gradeName + className, rules: [{ disabled: true }] }]"
              readOnly
            />
          </a-form-item>
          <a-form-item label="截止日期" v-bind="formItemLayout">
            <a-date-picker
              format="YYYY-MM-DD"
              v-decorator="[
                'endTime',
                {
                  initialValue: appForm.endTime,
                  rules: [{ required: true, message: '请选择截至日期' }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item required>
            <a-input-group compact v-for="(item, index) in chargeDetail" :key="index">
              <div class="qui-fx">
                <div class="qui-fx">
                  <a-select default-value="请选择" @change="handleChange">
                    <a-select-option
                      v-for="list in selectList"
                      :key="`${list.itemName}+${list.itemCode}+${list.itemPrice}`"
                    >
                      {{ list.itemName }}
                    </a-select-option>
                  </a-select>
                  <a-input style="width: 50%" v-model="value" :disabled="disabled" />
                  <div v-if="index !== 0" @click="handleDelete(item, index)">
                    <a-icon type="close" />
                  </div>
                  <div v-if="index === 0" @click="addGoods">
                    <a-icon type="plus" />
                  </div>
                </div>
              </div>
            </a-input-group>
          </a-form-item>
          <a-form-item label="账单金额" v-bind="formItemLayout">
            <a-input
              :disabled="disabled"
              v-decorator="['billMoney', { initialValue: billMoney, rules: [{ disabled: true }] }]"
              readOnly
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="收款方式" required v-if="tabActive === '1'">
            <a-select
              v-decorator="[
                'name',
                { initialValue: appForm.name, rules: [{ required: true, message: '请选择收款方式' }] }
              ]"
              placeholder="请选择收款方式"
            >
              <a-select-option v-for="list in payList" :key="`${list.name}+${list.code}`">
                {{ list.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="账单批次">
            <a-select v-decorator="['batchName', { initialValue: appForm.batchName }]" placeholder="请选择账单批次">
              <a-select-option v-for="list in batchList" :key="`${list.batchNumber}`">
                {{ list.batchName }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :style="{ textAlign: 'center' }">
            <a-button type="primary" v-if="tabActive === '0'" @click="_addbillInfo">发送账单</a-button>
            <a-button type="primary" v-if="tabActive === '1'" @click="_addbillInfo">确认收款</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <choose-student
      ref="chooseUser"
      is-radio
      chooseType="door"
      v-if="userTag"
      v-model="userTag"
      @submit="chooseUser"
      title="选择学生"
    ></choose-student>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChooseStudent from '@c/ChooseStudent'
import moment from 'moment'
export default {
  name: 'VerticalTab',
  components: { ChooseStudent },
  data() {
    return {
      tabList: [],
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 }
      },
      appForm: {},
      userList: [],
      payList: [
        { name: 'POS机', code: 'pospay' },
        { name: '支付宝', code: 'alipay' },
        { name: '微信', code: 'wechat' },
        { name: '现金', code: 'cashpay' },
        { name: '银联', code: 'unionpay' }
      ],
      tabActive: '0',
      chargeDetail: [{ itemName: '', itemPrice: '', itemCode: '' }],
      userTag: false,
      className: '',
      gradeName: '',
      userName: '',
      disabled: true,
      selectList: [],
      value: '',
      batchList: [],
      batchName: '',
      billMoney: '',
      classList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.getpayInfoList_()
    this.getselectList_()
    this.getbatchInfoList_()
  },
  methods: {
    ...mapActions('home', ['getpayInfoList', 'getselectList', 'getbatchInfoList', 'addbillInfo']),
    teacherSelect() {
      this.userTag = true
    },
    chooseUser(values) {
      this.$refs.chooseUser.reset()
      this.userName = values[0].userName
      this.workNo = values[0].workNo
      this.className = values[0].className
      this.gradeName = values[0].gradeName
      this.classList = []
      values.forEach(ele => {
        this.classList.push({
          ...ele
        })
      })
    },
    addGoods() {
      this.chargeDetail.push({
        itemName: '',
        itemPrice: '',
        itemCode: ''
      })
    },
    handleDelete(item, index) {
      console.log('del', item, index, this.chargeDetail)
      this.chargeDetail.splice(index, 1)
    },
    async getpayInfoList_() {
      const req = {
        schoolCode: this.userInfo.schoolCode,
        userCode: this.userInfo.userCode
      }
      const res = await this.getpayInfoList(req)
      this.userList = res.data
    },
    async getselectList_() {
      const req = {
        schoolCode: this.userInfo.schoolCode,
        userCode: this.userInfo.userCode
      }
      const res = await this.getselectList(req)
      this.selectList = res.data
    },
    async getbatchInfoList_() {
      const req = {
        schoolCode: this.userInfo.schoolCode,
        userCode: this.userInfo.userCode
      }
      const res = await this.getbatchInfoList(req)
      this.batchList = res.data
    },
    callback(key) {
      this.tabActive = key
    },
    handleChange(value) {
      this.chargeDetail = []
      this.value = value.split('+')[2]
      this.chargeDetail.push({
        itemName: value.split('+')[0],
        itemCode: value.split('+')[1],
        itemPrice: value.split('+')[2]
      })
      this.billMoney = this.value
    },
    // 新增
    _addbillInfo(e) {
      e.preventDefault()
      this.form.validateFields((err, value) => {
        if (!err) {
          value.endTime = moment(value.endTime).format('YYYY-MM-DD HH:mm:ss')
          if (this.chargeDetail.length === 0) {
            this.$message.error('请选择物品管理员!')
            return
          }
          const req = {
            billType: this.tabActive,
            schoolCode: this.userInfo.schoolCode,
            userCode: this.classList[0].userCode,
            userName: this.classList[0].userName,
            chargeDetail: this.chargeDetail,
            className: this.classList[0].className,
            gradeCode: this.classList[0].gradeCode,
            classCode: this.classList[0].classCode,
            schoolYearId: this.classList[0].schoolYearId,
            batchNumber: value.batchName,
            projectName: value.projectName.split('+')[0],
            projectCode: value.projectName.split('+')[1],
            billName: value.billName,
            billMoney: value.billMoney,
            endTime: value.endTime,
            parentPhone:'1111111111',
            // payWay: value.name.split('+')[1],
            createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          }
          console.log(req)
          this.addbillInfo(req).then(res => {
            this.$message.success('操作成功')
            this.$tools.goNext(() => {
              this.$emit('update')
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.service-list {
  .title {
    padding: 0 10px;
    color: @main-color;
    font-size: 16px;
    font-weight: bold;
    height: 45px;
    text-align: center;
    line-height: 45px;
    background-color: #fafafa;
  }
}
.anticon {
  font-size: 25px;
  padding: 5px;
}
</style>
