<template>
  <a-modal
    width="650px"
    :title="title"
    v-model="status"
    @ok="submitOk"
    :maskClosable="false"
    :destroyOnClose="true"
    okText="提交"
    :confirmLoading="confirmLoading"
  >
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout" label="学校名称" >
        <a-input
          placeholder="请输入学校名称"
          v-decorator="[
            'schoolName',
            { initialValue: appForm.schoolName, rules: [ {required: true, message: '请输入学校名称' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="学校编码" >
        <a-input
          :disabled="disabled"
          placeholder="请输入学校编码"
          v-decorator="[
            'schoolCode',
            { initialValue: appForm.schoolCode, rules: [ { required: true, message: '请输入学校编码' } ]}
          ]"
        />
      </a-form-item>
      <!--复选框-->
      <a-form-item v-bind="formItemLayout" label="学段" required>
        <a-checkbox-group v-model="checkedList" :disabled="disabled">
          <div class="qui-fx mar-b10">
            <div style="width:75px">
              <a-checkbox :style="radioStyle" :value="primary"> 小学 </a-checkbox>
            </div>
            <div style="width:275px">
              <a-select v-model="primarySystem" allowClear :disabled="disabled">
                <a-select-option v-for="item in primaryList" :key="item.key">{{ item.value }}</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="qui-fx mar-b10">
            <div style="width:75px">
              <a-checkbox :style="radioStyle" :value="middle"> 初中 </a-checkbox>
            </div>
            <div style="width:275px">
              <a-select v-model="middleSystem" allowClear :disabled="disabled">
                <a-select-option v-for="item in middleList" :key="item.key">{{ item.value }}</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="qui-fx">
            <div style="width:75px">
              <a-checkbox :style="radioStyle" :value="high"> 高中 </a-checkbox>
            </div>
            <div style="width:275px">
              <a-select v-model="highSystem" allowClear :disabled="disabled">
                <a-select-option v-for="item in highList" :key="item.key">{{ item.value }}</a-select-option>
              </a-select>
            </div>
          </div>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="地区">
        <a-cascader
          :options="areaList"
          @click.stop="onFocus"
          @change="onChange"
          :loadData="loadData"
          :placeholder="placeholder"
          v-decorator="[
            'value',
            {initialValue: [], rules: [{ required: placeholder === '请选择地区' ? true : false, message: '请选择地区' }]}
          ]"
          changeOnSelect/>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="详细地址" >
        <a-input
          placeholder="请输入详细地址"
          v-decorator="[
            'detailAddress',
            { initialValue: appForm.detailAddress, rules: [ { required: false, message: '请输入详细地址' } ]}
          ]"
        />
      </a-form-item>
      <!--上传图片-->
      <a-form-item v-bind="formItemLayout" label="logo" required>
        <upload-multi :length="1" v-model="fileList" :fileInfo="fileInfo" ></upload-multi>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="备注" >
        <a-input
          placeholder="备注"
          v-decorator="[
            'remark',
            { initialValue: appForm.remark, rules: [ { required: false, message: '请输入备注' } ]}
          ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { mapActions } from 'vuex'
import UploadMulti from '@c/UploadMulti'
export default {
  name: 'AddInstitute',
  components: {
    UploadMulti
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fileInfo: {
        tip: '上传图片',
        h: 120, // 高度
        w: 120 // 宽度
      },
      fileList: [],
      confirmLoading: false,
      status: false,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      },
      appForm: {

      },
      areaList: [],
      placeholder: '请选择地区',
      length: 0,
      radioStyle: {
        display: 'block'
      },
      primarySystem: 6,
      middleSystem: 3,
      highSystem: 3,
      primaryList: [{
        key: 6,
        value: '六年制'
      }, {
        key: 5,
        value: '五年制'
      }],
      middleList: [{
        key: 3,
        value: '三年制'
      }, {
        key: 4,
        value: '四年制'
      }],
      highList: [{
        key: 3,
        value: '三年制'
      }, {
        key: 4,
        value: '四年制'
      }],
      checkBox: [],
      primary: '01',
      middle: '02',
      high: '03',
      checkedList: []
    }
  },
  methods: {
    ...mapActions('home', [
      'getProvinces', 'getSubNodes', 'delSchool', 'addSchool', 'updateSchool'
    ]),
    onChange (value, obj) {
      this.length = obj.length
      if (obj.length === 3) {
        this.appForm.provinceName = obj[0].label
        this.appForm.provinceCode = obj[0].id
        this.appForm.cityName = obj[1].label
        this.appForm.cityCode = obj[1].id
        this.appForm.areaName = obj[2].label
        this.appForm.areaCode = obj[2].id
        this.appForm.isChange = true
      } else {
        this.appForm.isChange = false
      }
    },
    loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      this.getSubNodes(targetOption.id).then(res => {
        targetOption.loading = false
        targetOption.children = res.data
        targetOption.children.forEach(el => {
          el.label = el.cityName
          el.value = el.id
          el.isLeaf = selectedOptions.length === 2 // 处理第三层没有子节点的情况
        })
        this.areaList = [...this.areaList]
      })
    },
    onFocus (value) {
      this.areaList = []
      this.isNotEdited = false
      this.getProvinces().then(res => {
        this.areaList = res.data
        this.areaList.forEach(el => {
          el.label = el.cityName
          el.value = el.id
          el.isLeaf = false
        })
      })
    },
    submitOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.checkedList.length === 0) {
            this.$message.warning('请选择学段')
            return
          }
          if (this.fileList.length === 0) {
            this.$message.warning('请上传照片')
            return
          }
          values.primarySystem = this.primarySystem
          values.schoolStage = this.checkedList.join(',')
          values.middleSystem = this.middleSystem
          values.highSystem = this.highSystem
          values.logoUrl = this.fileList[0].url
          if (this.checkedList.indexOf('01') === -1) {
            values.primarySystem = ''
          }
          if (this.checkedList.indexOf('02') === -1) {
            values.middleSystem = ''
          }
          if (this.checkedList.indexOf('03') === -1) {
            values.highSystem = ''
          }
          if (this.title === '新增学校') {
            this.addSchool({
              ...this.appForm,
              ...values
            }).then(res => {
              this.confirmLoading = false
              this.status = false
              this.$message.success('操作成功')
              this.$emit('update')
            }).catch(() => {
              this.confirmLoading = false
            })
          } else {
            this.updateSchool({
              ...this.appForm,
              ...values
            }).then(res => {
              this.confirmLoading = false
              this.status = false
              this.$message.success('操作成功')
              this.$emit('update')
            }).catch(() => {
              this.confirmLoading = false
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
