<template>
  <div class="task-add bg page-layout qui-fx-ver">
    <div class="content pos-box">
      <div class="task-cont u-bg-fff u-padd-20">
        <div class="detail-title">
          <span class="title-tab-pane on u-type-primary">预览任务</span>
        </div>
        <div class="detail-info u-padd-30 u-content-color u-fx-ver">
          <div class="u-font-1 u-fx-ac-jc u-bold">教育局下发演示任务</div>
          <a-divider class="u-type-primary-bg" />
          <a-row :gutter="[0,0]" type="flex" class="u-mar-b10" >
            <a-col :span="4" :offset="8" >
              发布人：admin
            </a-col>
            <a-col :span="10" :push="2" >
              发布时间：2019-05-27 &nbsp;
            </a-col>
          </a-row>
          <a-row :gutter="[0,0]" type="flex">
            <a-col :span="4" :offset="8" >
              任务开始时间：admin
            </a-col>
            <a-col :span="10" :push="2" >
              任务结束时间：-05-27 &nbsp;
            </a-col>
          </a-row>
          <a-row :gutter="[0,0]" class="u-mar-t10" type="flex" justify="center">
            <a-col :span="18" >
              <a-carousel arrows >
                <div
                  slot="prevArrow"
                  slot-scope="props"
                  class="custom-slick-arrow"
                  style="left: 10px;zIndex: 1"
                >
                  <a-icon type="right-circle" />
                </div>
                <div
                  slot="nextArrow"
                  slot-scope="props"
                  class="custom-slick-arrow"
                  style="right: 10px;zIndex: 3">
                  <a-icon type="right-circle" />
                </div>
                <div> <img :src="baseUrl" /></div>
                <div> <img :src="baseUrl" /></div>
                <div> <img :src="baseUrl" /></div>
                <div> <img :src="baseUrl" /></div>
              </a-carousel>
            </a-col>
          </a-row>
          <a-row :gutter="[0,0]" class="u-mar-t10" type="flex" justify="center">
            <a-col :span="18" >
              市城乡建设委员会欢迎大家积极举报涉黑涉恶问题线索：</br>

              &nbsp;&nbsp;1.在工程项目建设过程中，强揽土石方、劳务施工，垄断建筑机械设备租赁和建筑砂石料供应，强收“保护费”、敲诈勒索、恶意阻拦施工。

              电话：0531-66605634；电子邮箱：sjwjgc@163.com；

              邮寄地址：济南历下区龙鼎大道1号龙奥大厦F435室</br>

              &nbsp;&nbsp;2.在工程项目招投标过程中，以威胁、恐吓、暴力等手段，强迫他人接受限定条件或退出竞争，强迫中标人放弃中标或转包，交易过程寻衅滋事、恶意投诉。

              电话：0531-68967002；电子邮箱：sjwzbtb7002@163.com；</br>

              邮寄地址：济南市站前街9号政务中心2号楼1002室</br>

              &nbsp;&nbsp;3.在工程款结算和农民工工资支付过程中，恶意拖欠、暴力讨薪、聚众滋事。</br>

              电话：0531-61378850；电子邮箱：qingqianban8869@163.com；</br>

            </a-col>
          </a-row>
          <div class="u-mar-t40">
            <detail-title-left >上传附件</detail-title-left>
            <div class="download-box u-fx u-mar-t10">
              <div class="icon u-mar-l40  u-mar-r10">图标</div>
              <div class="text">示例1.doc</div>
              <div class="kb  u-light-color u-mar-l10">(1.23M)</div>
              <div class="dowload u-type-primary">下载</div>
            </div>
          </div>
        </div>
      </div>
      <div class="task-cont report  u-padd-20 u-bg-fff  u-mar-t20">
        <div class="detail-title">
          <span class="title-tab-pane on u-type-primary">要求上报内容</span>
        </div>
        <div class="detail-info u-mar-t30 u-fx">
          <div class="rigth  u-bd-1px u-padd-20">
            <div class="list" v-for="(item,index) in topicAll" :key="index">
              <div class="list-title u-mar-b10 u-fx-jsb">
                <div class="lf">{{ item.type }}</div>
                <div class="rt u-type-primary" @click="delForm(item,index)">删除</div>
              </div>
              <div class="list-cont u-padd-20 cont-bg u-bd-1px">
                <a-row :gutter="[50,100]" type="flex" align="center" >
                  <a-col :span="20" >
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
                  </a-col>
                </a-row>
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
import DetailTitleLeft from '../../component/DetailTitleLeft'
let id = 0
export default {
  name: 'Preview',
  components: {
    quillEditor,
    DetailTitleLeft
  },
  data() {
    return {
      baseUrl: 'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/',
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
@deep: ~'>>>';
.bg{
  background-color: #f0f2f5;
}
.cont-bg{
  background-color: #fafafa;
}
.task-add {
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
//轮播图
.ant-carousel @{deep} .slick-slide {
  text-align: center;
  width: 900px;
  height: 450px;
  line-height: 450px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel @{deep} .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel @{deep} .custom-slick-arrow:before {
  display: none;
}
.ant-carousel @{deep} .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel @{deep} .slick-slide h3 {
  color: #fff;
}
</style>
