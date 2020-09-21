<template>
  <a-modal
    :title="title"
    v-model="addVisible"
    :destroyOnClose="true"
    :maskClosable="false"
    width="940px"
    @ok="addSubmit"
    :okButtonProps="{ props: { disabled: isLoad } }"
    :cancel-button-props="{ props: { disabled: isView } }"
  >
    <a-form :form="form">
      <a-form-item label="表扬班级" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }" required>
        <div>
          <template v-for="tag in classList">
            <a-tag :key="tag.classCode" :closable="true" :afterClose="() => classClose(tag)">
              {{ tag.gradeName }}{{ tag.className }}
            </a-tag>
          </template>
          <a-tag @click="addTag()" style="background: #fff; borderStyle: dashed;"> <a-icon type="plus" />添加 </a-tag>
        </div>
      </a-form-item>
      <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }" label="选择表扬语" required>
        <a-select
           mode="multiple"
          v-decorator="[
            'label',
            { initialValue: appForm.label, rules: [{ required: true, message: '请选择选择表扬语' }] }
          ]"
          placeholder="请选择选择表扬语"
        >
          <a-select-option v-for="list in batchList" :key="`${list.label}`">
            {{ list.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <choose-class
      ref="chooseClass"
      is-check
      v-model="studentTag"
      v-if="studentTag"
      @submit="chooseClass"
      :classList="classList"
    ></choose-class>
  </a-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import ChooseClass from '@c/choose/ChooseClass'
export default {
  name: 'AddPraise',
  components: {
    ChooseClass
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      studentTag: false,
      classList: [],
      pageList: {
        page: 1,
        size: 20
      },

      isLoad: false,
      addVisible: false,
      form: this.$form.createForm(this),
      appForm: {
        label: ''
      },
      isView: false,
      batchList: [],
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.praiseList_()
  },
  methods: {
    ...mapActions('home', ['addsetPraise', 'updatesetPraise', 'praiseList']),
   handleChange(value) {
    //  if(value.length>3){
    //   this.$message.warning('表扬语不能超过3个!')
    //    return false
    //  }
    },
    addTag() {
      this.studentTag = true
    },
    async praiseList_() {
      const req = {
        schoolCode: this.userInfo.schoolCode,
        ...this.pageList
      }
      const res = await this.praiseList(req)
      this.batchList = res.data.list.filter((item) => item.category === 1)
    },
    classClose(removedTag) {
      this.classList = this.classList.filter((tag) => tag !== removedTag)
    },
    chooseClass(classInfo) {
      this.classList = classInfo.map((el) => {
        return {
          category: 1,
          classCode: el.classCode,
          className: el.className,
          gradeCode: el.gradeCode,
          gradeName: el.gradeName,
          createUsercode: this.userInfo.userCode,
          createUsername: this.userInfo.userName,
          schoolCode: this.userInfo.schoolCode,
          schoolYearId: el.schoolYearId
        }
      })
      this.$refs.chooseClass.reset()
    },
    addSubmit(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (!error) {
          if (this.classList.length === 0) {
            this.$message.warning('请选择要表扬的班级!')
            return
          }
          this.isLoad = true
          const req = {
            labelList: values.label,
            praiseList: this.classList
          }
          this.addsetPraise(req)
            .then((res) => {
              this.addVisible = false
              this.isLoad = false
              this.$message.success('操作成功')
              this.$tools.goNext(() => {
                this.$emit('update')
              })
            })
            .catch((res) => {
              this.isLoad = false
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
