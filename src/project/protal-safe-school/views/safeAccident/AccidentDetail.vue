<template>
  <div class="accident-add page-layout bg-fff qui-fx-ver">
    <div class="content pos-box">
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" :label="list.label" v-for="(list,index) in formData" :key="index" required>
          <a-input v-decorator="[ 'value', {initialValue: list.value} ]" readOnly/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="事故发生详情" required>
          <a-textarea v-decorator="[ 'value1', {initialValue: ''} ]" readOnly/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="事故图片">
          <img src="imageUrl" alt="" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="批示以及续报信息">
          <a-input v-decorator="[ 'value', {initialValue: '暂未有批示和续报信息'} ]" readOnly/>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AddAccident',
  components: { },
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      formData: [],
      detailId: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showDetail(this.detailId)
  },
  methods: {
    ...mapActions('home', ['addOtherArchive', 'updateOtherArchive', 'otherArchivesDetail']),
    async showDetail() {
      // const res = await this.otherArchivesDetail(this.detailId)
      this.formData = [{
        value: 'name',
        label: '事故名称'
      },
      {
        value: 'buyDate',
        label: '事故发生时间'
      },
      {
        value: 'roleId',
        label: '事故分类'
      },
      {
        value: 'roleId1',
        label: '事故性质'
      },
      {
        value: 'roleId2',
        label: '事故等级'
      },
      {
        value: 'num',
        label: '事故直接经济损失'
      },
      {
        value: 'num21',
        label: '死亡人数'
      },
      {
        value: 'num2',
        label: '受伤人数'
      },
      {
        value: 'name',
        label: '事故发生地点'
      },
      {
        value: 'hasTorn',
        label: '事故现状态'
      }]
    },
    async submitForm(values) {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传图片')
        return false
      }
      try {
        const req = {
          ...values,
          photoUrl: this.fileList[0].url,
          deviceType: this.deviceType,
          schoolCode: this.userInfo.schoolCode,
          type: '2'
        }
        if (!this.detailId) {
          await this.addOtherArchive(req)
        } else {
          req.id = this.detailId
          await this.updateOtherArchive(req)
        }
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.$refs.form.reset()
          this.$router.go(-1)
        })
      } catch {
        this.$refs.form.reset()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.accident-add {
  padding: 20px;
  .content {
    height: calc(100% - 100px);
    overflow-y: scroll;
    img {
      width: 160px;
      height: 160px;
    }
  }
}
</style>
