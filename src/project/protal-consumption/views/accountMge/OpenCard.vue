<template>
  <a-modal width="800px" title="开卡" v-model="status" :maskClosable="false" :destroyOnClose="true">
    <div class="open-card">
      <a-form id="components-form-demo-validate-other" :form="form" v-bind="formItemLayout">
        <a-form-item label="姓名">
          <span class="ant-form-text">{{ detail.userName }}</span>
        </a-form-item>
        <a-form-item label="学号/工号">
          <span class="ant-form-text">{{ detail.workNo }}</span>
        </a-form-item>
        <a-form-item label="班级/部门">
          <span class="ant-form-text">{{ detail.classBoards }}</span>
        </a-form-item>
        <a-form-item label="身份">
          <span class="ant-form-text">{{ baseData.userType(detail.userType) }}</span>
        </a-form-item>
        <a-form-item label="状态">
          <span class="ant-form-text">未开户</span>
        </a-form-item>
        <a-form-item label="每日消费限额">
          <a-input v-model="detail.everydayConsume" placeholder="请输入每日消费限额" />
        </a-form-item>
        <a-form-item label="单次消费限额">
          <a-input v-model="detail.singleConsume" placeholder="请输入单次消费限额" />
        </a-form-item>

        <a-form-item label="优惠类型">
          <a-radio-group v-model="preferType">
            <a-radio value="0">无优惠</a-radio>
            <a-radio value="1">折扣</a-radio>
            <a-radio value="2">减免</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="账户余额">
          <span class="ant-form-text">0.00</span>
        </a-form-item>
        <a-form-item label="押金">
          <span class="ant-form-text">0.00</span>
        </a-form-item>
      </a-form>
    </div>
    <template slot="footer">
      <a-button key="submit" type="primary" :loading="loading" @click="_addOpenAccount">确定</a-button>
    </template>
  </a-modal>
</template>
<script>
import baseData from '../../assets/js/base'
import { mapActions } from 'vuex'
export default {
  name: 'OpenCard',
  props: {
    value: {
      type: Boolean
    },
    userCode: {
      type: String,
      default: ''
    }
  },
  computed: {
    status: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', false)
      }
    }
  },
  data() {
    return {
      loading: false,
      baseData,
      preferType: '0',
      detail: { everydayConsume: 0, singleConsume: 0 },
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
    this._getOpenAccount()
  },
  methods: {
    ...mapActions('home', ['getOpenAccount', 'addOpenAccount']),
    /**
     * @description 查询开户人信息
     */
    async _getOpenAccount() {
      console.log(22)
      try {
        const res = await this.getOpenAccount('P14y1ab8tq8gu1')
        this.detail = res.data
      } catch (err) {
        this.$emit('hide')
      }
    },
    /**
     * @description 开户
     */
    async _addOpenAccount() {
      console.log(this.preferType)
      if (!this.detail.everydayConsume) {
        this.$message.warning('请输入单日消费限额')
        return
      }
      if (!this.detail.singleConsume) {
        this.$message.warning('请输入单次消费限额')
        return
      }
      this.loading = true
      try {
        await this.addOpenAccount({
          balance: 0,
          classBoards: this.detail.classBoards,
          consumeRule: {
            createBy: '',
            createTime: '',
            discount: 0,
            everydayConsume: this.detail.everydayConsume,
            id: '',
            params: {},
            preferType: this.preferType,
            remark: '',
            remit: 0,
            schoolCode: 'CANPOINTLIVE',
            searchValue: '',
            singleConsume: this.detail.singleConsume,
            updateBy: '',
            updateTime: '',
            userType: ''
          },
          deposit: 0,
          schoolCode: '',
          userCode: this.detail.userCode,
          userName: this.detail.userName,
          userType: '',
          workNo: ''
        })
        this.$message.success('开户成功')
        this.loading = true
        this.status = false
        this.$tools.goNext(() => {
          this.$parent._getAccountList()
        })
      } catch (err) {
        this.status = false
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.open-card {
  .ant-form-item {
    margin-bottom: 10px !important;
  }
}
</style>
