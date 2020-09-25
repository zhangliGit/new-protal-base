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
      <a-form-item label="学生姓名" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }" required>
        <div>
          <template v-for="tag in classList">
            <a-tag :key="tag.userCode" :closable="true" :afterClose="() => classClose(tag)">
              {{ tag.userName }}
            </a-tag>
          </template>
          <a-tag @click="addTag()" style="background: #fff; borderStyle: dashed;"> <a-icon type="plus" />添加 </a-tag>
        </div>
      </a-form-item>
      <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }" label="选择表扬语" required>
        <a-select
            v-model="value"
          mode="multiple"
          v-decorator="[
            'label',
            { initialValue: appForm.label, rules: [{ required: true, message: '请选择选择表扬语' }] }
          ]"
          placeholder="请选择选择表扬语"
        >
          <a-select-option v-for="list in batchList" :key="`${list.label}`" >
            {{ list.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <choose-student
      ref="chooseUser"
      is-check
      chooseType="class"
      v-if="userTag"
      v-model="userTag"
      @submit="chooseUser"
      title="选择学生"
      :classList="classList"
    ></choose-student>
  </a-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import ChooseStudent from '@c/ChooseStudent'
export default {
  name: 'AddPraises',
  components: {
    ChooseStudent
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      userTag: false,
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
      value:'3'
    }
  },
  watch: {
    value(val) {
      if (val.length > 3) {
        this.$message.warning('表扬语不能超过3个!')
        return false
      }
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
    addTag() {
      this.userTag = true
    },
    async praiseList_() {
      const req = {
        schoolCode: this.userInfo.schoolCode,
        ...this.pageList
      }
      const res = await this.praiseList(req)
      this.batchList = res.data.list.filter((item) => item.category === 2)
    },
    classClose(removedTag) {
      this.classList = this.classList.filter((tag) => tag !== removedTag)
    },
    chooseUser(values) {
      this.classList = values
      this.$refs.chooseUser.reset()
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
            praiseList: this.classList.map((el) => {
              return {
                category: 2,
                praiseNamePhoto: el.photoUrl,
                praiseName: el.userName,
                praiseCode: el.userCode,
                createUsercode: this.userInfo.userCode,
                createUsername: this.userInfo.userName,
                schoolCode: this.userInfo.schoolCode,
                schoolYearId: el.schoolYearId,
                classCode: el.classCode,
                className: el.className,
                gradeCode: el.gradeCode,
                gradeName: el.gradeName
              }
            })
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

<style lang="less" scoped></style>
