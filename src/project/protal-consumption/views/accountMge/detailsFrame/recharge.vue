<template>
  <Model ref="modle" title="改变" @ok="submit">
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :form-data="formData">
    </submit-form>
  </Model>
</template>

<script>
import { mapState } from 'vuex'
import Model from '../../../component/Modal'
import SubmitForm from './SubmitForm'
// import hostEnv from '@config/host-env'
const formData = [
  {
    value: 'userName',
    initValue: '',
    type: 'input',
    label: '姓名',
    disabled: true,
    required: false
  },
  {
    value: 'orgName',
    initValue: '',
    type: 'input',
    label: '班级/部门',
    disabled: true,
    required: false
  },
  {
    value: 'userIdentity',
    initValue: '',
    type: 'input',
    label: '身份',
    disabled: true,
    required: false
  },
  {
    value: 'workNo',
    initValue: '',
    type: 'input',
    label: '学号/工号',
    disabled: true,
    required: false
  },
  {
    value: 'card',
    initValue: '',
    type: 'input',
    label: '卡号',
    disabled: true,
    required: false
  },
  {
    value: 'status',
    initValue: '',
    type: 'input',
    label: '状态',
    disabled: true,
    required: false
  },
  {
    value: 'cardName',
    initValue: '',
    type: 'input',
    label: '卡类型',
    disabled: true,
    required: false
  },
  {
    value: 'balance',
    initValue: '',
    type: 'input',
    label: '账户余额',
    disabled: true,
    required: false
  },
  {
    value: 'consumeBalance',
    initValue: '',
    type: 'input',
    label: '充值金额',
    placeholder: '请输入充值金额'
  },
  {
    value: 'remark',
    initValue: '',
    type: 'input',
    label: '备注',
    placeholder: '请输入备注'
  },
  {
    type: 'text',
    label: '',
    text: '* 请确认核对收到一致的现金金额',
    style: {
      color: 'red'
    }
  }
]
export default {
  name: 'GradeTree',
  components: {
    SubmitForm,
    Model
  },
  props: {
    // /**
    //  * @des 列表数据
    //  */
    // dataList: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   }
    // },
    // /**
    //  * @des 是否展示标签类型
    //  */
    // isShow: {
    //   type: Boolean,
    //   default: false
    // },

    actionTitle: {
      type: String,
      default: ''
    },
    school: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData,
      // actionTitle: '',
      noData: false,
      showTag: true,
      treeData: [],
      gradeId: '',
      classId: '',
      gradeList: [],
      defaultSelectedKeys: [],
      defaultExpandedKeys: [],
      schoolYearId: '',
      schoolYear: ''
    }
  },

  computed: {
    ...mapState('home', ['schoolCode'])
  },
  mounted() {
    this.initMenu()
  },
  methods: {
    submit(e) {
      const vm = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          vm.$refs.modal.visible = false
          vm.$emit('onChildValue', values)
        }
      })
    },
    async submitForm (values) {
      console.log('values', values)
      // return false
      const req = {
        ...values,
        userCode: this.userInfo.userCode,
        userId: this.id,
        card: values.card,
        consumeBalance: values.consumeBalance,
        remark: values.remark,
        balance: values.balance
      }
      if (this.type === '0') {
        await this.recharge(req)
        this.$message.success('充值成功')
      } else if (this.type === '1') {
        await this.charge(req)
        this.$message.success('扣款成功')
      } else if (this.type === '2') {
        await this.subsidy(req)
        this.$message.success('补助成功')
      }
      this.$tools.goNext(() => {
        this.showList()
        this.$refs.form.reset()
      })
    },
    async initMenu() {
    }
  }
}
</script>

<style lang="less" scoed>
.grade-tree {

}
</style>
