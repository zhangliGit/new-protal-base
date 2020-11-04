<template>
  <div class="home page-layout qui-fx-ver">
    <a-modal
      :title="checkTitle"
      :visible="checkVisible"
      :confirm-loading="confirmLoading"
      @ok="handleCheckOk"
      @cancel="handleCheckCancel"
    >
      <div class="check-result check-box">
        <div class="check-title">审核结果：</div>
        <div class="check-area">
          <a-radio-group name="radioGroup" v-model="checkData.result">
            <a-radio value="1"> 通过(录取) </a-radio>
            <a-radio value="2"> 不通过(不录取) </a-radio>
          </a-radio-group>
        </div>
      </div>
      <div class="check-text check-box">
        <div class="check-title">审核意见：</div>
        <div class="check-area">
          <a-textarea
            :style="{ width: '100%' }"
            v-model="checkData.text"
            placeholder="请输入审核意见"
            :auto-size="{ minRows: 3, maxRows: 8 }"
          />
        </div>
      </div>
    </a-modal>
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="editFormStatus"
      :form-data="editFormDatas"
    >
      <div slot="upload" class="qui-fx qui-fx-ac">
        <upload-multi is-check :length="1" v-model="fileList" type="face" :fileInfo="fileInfo"></upload-multi>
      </div>
    </submit-form>
    <div class="head-btn">
      <a-button type="primary" @click="checkClick"> 审核 </a-button>
      <a-button type="primary" :style="{ marginLeft: '10px' }" @click="editFormStatus = true"> 编辑 </a-button>
    </div>
    <div class="message-box">
      <div class="base-message message">
        <div class="title">基本信息</div>
        <div class="base-photo">
          <img
            src="http://canpoint-photo.oss-cn-beijing.aliyuncs.com/47801/2020/10/19/base/76b5c10347bf4e5185331bb917b762cb.jpg"
            alt=""
          />
        </div>
        <div class="base-msg-table msg-table">
          <div class="table-list">
            <div class="msg-item" v-for="item in baseListOne" :key="item.id">
              <div class="name common">{{ item.name }}</div>
              <div class="text common">{{ item.text }}</div>
            </div>
          </div>
          <div class="table-list">
            <div class="msg-item" v-for="item in baseListTwo" :key="item.id">
              <div class="name common">{{ item.name }}</div>
              <div class="text common">{{ item.text }}</div>
            </div>
          </div>
          <div class="table-list">
            <div class="msg-item" v-for="item in baseListThree" :key="item.id">
              <div class="name common">{{ item.name }}</div>
              <div class="text common">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="project-message message">
        <div class="title">审核信息</div>
        <div class="project-msg-table msg-table">
          <div class="table-list">
            <div class="msg-item" v-for="item in checkInfo" :key="item.id">
              <div class="name common">{{ item.name }}</div>
              <div class="text common">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UploadMulti from '@c/UploadFace'
import SubmitForm from '../../component/SubForm.vue'
import { nation } from '@u/nation'
const editFormDatas = [
  {
    value: 'gradeName',
    initValue: [],
    list: [
      {
        key: '1',
        val: '2020'
      },
      {
        key: '2',
        val: '2019'
      }
    ],
    type: 'select',
    label: '年级',
    placeholder: '请选择年级'
  },
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '姓名',
    max: 20,
    placeholder: '请输入学生姓名(长度限制在20字符以内)',
    message: '学生姓名限制在20字符以内'
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
    placeholder: '请输入身份证号',
    message: '身份证号码格式错误',
    regular: 'idCard'
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
    list: nation.map((item) => {
      return {
        key: item.name,
        val: item.name
      }
    }),
    type: 'select',
    label: '民族',
    placeholder: '请选择民族'
  },
  {
    value: 'mobile',
    initValue: '',
    type: 'input',
    label: '联系电话',
    placeholder: '请输入电话号码',
    message: '电话号码格式错误',
    regular: 'phone'
  },
  {
    value: 'project',
    initValue: [],
    list: [
      {
        key: '1',
        val: '软件技术'
      },
      {
        key: '2',
        val: '软件测试'
      },
      {
        key: '3',
        val: '医学'
      }
    ],
    type: 'select',
    label: '申请专业',
    placeholder: '请选择专业'
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
    max: 20,
    placeholder: '请输入毕业学校',
    message: '毕业学校名称限制在20字符内'
  },
  {
    value: 'health',
    initValue: '',
    type: 'input',
    label: '健康状况',
    max: 10,
    placeholder: '请输入健康状况',
    message: '健康状况限制在10字符内'
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
    max: 30,
    placeholder: '请输入详细地址',
    message: '详细地址限制在30字符内'
  },
  {
    value: 'police',
    initValue: '',
    type: 'input',
    label: '所属派出所',
    placeholder: '请输入所属派出所名称',
    max: 20,
    message: '派出所名称限制在20字符内'
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
    max: 20,
    placeholder: '请输入家庭现住址',
    message: '住址限制在20字符内'
  },
  {
    value: 'parentName',
    initValue: '',
    type: 'input',
    label: '家长姓名',
    max: 20,
    placeholder: '请输入家长姓名',
    message: '家长姓名在20字符内'
  },
  {
    value: 'parentTel',
    initValue: '',
    type: 'input',
    label: '家长手机号',
    placeholder: '请输入家长手机号',
    message: '电话号码格式错误',
    regular: 'phone'
  },
  {
    value: 'relation',
    initValue: '',
    type: 'input',
    label: '与本人关系',
    max: 10,
    placeholder: '请输入家长与本人关系',
    message: '关系字数在10字符内'
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
  },
  {
    value: 'purpose',
    initValue: [],
    list: [
      {
        key: '1',
        val: '高'
      },
      {
        key: '2',
        val: '中'
      },
      {
        key: '3',
        val: '低'
      }
    ],
    type: 'select',
    label: '意向程度',
    placeholder: '请选择意向程度'
  },
  {
    value: 'mark',
    initValue: [],
    type: 'textarea',
    label: '备注',
    required: false,
    placeholder: '请输入备注信息'
  }
]
export default {
  name: 'ApplyDetails',
  components: {
    SubmitForm,
    UploadMulti
  },
  data() {
    return {
      title: '编辑新生',
      editFormStatus: false,
      editFormDatas,
      fileList: [],
      fileInfo: {
        tip: '上传图片',
        h: 120, // 高度
        w: 120 // 宽度
      },
      checkTitle: '审核',
      checkVisible: false,
      confirmLoading: false,
      checkData: {
        result: '1',
        checkText: ''
      },
      baseListOne: [
        {
          id: '1',
          name: '姓名',
          text: '张三'
        },
        {
          id: '2',
          name: '申请状态',
          text: '申请中'
        },
        {
          id: '3',
          name: '性别',
          text: '男'
        },
        {
          id: '4',
          name: '政治面貌',
          text: '群众'
        },
        {
          id: '5',
          name: '身份证号',
          text: '420324199869696363'
        },
        {
          id: '6',
          name: '民族',
          text: '汉'
        },
        {
          id: '7',
          name: '年级',
          text: '2020级'
        },
        {
          id: '8',
          name: '学生来源',
          text: '应届'
        },
        {
          id: '9',
          name: '申请专业',
          text: '摄像'
        },
        {
          id: '10',
          name: '招生对象',
          text: '应届初中'
        },
        {
          id: '11',
          name: '联系电话',
          text: '15633333333'
        },
        {
          id: '12',
          name: '毕业学校',
          text: '武汉三中'
        },
        {
          id: '13',
          name: '申请时间',
          text: '2020/12/01 12:00:00'
        },
        {
          id: '14',
          name: '健康状况',
          text: '良好'
        }
      ],
      baseListTwo: [
        {
          id: '1',
          name: '户口性质',
          text: '农业'
        },
        {
          id: '2',
          name: '家长姓名',
          text: '张起灵'
        },
        {
          id: '3',
          name: '户口所在地区县一下详细地址',
          text: '陕西省安康市旬阳县XX村'
        },
        {
          id: '4',
          name: '家长手机号',
          text: '13111111111'
        },
        {
          id: '5',
          name: '所属派出所',
          text: '旬阳派出所'
        },
        {
          id: '6',
          name: '与本人关系',
          text: '父子'
        },
        {
          id: '7',
          name: '学生居住地类型',
          text: '农村'
        },
        {
          id: '8',
          name: '是否监护人',
          text: '是'
        },
        {
          id: '9',
          name: '家庭现住址',
          text: '旬阳县XX镇XX村'
        }
      ],
      baseListThree: [
        {
          id: '1',
          name: '意向程度',
          text: '高'
        },
        {
          id: '2',
          name: '备注',
          text: '张起灵XXX'
        }
      ],
      checkInfo: [
        {
          id: '1',
          name: '审核意见',
          text: '通过'
        },
        {
          id: '2',
          name: '审核人',
          text: '曹操'
        },
        {
          id: '3',
          name: '审核时间',
          text: '2020/10/17 12:36:00'
        }
      ]
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    console.log(this.$route.query.id)
  },
  methods: {
    ...mapActions('home', ['getReserveList', 'delReserve']),
    async showList() {
      const req = {
        ...this.searchObj,
        ...this.pageList,
        schoolCode: this.userInfo.schoolCode,
        type: '1'
      }
      const res = await this.getReserveList(req)
      this.bookingList = res.data.list
      this.bookingList.map((el) => {
        el.placeName = el.placeName.replace(/,/g, '-')
      })
      this.total = res.data.total
    },
    // 打开审核弹框
    checkClick() {
      this.checkVisible = true
    },
    // 审核提交
    handleCheckOk() {
      if (!this.checkData.result) {
        this.$message.error('请选择审核结果')
        return
      }
      this.checkVisible = false
    },
    // 取消审核
    handleCheckCancel() {
      this.checkVisible = false
    },
    // 编辑学生信息提交
    submitForm() {
      if (this.totalList.length === 0) {
        this.$message.warning('请选择学生')
        return
      }
      console.log(this.totalList)
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px 40px;
}
.check-box {
  display: flex;

  .check-title {
    width: 100px;
    margin-bottom: 20px;
  }
  .check-area {
    flex: 1;
  }
}
.head-btn {
  width: 100%;
  margin: 0 auto;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  box-sizing: border-box;
}
.message-box {
  flex: 1;
  box-sizing: border-box;
  padding-right: 20px;
  overflow-y: auto;
}
.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 46px;
  padding: 0 10px;
  font-size: 16px;
  background: rgba(242, 242, 242, 1);
}
.message {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.base-message,
.project-message {
  padding: 30px 0;
  margin-bottom: 50px;

  .base-photo {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 150px;
      height: 170px;
    }
  }

  .base-msg-table,
  .project-msg-table {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    padding: 40px 100px;
    border: 1px solid rgba(242, 242, 242, 1);

    .table-list {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      margin-bottom: 20px;

      .msg-item {
        display: flex;
        width: 50%;
        border: 1px solid #ccc;
        border-top: 0;
        border-left: 0;

        .common {
          box-sizing: border-box;
          height: 40px;
          padding: 0 8px;
        }

        .name {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 40%;
          background-color: rgba(242, 242, 242, 1);
        }
        .text {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 60%;
        }
      }

      .msg-item:nth-child(2n + 1) {
        border-top: 0;
        border-left: 1px solid #ccc;
      }
      .msg-item:nth-child(1) {
        border-top: 1px solid #ccc;
      }
      .msg-item:nth-child(2) {
        border-top: 1px solid #ccc;
      }
    }
  }
}
</style>
