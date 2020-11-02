<template>
  <div class="page-layout qui-fx goods">
    <a-modal
      :title="checkTitle"
      :visible="checkVisible"
      :confirm-loading="confirmLoading"
      @ok="handleCheckOk"
      @cancel="handleCheckCancel"
    >
      <p>{{ checkText }}</p>
    </a-modal>
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="addFormStatus" :form-data="addFormDatas">
      <div slot="upload" class="qui-fx qui-fx-ac">
        <upload-multi is-check :length="1" v-model="fileList" type="face" :fileInfo="fileInfo"></upload-multi>
      </div>
    </submit-form>
    <div class="page-left">
      <grade-tree @select="select"></grade-tree>
    </div>
    <div class="qui-fx-f1 qui-fx-ver">
      <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
        <div slot="left">
          <a-button icon="plus" class="export-btn" @click="addClick">添加</a-button>
          <a-button class="export-btn" @click="checkClick(true)">批量通过</a-button>
          <a-button class="export-btn" @click="checkClick(false)">批量拒绝</a-button>
        </div>
      </search-form>
      <table-list isZoom isCheck :page-list="pageList" :columns="columns" :table-list="userList">
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="查看详情">
            <a-button
              size="small"
              class="detail-action-btn"
              icon="ellipsis"
              @click="detail(action.record.id)"
            ></a-button>
          </a-tooltip>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import GradeTree from '@c/GradeTree'
import UploadMulti from '@c/UploadFace'
import Tools from '@u/tools'
import SubmitForm from '../../component/SubForm.vue'
const searchLabel = [
  {
    value: 'name',
    type: 'input',
    label: '姓名'
  },
  {
    value: 'idCard',
    type: 'input',
    label: '身份证号'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '0',
        val: '申请中'
      },
      {
        key: '1',
        val: '申请失败'
      },
      {
        key: '2',
        val: '申请成功'
      }
    ],
    value: 'state',
    type: 'select',
    label: '申请状态'
  }
]
const addFormDatas = [
  {
    value: 'gradeName',
    initValue: [],
    list: [],
    type: 'select',
    label: '年级',
    placeholder: '请选择年级'
  },
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    value: 'sex',
    initValue: '1',
    list: [
      {
        key: '1',
        val: '男'
      },
      {
        key: '2',
        val: '女'
      }
    ],
    type: 'radio',
    label: '性别',
    placeholder: ''
  },
  {
    value: 'idCard',
    initValue: '',
    type: 'input',
    label: '身份证号',
    placeholder: '请输入身份证号'
  },
  {
    value: 'identity',
    initValue: [],
    list: [
      {
        key: '1',
        val: '群众'
      },
      {
        key: '2',
        val: '团员'
      },
      {
        key: '3',
        val: '党员'
      }
    ],
    type: 'select',
    label: '政治面貌',
    placeholder: '请选择政治面貌'
  },
  {
    value: 'nation',
    initValue: [],
    list: [
      {
        key: '1',
        val: '汉族'
      },
      {
        key: '2',
        val: '壮族'
      },
      {
        key: '3',
        val: '苗族'
      }
    ],
    type: 'select',
    label: '民族',
    placeholder: '请选择民族'
  },
  {
    value: 'mobile',
    initValue: '',
    type: 'input',
    label: '联系电话',
    placeholder: '请输入电话号码'
  },
  {
    value: 'project',
    initValue: '',
    type: 'input',
    label: '申请专业',
    placeholder: '请输入专业名称'
  },
  {
    value: 'source',
    initValue: '1',
    list: [
      {
        key: '1',
        val: '应届'
      },
      {
        key: '2',
        val: '非应届'
      }
    ],
    type: 'radio',
    label: '学生来源',
    placeholder: ''
  },
  {
    value: 'object',
    initValue: '1',
    list: [
      {
        key: '1',
        val: '应届初中'
      },
      {
        key: '2',
        val: '非应届'
      }
    ],
    type: 'radio',
    label: '招生对象',
    placeholder: ''
  },
  {
    value: 'lastSchool',
    initValue: '',
    type: 'input',
    label: '毕业学校',
    placeholder: '请输入毕业学校'
  },
  {
    value: 'health',
    initValue: '',
    type: 'input',
    label: '健康状况',
    placeholder: '请输入健康状况'
  },
  {
    value: 'houseType',
    initValue: '1',
    list: [
      {
        key: '1',
        val: '农业'
      },
      {
        key: '2',
        val: '非弄'
      }
    ],
    type: 'radio',
    label: '户口性质',
    placeholder: ''
  },
  {
    value: 'address',
    initValue: '',
    type: 'input',
    label: '户口所在地区县以下详细地址',
    placeholder: '请输入详细地址'
  },
  {
    value: 'police',
    initValue: '',
    type: 'input',
    label: '所属派出所',
    placeholder: '请输入所属派出所名称'
  },
  {
    value: 'addressType',
    initValue: [],
    list: [
      {
        key: '1',
        val: '农村'
      },
      {
        key: '2',
        val: '城镇'
      },
      {
        key: '3',
        val: '县城'
      }
    ],
    type: 'select',
    label: '学生居住地类型',
    placeholder: '请选择居住地类型'
  },
  {
    value: 'addressNow',
    initValue: '',
    type: 'input',
    label: '家庭现住址',
    placeholder: '请输入家庭现住址'
  },
  {
    value: 'parentName',
    initValue: '',
    type: 'input',
    label: '家长姓名',
    placeholder: '请输入家长姓名'
  },
  {
    value: 'parentTel',
    initValue: '',
    type: 'input',
    label: '家长手机号',
    placeholder: '请输入家长手机号'
  },
  {
    value: 'relation',
    initValue: '',
    type: 'input',
    label: '与本人关系',
    placeholder: '请输入家长与本人关系'
  },
  {
    value: 'isGuardian',
    initValue: '1',
    list: [
      {
        key: '1',
        val: '是'
      },
      {
        key: '2',
        val: '否'
      }
    ],
    type: 'radio',
    label: '是否监护人',
    placeholder: ''
  },
  {
    type: 'upload',
    label: '学生人脸照片(选填)',
    required: false,
    placeholder: '请上传人脸照片'
  }
]
const columns = [
  {
    title: '序号',
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '8%'
  },
  {
    title: '年级',
    width: '8%',
    dataIndex: 'grade'
  },
  {
    title: '申请专业',
    dataIndex: 'project',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '5%'
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    width: '8%'
  },
  {
    title: '联系电话',
    dataIndex: 'mobile',
    width: '8%'
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
    width: '8%',
    customRender: (text) => {
      return Tools.getDate(text)
    }
  },
  {
    title: '申请状态',
    dataIndex: 'status',
    width: '8%'
  },
  {
    title: '人脸照片',
    dataIndex: 'photo',
    width: '10%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '操作',
    width: '5%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'StudentApply',
  components: {
    TableList,
    SearchForm,
    PageNum,
    GradeTree,
    SubmitForm,
    UploadMulti
  },
  data() {
    return {
      columns,
      searchLabel,
      title: '添加新生',
      addFormStatus: false,
      addFormDatas,
      fileList: [],
      fileInfo: {
        tip: '上传图片',
        h: 120, // 高度
        w: 120 // 宽度
      },
      confirmLoading: false,
      checkResult: true,
      checkTitle: '审核通过',
      checkText: '确定通过新生入学申请吗？（录取）',
      checkVisible: false,
      pageList: {
        page: 1,
        size: 20
      },
      searchList: {
        schoolCode: ''
      },
      total: 0,
      userList: [],
      previewVisible: false,
      detailList: {},
      dateTime: '',
      state: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getPageList', 'recordDetail', 'downRecord']),
    async showList(searchObj = {}) {
      this.searchList.schoolCode = this.userInfo.schoolCode
      this.searchList = Object.assign(this.searchList, this.pageList, searchObj)
      const res = await this.getPageList(this.searchList)
      // this.userList = res.data.list
      this.userList = [
        {
          id: 1,
          name: '张学良',
          grade: '2020',
          project: '软件工程',
          sex: '男',
          idCard: '420333199563632020',
          mobile: '13699996666',
          createTime: 56565656565,
          status: '1',
          photo:
            'http://canpoint-photo.oss-cn-beijing.aliyuncs.com/47801/2020/10/19/base/76b5c10347bf4e5185331bb917b762cb.jpg'
        },
        {
          id: 2,
          name: '张学良',
          grade: '2020',
          project: '软件工程',
          sex: '男',
          idCard: '420333199563632020',
          mobile: '13699996666',
          createTime: 56565656565,
          status: '1',
          photo:
            'http://canpoint-photo.oss-cn-beijing.aliyuncs.com/47801/2020/10/19/base/76b5c10347bf4e5185331bb917b762cb.jpg'
        }
      ]
      this.total = res.data.total
    },
    searchForm(values) {
      this.pageList.page = 1
      this.dateTime = values.date
      this.state = values.state
      const searchObj = {
        date: values.date,
        state: values.state
      }
      this.showList(searchObj)
    },
    async detail(id) {
      this.previewVisible = true
      const res = await this.recordDetail(id)
      this.detailList = res.data
    },
    select(item) {
      this.pageList.page = 1
      this.pageList.size = 20
      if (typeof item.materialTypeId === 'number') {
        this.searchList.materialTypeId = item.materialTypeId
        this.searchList.materialId = ''
      } else {
        this.searchList.materialId = item.materialTypeId.split('^')[1]
        this.searchList.materialTypeId = ''
      }
      this.showList()
    },
    addClick() {
      this.addFormStatus = true
    },
    submitForm() {},
    // 审核通过、拒绝按钮
    checkClick(val) {
      if (val) {
        this.checkTitle = '审核通过'
        this.checkText = '确定通过新生入学申请吗？（录取）'
        this.checkResult = true
      } else {
        this.checkTitle = '审核拒绝'
        this.checkText = '确定拒绝新生入学申请吗？（不录取）'
        this.checkResult = false
      }
      this.$nextTick(() => {
        this.checkVisible = true
      })
    },
    // 打开审核弹框
    handleCheckOpen() {
      this.checkVisible = true
    },
    // 审核确认
    handleCheckOk() {
      console.log(this.checkResult)
      this.checkVisible = false
    },
    // 取消审核 关闭弹框
    handleCheckCancel() {
      this.checkVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.goods {
  .page-left {
    background: #fff;
    margin-right: 10px;
    width: 150px;
  }
}
</style>
