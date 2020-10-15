<template>
  <div class="lessonPlan qui-fx-ver">
    <!-- <div class="content pos-box bg-fff"> -->
    <div class="u-padd-10 u-padd-l20 u-padd-t40">
      <a-button class="mar-l10" type="primary" @click="addPlan">添加教案</a-button>
      {{ planList }}---{{ activeKey }}
      <a-collapse v-model="activeKey">
        <!-- :header="list.name" -->
        <a-collapse-panel :key="`${index+1}`" v-for="(list,index) in planList">
          <div slot="header" class="u-fx-ac" >
            <div>教案名称：</div>
            <div>
              <a-input @click.stop="inputChange" v-model="list.name" placeholder="请填写教案名称" />
            </div>
            <div class="delIcon">
              <a-icon type="close" @click.stop="delPlan(index)" />
            </div>
          </div>
          <a-form :form="form[Object.keys(form)[index]]">
            <a-form-item required label="教案图片" v-bind="formItemLayout">
              <a-row >
                <a-col :span="24" >
                  <upload-multi
                    :length="10"
                    v-model="list.pictures"
                    :fileInfo="fileInfo"
                  ></upload-multi>
                </a-col>
                <!-- <a-col :span="8" >
                  备注：限上传1张照片
                </a-col> -->
              </a-row>
            </a-form-item>
            <a-form-item
              label="教案内容："
              v-bind="formItemLayout"
              :style="{ textAlign: 'center' }"
              required
            >
              <quill-editor
                v-model="list.content"
                ref="myQuillEditor"
                :options="quillOption"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
              ></quill-editor>
            </a-form-item>
          </a-form>
        </a-collapse-panel>
      </a-collapse>
      <div class="u-tx-c u-mar-t20">
        <a-button type="primary" @click="previous">上一步</a-button>
        <a-button class="mar-l10" type="primary" @click="submitOk">下一步</a-button>
        <a-button class="mar-l10" @click="submitOk" :disabled="isLoad">完成</a-button>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import quillConfig from '../../../assets/js/quill-config'
import UploadMulti from '@c/UploadMulti'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'LessonPlan',
  components: {
    UploadMulti,
    quillEditor
  },
  data() {
    return {
      form: {
        creatFrom1: this.$form.createForm(this),
        creatFrom2: this.$form.createForm(this)
        // creatFrom3: this.$form.createForm(this)
      },
      activeKey: ['1'],
      planList: [
        {
          content: '',
          name: '',
          pictures: []
        },
        {
          content: '',
          name: '',
          pictures: []
        }
      ],
      quillOption: quillConfig,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      fileInfo: {
        tip: '上传图标',
        h: 120, // 高度
        w: 120 // 宽度
      },
      isLoad: false,
      cardInfo: {
        taskType: '1',
        thumbnailUrl: []
      },
      url: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  watch: {
  },
  async mounted() {
    this.id = this.$route.query.id
    if (this.id) {
      this.showDetail()
    }
  },
  methods: {
    ...mapActions('home', [
      'planSearch',
      'planBind'
    ]),
    // 添加教案
    addPlan() {
      this.planList.unshift({
        content: '',
        name: '',
        pictures: []
      })
      const value = `creatFrom${this.planList.length}`
      this.form[value] = this.$form.createForm(this)
      console.log(this.form)
    },
    delPlan(index) {
      this.planList.splice(index, 1)
      delete this.form[Object.keys(this.form)[index]]
      console.log(this.form)
    },
    inputChange() {},
    // 获取详情
    async showDetail() {
      const res = await this.planSearch(this.id)
      this.cardInfo = res.data.length === 0 ? this.cardInfo : {
        ...res.data,
        thumbnailUrl: [{ url: res.data.thumbnailUrl }],
        resourceType: [`${res.data.categoryId}+${res.data.categoryName}`, `${res.data.libId}+${res.data.libName}`]
      }
    },
    // 富文本编辑器方法
    onEditorFocus(data) {},
    // 获得焦点事件
    onEditorChange(data) {
      this.text = data.text
      this.content = data.html
      this.roundup = data.text.substring(0, 120)
    },
    previous() {
      this.$parent.stepsActive = '1'
    },

    cancel() {
      this.$router.go(-1)
    },
    nextStep() {
      this.$parent.stepsActive = '3'
    },
    // 提交
    submitOk(e) {
      e.preventDefault()
      // 循环校验表单
      let checkFalg = true
      const that = this
      Object.values(this.form).forEach((element, index) => {
        element.validateFields((error, values) => {
          if (!error) {
            const name = that.planList[index].name
            if (!name) {
              checkFalg = false
              return that.$message.success(`教案名字不能为空`)
            }
            const pictures = this.planList[index].pictures
            if (pictures.length === 0) {
              checkFalg = false
              return this.$message.success(`${name}教案图片不能为空`)
            }
            const content = this.planList[index].content
            if (!content) {
              checkFalg = false
              return this.$message.success(`${name}教案内容不能为空`)
            }
          }
        })
      })
      if (checkFalg) {
        const req = {
          classId: Number(this.id),
          planList: this.planList.map(v => {
            return {
              ...v,
              pictures: v.pictures.map(i => i.url)
            }
          })
        }
        console.log(req)
        this.planBind(req).then(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.lessonPlan {
  // border: 1px solid red;
}
</style>
