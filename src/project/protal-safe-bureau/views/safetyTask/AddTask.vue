<template>
  <div class="task-add page-layout bg-fff qui-fx-ver">
    <div class="content pos-box">
      <div class="task-cont">
        <div class="detail-title">
          <span class="title-tab-pane on u-type-primary">任务内容</span>
        </div>
        <div class="detail-info u-mar-30 ">
          <a-form :form="form1" >
            <a-form-item label="任务名称：" v-bind="formItemLayout1">
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [{ required: true,max: 30, message: '请输入任务名称' }]
                  }
                ]"
                placeholder="请输入任务名称"
              />
            </a-form-item>
            <a-form-item label="任务类型：" v-bind="formItemLayout1" required>
              <a-radio-group
                v-decorator="[
                  'taskTimeType2',
                  {
                    initialValue: cardInfo.taskTimeType2,
                    rules: [{ required: true, message: '请选择巡查时间类型' }]
                  }
                ]"
                button-style="solid"
                @change="change"
                :disabled="isEdit">
                <a-radio-button value="2"> 一次性计划 </a-radio-button>
                <a-radio-button value="3"> 周计划 </a-radio-button>
                <a-radio-button value="4"> 月计划 </a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="起始时间：" v-bind="formItemLayout1" required>
              <a-range-picker
                v-decorator="['range-time-picker', rangeConfig]"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
              />
            </a-form-item>
            <a-form-item label="任务描述：" v-bind="formItemLayout1" required>
              <quill-editor
                style="height: 250px; width: 300"
                v-model="appForm.content"
                ref="myQuillEditor"
                :options="quillOption"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
              ></quill-editor>
            </a-form-item>
            <a-form-item label="上传附件：" v-bind="formItemLayout1" required>
              <a-upload
                name="fileList"
                :action="fileInfo.url"
                :remove="removefujian"
                @change="upload"
                accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
              >
                <a-button v-if="appForm.otherList.length < 5" type="primary">
                  <a-icon type="upload" />上传附件
                </a-button>
              </a-upload>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="task-cont report u-mar-t40">
        <div class="detail-title">
          <span class="title-tab-pane on u-type-primary">要求上报内容</span>
        </div>
        <div class="detail-info u-mar-t30 u-fx">
          <div class="left u-bd-1px u-padd-20 ">
            <div class="left-title ">请点击题目控件添加题目</div>
            <div class="left-cont">
              <div class="list u-font-1 u-type-primary u-bd-1px u-type-primary-light-bg">上报常用项</div>
              <div class="list u-font-01 u-bd-1px" @click="addFrom(0)">多选题</div>
              <div class="list u-font-01  u-bd-1px" @click="addFrom(1)">填空</div>
              <div class="list u-font-01 u-bd-1px" @click="addFrom(2)">附件上传</div>
            </div>
          </div>
          <div class="rigth  u-bd-1px u-padd-20">
            <div class="list" v-for="(item,index) in topicAll" :key="index">
              <div class="list-title u-mar-b10 u-fx-jsb">
                <div class="lf">{{ item.type }}</div>
                <div class="rt u-type-primary" @click="delForm(item,index)">删除</div>
              </div>
              <div class="list-cont u-padd-20 u-type-primary-light-bg u-bd-1px">
                <a-form :form="form" @submit="handleSubmit" >
                  <a-form-item label="题目：" v-bind="formItemLayout">
                    <a-input
                      v-decorator="[
                        'name',
                        {
                          rules: [{ required: true,max: 30, message: '请输入' }]
                        }
                      ]"
                      placeholder="请输入任务名称"
                    />
                  </a-form-item>
                  <a-form-item
                    v-for="(list, index1) in item.options"
                    :key="index1"
                    v-bind=" formItemLayoutWithOutLabel"
                    :required="false"
                    label=""
                  >
                    <a-input
                      v-decorator="[
                        `name`,
                        {
                          validateTrigger: ['change', 'blur'],
                          initialValue: list.name,
                          rules: [
                            {
                              required: true,
                              whitespace: true,
                              message: 'Please input passenger\'s name or delete this field.',
                            },
                          ],
                        },
                      ]"
                      placeholder="输入选项"
                      style="width: 60%; margin-right: 8px"
                    />
                    {{ form.getFieldValue('keys') }}
                    <a-icon
                      v-if="index1 > 1"
                      class="dynamic-delete-button"
                      type="home"
                      :disabled="index1 === 1"
                      @click="() => remove(list,index1)"
                    />
                  </a-form-item>
                  <a-form-item v-bind="formItemLayoutWithOutLabel">
                    <a-button type="dashed" style="width: 60%" @click="add">
                      <a-icon type="plus" /> 新建选项
                    </a-button>
                  </a-form-item>
                  <!-- <a-form-item v-bind="formItemLayoutWithOutLabel">
                    <a-button type="primary" html-type="submit">
                      Submit
                    </a-button>
                  </a-form-item> -->
                </a-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import quillConfig from './quill-config'
let id = 0
export default {
  name: 'AddTask',
  components: {
    quillEditor
  },
  data() {
    return {
      form1: this.$form.createForm(this),
      formItemLayout1: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      rangeConfig: {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }]
      },
      quillOption: quillConfig,
      appForm: {
        name: '',
        content: '',
        otherList: []
      },
      // 任务类型切换
      cardInfo: {
        timeType: '1',
        taskTimeType1: '1',
        taskTimeType2: '2'
      },
      isEdit: false,
      fileInfo: {
        tip: '上传图片',
        url: '',
        h: 120, // 高度
        w: 120 // 宽度
      },
      formData: [],
      detailId: '',
      detailInfo: {},
      confirmLoading: false,
      // 上报内容
      topicAll: [
        {
          type: '单选',
          options: [
            { name: '可以', id: '1' },
            { name: '不可以', id: '2' }
          ]
        },
        {
          type: '多选',
          options: [
            { name: '第一项', id: '1' },
            { name: '第二项', id: '2' },
            { name: '第三项', id: '3' }
          ]
        }
      ],
      // 自定义表单
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },

      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      }
    }
  },
  beforeCreate() {

  },
  created() {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    // this.detailId = this.$route.query.id
    // this.showDetail(this.detailId)
  },
  methods: {
    ...mapActions('home', ['finishAccident', 'updateOtherArchive', 'accidentDetail']),
    // 富文本编辑器方法
    onEditorFocus(data) {},
    // 获得焦点事件
    onEditorChange(data) {
      this.text = data.text
      this.content = data.html
      this.roundup = data.text.substring(0, 120)
    },
    // 任务类型切换
    change(e) {
      this.cardInfo.timeType === '1' ? this.cardInfo.taskTimeType1 = e.target.value : this.cardInfo.taskTimeType2 = e.target.value
    },
    // 上传附件
    removefujian(file) {
      const index = this.appForm.fileList.findIndex(item => {
        return item.uid === file.uid
      })
      this.appForm.fileList.splice(index, 1)
    },
    upload(info) {
      console.log(info)
      if (info.file.status === 'uploading') {
        return
      }
      if (info.file.status === 'error') {
        if (info.file.size > 10485760) {
          this.$message.error('上传文件大小限制在10MB内')
        }
        return
      }
      if (info.file.status === 'done') {
        if (info.file.response.code === 400) {
          this.$message.warning(info.file.response.message)
          return
        }
        this.appForm.otherList.push({
          fileName: info.file.name,
          uid: info.file.uid,
          fileUrl: Array.isArray(info.file.response.data) ? info.file.response.data[0].url : info.file.response.data.url
        })
      }
    },
    async showDetail() {
      const res = await this.accidentDetail(this.detailId)
      const data = res.data
      this.detailInfo = data
      this.formData = [
        {
          value: res.data.title,
          label: '事故名称'
        },
        {
          value: this.$tools.getDate(res.data.happenTime, 1),
          label: '事故发生时间'
        },
        {
          value: this.$tools.accidentType(res.data.type),
          label: '事故分类'
        },
        {
          value: this.$tools.accidentNature(res.data.nature),
          label: '事故性质'
        },
        {
          value: this.$tools.accidentLevel(res.data.level),
          label: '事故等级'
        },
        {
          value: res.data.financialLoss,
          label: '事故直接经济损失'
        },
        {
          value: res.data.deathNum,
          label: '死亡人数'
        },
        {
          value: res.data.injuredNum,
          label: '受伤人数'
        },
        {
          value: res.data.location,
          label: '事故发生地点'
        },
        {
          value: this.$tools.accidentStatus(res.data.status),
          label: '事故现状态'
        }
      ]
    },
    cancel() {
      this.$router.go(-1)
    },
    submitForm(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const req = {
            finishInfo: values.finishInfo,
            id: this.detailId
          }
          this.confirmLoading = true
          this.finishAccident(req)
            .then(res => {
              this.$message.success('操作成功')
              this.$tools.goNext(() => {
                this.$router.go(-1)
              })
            })
            .catch(() => {
              this.confirmLoading = false
            })
        }
      })
    },
    // 自定义单选多选
    addFrom(type) {
      if (type === 0) {
        const key = 0
        const obj = {
          type: '多选',
          options: [
            { name: '', id: key++ }
          ]
        }
        this.topicAll.push(obj)
      }
    },
    delForm(index) {
      if (this.topicAll.length === 1) return
      this.topicAll.filter(v => v !== index)
    },
    remove(k) {
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      // We need at least one passenger
      if (keys.length === 1) {
        return
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      })
    },
    add() {
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      const nextKeys = keys.concat(id++)
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const { keys, names } = values
          console.log('Received values of form: ', values)
          console.log(
            'Merged values:',
            keys.map(key => names[key])
          )
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.task-add {
  padding: 20px;
  box-sizing: border-box;
  .content {
    height: calc(100% - 10px);
    overflow-y: scroll;
    .task-cont{
      .detail-title{
        border-bottom: 1px solid #DEDEDE;
        height: 30px;
        position: relative;
        display: flex;
        justify-content: space-between;
        .title-tab-pane{
          height: 30px;
          font-size: 14px;
          color: #666;
          margin-right: 40px;
          border-bottom: 1px solid #DEDEDE;
          display: inline-block;
          font-weight: 400;
          cursor: pointer;
          &.on{
            color: #6882da;
            border-bottom: 2px solid #6882da;
            font-weight: bold;
          }
        }
      }
      .detail-info {
        background-color: #fff;
        // padding-left: 200px;
      }
    }
    .report{
      .left{
        width: 300px;
        height: 100%;
        margin-right: 40px;
        .list{
          margin-top:15px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          line-height: 50px;
        }
      }
      .rigth{
        width: 100%;
        //自定义表单样式
        .dynamic-delete-button {
          cursor: pointer;
          position: relative;
          top: 4px;
          font-size: 24px;
          color: #999;
          transition: all 0.3s;
        }
        .dynamic-delete-button:hover {
          color: #777;
        }
        .dynamic-delete-button[disabled] {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
