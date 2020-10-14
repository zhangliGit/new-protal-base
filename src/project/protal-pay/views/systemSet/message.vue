<template>
  <div class="page-layout qui-fx message">
    <div class="u-padd-40" style="width: 30%;">
      <a-form :form="form" :style="{ maxHeight: maxHeight }">
        <a-form-item v-bind="formItemLayout" label="消息类型">
          <a-checkbox-group v-model="checkedList">
            <div><a-checkbox value="0">发起收费</a-checkbox></div>
            <div class="u-mar-t20"><a-checkbox value="1">收费即将过期</a-checkbox></div>
            <div class="u-mar-t20"><a-checkbox value="2">账单更新</a-checkbox></div>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="通知方式">
          <a-checkbox-group>
            <div><a-checkbox value="0">发起收费</a-checkbox></div>
            <div class="u-mar-t20"><a-checkbox value="1">收费即将过期</a-checkbox></div>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="通知对象">
          <a-checkbox-group>
            <div><a-checkbox value="0">家长</a-checkbox></div>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout">
          <div class="u-padd-40 qui-fx-je">
            <a-button class="add-btn">保存</a-button>
          </div>
        </a-form-item>
      </a-form>
      <div>
        <img style="position: fixed; right: 60px; bottom: 60px;" src="../../assets/img/illustration.png" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Tools from '@u/tools'
export default {
  name: 'Message',
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 }
      },
      checkedList: [],
      maxHeight: 0
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped></style>
