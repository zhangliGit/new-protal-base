<template>
  <div class="class-honor qui-fx">
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="formStatus"
      :form-data="formData"
    >
      <div slot="upload" class="qui-fx qui-fx-ac">
        <upload-video type="image" :length="1" v-model="fileList" :fileInfo="fileInfo" @delUpload="delUpload"></upload-video>
        <span class="u-mar-l10 u-font-01 u-tips-color">支持上传png/jpg格式,大小不能超过10M</span>
      </div>
    </submit-form>
    <div class="left">
      <class-tree @select="select"></class-tree>
    </div>
    <div class="right qui-fx-ver">
      <div class="qui-fx-je u-mar-b10">
        <a-button class="mar-r10" type="primary" @click="addHonor(0)">
          <a-icon type="plus" />新增
        </a-button>
        <a-button type="danger" @click="deleHonor(0)">
          <a-icon type="delete" />批量删除
        </a-button>
      </div>
      <table-list
        is-check
        is-zoom
        :page-list="pageList"
        v-model="chooseList"
        :columns="columns"
        :table-list="dataList"
      >
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="修改">
            <a-button
              size="small"
              class="edit-action-btn"
              icon="form"
              @click.stop="addHonor(1, action.record)"
            ></a-button>
          </a-tooltip>
          <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="deleHonor(action.record)">
            <template slot="title">
              您确定删除吗?
            </template>
            <a-tooltip placement="topLeft" title="删除">
              <a-button size="small" class="del-action-btn" icon="delete"></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UploadVideo from '@c/UploadVideo'
import ClassTree from '@c/ClassTree'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import Tools from '@u/tools'
import SubmitForm from '@c/SubmitForm'
import hostEnv from '@config/host-env'
const columns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '10%',
    customRender: text => {
      return Tools.getSex(text)
    }
  },
  {
    title: '学号',
    dataIndex: 'workNo',
    width: '10%'
  },
  {
    title: '年级',
    dataIndex: 'gradeName',
    width: '15%',
    customRender: (text, record) => {
      return `${record.gradeName}${record.className}`
    }
  },
  {
    title: '入学年份',
    dataIndex: 'admissionTime',
    width: '10%',
    customRender: text => {
      return new Date(text).getFullYear()
    }
  },
  {
    title: '走住读类型',
    dataIndex: 'hasDorm',
    width: '10%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '人脸照片',
    dataIndex: 'photoUrl',
    width: '10%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  }
]
const formData = [
  {
    value: 'userName',
    initValue: '',
    type: 'input',
    label: '荣誉名称',
    max: 50,
    placeholder: '请输入荣誉名称, 不超过50个字符'
  },
  {
    value: 'time',
    initValue: '',
    type: 'singleTime',
    label: '获奖时间',
    placeholder: '请选择获奖时间'
  },
  {
    type: 'upload',
    label: '图片',
    required: false,
    placeholder: '请上传图片'
  }
]
export default {
  components: {
    ClassTree,
    TableList,
    PageNum,
    SubmitForm,
    UploadVideo
  },
  data () {
    return {
      columns,
      formData,
      formStatus: false,
      title: '新增荣誉',
      dataList: [],
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      chooseList: [],
      fileInfo: {
        url: '',
        tip: '上传图片',
        height: 120,
        width: 120
      },
      fileList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created () {
    this.fileInfo.url = `${hostEnv.zk_oa}/study/theme/file/uploadFile?schoolCode=${this.userInfo.schoolCode}`
  },
  methods: {
    ...mapActions('home', ['delFile', 'getClassMotto', 'addClassMotto', 'delFile']),
    // 选中年级
    select (item) {
      console.log(item)
      if (item.classCode) {
        this.classInfo = item
        this.showList()
      }
    },
    delUpload(id) {
      this.delFile(id)
    },
    async showList () {
      const req = {
        ...this.classInfo,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getClassMotto(req)
      if (!res.data) {
        this.inputText = ''
        this.areaText = ''
      } else {
        this.inputText = res.data.motto
        this.areaText = res.data.introduce
      }
    },
    deleteList(type, record) {
      if (type) {
      } else {
        if (this.chooseList.length === 0) {
          this.$message.warning('请选择删除项')
        }
      }
    },
    addHonor(type, record) {
      this.formStatus = true
      if (type) {
        console.log(record)
        this.title = '编辑荣誉'
        this.formData = this.$tools.fillForm(formData, record)
        this.fileList = record.photoUrl ? [{ url: record.photoUrl }] : []
        this.type = 1
      } else {
        this.title = '新增荣誉'
        this.formData = formData
        this.fileList = []
        this.type = 0
      }
    },
    submitForm(values) {
      const req = {
        ...values,
        ...this.classInfo,
        schoolCode: this.userInfo.schoolCode,
        schoolId: this.userInfo.schoolId,
        admissionTime: values.admissionTime[0] || values.admissionTime,
        photoUrl: this.fileList.length > 0 ? this.fileList[0].url : ''
      }
      let res = null
      if (this.type === 0) {
        res = this.addStudent(req)
      } else {
        req.userId = this.userId
        res = this.studentUpdate(req)
      }
      res
        .then(() => {
          this.keywords = ''
          this.$message.success(this.type === 0 ? '添加成功' : '编辑成功')
          this.$tools.goNext(() => {
            this.showList()
            this.$refs.form.reset()
            this.fileList = []
          })
        })
        .catch(() => {
          this.$refs.form.error()
        })
    }
  }
}
</script>

<style lang="less" scoped>
.class-honor{
  flex: 1;
  overflow: hidden;
  .left{
    background: #fff;
    margin-right: 10px;
    padding: 10px;
    width: 200px;
  }
  .right{
    position: relative;
    flex: 1;
    background: #fff;
    padding: 10px;
    width: calc(100% - 210px);
  }
}
</style>
