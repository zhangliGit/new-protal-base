<template>
  <div class="avoid-time page-layout">
    <div class="pos-box content">
      <div class="info bg-fff u-padd">
        <div>{{ name }}</div>
        <div class="u-mar-t20">
          <div class="info-box wh50 qui-fx">
            <div class="info-title">检查对象：</div>
            <div class="info-content qui-fx-f1">{{ checkObject }}</div>
          </div>
          <div class="info-box wh50 qui-fx">
            <div class="info-title">潜在风险：</div>
            <div class="info-content qui-fx-f1">{{ riskContent }}</div>
          </div>
        </div>
        <div class="info-box bd qui-fx">
          <div class="info-title">事故类型：</div>
          <div class="info-content qui-fx-f1">{{ accidentType }}</div>
        </div>
      </div>
      <div class="u-mar-t20 bg-fff u-padd-t10  u-padd-b20 u-padd-l20 u-padd-r20">
        <div class="avoid-title">
          <div class="time-title no-set">{{ methodCode === '1' ? '分析评价法-LEC' : '风险评价-LS' }}</div>
        </div>
        <div class="u-mar-t20">
          <a-form :form="form">
            <a-form-item label="L(可能性)" v-bind="formItemLayout" v-if="methodCode === '1'">
              <a-select
                v-decorator="[
                  'lValue',
                  { initialValue: detailInfo.lValue, rules: [{ required: true, message: '请选择' }] }
                ]"
                placeholder="请选择"
              >
                <a-select-option v-for="(item,index) in assess.lList" :key="index" :value="item.key" >
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="E(频繁程度)" v-bind="formItemLayout" v-if="methodCode === '1'">
              <a-select
                v-decorator="[
                  'eValue',
                  { initialValue: detailInfo.eValue, rules: [{ required: true, message: '请选择' }] }
                ]"
                placeholder="请选择"
              >
                <a-select-option v-for="(item,index) in assess.eList" :key="index" :value="item.key" >
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="C(严重性)" v-bind="formItemLayout" v-if="methodCode === '1'">
              <a-select
                v-decorator="[
                  'cValue',
                  { initialValue: detailInfo.cValue, rules: [{ required: true, message: '请选择' }] }
                ]"
                placeholder="请选择"
              >
                <a-select-option v-for="(item,index) in assess.cList" :key="index" :value="item.key" >
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="L(可能性)" v-bind="formItemLayout" v-if="methodCode === '2'">
              <a-select
                v-decorator="[
                  'lValue',
                  { initialValue: detailInfo.lValue, rules: [{ required: true, message: '请选择' }] }
                ]"
                placeholder="请选择"
              >
                <a-select-option v-for="(item,index) in assess.lsList" :key="index" :value="item.key" >
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="S(严重性)" v-bind="formItemLayout" v-if="methodCode === '2'">
              <a-select
                v-decorator="[
                  'sValue',
                  { initialValue: detailInfo.sValue, rules: [{ required: true, message: '请选择' }] }
                ]"
                placeholder="请选择"
              >
                <a-select-option v-for="(item,index) in assess.sList" :key="index" :value="item.key" >
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="管控层级" v-bind="formItemLayout" >
              <a-select
                v-decorator="[
                  'controlLevel',
                  { initialValue: detailInfo.controlLevel, rules: [{ required: true, message: '请选择管控层级' }] }
                ]"
                placeholder="请选择管控层级"
              >
                <a-select-option v-for="(item,index) in assess.controlList" :key="index" :value="item.key" >
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="责任岗位" v-bind="formItemLayout" >
              <a-select
                v-decorator="[
                  'responsibilityPost',
                  { initialValue: detailInfo.responsibilityPost, rules: [{ required: true, message: '请选择责任岗位' }] }
                ]"
                placeholder="请选择责任岗位"
              >
                <a-select-option v-for="(item,index) in assess.postList" :key="index" :value="item.key" >
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="责任部门" v-bind="formItemLayout" >
              <a-select
                v-decorator="[
                  'responsibilityDept',
                  { initialValue: detailInfo.responsibilityDept, rules: [{ required: true, message: '请选择责任部门' }] }
                ]"
                placeholder="请选择责任部门"
                @change="handleChange"
              >
                <a-select-option v-for="(item,index) in partList" :key="index" :value="item.code">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="责任人" v-bind="formItemLayout" required>
              <a-select
                v-decorator="[
                  'responsibilityUserName',
                  { initialValue: detailInfo.responsibilityUserName, rules: [{ required: true, message: '请选择责任人' }] }
                ]"
                placeholder="请选择责任人"
                @change="change"
              >
                <a-select-option v-for="(item,index) in userList" :key="index" :value="`${item.userCode}=${item.userName}+${item.mobile}`">
                  {{ item.userName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="电话" required>
              <a-input
                :disabled="true"
                v-decorator="[
                  'telephone',
                  { initialValue: detailInfo.telephone}
                ]"
              />
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="u-mar-t20 bg-fff u-padd-t10  u-padd-b20 u-padd-l20 u-padd-r20">
        <div class="avoid-title">
          <div class="time-title title">审核建议措施</div>
        </div>
        <div class="u-mar-t20">
          <a-row>
            <a-col :span="12" v-for="(list,index) in assess.reamrkList" :key="index">
              <div class="qui-fx u-mar">
                <div class="title">{{ list.title }}</div>
                <a-textarea
                  @change="areaChange($event, list)"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                />
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="u-mar-t20 bg-fff u-padd-t10  u-padd-b20 u-padd-l20 u-padd-r20">
        <div class="avoid-title">
          <div class="time-title title">警示标识</div>
        </div>
        <div class="qui-fx-wp">
          <img class="sign u-mar-r10 u-mar-t10" v-for="(list,index) in detailInfo.warnings" :key="index" :src="list.url" alt="">
          <div class="sign qui-fx-ac-jc u-mar-t10" @click="add">
            <a-icon style="font-size: 30px" type="plus"/>
          </div>
        </div>
      </div>
      <div class="u-mar-t20 bg-fff u-padd-t10  u-padd-b20 u-padd-l20 u-padd-r20">
        <div class="avoid-title">
          <div class="time-title no-set">{{ methodCode === '1' ? '剩余分析评价法-LEC' : '剩余风险评价-LS' }}</div>
        </div>
        <div class="u-mar-t20">
          <a-form :form="lastForm">
            <a-form-item label="L(可能性)" v-bind="formItemLayout" v-if="methodCode === '1'">
              <a-select
                v-decorator="[
                  'remainingLValue',
                  { initialValue: detailInfo.remainingLValue, rules: [{ required: true, message: '请选择' }] }
                ]"
                placeholder="请选择"
              >
                <a-select-option v-for="(item,index) in assess.lList" :key="index" :value="item.key" >
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="E(频繁程度)" v-bind="formItemLayout" v-if="methodCode === '1'">
              <a-select
                v-decorator="[
                  'remainingEValue',
                  { initialValue: detailInfo.remainingEValue, rules: [{ required: true, message: '请选择' }] }
                ]"
                placeholder="请选择"
              >
                <a-select-option v-for="(item,index) in assess.eList" :key="index" :value="item.key" >
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="C(严重性)" v-bind="formItemLayout" v-if="methodCode === '1'">
              <a-select
                v-decorator="[
                  'remainingCValue',
                  { initialValue: detailInfo.remainingCValue, rules: [{ required: true, message: '请选择' }] }
                ]"
                placeholder="请选择"
              >
                <a-select-option v-for="(item,index) in assess.cList" :key="index" :value="item.key" >
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="L(可能性)" v-bind="formItemLayout" v-if="methodCode === '2'">
              <a-select
                v-decorator="[
                  'remainingLValue',
                  { initialValue: detailInfo.remainingLValue, rules: [{ required: true, message: '请选择' }] }
                ]"
                placeholder="请选择"
              >
                <a-select-option v-for="(item,index) in assess.lsList" :key="index" :value="item.key" >
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="S(严重性)" v-bind="formItemLayout" v-if="methodCode === '2'">
              <a-select
                v-decorator="[
                  'remainingSValue',
                  { initialValue: detailInfo.remainingSValue, rules: [{ required: true, message: '请选择' }] }
                ]"
                placeholder="请选择"
              >
                <a-select-option v-for="(item,index) in assess.sList" :key="index" :value="item.key" >
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="u-tx-c u-mar-t20">
        <a-button @click="cancel">取消</a-button>
        <a-button class="mar-l10" type="primary" @click="submitOk" :disabled="isLoad">保存</a-button>
      </div>
    </div>
    <choose-sign
      ref="chooseSign"
      is-check
      :teacherList="identifyList"
      v-if="signTag"
      v-model="signTag"
      @submit="chooseSign"
      title="添加成员"
    ></choose-sign>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChooseSign from '../../component/ChooseSign'
import assess from '../../assets/js/table/assess'
export default {
  name: 'AddAssess',
  components: {
    ChooseSign
  },
  data() {
    return {
      assess,
      detailInfo: [],
      userList: [],
      formItemLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 21 }
      },
      isLoad: false,
      form: this.$form.createForm(this),
      lastForm: this.$form.createForm(this),
      fileList: [],
      name: '',
      accidentType: '',
      checkObject: '',
      riskContent: '',
      methodCode: '',
      identifyList: [],
      userTag: false,
      signTag: false,
      partList: [],
      responsibilityDept: '',
      riskLevel: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.accidentType = this.$route.query.accidentType
    this.checkObject = this.$route.query.checkObject
    this.riskContent = this.$route.query.riskContent
    this.name = this.$route.query.name
    this.methodCode = this.$route.query.methodCode
    this.detailId = this.$route.query.id
    this.riskLevel = this.$route.query.riskLevel
    this._getOrgBySchool()
    if (this.riskLevel) {
      this.showDetail()
    }
  },
  methods: {
    ...mapActions('home', ['riskAssessDetail', 'riskAssess', 'getOrgBySchool', 'getTeacherList']),
    // 获取学校信息
    async _getOrgBySchool () {
      const res = await this.getOrgBySchool(this.userInfo.schoolCode)
      this.partList = res.data.orgChilds
    },
    // 获取所有老师
    async _getTeacherList () {
      const req = {
        page: 1,
        size: 9999,
        schoolCode: this.userInfo.schoolCode,
        orgCode: this.responsibilityDept
      }
      const res = await this.getTeacherList(req)
      this.userList = res.data.list
    },
    handleChange(record) {
      this.responsibilityDept = record
      this.detailInfo.responsibilityUserName = ''
      this._getTeacherList()
    },
    change(record) {
      console.log(record)
      this.detailInfo.responsibilityUserName = record.split('=')[1].split('+')[0]
      this.detailInfo.responsibilityUserCode = record.split('=')[0]
      this.detailInfo.telephone = record.split('=')[1].split('+')[1]
    },
    async showDetail() {
      const res = await this.riskAssessDetail(this.detailId)
      this.detailInfo = res.data
    },
    add () {
      this.signTag = true
    },
    chooseSign (record) {
      this.$refs.chooseSign.reset()
      this.detailInfo.warnings = record
    },
    cancel() {
      this.$router.go(-1)
    },
    areaChange(e, record) {
      console.log('vewq', e.target.value)
      this.detailInfo[record.key] = e.target.value
    },
    submitOk(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (!error) {
          this.lastForm.validateFields((error, val) => {
            if (!error) {
              const warnings = []
              this.detailInfo.warnings.map(el => {
                warnings.push(el.url)
              })
              values.responsibilityUserName = this.detailInfo.responsibilityUserName
              values.responsibilityUserCode = this.detailInfo.responsibilityUserCode
              values.warnings = warnings
              values.id = this.detailId
              this.isLoad = true
              if (this.riskLevel) {
                this.modifySchoolTask(values)
                  .then((res) => {
                    this.$message.success('操作成功')
                    this.$tools.goNext(() => {
                      this.$router.go(-1)
                    })
                  })
                  .catch((res) => {
                    this.isLoad = false
                  })
              } else {
                this.riskAssess(values)
                  .then((res) => {
                    this.$message.success('操作成功')
                    this.$tools.goNext(() => {
                      this.$router.go(-1)
                    })
                  })
                  .catch((res) => {
                    this.isLoad = false
                  })
              }
            }
          })
        }
      })
    }
  }

}
</script>
<style lang="less" scoped>
.avoid-time {
  background-color: #f5f5fb;
  .content {
    height: calc(100% - 10px);
    overflow-y: scroll;
  }
  .avoid-title {
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #4D4CAC;
    border-bottom: 1px solid #ccc;
    .time-title {
      width: 80px;
      height: 100%;
      border-bottom: 3px solid #4D4CAC;
    }
    .no-set {
      width: 150px;
    }
  }
}
.info {
  height: 140px;
    .info-box {
      border-top: 1px solid #9698d6;
      height: 30px;
      line-height: 25px;
      float: left;
      width: 100%;
      &:nth-child(2n) {
        border-right: 1px solid #9698d6;
      }
    }
    .wh50 {
      width: 50%;
    }
    .bd {
      border-bottom: 1px solid #9698d6;
      border-right: 1px solid #9698d6;
    }
    .info-title {
      width: 150px;
      background-color: #f5f5fb;
      border-right: 1px solid #9698d6;
      border-left: 1px solid #9698d6;
      text-align: right;
      padding: 0 5px;
      color: #575758;
    }
    .info-content {
      padding: 0 10px;
      color: #333;
      width: 100%;
      overflow-x: scroll;
    }
  }
  .form-left {
    width: 320px;
  }
  .title {
    width: 90px;
  }
  .sign {
    width: 80px;
    height: 80px;
    color: #ccc;
  }
</style>
