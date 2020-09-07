<template>
  <div class="accident-add page-layout bg-fff qui-fx-ver">
    <div class="content pos-box">
      <a-form :form="form">
        <a-form-item
          v-bind="formItemLayout"
          :label="list.label"
          v-for="(list, index) in formData"
          :key="index"
          required
        >
          <a-input v-decorator="['value', { initialValue: list.value }]" readOnly />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="巡查点数量">
          <div>{{ detailInfo.details }}</div>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="值班轨迹">
          <img :src="url" alt="" v-for="(url, index) in detailInfo.pictures" :key="index" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="事故图片">
          <img :src="url" alt="" v-for="(url, index) in detailInfo.pictures" :key="index" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="问题描述">
          <a-textarea v-decorator="['details', { initialValue: detailInfo.details }]" readOnly />
        </a-form-item>
      </a-form>
    </div>
    <a-modal
      :visible="visible"
      :footer="null"
      centered
      @cancel="visible = false"
      :bodyStyle="bodyStyle"
      width="360px"
      :closable="false"
      :destroyOnClose="true"
    >
      <table-list :columns="columns" :table-list="inspectList"> </table-list>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const columns = [
  {
    title: '巡查地点名称',
    dataIndex: 'name',
    width: '30'
  },
  {
    title: '巡查结果',
    dataIndex: 'name1',
    width: '30'
  },
  {
    title: '巡查时间',
    dataIndex: 'createTime',
    width: '40%',
    customRender: text => {
      return $tools.getDate(text)
    }
  }
]
export default {
  name: 'AddAccident',
  components: {},
  data() {
    return {
      columns,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      formData: [],
      detailId: '',
      detailInfo: {},
      confirmLoading: false,
      visible: false,
      bodyStyle: {
        padding: 0
      },
      inspectList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.detailId = this.$route.query.id
    this.showDetail(this.detailId)
  },
  methods: {
    ...mapActions('home', ['finishAccident', 'updateOtherArchive', 'accidentDetail']),
    async showDetail() {
      const res = await this.accidentDetail(this.detailId)
      const data = res.data
      this.detailInfo = data
      this.formData = [
        {
          value: res.data.title,
          label: '值班员'
        },
        {
          value: this.$tools.getDate(res.data.happenTime, 1),
          label: '值班电话'
        },
        {
          value: this.$tools.accidentType(res.data.type),
          label: '带班领导'
        },
        {
          value: this.$tools.accidentNature(res.data.nature),
          label: '带班领导电话'
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
    }
  }
}
</script>
<style lang="less" scoped>
.accident-add {
  padding: 20px;
  .content {
    height: calc(100% - 10px);
    overflow-y: scroll;
    img {
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }
    .title {
      height: 40px;
      background-color: #f2f2f2;
    }
  }
}
</style>
