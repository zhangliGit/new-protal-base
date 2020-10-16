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
      <!-- <a-form-item label="类型" v-bind="formItemLayout">
        <a-radio-group default-value="1" @change="change">
          <a-radio value="1">已有收费项</a-radio>
          <a-radio value="2">新增收费项</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <div v-if="isShow">
        <a-form-item label="收费项" v-bind="formItemLayout">
          <a-select @change="chooseCharge" placeholder=" 请选择收费项">
            <a-select-option
              v-for="(item, i) in chargeList"
              :key="i"
              :value="`${item.itemName}+${item.itemCode}+${item.itemPrice}`"
              >{{ item.itemName }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="收费标准" v-bind="formItemLayout"
          >{{ this.unitPrice == '' ? '0' : this.unitPrice }}元/期</a-form-item
        >
      </div>
      <!-- <div v-if="isHide">
        <a-form-item label="收费项名称" v-bind="formItemLayout">
          <a-input
            v-decorator="[
              'itemName',
              {
                initialValue: formData.itemName,
                rules: [{ required: true, message: '请填写收费项名称' }]
              }
            ]"
            placeholder="请填写收费项名称"
          />
        </a-form-item>
        <a-form-item label="单价" v-bind="formItemLayout">
          <a-input
            v-model="itemPrice"
            v-decorator="[
              'itemPrice',
              {
                initialValue: formData.itemPrice,
                rules: [{ required: true, message: '请填写单价' }]
              }
            ]"
            placeholder="请填写单价"
          />
        </a-form-item>
      </div> -->
      <a-form-item v-bind="formItemLayout" label="数量">
        <a-input-number
          v-model="orders"
          style="width: 50%;"
          :min="1"
          v-decorator="['itemNum', { initialValue: formData.itemNum }]"
        />
      </a-form-item>
      <a-form-item label="总金额" v-bind="formItemLayout"
        >{{ this.totalPrice == '' ? '0' : this.totalPrice }}元</a-form-item
      >
    </a-form>
  </a-modal>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AddCount',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 21 }
      },
      isLoad: false,
      addVisible: false,
      form: this.$form.createForm(this),
      formData: {
        itemName: '',
        itemNum: '',
        itemPrice: ''
      },
      isView: false,
      chargeList: [],
      pageList: {
        pageNum: 1,
        pageSize: 20
      },
      isShow: true,
      isHide: false,
      orders: '',
      itemPrice: '',
      type: 1,
      itemVOList: [],
      totalPrice: '',
      unitPrice: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  watch: {
    orders(val) {
      if (this.type === 1) {
        this.totalPrice = Number(this.unitPrice) * Number(val)
      } else if (this.type === 2) {
        this.totalPrice = Number(this.itemPrice) * Number(val)
      }
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getSelect']),
    change(e) {
      this.unitPrice = ''
      this.orders = ''
      if (e.target.value === '1') {
        this.isShow = true
        this.isHide = false
        this.type = 1
      } else {
        this.isShow = false
        this.isHide = true
        this.type = 2
      }
    },
    chooseCharge(value) {
      this.unitPrice = value.split('+')[2]
      console.log(this.formData.unitPrice)
      this.itemCode = value.split('+')[1]
      this.itemName = value.split('+')[0]
    },
    async showList() {
      const req = {
        ...this.pageList,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getSelect(req)
      this.chargeList = res.data.records
    },
    addSubmit(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (!error) {
          this.itemVOList.push({
            itemCode: this.itemCode,
            itemName: this.itemName,
            itemNum: values.itemNum,
            itemPrice: this.unitPrice,
            totalMoneySum: this.totalPrice
          })
          this.addVisible = false
          this.isLoad = false
          this.$message.success('添加成功')
          this.$emit('getList', this.itemVOList)
          this.$tools.goNext(() => {
            this.$emit('update')
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
