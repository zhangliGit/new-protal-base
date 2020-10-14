<template>
  <div class="add-subsidy page-layout">
    <a-form
      id="components-form-demo-validate-other"
      :form="form"
      v-bind="formItemLayout"
      @submit="handleSubmit"
    >
      <a-form-item label="补助名称">
        <a-input
          v-decorator="['subsidyName', { initialValue: detail.subsidyName ,rules: [{ required: true, message: '请输入补助名称!' }] }]"
        />
      </a-form-item>
      <a-form-item label="发放对象">
        <a-radio-group v-decorator="['userType', { initialValue: detail.userType }]">
          <a-radio value="2">教职工</a-radio>
          <a-radio value="1">学生</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="发放人数">
        <span class="ant-form-text">{{ detail.grantNumber }}人</span>
      </a-form-item>
      <a-form-item label="每人发放金额">
        <a-input
          prefix="￥"
          v-decorator="['grantBalance', { initialValue: detail.grantBalance, rules: [{ required: true, message: '请输入发放金额!' }] }]"
          suffix="RMB"
          @change="setTotal"
        />
      </a-form-item>
      <a-form-item label="总发放金额">
        <span class="ant-form-text">{{ detail.grantTotalBalance }}</span>
      </a-form-item>

      <a-form-item label="发放时间">
        <a-radio-group v-decorator="['grantStatus', { initialValue: detail.grantStatus }]">
          <a-radio value="1">立即方法</a-radio>
          <a-radio value="0">稍后发放</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button class="u-mar-r" @click="$router.back()">取消</a-button>
        <a-button type="primary" :loading="loading" html-type="submit">确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddSubsidy',
  data() {
    return {
      detail: {
        grantNumber: 10, // 补助人数
        grantBalance: 0, // 补助金额
        grantTotalBalance: 0,
        userType: '2',
        grantStatus: '1',
        subsidyName: ''
      },
      loading: false,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' })
  },
  mounted() {
    this.type = this.$route.query.type
    if (this.type === 'edit') {
      this.detail = this.$route.query.detail
    }
  },
  methods: {
    ...mapActions('home', ['grantSubsidy', 'saveSubsidy']),
    /**
     * @description 计算总发放金额
     */
    setTotal(event) {
      this.detail.grantTotalBalance = this.detail.grantNumber * event.target.value
    },
    /**
     * @description 发送补助
     */
    async _grantSubsidy() {
      this.loading = true
      const params = {
        accounts: ['U14v9lo7screzt'],
        createBy: '',
        createTime: '',
        grantBalance: this.grantInfo.grantBalance,
        grantNumber: this.detail.grantNumber,
        grantStatus: '1',
        grantTime: '',
        grantTotalBalance: this.detail.grantTotalBalance,
        id: this.type === 'edit' ? this.detail.id : '',
        isDelete: '',
        params: {},
        remark: '',
        schoolCode: 'CANPOINTLIVE',
        searchValue: '',
        stuClass: ['20200101'],
        subsidyName: this.grantInfo.subsidyName,
        teaOrg: [],
        updateBy: '',
        updateTime: '',
        userType: this.grantInfo.userType
      }
      let actFun = ''
      if (parseInt(this.grantInfo.grantStatus) === 1) {
        // 立即发放
        actFun = 'grantSubsidy'
      } else {
        // 延迟发放
        actFun = 'saveSubsidy'
      }
      try {
        await this[actFun](params)
        this.$message.success('发送成功')
        this.$tools.goNext(() => {
          this.loading = false
          this.$router.back()
        })
      } catch (err) {
        this.loading = false
      }
    },
    /**
     * @description 表单验证
     */
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.grantInfo = values
          this._grantSubsidy()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.add-subsidy {
  padding: 40px 0;
}
</style>
