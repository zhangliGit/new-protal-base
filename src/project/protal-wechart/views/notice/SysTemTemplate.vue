<template>
  <div class="system-template page-layout u-type-white-bg u-fx-ver">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
      <div slot="upload">
        <upload-multi :length="3" v-model="fileList" :fileInfo="fileInfo"></upload-multi>
      </div>
    </submit-form>
    <a-tabs v-model="currentKey" default-active-key="1" @change="changeType">
      <a-tab-pane :key="index" :tab="tab.title" v-for="(tab, index) in typeList"></a-tab-pane>
      <a-button @click="addTemplate('新增模板')" icon="plus" type="primary" class="u-mar-r10" slot="tabBarExtraContent">
        新增模板
      </a-button>
    </a-tabs>
    <div class="u-fx-1 u-auto">
      <template-list :data-list="dataList"></template-list>
    </div>
  </div>
</template>

<script>
import TemplateList from './component/TemplateList'
import SubmitForm from '@c/SubmitForm'
import UploadMulti from '@c/UploadMulti'
const formData = [
  {
    value: 'type',
    initValue: '',
    type: 'input',
    label: '模块名称',
    max: 30, // 最大长度
    placeholder: '请输入模块名称'
  },
  {
    value: 'user',
    initValue: '',
    type: 'input',
    label: '模块内容',
    placeholder: '请输入模板内容'
  },
  {
    type: 'upload',
    label: '上传图片'
  }
]
export default {
  name: 'SystemTemplate',
  components: { TemplateList, SubmitForm, UploadMulti },
  data() {
    return {
      title: '新增通知类型',
      formData,
      formStatus: false,
      currentKey: 0,
      typeList: [
        {
          title: '推荐模板'
        },
        {
          title: '温馨提示'
        },
        {
          title: '班级通知'
        },
        {
          title: '预防通知'
        }
      ],
      dataList: [
        {
          title: '国庆放假通知',
          content:
            '衷心感谢您一直以来对学校工作的支持与帮助。在这举国同庆之际，根据国务院关于中秋节国庆节放假的安排，为了让孩子度过一个充实、平安的假期，现把放假时间及温馨提示通知如下，敬请家长配合，做好孩子的监护、教育工作。衷心感谢您一直以来对学校工作的支持与帮助。在这举国同庆之际，根据国务院关于中秋节国庆节放假的安排，为了让孩子度过一个充实、平安的假期，现把放假时间及温馨提示通知如下，敬请家长配合，做好孩子的监护、教育工作。'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    addTemplate(title) {
      this.formStatus = true
      this.title = title
    },
    changeType() {}
  }
}
</script>
<style lang="less" scoped>
.system-template {
}
</style>
